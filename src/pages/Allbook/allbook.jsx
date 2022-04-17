import React, { useEffect, useState, useContext } from "react";
import styleCSS from "./allbook.module.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
import UnSubNav from "../../components/sidenav/unsub/unsubnav";
import SubNav from "../../components/sidenav/sub/subnav";
import { UserContext } from "../../context/userContext";

import AllBookSub from "../../components/allbook/sub/allbooksub";

const AllBookPage = () => {
    const [state, dispatch] = useContext(UserContext)
    const id = state.user.id
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
          <div className={styleCSS.allBookContent}>
            <div className={styleCSS.allBookSideNav}>
                {status && status.paymentStatus == "Approve" ? <SubNav /> : <UnSubNav />}
            </div>
            <div className={styleCSS.allBookRightContent}>
                <AllBookSub />
            </div>
          </div>
      )
}

export default AllBookPage