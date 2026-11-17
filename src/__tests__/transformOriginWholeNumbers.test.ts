/**
 * React Native's phone parser for a `transformOrigin` string reads only whole numbers (its regex is
 * /\d+(?:%|px)/), so "50% 62.857%" turned into "50% 857142857142854%" and the kid's head, the waving
 * arm and the camel's legs flew off the screen on Android and iOS whenever they turned. These guard it.
 */
import * as fs from "fs";
import * as path from "path";
import { pivotAt } from "../ui/motion";

// The same pattern React Native uses (Libraries/StyleSheet/processTransformOrigin.js).
const RN_TOKEN = /(top|bottom|left|right|center|\d+(?:%|px)|0)/gi;

function tokens(origin: string) {
  return origin.match(RN_TOKEN) ?? [];
}

describe("transform origins", () => {
  it("pivotAt gives whole-number percents React Native reads back exactly", () => {
    const shares: Array<[number, number]> = [
      [79 / 120, 94 / 140],
      [60 / 120, 88 / 140],
      [38 / 120, 62 / 100],
      [64 / 120, 62 / 100],
      [10 / 64, 44 / 64]
    ];
    for (const [x, y] of shares) {
      const origin = pivotAt(x, y);
      expect(origin).toMatch(/^\d+% \d+%$/);
      expect(tokens(origin)).toEqual(origin.split(" "));
      const [px, py] = origin.split(" ").map((part) => Number(part.slice(0, -1)));
      expect(Math.abs(px - x * 100)).toBeLessThanOrEqual(0.5);
      expect(Math.abs(py - y * 100)).toBeLessThanOrEqual(0.5);
    }
  });

  it("no screen builds a transformOrigin string by hand from a sum (it can come out with decimals)", () => {
    const root = path.join(__dirname, "..");
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== "__tests__" && entry.name !== "node_modules") walk(full);
        } else if (/\.tsx?$/.test(entry.name)) {
          fs.readFileSync(full, "utf8")
            .split("\n")
            .forEach((line, index) => {
              if (/transformOrigin:\s*`/.test(line)) offenders.push(`${path.relative(root, full)}:${index + 1}`);
              const literal = /transformOrigin:\s*["']([^"']+)["']/.exec(line);
              if (literal && /\d\.\d/.test(literal[1])) offenders.push(`${path.relative(root, full)}:${index + 1}`);
            });
        }
      }
    };
    walk(root);
    expect(offenders).toEqual([]);
  });
});
