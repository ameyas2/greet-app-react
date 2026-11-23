import type {Greet} from "../model/Greet.tsx";
import {deleteGreet} from "../service/greetService.tsx";
import {useNavigate} from "react-router";

interface DeleteGreetProps {
    greet?: Greet;
}

const DeleteGreet = (props: DeleteGreetProps) => {

    const greet: Greet | undefined = props.greet;
    const navigate = useNavigate();
    console.log("Delete : " + greet);

    const greetDelete = (id: string) => {
        deleteGreet(id).then(() => {
            console.log("Greet deleted successfully");
        }).catch((error) => {
            console.error("Error deleting greet:", error);
        }).finally(() => {
            navigate("/")
        });
    }



    return (
        <>
            {greet &&
                <div className="modal" id="greet-delete-modal" popover="auto">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Are you sure you want to delete greet?</p>
                        <h3 className="py-4 font-bold">{greet.title}</h3>
                        <div className="modal-action">
                            <button  className="btn btn-outline btn-error" popoverTarget="greet-delete-modal" popoverTargetAction="hide" onClick={() => greetDelete(greet.id)}>Delete</button>
                            <button  className="btn btn-outline" popoverTarget="greet-delete-modal" popoverTargetAction="hide">Cancel</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default DeleteGreet;
