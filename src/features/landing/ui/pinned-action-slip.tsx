type SlipRow = {
  purchase: string;
  deadline: string;
  status: string;
  urgent?: boolean;
};

const queueRows: SlipRow[] = [
  {
    purchase: "Kitchen scale",
    deadline: "Warranty · 12 Aug",
    status: "1 day left",
    urgent: true,
  },
  {
    purchase: "Wireless headphones",
    deadline: "Return · 14 Aug",
    status: "3 days left",
  },
  {
    purchase: "Desk lamp",
    deadline: "Refund check",
    status: "In progress",
  },
];

const columns = ["Purchase", "Deadline", "Status"] as const;

export function PinnedActionSlip({ headlineId }: { headlineId: string }) {
  const rowSummary = queueRows
    .map(
      (row) =>
        `${row.purchase}, ${row.deadline}, ${row.status}${
          row.urgent ? " (urgent)" : ""
        }`
    )
    .join("; ");

  return (
    <figure
      className="slip-clipboard mx-auto w-full max-w-[720px]"
      aria-labelledby="action-slip-caption"
    >
      <div className="slip-clip" aria-hidden="true" />

      <div className="slip-paper slip-settle">
        <div className="slip-paper-inner">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#c9bba8]/80 pb-4">
            <div>
              <p className="slip-thermal text-[10px] uppercase tracking-[0.28em] text-[#5c5346] sm:text-[11px]">
                AfterBuy · pick slip
              </p>
              <p className="slip-thermal mt-1 text-[10px] uppercase tracking-[0.18em] text-[#5c5346]/90 sm:text-[11px]">
                Action queue · ranked by urgency
              </p>
            </div>
            <p
              className="slip-wip-stamp shrink-0 font-thermal text-[10px] font-semibold uppercase tracking-[0.12em] text-[#c41e3a] sm:text-[11px]"
              aria-label="Product preview work in progress"
            >
              WIP
            </p>
          </div>

          <h1
            id={headlineId}
            className="mt-5 max-w-[18ch] text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-[#1a1a1a] sm:text-[2rem] sm:leading-[1.1]"
          >
            Keep post-purchase deadlines in view.
          </h1>

          <div
            className="mt-8"
            role="table"
            aria-label="Example purchase action queue ranked by urgency"
          >
            <div role="rowgroup">
              <div
                className="slip-grid slip-thermal border-b border-dashed border-[#b8a995] pb-2 text-[10px] uppercase tracking-[0.16em] text-[#5c5346] sm:text-[11px]"
                role="row"
              >
                {columns.map((column) => (
                  <div key={column} role="columnheader">
                    {column}
                  </div>
                ))}
              </div>
            </div>

            <div role="rowgroup" className="mt-1">
              {queueRows.map((row, index) => (
                <div
                  key={row.purchase}
                  className={`slip-row relative ${row.urgent ? "slip-row--urgent" : ""}`}
                  role="row"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {row.urgent ? (
                    <span
                      className="slip-marker-stripe"
                      aria-hidden="true"
                      title="Urgent row"
                    />
                  ) : null}
                  <div className="slip-grid slip-thermal py-3 text-[13px] leading-snug text-[#1a1a1a] sm:text-sm">
                    <div role="cell" className="font-medium">
                      {row.purchase}
                    </div>
                    <div role="cell" className="text-[#3d3830]">
                      {row.deadline}
                    </div>
                    <div
                      role="cell"
                      className={
                        row.urgent
                          ? "font-semibold text-[#c41e3a]"
                          : "text-[#3d3830]"
                      }
                    >
                      {row.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="slip-thermal mt-6 border-t border-dashed border-[#b8a995] pt-4 text-center text-[10px] uppercase tracking-[0.22em] text-[#5c5346] sm:text-[11px]">
            Example data · synthetic preview · not live
          </p>
        </div>
      </div>

      <figcaption
        id="action-slip-caption"
        className="mt-4 text-center text-sm leading-relaxed text-[#5c5346]"
      >
        Example action queue — for illustration only, not connected to live
        purchases. {rowSummary}.
      </figcaption>
    </figure>
  );
}
