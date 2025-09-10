import { describe, it, expect, vi, beforeEach } from 'vitest';
import crypto from 'crypto';

// Mock $lib/server/db
vi.mock('../src/lib/server/db', () => ({
  getUsers: vi.fn(),
  saveUsers: vi.fn()
}));

import { getUsers, saveUsers } from '../src/lib/server/db';
import { actions } from '../src/routes/signup/+page.server';

describe('Signup Action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns error if user already exists', async () => {
    (getUsers as any).mockReturnValue([
      { name: 'John', email: 'user@example.com', password: 'hashed' }
    ]);

    const request = {
      formData: async () => new Map([
        ['name', 'John'],
        ['email', 'user@example.com'],
        ['password', 'password123']
      ])
    };

    const result = await actions.default!({ request } as any);

    expect(result).toHaveProperty('error');
    expect(result?.error).toBe('User already exists');
  });

  it('creates new user if email is not taken', async () => {
    (getUsers as any).mockReturnValue([]);

    const request = {
      formData: async () => new Map([
        ['name', 'Alice'],
        ['email', 'alice@example.com'],
        ['password', 'mypassword']
      ])
    };

    const result = await actions.default!({ request } as any);

    expect(result).toHaveProperty('success');
    expect(result?.success).toBe(true);

    const hashedPassword = crypto.createHash('sha256').update('mypassword').digest('hex');

    expect(saveUsers).toHaveBeenCalledWith([
      { name: 'Alice', email: 'alice@example.com', password: hashedPassword }
    ]);
  });
});
