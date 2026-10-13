import { Moon, Sun } from "lucide-react";
import { SettingRow } from "./SettingRow.jsx";
import { SettingSwitch } from "./SettingSwitch.jsx";

export function AppearanceSection({ isDarkMode, onToggleTheme }) {
  return (
    <section className="settings-card">
      <div className="profile-card-label">APPEARANCE</div>
      <SettingRow
        icon={isDarkMode ? Moon : Sun}
        title={isDarkMode ? "Dark mode" : "Light mode"}
        description={
          isDarkMode
            ? "The dark green theme is active across the academy."
            : "The light theme is active across the academy."
        }
      >
        <SettingSwitch
          checked={isDarkMode}
          onChange={() => onToggleTheme()}
          label="Toggle dark mode"
        />
      </SettingRow>
    </section>
  );
}
