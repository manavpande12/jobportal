"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/common/components/ui/select";

import { APPLICATION_STATUS_CONFIG, ApplicationStatus } from "@/features/application/types/application.types";

import { hsl } from "@/common/constants/color";
import { useUpdateApplicationStatus } from "@/features/application/hooks/useApplication";
import { toast } from "sonner";
import { showApiError } from "@/common/utils/show-api-error";

type Prop = {
  id: string;
  status: ApplicationStatus;
};

export default function ApplicantsStatusUpdate({ id, status }: Prop) {
  const { mutateAsync: update, isPending } = useUpdateApplicationStatus();
  const onSelect = async (newStatus: ApplicationStatus) => {
    if (newStatus === status || isPending) return;
    try {
      const res = await update({
        id,
        data: { status: newStatus },
      });
      toast.success(res.message ?? "Application status updated.");
    } catch (err: unknown) {
      showApiError(err);
    }
  };

  return (
    <Select
      value={status === ApplicationStatus.APPLIED ? undefined : status}
      onValueChange={(value) => onSelect(value as ApplicationStatus)}
      disabled={isPending}
    >
      <SelectTrigger
        className="w-full bg-background border font-semibold text-foreground!
        outline-none ring-0 focus:ring-0 focus:ring-offset-0
        focus-visible:outline-none focus-visible:ring-0
        focus-visible:ring-offset-0"
      >
        <SelectValue placeholder="Set Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Update Application Status</SelectLabel>
          {Object.values(ApplicationStatus)
            .filter((f) => f !== ApplicationStatus.APPLIED)
            .map((item) => {
              const config = APPLICATION_STATUS_CONFIG[item];
              return (
                <SelectItem key={item} value={item}>
                  <div className="flex items-center gap-2">
                    <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: hsl(config.color) }} />
                    <span className="text-xs font-medium" style={{ color: hsl(config.color) }}>
                      {config.label}
                    </span>
                  </div>
                </SelectItem>
              );
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
