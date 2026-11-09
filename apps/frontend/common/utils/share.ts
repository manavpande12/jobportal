import { getJobById } from "@/features/jobs/services/jobs.service";
import { Metadata } from "next";
import { ScriptProps } from "next/script";

type ShareOptions = {
  title: string;
  text: string;
  url: string;
  initials?: string;
  avatarColor?: string;
};

export async function shareContent({ title, text, url, initials, avatarColor = "#6366f1" }: ShareOptions) {
  try {
    const shareData: ShareData = { title, text, url };

    // Generate a circular initials avatar
    if (initials && typeof document !== "undefined") {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;

      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = avatarColor;
        ctx.beginPath();
        ctx.arc(128, 128, 128, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 90px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(initials, 128, 128);

        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));

        if (blob) {
          const file = new File([blob], "profile-avatar.png", {
            type: "image/png",
          });

          if (navigator.canShare?.({ files: [file] })) {
            shareData.files = [file];
          }
        }
      }
    }

    if (navigator.share) {
      await navigator.share(shareData);
      return "shared";
    }

    await navigator.clipboard.writeText(url);
    return "copied";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return "cancelled";
    }

    return "failed";
  }
}

export async function copyLink(url: string) {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}

export const getSocialShareUrl = (platform: string, url: string, title: string) => {
  const params = new URLSearchParams();
  switch (platform) {
    case "Facebook":
      params.set("u", url);
      return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;

    case "LinkedIn":
      params.set("url", url);
      return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;

    case "WhatsApp":
      params.set("text", `${title}\n${url}`);
      return `https://api.whatsapp.com/send?${params.toString()}`;

    case "X":
      params.set("url", url);
      params.set("text", title);
      return `https://x.com/intent/tweet?${params.toString()}`;

    case "Telegram":
      params.set("url", url);
      params.set("text", title);
      return `https://t.me/share/url?${params.toString()}`;

    default:
      return "";
  }
};
