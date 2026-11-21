// Google Play's and the App Store's own in-app rating box. Loaded only when needed, so a build or test without the
// native module just skips it.
export async function openStoreReview(): Promise<boolean> {
  try {
    const StoreReview = require("expo-store-review") as typeof import("expo-store-review");
    if (!(await StoreReview.isAvailableAsync()) || !(await StoreReview.hasAction())) return false;
    await StoreReview.requestReview();
    return true;
  } catch {
    return false;
  }
}
