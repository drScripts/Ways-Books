import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function MainMiddleware() {
  const [state] = useContext(UserContext);

  const path = localStorage.getItem("path");

  if (state?.user?.role === "admin") {
    return <Navigate to={"/admin"} />;
  } else {
    if (state?.user?.role === "user" && path) {
      return <Navigate to={path} />;
    } else {
      return <Outlet />;
    }
  }
}
