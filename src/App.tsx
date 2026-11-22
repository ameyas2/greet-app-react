
import Navbar from "./components/Navbar.tsx";
import Routing from "./components/Routing.tsx";
import {Toaster} from "@/components/ui/toast.tsx";


function App() {


  return (
    <>
      <Navbar />
      <Routing />
      <Toaster />
    </>
  )
}

export default App
