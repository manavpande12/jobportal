import { Button } from "@/common/components/ui/button";
import { UserRoundX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserNotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-linear-to-b from-primary/5 via-background to-background relative">
      <div className="absolute left-1/2 top-20 -translate-x-1/2 text-[120px] sm:text-[180px] md:text-[240px] lg:text-[300px] text-muted-foreground tracking-widest opacity-3 select-none pointer-events-none">
        404
      </div>
      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
      <UserRoundX className="size-12" strokeWidth={1.5} />
      <h1 className="text-2xl sm:text-4xl mt-4 font-medium">User Not Found</h1>
      <p className="mt-2 text-xs sm:text-sm leading-4 sm:leading-5 max-w-2xl text-muted-foreground text-center">
        Sorry, we couldn't find the profile you're looking for. It may have been removed, made private, or the link might be incorrect.
      </p>
      <div className="mt-6 flex justify-center gap-3 w-80">
        <Button onClick={() => router.back()} className="flex-1">
          Go Back
        </Button>
        <Button variant="outline" onClick={() => router.push("/")} className="flex-1">
          Go Home
        </Button>
      </div>
    </div>
  );
}
