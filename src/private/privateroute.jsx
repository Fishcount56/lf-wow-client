import React, { useState, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom"
import { UserContext } from "../context/userContext";

const PrivateRoute = () => {
    const [state, dispatch] = useContext(UserContext)
    const isAdmin = state.user.role
    
    return (
        <div>
            {isAdmin = "admin" ? <Outlet /> : <Navigate to='/LandingPage' />}
        </div>
    )
}

export default PrivateRoute