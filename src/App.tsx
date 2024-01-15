import { Route, Routes } from "react-router-dom";
import "./App.css";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import Home from "./_root/pages/Home";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* PUBLIC */}
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
        {/* PRIVATE */}
        <Route index element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
