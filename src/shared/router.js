import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Router = () => {
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  // const navigate = useNavigate();
  // console.log(isLoggedIn);
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, [isLoggedIn]);
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route
              path="/detail/:id"
              element={<Navigate replace to="/login" />}
            />
            <Route path="/profile" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
