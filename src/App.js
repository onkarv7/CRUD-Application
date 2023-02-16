import AddResourceForm from "./components/AddResourceForm";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/addresourse" element={<AddResourceForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
