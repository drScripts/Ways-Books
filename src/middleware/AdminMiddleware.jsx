import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function AdminMiddleware() {
  const [state] = useContext(UserContext);

  return state?.user?.role === "admin" ? <Outlet /> : <Navigate to={"/"} />;
}
