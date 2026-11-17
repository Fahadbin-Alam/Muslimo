import { applyShopItem, grantHearts, isOutOfHearts, isOutOfHeartsAfterAnswer, localDateKey, loseHeart, regainHearts, HEART_REFILL_MS } from "../api/islamicLearningApi";
import { SHOP_ITEMS } from "../data/course";
import { makeUser } from "./testUtils";

const today = () => localDateKey();
const shopItem = (id: string) => {
  const item = SHOP_ITEMS.find((candidate) => candidate.id === id);
  if (!item) {
    throw new Error(`Missing shop item ${id}`);
  }
  return item;
};

describe("loseHeart", () => {
  it("takes one heart away", () => {
    const user = makeUser({ hearts: { current: 3, max: 5, unlimited: false, lastRefillDate: today() } });

    expect(loseHeart(user).hearts.current).toBe(2);
  });

  it("takes a heart from a brand-new learner's very first lesson", () => {
    const hearts = { current: 3, max: 5, unlimited: false, lastRefillDate: today() };
    expect(loseHeart(makeUser({ hearts, completedLessonIds: [] })).hearts.current).toBe(2);
    expect(loseHeart(makeUser({ hearts, completedLessonIds: ["a", "b", "c"] })).hearts.current).toBe(2);
  });

  it("never goes below zero", () => {
    const user = makeUser({ hearts: { current: 0, max: 5, unlimited: false, lastRefillDate: today() } });

    expect(loseHeart(user).hearts.current).toBe(0);
  });

  it("does nothing for members with unlimited hearts", () => {
    const user = makeUser({ hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: today() } });

    expect(loseHeart(user)).toBe(user);
  });
});

describe("grantHearts", () => {
  const user = makeUser({ hearts: { current: 4, max: 5, unlimited: false, lastRefillDate: today() } });

  it("can stack hearts above the max", () => {
    expect(grantHearts(user, 5).hearts.current).toBe(9);
  });

  it("caps at the max when asked to", () => {
    expect(grantHearts(user, 5, true).hearts.current).toBe(5);
  });
});

describe("regainHearts (one heart every 5 hours)", () => {
  const start = new Date(2026, 10, 17, 9).getTime();
  const at = (ms: number) => new Date(start + ms);
  const H = HEART_REFILL_MS;
  const withHearts = (current: number, nextHeartAt?: number) =>
    makeUser({ hearts: { current, max: 5, unlimited: false, lastRefillDate: "2000-01-01", ...(nextHeartAt === undefined ? {} : { nextHeartAt }) } });

  it("never fills the hearts just because a new day started", () => {
    const user = withHearts(1, start + H);
    expect(regainHearts(user, at(H - 1))).toBe(user);
    expect(regainHearts(user, at(H - 1)).hearts.current).toBe(1);
  });

  it("gives one heart when the 5 hours are up, and starts the next wait", () => {
    const next = regainHearts(withHearts(1, start + H), at(H));
    expect(next.hearts.current).toBe(2);
    expect(next.hearts.nextHeartAt).toBe(start + 2 * H);
  });

  it("gives every heart earned while the app was closed, never above the max", () => {
    const back = regainHearts(withHearts(0, start + H), at(2 * H + 10));
    expect(back.hearts.current).toBe(2);
    expect(back.hearts.nextHeartAt).toBe(start + 3 * H);
    const full = regainHearts(withHearts(0, start + H), at(100 * H));
    expect(full.hearts.current).toBe(5);
    expect(full.hearts.nextHeartAt).toBeUndefined();
  });

  it("starts the clock, giving nothing, for hearts missing without one", () => {
    const next = regainHearts(withHearts(0), at(0));
    expect(next.hearts.current).toBe(0);
    expect(next.hearts.nextHeartAt).toBe(start + H);
  });

  it("gives nothing when the phone's clock was moved back, and starts the wait again", () => {
    // The next heart was due at start + H; the clock now says a day earlier.
    const next = regainHearts(withHearts(0, start + H), at(-24 * H));
    expect(next.hearts.current).toBe(0);
    expect(next.hearts.nextHeartAt).toBe(start - 23 * H);
  });

  it("leaves full hearts and unlimited hearts alone", () => {
    const full = withHearts(5);
    expect(regainHearts(full, at(10 * H))).toBe(full);
    const unlimited = makeUser({ hearts: { current: 0, max: 5, unlimited: true, lastRefillDate: today() } });
    expect(regainHearts(unlimited, at(10 * H))).toBe(unlimited);
  });

  it("starts the clock on the first heart lost from full, and keeps a running one", () => {
    const before = Date.now();
    const lost = loseHeart(withHearts(5));
    expect(lost.hearts.current).toBe(4);
    expect(lost.hearts.nextHeartAt).toBeGreaterThanOrEqual(before + H);
    expect(loseHeart(withHearts(3, start + H)).hearts.nextHeartAt).toBe(start + H);
  });
});

