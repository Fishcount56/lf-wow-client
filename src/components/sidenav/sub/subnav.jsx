import React, {useContext, useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import iconsm from '../../../assets/iconsm.png'
import eclipse from '../../../assets/eclipse.png'
import user1 from '../../../assets/user1.png'
import bill1 from '../../../assets/bill1.png'
import logout1 from '../../../assets/logout1.png'
import styleModule from './subnav.module.css'
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import userDefault from "../../../assets/user.png"
import { API } from "../../../config/api";

const SubNav = () => {
    const [state, dispatch] = useContext(UserContext);
    const navigate = useNavigate()
    const logout = () => {
        console.log(state);
        dispatch({
          type: "LOGOUT",
        });
        navigate("/");
    };
    
    const backtohome = () => {
        navigate('/dashboard')
    }

    const [profile, setProfile] = useState([])
    let id = state.user.id
    const getProfile = async (id) => {
        try {
            const response = await API.get('/profile')
            setProfile(response.data.data.Profile)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let isMount = false
        const getProfile = async (id) => {
            try {
                const response = await API.get('/profile')
                if(!isMount){
                    setProfile(response.data.data.Profile)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getProfile(id)
        return () => {
            isMount = true
        }
    }, [])
    return (
        <nav>
            <div className="unsub-content-parent">
                <div className={styleModule.contentchild}>
                    <div className={styleModule.navicon}>
                        <img onClick={backtohome} src={iconsm} />
                    </div>
                    {(profile && state) ? 
                    <div className={styleModule.displayprofile}>
                        <img src={profile?.userPhoto ? profile.userPhoto : userDefault} alt="User-Image" />
                        <p className={styleModule.username}>{state.user.name}</p>
                        <p className={styleModule.usernot}>Subscribed</p>
                    </div>
                    : <div>Loading...</div>}
                        <hr />
                        <ul>
                            <li>
                                <img src={user1} /><Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <img src={bill1} /><Link to="/subspage">Subscribe</Link>
                            </li>
                        </ul>
                        <hr />
                        <ul>
                            <li>
                                <img src={logout1} /><Link to="/" onClick={logout}>Logout</Link>
                            </li>
                        </ul>
                </div>
            </div>
        </nav>
    )
}

export default SubNav