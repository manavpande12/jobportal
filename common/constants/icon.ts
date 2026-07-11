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