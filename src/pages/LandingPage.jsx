import React, { useState, useContext, useEffect } from "react"
import icon from "../assets/Icon.png"
import './LandingPage.css'
import { Modal,Form, InputGroup, Alert } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { API } from "../config/api"

const LandingPage = () => {
    const [showSignUp, setshowSignUp] = useState(false)
    const closeSignUp = () => {
        setshowSignUp(!showSignUp)
    }
    const [showSignIn, setshowSignIn] = useState(false)
    const closeSignIn = () => {
        setshowSignIn(!showSignIn)
    }
    const changeModal = () => {
        setshowSignUp(!showSignUp)
        setshowSignIn(!showSignIn)
    }
    const navigate = useNavigate()

    const [state, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(null);
    const [messega, setMessega] = useState(null)
    

    useEffect(() => {
        const checkAuth = () => {
            if (state.isLogin === true) {
                navigate("/dashboard");
            }
        }
    })

    // Start Register
    const [formRegister, setFormRegister] = useState({
        fullnameregister: "",
        emailregister: "",
        passwordregister: ""
    })

    const { fullnameregister, emailregister, passwordregister } = formRegister

    const handleChangeRegister = (e) => {
        setFormRegister({
          ...formRegister,
          [e.target.name]: e.target.value,
    })
    }

    const handleSubmitRegister = async(e) => {
        try {
            e.preventDefault()
            const configregister = {
                headers: {
                    "Content-Type" : "application/json"
                }
            }
            
            const bodyregister = JSON.stringify(formRegister)
            
            const response = await API.post('/register', bodyregister, configregister)
            
            if (response.data.status == "Success") {
                const alert = (
                  <Alert variant="success" className="py-1">
                    Success
                  </Alert>
                );
                setMessage(alert);
              } else {
                const alert = (
                  <Alert variant="danger" className="py-1">
                    Failed
                  </Alert>
                );
                setMessage(alert);
              }
              setFormRegister({
                fullname: "",
                email: "",
                password: ""
              })
        } catch (error) {
            console.log(error)
            const alert = (
                <Alert variant="danger" className="py-1">
                  Email or password already registered
                </Alert>
              );
              setMessage(alert);
        }
    }
    // End Register

    // Start Login
    const [formLogin, setFormLogin] = useState({
        emaillogin:"",
        passwordlogin:""
    })
    const { emaillogin, passwordlogin } = formLogin

    const handleLoginChange = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name] : e.target.value
        })
    }

    const handleLoginSubmit = async(e) => {
        try {
            e.preventDefault()
            const configlogin = {
                headers : {
                    "Content-Type" : "application/json"
                }
            }

            const bodylogin = JSON.stringify(formLogin)
            const response = await API.post('/login', bodylogin, configlogin)
            if (response?.status == 200) {
                // Send data to useContext
                dispatch({
                  type: "LOGIN_SUCCESS",
                  payload: response.data.data,
                });
            
            if (response.data.data.role == "user") {
                navigate("/dashboard");
                } else {
                navigate("/administrator");
                }
            }
        } catch (error) {
            console.log(error)
            const alert = (
                <Alert variant="danger" className="py-1">
                  Email or password is wrong
                </Alert>
              );
              setMessega(alert);
        }
    }
    // End Login

    return (
        <div className="body-landing">
            <div className="landing-content">
                <div className="landing-icon">
                    <img src={icon} />
                </div>            
                <div className="landing-text">
                    <p>Sign-up now and subscribe to enjoy all the cool and latest books - The best book rental service provider in Indonesia</p>
                </div>
                <div className="landing-button">
                    <div className="signup-button">
                        <button onClick={() => setshowSignUp(!showSignUp)}>Sign Up</button>
                    </div>
                    <div className="signin-button">
                        <button onClick={() => setshowSignIn(!showSignUp)}>Sign In</button>
                    </div>
                </div>
            </div>
            {/* Modal Sign Up */}
                <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showSignUp}
                onHide={closeSignUp}
                >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign Up
                    </Modal.Title>                    
                </Modal.Header>
                    {message && message}
                <Modal.Body>
                    <Form onSubmit={handleSubmitRegister}>
                    <InputGroup className="mb-3">
                        <Form.Control type="email" name="emailregister" value={emailregister} onChange={handleChangeRegister} className="signupinput" placeholder="Email" autoComplete="off"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control type="password" name="passwordregister" value={passwordregister} onChange={handleChangeRegister} className="signupinput" placeholder="Password" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control type="text" name="fullnameregister" value={fullnameregister} onChange={handleChangeRegister} className="signupinput" placeholder="Fullname" autoComplete="off"/>
                    </InputGroup>
                    <button className="signupbutton" type="submit" >Sign Up</button>
                    </Form>                    
                </Modal.Body>
                <Modal.Footer>
                    <p className="footer-text">Already have an account ? Klik <button onClick={changeModal} className="here-button">Here</button></p>
                </Modal.Footer>
                </Modal>
                {/* Sign In Modal */}
                <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showSignIn}
                onHide={closeSignIn}
                >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign In
                    </Modal.Title>                    
                </Modal.Header>
                {messega && messega}
                <Modal.Body>
                    <Form onSubmit={handleLoginSubmit}>
                    <InputGroup className="mb-3">
                        <Form.Control type="email" className="signupinput" placeholder="Email" name="emaillogin" value={emaillogin} onChange={handleLoginChange} autoComplete="off"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control type="password" className="signupinput" placeholder="Password" name="passwordlogin" value={passwordlogin} onChange={handleLoginChange}/>
                    </InputGroup>
                    <button className="signupbutton" type="submit" >Sign In</button>
                    </Form>                    
                </Modal.Body>
                <Modal.Footer>
                    <p className="footer-text">Already have an account ? Klik <button onClick={changeModal} className="here-button">Here</button></p>
                </Modal.Footer>
                </Modal>
        </div>
    )
}

export default LandingPage