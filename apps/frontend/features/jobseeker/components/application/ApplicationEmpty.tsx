import { Card, CardContent } from "@/common/components/ui/card";
import { CalendarDays } from "lucide-react";

export default function ApplicationEmpty() {
    return (
        <Card className="flex min-h-48 items-center justify-center border ring-0 bg-background">
            <CardContent className="flex flex-col items-center justify-center gap-2 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <CalendarDays className="size-6 text-muted-foreground" />
                </div>

                <div>
                    <p className="font-semibold">No applications found</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        You haven't submitted any applications yet.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}