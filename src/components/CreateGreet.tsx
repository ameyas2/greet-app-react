import { useForm, type FieldErrors } from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import type {Greet} from "../model/Greet.tsx";
import {createGreet} from "../service/greetService.tsx";
import {useNavigate} from "react-router";
import type {GreetRequestDTO} from "../model/GreetRequestDTO.tsx";
import {toast, Toaster} from "@/components/ui/toast"

const schema = z.object({
    title: z
        .string()
        .min(10, "Title must contain at least 10 characters")
        .max(200, "Title cannot exceed 200 characters"),

    description: z
        .string()
        .min(10, "Description must contain at least 10 characters")
        .max(500, "Description cannot exceed 500 characters"),

    author: z
        .string()
        .min(10, "Author name must contain at least 10 characters")
        .max(50, "Author name cannot exceed 50 characters"),
});

const CreateGreet = () => {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<GreetRequestDTO>({
        resolver: zodResolver(schema)
    });



    const onSubmit = (greet: GreetRequestDTO) => {
        console.log("Form submitted successfully!");
        console.log(greet);
        createGreet(greet).then((response: Greet) => {
            console.log("Successfully created! greet " + JSON.stringify(response));
            toast.add({
                type: "success",
                description: "Event has been created.",
            })
        }).finally(() => {
            navigate("/");
        })
    };

    const onError = (errors: FieldErrors<Greet>) => {
        console.log("Validation errors:", errors);
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div>
                        <input
                            type="text"
                            placeholder="Title"
                            className="input input-lg m-2"
                            {...register("title")}
                        />
                        {errors.title?.message}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Description"
                            className="input input-lg m-2"
                            {...register("description")}
                        />
                        {errors.description?.message}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Author"
                            className="input input-lg m-2"
                            {...register("author")}
                        />
                        {errors.author?.message}
                    </div>

                    <button
                        className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded m-2"}
                        type="submit">Submit</button>
                </form>
            </div>
            <Toaster />  
        </>
    );
}

export default CreateGreet;