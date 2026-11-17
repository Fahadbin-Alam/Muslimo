import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { SettingsSheet } from "../ui/screens";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const fetchChoice = jest.fn();
const saveChoice = jest.fn();
const link = { load: fetchChoice, save: saveChoice };

const props = {
  visible: true,
  streakReminder: true,
  islamicReminder: false,
  dailyCheckIn: false,
  weeklyCheckIn: false,
  soundEnabled: true,
  softSound: false,
  onSelectRole: jest.fn(),
  onToggleStreak: jest.fn(),
  onToggleIslamic: jest.fn(),
  onToggleDaily: jest.fn(),
  onToggleWeekly: jest.fn(),
  onToggleSound: jest.fn(),
  onToggleSoftSound: jest.fn(),
  onSave: jest.fn(),
  onClose: jest.fn()
};

describe("newsletter tick box in Settings", () => {
  beforeEach(() => {
    fetchChoice.mockReset();
    saveChoice.mockReset();
  });

  it("starts off and saves at once when a grown-up ticks it", async () => {
    fetchChoice.mockResolvedValue({ subscribed: false, canJoin: true });
    saveChoice.mockResolvedValue({ subscribed: true, canJoin: true });
    await render(<SettingsSheet {...props} newsletter={link} />);
    const toggle = await screen.findByTestId("settings-newsletter-toggle");
    expect(toggle.props.accessibilityState).toMatchObject({ checked: false });
    await fireEvent.press(toggle);
    expect(saveChoice).toHaveBeenCalledWith(true);
    await waitFor(() => expect(screen.getByTestId("settings-newsletter-toggle").props.accessibilityState).toMatchObject({ checked: true }));
  });

  it("goes back and says so when saving fails", async () => {
    fetchChoice.mockResolvedValue({ subscribed: false, canJoin: true });
    saveChoice.mockRejectedValue(new Error("offline"));
    await render(<SettingsSheet {...props} newsletter={link} />);
    await fireEvent.press(await screen.findByTestId("settings-newsletter-toggle"));
    await screen.findByText("Couldn't save. Check your internet and try again.");
    expect(screen.getByTestId("settings-newsletter-toggle").props.accessibilityState).toMatchObject({ checked: false });
  });

  it("never shows for guests, Kids mode or Kid accounts", async () => {
    fetchChoice.mockResolvedValue({ subscribed: false, canJoin: true });
    const view = await render(<SettingsSheet {...props} guest newsletter={link} />);
    expect(screen.queryByTestId("settings-newsletter")).toBeNull();
    // Kids mode: the app passes no newsletter link.
    await view.rerender(<SettingsSheet {...props} newsletter={undefined} />);
    expect(screen.queryByTestId("settings-newsletter")).toBeNull();
    expect(fetchChoice).not.toHaveBeenCalled();
    // A Kid account: the server says it can't join.
    fetchChoice.mockResolvedValue({ subscribed: false, canJoin: false });
    await view.rerender(<SettingsSheet {...props} newsletter={link} />);
    await waitFor(() => expect(fetchChoice).toHaveBeenCalled());
    expect(screen.queryByTestId("settings-newsletter")).toBeNull();
  });
});
