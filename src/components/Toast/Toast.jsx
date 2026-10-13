import { Check, X } from "lucide-react";
import "../../app/App.css";

export function Toast({ message, onDismiss }) {
  return (
    <div className="toast">
      <span>
        <Check size={14} />
      </span>
      {message}
      <button aria-label="Dismiss" onClick={onDismiss}>
        <X size={14} />
      </button>
    </div>
  );
}
