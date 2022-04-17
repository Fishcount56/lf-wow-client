import React, { useContext } from "react";
import iconsm from "../../assets/iconsm.png"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Container, Row } from "react-bootstrap";
import styleCSS from './navbar.module.css'
import defaultuser from "../../assets/user.png"
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const [state, dispatch] = useContext(UserContext);
    let navigate = useNavigate()
    const headtoaddbook = () => {
        navigate('/addbook')
    }
    const headtoadministrator = () => {
        navigate('/administrator')
    }
    const logout = () => {
        console.log(state);
        dispatch({
          type: "LOGOUT",
        });
        navigate("/");
      };
    return(
        <nav>
            <div className={styleCSS.menus}>
                <div className={styleCSS.leftnavbar}>
                    <img src={iconsm} alt="iconsm" onClick={headtoadministrator}/>
                </div>
                <div className={styleCSS.rightnavbar}>
                    <div className={styleCSS.dropdown}>
                            <img src={defaultuser} className="btn dropdown-toggle" id="dropdownMenuLink" data-bs-toggle="dropdown"/>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li className={styleCSS.dropli}><a className={styleCSS.dropmenu} onClick={headtoaddbook}>Add Book</a></li>
                                <li className={styleCSS.dropli}><a className={styleCSS.dropmenu} onClick={logout}>Logout</a></li>
                            </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar