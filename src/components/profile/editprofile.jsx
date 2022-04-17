import React, { useState, useEffect, useContext} from "react";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import styleCSS from "./editprofile.module.css"
import SubNav from "../sidenav/sub/subnav";
import UnSubNav from "../sidenav/unsub/unsubnav";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const navigate = useNavigate()
    const [state] = useContext(UserContext)
    const [photoPreview, setPhotoPreview] = useState(null)
    const [profile, setProfile] = useState({})
    const [profileForm, setProfileForm] = useState({
        gender: "",
        phoneNumber : "",
        address: "",
        userPhoto: ""
    })
    let id = state.user.id
    const getProfile = async (id) => {
        try {
            const response = await API.get('/profile')
            setPhotoPreview(response.data.data.userPhoto)
            setProfileForm({
                ...profileForm,
                gender: response.data.data.gender,
                phoneNumber: response.data.data.phoneNumber,
                address: response.data.data.address
            })
            setProfile(response.data.data.Profile)
        } catch (error) {
            console.log(error)
        }
    }

    const [status, setStatus] = useState({})
    const checkPaymentStatus = async(id) => {
        try {
            const response = await API.get('/transaction')
            setStatus(response.data.Transaction.Transaction.paymentStatus)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setProfileForm({
           ...profileForm,
           [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        })

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0])
            setPhotoPreview(url)
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    Authorization: "Basic " + localStorage.token,
                    "Content-Type" : "multipart/form-data",
                }
            }

            const formData = new FormData()
            if (profileForm.userPhoto) {
                formData.set("userPhoto", profileForm?.userPhoto[0], profileForm?.userPhoto[0].name)
            }
            formData.set("gender", profileForm.gender)
            formData.set("phoneNumber", profileForm.phoneNumber)
            formData.set("address", profileForm.address)

            const response = await API.patch("/editprofile", formData, config)
            navigate('/profile')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile(id)
        checkPaymentStatus(id)
    }, [])
    console.log(profile)
    return (
        <div className={styleCSS.profilecontent}>
                <div className={styleCSS.sidenav}>
                    {status == "Approve" ? <SubNav /> : <UnSubNav />}
                </div>
                <div className={styleCSS.usercontent}>
                    <h1>Edit Profile</h1>
                    <div className={styleCSS.formedit}>
                        <form onSubmit={handleSubmit}>
                        <label>Gender</label>
                            <select className="form-select" name="gender" onChange={handleChange}>
                                <option selected disabled>Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <label>Phone Number</label>
                            <input type="text" className="form-control" name="phoneNumber" placeholder={profile.phoneNumber} onChange={handleChange}/>
                            <label>Address</label>
                            <input type="text" className="form-control" name="address" placeholder={profile.address} onChange={handleChange}/>
                            <label>Photo</label>
                            {photoPreview && (
                                <div>
                                    <img src={photoPreview} style={{maxWidth: "200px", maxHeight: "150px", objectFit: "cover"}} />
                                </div>
                            )}
                            <input className="form-control" type="file" name="userPhoto" onChange={handleChange}/>
                            <button type="submit" className="btn btn-danger">Edit Profile</button>
                        </form>
                    </div>
                </div>
            </div>
    )
}


export default EditProfile