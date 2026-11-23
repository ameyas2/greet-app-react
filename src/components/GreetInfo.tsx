import type {Greet} from "../model/Greet.tsx";
import {formatSlashDateTime} from "./Utils.tsx";

interface GreetInfoProps {
    greet?: Greet;
}

const GreetInfo = (props: GreetInfoProps) => {

    const greet: Greet | undefined = props.greet;

    return (
        <>
            {greet && <div className="modal" id="greet-info-modal" popover="auto">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl">{greet.title}</h3>
                    <p className="py-4 text-lg font-bold">{greet.author}</p>
                    <p className="py-4 text-lg">{greet.description}</p>
                    <p className="py-4 text-sm">{formatSlashDateTime(greet.createdAt)}</p>
                </div>
                <div className="modal-backdrop">
                    <button popoverTarget="greet-info-modal" popoverTargetAction="hide">close</button>
                </div>
            </div>
            }
        </>
    );
}

export default GreetInfo;
