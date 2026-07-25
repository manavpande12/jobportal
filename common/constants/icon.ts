import {
    BriefcaseBusiness,
    Code2,
    Database,
    Globe,
    ShieldCheck,
    Cpu,
    Server,
    Smartphone,
    Monitor,
    Cloud,
    Workflow,
    Wrench,
    Blocks,
    ChartColumn,
    Network,
    BrainCircuit,
    PencilRuler,
    Settings2,
    type LucideIcon,
} from "lucide-react";


import { FaLinkedinIn, FaWhatsapp, FaXTwitter, FaTelegram, FaCopy, FaFacebook } from "react-icons/fa6";

export const jobIcons: LucideIcon[] = [
    BriefcaseBusiness,
    Code2,
    Database,
    Globe,
    ShieldCheck,
    Cpu,
    Server,
    Smartphone,
    Monitor,
    Cloud,
    Workflow,
    Wrench,
    Blocks,
    ChartColumn,
    Network,
    BrainCircuit,
    PencilRuler,
    Settings2,
];


export const socialIcons = [
    { icon: FaFacebook, label: "Facebook" },
    { icon: FaLinkedinIn, label: "LinkedIn" },
    { icon: FaWhatsapp, label: "WhatsApp" },
    { icon: FaXTwitter, label: "X" },
    { icon: FaTelegram, label: "Telegram" },
    { icon: FaCopy, label: "Copy Link" },
]

function hash(text: string) {
    let hash = 2166136261;

    for (let i = 0; i < text.length; i++) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0;
}

export function getIconFromText(text: string, icons: LucideIcon[]): LucideIcon {
    if (icons.length === 0) {
        throw new Error("Icon list cannot be empty.");
    }
    return icons[hash(text) % icons.length];
}