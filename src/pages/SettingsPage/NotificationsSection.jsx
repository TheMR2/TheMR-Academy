import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { SettingRow } from "./SettingRow.jsx";
import { SettingSwitch } from "./SettingSwitch.jsx";

const STORAGE_KEY = "themr-academy-notifications";

const DEFAULT_PREFERENCES = {
  reminders: true,
  courseUpdates: true,
  progressSummary: false,
};

const NOTIFICATION_ROWS = [
  {
    key: "reminders",
    title: "Learning reminders",
    description: "A gentle nudge when your daily streak is about to expire.",
  },
  {
    key: "courseUpdates",
    title: "Course updates",
    description: "New lessons and improvements to courses you’re enrolled in.",
  },
  {
    key: "progressSummary",
    title: "Weekly progress summary",
    description: "A recap of your streak, study time, and finished lessons.",
  },
];

function readPreferences() {
  try {
    const stored = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) || "null",
    );
    return { ...DEFAULT_PREFERENCES, ...(stored || {}) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function NotificationsSection() {
  const [preferences, setPreferences] = useState(readPreferences);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const setPreference = (key, value) =>
    setPreferences((current) => ({ ...current, [key]: value }));

  return (
    <section className="settings-card settings-card-wide">
      <div className="profile-card-label">NOTIFICATIONS</div>
      {NOTIFICATION_ROWS.map((row) => (
        <SettingRow
          key={row.key}
          icon={Bell}
          title={row.title}
          description={row.description}
        >
          <SettingSwitch
            checked={preferences[row.key]}
            onChange={(value) => setPreference(row.key, value)}
            label={`Toggle ${row.title}`}
          />
        </SettingRow>
      ))}
    </section>
  );
}
