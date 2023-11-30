import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import { useSelector } from "react-redux";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<Layout />} />
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
