import {getAllGreets, getGreetById, deleteGreet} from "../service/greetService.tsx";
import {useEffect, useState} from "react";
import type {Greet} from "../model/Greet.tsx";
import {Info, Trash, Pencil} from "lucide-react";
import {formatSlashDateTime} from "./Utils.tsx";
import GreetInfo from "./GreetInfo.tsx";
import {useNavigate} from "react-router";


const Greets = () => {

    const [greets, setGreets] = useState<Greet[]>([]);
    const [greet, setGreet] = useState<Greet>();
    const [greetsLoaded, setGreetsLoaded] = useState(false);
    const navigate = useNavigate();

    const loadGreets = async () => {
        await getAllGreets().then((greetsResponse) => {
            setGreets(greetsResponse);
            setGreetsLoaded(true);
        }).catch((error) => {
            console.error("Eror getting all greets : " + error);
            setGreetsLoaded(false);
        }).finally(() => {
        })
    }

    const getGreet = async (id: string) => {
        await getGreetById(id).then(greet => {
            console.log(greet);
            setGreet(greet);
        }).catch(error => {
            console.error("Error getting Greet with id : " + id + " " + error);
        }).finally(() => {

        });
    }

    const greetDelete = (id: string) => {
        deleteGreet(id).then(() => {
            console.log("Greet deleted successfully");
        }).catch((error) => {
            console.error("Error deleting greet:", error);
        }).finally(() => {
            loadGreets()
        });
    }

    const greetEdit = (id: string) => {
        console.log("Edit : " + id);
        navigate("/edit/" + id);
    }

    useEffect(() => {
        loadGreets();
        console.log(greetsLoaded);
    }, [])

    return (
        <>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>
                                <label></label>
                            </th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {greets.map((greet) => (
                            <tr key={greet.id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{greet.title.slice(0, 50)}...</div>
                                            <div className="text-sm opacity-50">{greet.description.slice(0, 30)}...</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {greet.author}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>{formatSlashDateTime(greet.createdAt)}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <button className="text-gray-500 transition-all duration-200 hover:scale-125 hover:text-blue-500"
                                                popoverTarget="greet-info-modal"
                                                onClick={() => getGreet(greet.id)}>
                                            <Info size={18} />
                                        </button>

                                        <button className="text-gray-500 transition-all duration-200 hover:scale-125 hover:text-green-600"
                                                onClick={() => greetEdit(greet.id)}>
                                            <Pencil size={18} />
                                        </button>

                                        <button className="text-gray-500 transition-all duration-200 hover:scale-125 hover:text-red-500"
                                                popoverTarget="greet-delete-modal"
                                                onClick={() => greetDelete(greet.id)}>
                                            <Trash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <GreetInfo greet={greet}/>

        </>
    );
}

export default Greets;
