import React, { useState, useContext, useEffect} from "react";
import UnSubNav from "./sidenav/unsub/unsubnav";
import SubNav from "./sidenav/sub/subnav";
import UnSubContent from "./content/unsub/unsub";
import './homepage.css'
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import SubContent from "./content/sub/sub";

const HomePage = () => {
    const [state, dispatch] = useContext(UserContext)
    let id = state.user.id
    const [status, setStatus] = useState({})
    
    useEffect(() => {
        let isUnmount = false
        const checkPaymentStatus = async(id) => {
            try {
                const response = await API.get('/transaction')
                if(!isUnmount) {
                    setStatus(response.data.Transaction.Transaction)
                }
            } catch (error) {
                console.log(error)
            }
        } 
        checkPaymentStatus(id)
        return () => {
            isUnmount = true
        }
      }, []);

    return (
        <div className="homepage-content">
            <div className="side-nav">
                {status && status.paymentStatus == "Approve" ? <SubNav /> : <UnSubNav />}
            </div>
            <div className="page-content">
                {status && status.paymentStatus == "Approve" ? <SubContent /> : <UnSubContent />}
            </div>
        </div>
    )
}

export default HomePage