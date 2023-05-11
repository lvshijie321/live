'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
    title = 'No exact matches',
    subtitle = 'Try changing or remover of ',
    showReset
}) => {
    const router = useRouter()

    return (
        <div className="
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
        ">
            <Heading title={title} center subtitle={subtitle} />
            <div className="w-48 mt-4">
                {
                    showReset && <Button
                        outline
                        label="Remove all filters"
                        onClick={() => router.push('/')}></Button>
                }
            </div>
        </div>
    )
}

export default EmptyState
