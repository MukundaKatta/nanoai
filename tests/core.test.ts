import { describe, it, expect } from "vitest";
import { Nanoai } from "../src/core.js";
describe("Nanoai", () => {
  it("init", () => { expect(new Nanoai().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Nanoai(); await c.learn(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Nanoai(); await c.learn(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
