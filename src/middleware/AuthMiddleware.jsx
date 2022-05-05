import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function AuthMiddleware() {
  const [state] = useContext(UserContext);

  if (state?.user) {
    localStorage.removeItem("path");
  }
  return state?.user ? <Outlet /> : <Navigate to={"/?login=no"} />;
}
