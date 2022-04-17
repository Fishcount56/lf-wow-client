import React, { useContext,  useEffect }from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LandingPage from "../src/pages/LandingPage";
import { UserContext } from './context/userContext'
import { API, setAuthToken } from './config/api'


import HomePage from "./components/homepage";
import AdminPage from "./components/adminpage";
import AddBookAdmin from "./components/admin/addbook";
import SubsPage from "./components/subs/subscribe";
import UserProfile from "./components/profile/userprofile";
import EditProfile from "./components/profile/editprofile";
import ViewBook from "./components/book/viewbook";
import ReadBook from "./components/readbook/readbook";
import AllBookPage from "./pages/Allbook/allbook";

if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

const App = () => {
    const [state, dispatch] = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
      if (!state.isLogin) {
        navigate("/landingpage")
      } else {
        if (state.user.role == "admin") {
          setAuthToken(localStorage.token)
          navigate("/administrator")
        } else if (state.user.role == "user") {
          setAuthToken(localStorage.token)
          navigate("/dashboard")
        }
      }
    }, [state])
    
    const checkUser = async () => {
      try {
        const response = await API.get('/checkauth')
  
        if (response.status == 404) {
          dispatch({
            type: "AUTH_ERROR"
          })
        }
  
        let payload = response.data.data.user
        payload.token = localStorage.token
  
        dispatch({
          type: "USER_SUCCESS",
          payload
        })
  
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      checkUser()
    }, [])
    return(
          <Routes>
              <Route exact path='/' element={<LandingPage />}/>
              <Route path='/landingpage' element={<LandingPage />}/>
              <Route path='/dashboard' element={<HomePage />}/>
              <Route path='/administrator' element={<AdminPage />}/>
              <Route path='/addbook' element={<AddBookAdmin />}/>
              <Route path='/subspage' element={<SubsPage />}/>
              <Route path='/profile' element={<UserProfile />}/>
              <Route path='/edit-profile' element={<EditProfile />}/>
              <Route path='/bookinformation/:bid' element={<ViewBook />}/>              
              <Route path='/readbook/:bid' element={<ReadBook />}/>              
              <Route path='/allbook' element={<AllBookPage />}/>              
          </Routes>

    )
}

export default App