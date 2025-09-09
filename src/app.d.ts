declare global {
  namespace App {
    interface Locals {
      user: { token: string } | null;
      weather?: {
        city: string;
        country: string;
        temp: number;
        sunrise: number;
        sunset: number;
        weather: string;
        icon: string;
        time: number;
      } | null;
    }
  }
}
export {};
