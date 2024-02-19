import { vi } from "vitest";

beforeAll(() => {
   window.Element.prototype.scrollBy = vi.fn().mockImplementation((...args: [ScrollToOptions] | [number, number]) => {});
  });
  