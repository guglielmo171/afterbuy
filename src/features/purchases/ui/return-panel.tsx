import type { ReturnCaseRecord } from "@/server/mappers/purchase";
import type { CalendarDate } from "@/shared/lib/calendar-date";
import {
  deriveReturnUrgency,
  formatReturnStatusLabel,
} from "@/features/purchases/lib/return-display";
import { ReturnStatusButton } from "@/features/purchases/ui/return-status-button";

type ReturnPanelProps = {
  purchaseId: string;
  returnCase: ReturnCaseRecord;
  currentDate: CalendarDate;
};

const urgencyToneClassName = {
  red: "border-signal-red/30 bg-signal-red/5 text-signal-red",
  amber: "border-signal-amber/30 bg-signal-amber/5 text-signal-amber",
} as const;

export function ReturnPanel({
  purchaseId,
  returnCase,
  currentDate,
}: ReturnPanelProps) {
  const { message } = deriveReturnUrgency(
    returnCase.returnDeadline,
    currentDate,
    returnCase.status,
  );

  return (
    <section
      aria-labelledby="return-panel-heading"
      className="mt-6 rounded-card border border-neutral-200 bg-white p-6 shadow-card sm:p-8"
    >
      <h2 id="return-panel-heading" className="text-lg text-neutral-900">
        Return
      </h2>

      {message ? (
        <p
          className={`mt-4 rounded-badge border px-3 py-2 text-sm font-medium ${urgencyToneClassName[message.tone]}`}
          role="status"
        >
          {message.text}
        </p>
      ) : null}

      <dl className="mt-6 space-y-4 text-sm">
        <div>
          <dt className="font-medium text-neutral-900">Return deadline</dt>
          <dd className="mt-1 text-neutral-700">{returnCase.returnDeadline}</dd>
        </div>
        <div>
          <dt className="font-medium text-neutral-900">Status</dt>
          <dd className="mt-1 capitalize text-neutral-700">
            {formatReturnStatusLabel(returnCase.status)}
          </dd>
        </div>
      </dl>

      <div className="mt-8">
        <ReturnStatusButton
          purchaseId={purchaseId}
          currentStatus={returnCase.status}
        />
      </div>
    </section>
  );
}
