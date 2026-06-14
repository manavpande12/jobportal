

export default function JobPostStatusBadge({ status }: { status: string }) {
    let clr = "#565667";
    switch (status) {
        case "ACTIVE":
            clr = "#305CDE";
            break;
        case "DRAFT":
            clr = "#EAB308";
            break;
        case "CLOSED":
            clr = "#DC2626";
            break;
        default:
            clr = "#565667";
            break;
    }
    const label = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    if (!status) return;
    return (
        <div
            style={{
                color: clr,
                backgroundColor: `${clr}15`,
                border: `1px solid ${clr}30`,
            }}
            className="inline-flex items-center gap-2 rounded-sm px-3 py-0.5 text-sm font-medium"
        >
            <div
                style={{ backgroundColor: clr }}
                className="size-2 rounded-full"
            />
            <span>{label}</span>
        </div>
    );
}