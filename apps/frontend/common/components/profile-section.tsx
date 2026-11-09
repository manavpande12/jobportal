import type { ElementType, ReactNode } from "react";

type ProfileSectionProps = {
  title: string;
  icon: ElementType;
  children: ReactNode;
  empty: boolean;
};

export default function ProfileSection({ title, icon: Icon, children, empty }: ProfileSectionProps) {
  return (
    <section className="rounded-2xl border bg-background p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <h2 className="font-semibold">{title}</h2>
      </div>
      {empty ? <span>~</span> : children}
    </section>
  );
}
