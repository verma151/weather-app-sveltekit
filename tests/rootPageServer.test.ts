import { describe, it, expect, vi } from "vitest";

import { getWeatherHistory } from "$lib/server/weatherDb";
import { load } from "../src/routes/+page.server";

// Mock the getWeatherHistory function
vi.mock("$lib/server/weatherDb", () => ({
  getWeatherHistory: vi.fn(),
}));

describe("+page.server.ts load function", () => {
  it("returns user, weather, and empty history if no user", async () => {
    const locals = {
      user: null,
      weather: { city: "Delhi", temp: 30 },
    };

    const result:any = await load({ locals } as any);

    expect(result?.user).toBeNull();
    expect(result?.weather).toEqual({ city: "Delhi", temp: 30 });
    expect(result?.history).toEqual([]);
  });

  it("returns user, weather, and history if user exists", async () => {
    const mockHistory = [
      { date: "2025-09-10", temp: 30, condition: "Sunny" },
    ];
    (getWeatherHistory as any).mockReturnValue(mockHistory);

    const locals = {
      user: { email: "test@example.com" },
      weather: { city: "Delhi", temp: 30 },
    };

    const result:any = await load({ locals } as any);

    expect(result?.user).toEqual({ email: "test@example.com" });
    expect(result?.weather).toEqual({ city: "Delhi", temp: 30 });
    expect(result?.history).toEqual(mockHistory);

    // Ensure getWeatherHistory was called with the correct email
    expect(getWeatherHistory).toHaveBeenCalledWith("test@example.com");
  });
});
