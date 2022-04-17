import React, {useState, useEffect, useContext} from "react";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import styleCSS from "./subscribe.module.css"
import SubNav from "../sidenav/sub/subnav";
import UnSubNav from "../sidenav/unsub/unsubnav";
import { useNavigate } from "react-router-dom";

const SubsPage = () => {
    const [state, dispatch] = useContext(UserContext)
    const [status, setStatus] = useState({})
    const [containProof, setContainProof] = useState({})
    let id = state.user.id
    const checkPaymentStatus = async(id) => {
        try {
            const response = await API.get('/transaction')
            setContainProof(response.data.Transaction.Transaction.transferProof)
            setStatus(response.data.Transaction.Transaction.paymentStatus)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        checkPaymentStatus(id);
    }, []); 

    // Request Transaction
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null)
    const [reqForm, setReqForm] = useState({
        transferProof: ""
    })

    const handleChange = (e) => {
        setReqForm({
          ...reqForm,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        })

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
            }

            const formData = new FormData()
            formData.set("transferProof", reqForm.transferProof[0], reqForm.transferProof[0].name)

            const response = await API.post('/transaction', formData, config)
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styleCSS.subspageparents}>
            <div className="side-nav">
                {status == "Approve" ? <SubNav /> : <UnSubNav />}
            </div>
            <div className={styleCSS.rightsidesubs}>
                {status == "Approve" ? 
                <div className={styleCSS.rightsideform}>
                    <h3>Premium</h3>
                    <p>Pay now and access all the latest books from WOW</p>
                    <form>
                    <input type="text" class="form-control" id="accountnumber" placeholder="Input Your Account Number" />
                    {containProof && (
                        <div>
                            <img src={containProof} 
                            style={{
                                maxWidth: "150px",
                                maxHeight: "150px",
                                objectFit: "cover"
                            }} alt="containProof" />
                        </div>
                    )}
                    <input type="file" class="form-control" id="transferProof" />
                    <button className="btn btn-danger" disabled>Send</button>
                    </form>
                </div>
                : status == "Pending" ? 
                <div className={styleCSS.rightsideform}>
                    <h3>Premium</h3>
                    <p>Pay now and access all the latest books from WOW</p>
                    <form onSubmit={handleSubmit}>
                    <input type="text" class="form-control" id="accountnumber" placeholder="Input Your Account Number" />
                    {containProof && (
                        <div>
                            <img 
                                src={containProof}
                                style={{
                                    maxWidth: "150px",
                                    maxHeight: "150px",
                                    objectFit: "cover"
                                }}
                                alt="preview"
                            />
                        </div>
                    )}
                    <input type="file" class="form-control" id="transferProof" name="transferProof" onChange={handleChange}/>
                    <button type="submit" className="btn btn-danger" disabled>Send</button>

                    </form>
                </div>
                :
                <div className={styleCSS.rightsideform}>
                    <h3>Premium</h3>
                    <p>Pay now and access all the latest books from WOW</p>
                    <form onSubmit={handleSubmit}>
                    <input type="text" class="form-control" id="accountnumber" placeholder="Input Your Account Number" />
                    <input type="file" class="form-control" id="transferProof" name="transferProof" onChange={handleChange}/>
                    <button type="submit" className="btn btn-danger">Send</button>
                    </form>
                </div>
                }
            </div>
        </div>
    )
}


export default SubsPage