import { Route, Routes } from "react-router-dom";
import "./App.css";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import Home from "./_root/pages/Home";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "./components/ui/sonner";
import Explore from "./_root/pages/Explore";
import Activity from "./_root/pages/Activity";
import Profile from "./_root/pages/Profile";
import Settings from "./_root/pages/Settings";
import Post from "./_root/pages/Post";

function App() {
  return (
    <main className="h-full font-poppins text-gray-900">
      <Routes>
        {/* PUBLIC */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        {/* PRIVATE */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/post/:id" element={<Post />} />
        </Route>
      </Routes>
      <Toaster position="top-center" expand />
    </main>
  );
}

export default App;
