import {FC} from "react";

interface Props {
    text: string;
    success: boolean;
}

export const StatusBadge: FC<Props> = ({text, success}) => {
    return (
        <button className="btn-stats">
            <span className={`inline-block size-[6px] ${success ? 'bg-success' : 'bg-danger'} rounded-full`}></span>
            {text}
        </button>
    );
};