// The app asks questions in more than one way (gap, puzzle, true or false, matching: src/ui/lesson/questionFormats.ts).
// Most app tests were written for answer tiles, so they run with tiles only; tests of the other ways turn it back on.
globalThis.__QUESTION_VARIETY__ = false;

// The Learn path's sky follows the phone's real time of day (src/services/skyClock.ts). Tests run at
// a fixed midday so they don't change with the hour they run at; sky tests set their own time.
globalThis.__SKY_NOW__ = () => new Date(2026, 5, 15, 12, 0);
