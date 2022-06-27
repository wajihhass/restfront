import React from "react"
import { useContext } from 'react'

import { CurrentUser } from './contexts/CurrentUser';
import { useNavigate } from "react-router";

function Navigation() {

       const navigate = useNavigate()
    const { currentUser } = useContext(CurrentUser)

    let loginActions = (
        <>
            <li style={{ float: 'right' }}>
                <a href="#" onClick={() => navigate("/sign-up")}>
                    Sign Up
                </a>
            </li>
            <li style={{ float: 'right' }}>
                <a href="#" onClick={() => navigate("/login")}>
                    Login
                </a>
            </li>
        </>
    )

    if (currentUser) {
        loginActions = (
            <li style={{ float: 'right' }}>
                Logged in as {currentUser.firstName} {currentUser.lastName}
            </li>
        )
    }
    let addPlaceButton = null

    if (currentUser?.role === 'admin') {
        addPlaceButton = (
            <li>
                <a href="#" onClick={() => navigate("/places/new")}>
                    Add Place
                </a>
            </li>
        )
    }

    return (
        <nav>
            <ul>
                <li>
                    <a href="#" onClick={() => navigate("/")}>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => navigate("/places")}>
                        Places
                    </a>
                </li>                  
                {addPlaceButton}
                {loginActions}
            </ul>
        </nav>
    )
}

export default Navigation;


