import { Loader2 } from "lucide-react"


type Props = {
    className?: string;
}
const ButtonSpinner = ({ className }: Props) => {
    return <Loader2 className={`h-4 w-4 animate-spin ${className}`} />;
};

export default ButtonSpinner;