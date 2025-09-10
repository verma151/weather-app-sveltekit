// tests/login.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

vi.mock('$env/static/private', () => ({
  SECRET_KEY: 'testsecret123' // any test value
}));

// Mock $lib/server/db
vi.mock('../src/lib/server/db', () => ({
  getUsers: vi.fn()
}));
import { getUsers } from '../src/lib/server/db';


// Import the actions after mocks
import { actions } from '../src/routes/login/+page.server';

describe('Login Action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns error for invalid credentials', async () => {
    // Mock user database
    (getUsers as any).mockReturnValue([
      { email: 'user@example.com', password: crypto.createHash('sha256').update('password123').digest('hex') }
    ]);

    const request = {
      formData: async () => new Map([
        ['email', 'wrong@example.com'],
        ['password', 'wrongpass']
      ])
    };

    const mockCookies = { set: vi.fn() };

    const result = await actions.default!({ request, cookies: mockCookies } as any);
    expect(result).toHaveProperty('error');
    expect(result?.error).toBe('Invalid credentials');
  });

  it('sets cookie and throws redirect on successful login', async () => {
    const password = 'password123';
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    (getUsers as any).mockReturnValue([
      { email: 'user@example.com', password: hashedPassword }
    ]);

    const request = {
      formData: async () => new Map([
        ['email', 'user@example.com'],
        ['password', password]
      ])
    };

    const mockCookies = { set: vi.fn() };

    // Mock jwt.sign
    const mockToken = 'mockedtoken';
    vi.spyOn(jwt, 'sign').mockReturnValue(mockToken as any);

    let redirectThrown = false;
    try {
      await actions.default!({ request, cookies: mockCookies } as any);
    } catch (e: any) {
      redirectThrown = true;
      expect(e.status).toBe(302);
      expect(e.location).toBe('/');
    }

    expect(redirectThrown).toBe(true);
    expect(mockCookies.set).toHaveBeenCalledWith(
      'token',
      mockToken,
      expect.objectContaining({
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600
      })
    );
  });
});
