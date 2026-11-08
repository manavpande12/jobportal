import { getColorFromText, hsl } from "../constants/color";
import { Skeleton } from "./ui/skeleton";

type prop = {
  name: string | null;
  size?: "s" | "m" | "l";
};
export default function InitialsAvatar({ name, size = "l" }: prop) {
  const clr = getColorFromText(name ?? "");
  const initials = name
    ?.trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const shapeSize = size === "l" ? 88 : size === "m" ? 44 : 22;
  const textSize = size === "l" ? 24 : size === "m" ? 16 : 8;

  return (
    <div
      style={{ width: shapeSize, height: shapeSize, backgroundColor: hsl(clr), fontSize: textSize }}
      className="rounded-full shrink-0 border text-white flex justify-center items-center tracking-widest"
    >
      <strong>{initials}</strong>
    </div>
  );
}
