import React, { useContext, useEffect, useState} from "react";
import styleCSS from "./viewbook.module.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import SubNav from "../sidenav/sub/subnav";
import UnSubNav from "../sidenav/unsub/unsubnav";
import coverbig from "../../assets/book4bg.png"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ViewBook = () => {
    const navigate = useNavigate()
    const gotoread = (bid) => {
        navigate('/readbook/' + bid)
    }
    const [state] = useContext(UserContext)
    let uid = state.user.id
    const [status, setStatus] = useState({})
    const checkPaymentStatus = async(uid) => {
        try {
            const response = await API.get('/transaction')
            setStatus(response.data.Transaction.Transaction.paymentStatus)
        } catch (error) {
            console.log(error)
        }
    }

    let { bid } = useParams()
    const [dataBook, setDataBook] = useState({})

    const getBook = async(id) => {
        try {
            const response = await API.get("/book/" + id)
            setDataBook(response.data.Book)
        } catch (error) {
            console.log(error)
        }
    }

    const addBookForUser = async (e) => {
        try {
            const config = {
                headers: {
                    Authorization: "Basic " + localStorage.token
                }
            }
            const response = await API.post('/booklist/' + bid, config)
            navigate('/profile')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkPaymentStatus(uid)
        getBook(bid)
    }, [])

    console.log(dataBook)
    return (
        <div className={styleCSS.viewbookcontent}>
            <div className={styleCSS.sidenav}>
                {status == "Approve" ? <SubNav /> : <UnSubNav />}
            </div>
            <div className={styleCSS.bookcontent}>
                <div className={styleCSS.firstbooksection}>
                    <div className={styleCSS.bookcoverimage}>
                        <img src={dataBook?.bookCover} />
                    </div>
                    <div className={styleCSS.bookinformation} >
                        <p className={styleCSS.booktitle}>{dataBook?.title}</p>
                        <p className={styleCSS.bookauthor}>{dataBook?.author}</p>
                        <p className={styleCSS.bookmarks}>Publication Date</p>
                        <p className={styleCSS.bookdatas}>{dataBook?.publicationDate}</p>
                        <p className={styleCSS.bookmarks}>Pages</p>
                        <p className={styleCSS.bookdatas}>{dataBook?.pages}</p>
                        <p className={styleCSS.bookmarksred}>ISBN</p>
                        <p className={styleCSS.bookdatas}>{dataBook?.isbn}</p>
                    </div>
                </div>
                <div className={styleCSS.booksecondsection}>
                    <p className={styleCSS.bookdescription}>About This Book</p>
                    <p className={styleCSS.aboutthisbook}>{dataBook?.about}</p>
                </div>
                <div className={styleCSS.bookbuttons}>
                    <button className="btn btn-secondary" onClick={() => addBookForUser(dataBook?.id)}>Add book to list</button>
                    <button className="btn btn-danger" onClick={() => gotoread(dataBook?.id)}>Read Book</button>
                </div>
            </div>
        </div>
    )
}

export default ViewBook