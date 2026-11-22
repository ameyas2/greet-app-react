import {z} from "zod";
import {useNavigate, useParams} from "react-router";
import type {GreetRequestDTO} from "../model/GreetRequestDTO.tsx";
import {type FieldErrors, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {Greet} from "../model/Greet.tsx";
import {getGreetById, updateGreet} from "../service/greetService.tsx";
import {useEffect, useState} from "react";

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

const EditGreet = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [greet, setGreet] = useState<Greet>();

    console.log(id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<GreetRequestDTO>({
        resolver: zodResolver(schema)
    });



    const onSubmit = (data: GreetRequestDTO) => {
        if (!greet) return;

        const updatedGreet: Greet = {
            ...greet,
            ...data
        };

        console.log("Form submitted successfully!");
        console.log(updatedGreet);
        updateGreet(updatedGreet).then((response: Greet) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            navigate("/");
        })
    };

    const getGreet = async (id: string) => {
        if (!id) return;
        await getGreetById(id).then(response => {
            //console.log(response);
            setGreet(response);

            // Populate form fields
            reset({
                title: response.header || response.title || "",
                description: response.description,
                author: response.author
            });
        }).catch(error => {
            console.error("Error getting Greet with id : " + id + " " + error);
        }).finally(() => {

        });
    }

    const onError = (errors: FieldErrors<Greet>) => {
        console.log("Validation errors:", errors);
    };

    useEffect(() => {
        if (id) {
            getGreet(id);
        }
    }, [id, ])

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
        </>
    );
}

export default EditGreet;
