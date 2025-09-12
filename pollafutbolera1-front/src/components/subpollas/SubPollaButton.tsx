import { on } from "events";

type SubPollaButtonProps = {
    text: string;
    dir?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const SubPollaButton = ({ text, dir, onClick }: SubPollaButtonProps) => {
    return (
        <button 
            className="px-6 py-2 w-5/11 bg-gradient-to-br from-blue-900 to-blue-950 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 hover:text-yellow-300 transition-colors duration-150 text-lg mt-2 mr-1"
            onClick={onClick}
        >
            {dir ? (
            <a href={dir}>{text}</a>
            ) : (
                text
            )}
        </button>
    );
}