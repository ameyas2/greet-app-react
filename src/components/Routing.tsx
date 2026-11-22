import {Route, Routes} from "react-router";
import CreateGreet from "./CreateGreet.tsx";
import EditGreet from "./EditGreet.tsx";
import Greet from "./Greets.tsx";
import PageNotFound from "./PageNotFound.tsx";

const Routing = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Greet />} />
                <Route path="/create" element={<CreateGreet />} />
                <Route path="/edit/:id" element={<EditGreet />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default Routing;