import { Route, Routes } from "react-router-dom"
import { Homepage } from "./components/HomePage"
import { NavBar } from "./components/NavBar"
import { Songs } from "./pages/Songs"
import { CreateSong } from "./pages/CreateSong"
import { Upload } from "./pages/Upload"
import { Signup } from "./pages/Signup"
import { Login } from "./pages/Login"
import { RequireAuth } from "./components/ProtectedRoute"

export const App = () => {

  return (
    <Routes>
      <Route element = {<NavBar />}>
        <Route path="/" element = {<Homepage />} />
        <Route path="/songs" element = {<Songs />} />
        <Route path="/signup" element = {<Signup />} />
        <Route path="/login" element = {<Login />} />
        <Route element = {<RequireAuth />}>
          <Route path="/create-song" element = {<CreateSong />} />
          <Route path="/upload" element = {<Upload />} />
        </Route>

      </Route>
    </Routes>
  )
}
