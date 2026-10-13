import { ArrowRight, Check, X } from "lucide-react";

export function EnrollConfirmation({ message, onMyLearning, onDismiss }) {
  return (
    <div className="enroll-confirmation">
      <span className="confirmation-check">
        <Check size={15} />
      </span>
      <div>
        <strong>{message}</strong>
        <small>
          Membership and enrollments are saved in this browser preview.
        </small>
      </div>
      <button onClick={onMyLearning}>
        Go to my learning <ArrowRight size={14} />
      </button>
      <button
        className="confirmation-close"
        aria-label="Dismiss"
        onClick={onDismiss}
      >
        <X size={15} />
      </button>
    </div>
  );
}
