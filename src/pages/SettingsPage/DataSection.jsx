import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { SettingRow } from "./SettingRow.jsx";

export function DataSection({ onResetData }) {
  const [confirming, setConfirming] = useState(false);

  const handleReset = () => {
    onResetData();
    setConfirming(false);
  };

  return (
    <section className="settings-card settings-card-wide">
      <div className="profile-card-label">DATA</div>
      <SettingRow
        icon={RotateCcw}
        title="Reset learning data"
        description="Clear your enrollments and saved courses from this browser. Your account and membership stay active."
      >
        {confirming ? (
          <span className="settings-confirm">
            <button className="settings-danger-button" onClick={handleReset}>
              Reset everything
            </button>
            <button
              className="settings-quiet-button"
              onClick={() => setConfirming(false)}
            >
              Cancel
            </button>
          </span>
        ) : (
          <button
            className="settings-danger-button"
            onClick={() => setConfirming(true)}
          >
            Reset data <ArrowRight size={12} />
          </button>
        )}
      </SettingRow>
    </section>
  );
}
