import React, { useState, useEffect, useContext } from "react";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import styleCSS from "./userprofile.module.css"
import SubNav from "../sidenav/sub/subnav";
import UnSubNav from "../sidenav/unsub/unsubnav";
import envelope from "../../assets/envelope.png"
import intersex from "../../assets/intersex.png"
import call from "../../assets/call.png"
import maps from "../../assets/maps.png"
import userDefault from "../../assets/user.png"
import { useNavigate } from "react-router-dom";
import book1 from "../../assets/book1.png"


const UserProfile = () => {
    const navigate = useNavigate()
    const gotoedit = () => {
        navigate('/edit-profile')
    }

    const bookdetails = (bid) => {
        navigate('/bookinformation/' + bid)
    }

    const [state, dispatch] = useContext(UserContext)
    const [status, setStatus] = useState({})
    let id = state.user.id
    const checkPaymentStatus = async(id) => {
        try {
            const response = await API.get('/transaction')
            setStatus(response.data.Transaction.Transaction.paymentStatus)
        } catch (error) {
            console.log(error)
        }
    }

    // Get profile user
    const [profile, setProfile] = useState({})
    const getProfile = async (id) => {
        try {
            const response = await API.get('/profile')
            setProfile(response.data.data.Profile)
        } catch (error) {
            console.log(error)
        }
    }

    // Get user booklist
    const [book, setBook] = useState({})
    const getBookList = async() => {
        try {
            const response = await API.get('/booklists')
            setBook(response.data.UserBooksList)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        checkPaymentStatus(id)
        getProfile(id)
    }, [])

    useEffect(() => {
        getBookList()
    }, [])

    return (
            <div className={styleCSS.profilecontent}>
                <div className={styleCSS.sidenav}>
                    {status == "Approve" ? <SubNav /> : <UnSubNav />}
                </div>
                <div className={styleCSS.usercontent}>
                    <h1>Profile</h1>
                    <div className={styleCSS.profilecard}>
                        <div className={styleCSS.identity}>
                            <div className={styleCSS.lefticon}>
                                <img src={envelope} alt="email" />
                                <div className={styleCSS.icondesc}>
                                    <p className={styleCSS.userdata}>{state.user.email}</p>
                                    <p className={styleCSS.template}>Email</p>
                                </div>
                            </div>
                            <div className={styleCSS.lefticon}>
                                <img src={intersex} alt="gender" />
                                <div className={styleCSS.icondesc}>
                                    <p className={styleCSS.userdata}>{profile.gender ? profile.gender : "-"}</p>
                                    <p className={styleCSS.template}>Gender</p>
                                </div>
                            </div>
                            <div className={styleCSS.lefticon}>
                                <img src={call} alt="phone" />
                                <div className={styleCSS.icondesc}>
                                    <p className={styleCSS.userdata}>{profile?.phoneNumber ? profile?.phoneNumber : "-"}</p>
                                    <p className={styleCSS.template}>Phone Number</p>
                                </div>
                            </div>
                            <div className={styleCSS.lefticon}>
                                <img src={maps} alt="address" />
                                <div className={styleCSS.icondesc}>
                                    <p className={styleCSS.userdata}>{profile?.address ? profile?.address : "-"}</p>
                                    <p className={styleCSS.template}>Address</p>
                                </div>
                            </div>
                        </div>
                        <div className={styleCSS.userphoto}>
                        <img src={profile?.userPhoto ? profile.userPhoto : userDefault} alt="User-Image" />
                            <button className="btn btn-danger" onClick={gotoedit}>Edit Profile</button>
                        </div>
                    </div>
                    <div className={styleCSS.userbooks}>
                        <h3>My Book List</h3>
                        <div className={styleCSS.bookList}>
                            {Object.keys(book).map((item, index) => (
                                <div className={styleCSS.userbooksection} key={index}>
                                    <img src={book1} onClick={() => bookdetails(book[item].BookOwned.id)} />
                                    <p className={styleCSS.ownedbooktitle}>{book[item].BookOwned.title}</p>
                                    <p className={styleCSS.ownedbookauthor}>{book[item].BookOwned.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default UserProfile