describe("applyShopItem", () => {
  it("gives unlimited hearts for a membership", () => {
    const user = makeUser({ hearts: { current: 1, max: 5, unlimited: false, lastRefillDate: today() } });
    const next = applyShopItem(user, shopItem("membership-monthly"));

    expect(next.hearts).toMatchObject({ current: 5, unlimited: true });
    expect(next.activeSubscriptionId).toBeTruthy();
  });

  it("keeps the heart limit for the No ads plan", () => {
    const user = makeUser({ hearts: { current: 1, max: 5, unlimited: false, lastRefillDate: today() } });
    const next = applyShopItem(user, shopItem("no-ads-monthly"));

    expect(next.hearts).toMatchObject({ current: 1, unlimited: false });
    expect(next.activeSubscriptionId).toBe("no_ads_monthly");
  });

  it("adds the pack's hearts for a heart pack", () => {
    const user = makeUser({ hearts: { current: 2, max: 5, unlimited: false, lastRefillDate: today() } });
    const pack = shopItem("heart-pack-small");

    expect(applyShopItem(user, pack).hearts.current).toBe(2 + (pack.heartsGranted ?? 0));
  });

  it("leaves the user unchanged for a rewarded ad item", () => {
    const user = makeUser();

    expect(applyShopItem(user, shopItem("watch-ad-heart"))).toBe(user);
  });
});

describe("isOutOfHeartsAfterAnswer", () => {
  const empty = makeUser({ hearts: { current: 0, max: 5, unlimited: false, lastRefillDate: today() } });

  it("stops the lesson when the last heart goes on a wrong answer", () => {
    expect(isOutOfHeartsAfterAnswer(empty, "wrong")).toBe(true);
  });

  it("lets a right answer or a member with unlimited hearts carry on", () => {
    expect(isOutOfHeartsAfterAnswer(empty, "correct")).toBe(false);
    expect(isOutOfHeartsAfterAnswer({ ...empty, hearts: { ...empty.hearts, unlimited: true } }, "wrong")).toBe(false);
  });
});

describe("isOutOfHearts", () => {
  const empty = makeUser({ hearts: { current: 0, max: 5, unlimited: false, lastRefillDate: today() } });

  it("stops the lesson at 0 hearts whatever the last answer was, so a free retry cannot get around it", () => {
    expect(isOutOfHearts(empty)).toBe(true);
    expect(isOutOfHearts(loseHeart({ ...empty, hearts: { ...empty.hearts, current: 1 } }))).toBe(true);
  });

  it("lets a learner with hearts left, or unlimited hearts, carry on", () => {
    expect(isOutOfHearts({ ...empty, hearts: { ...empty.hearts, current: 1 } })).toBe(false);
    expect(isOutOfHearts({ ...empty, hearts: { ...empty.hearts, unlimited: true } })).toBe(false);
  });
});
