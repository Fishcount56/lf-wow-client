import React, { useEffect, useState } from "react";
import styleCSS from "./sub.module.css"
import book5 from "../../../assets/book5.png"
import book1 from "../../../assets/book1.png"
import book2 from "../../../assets/book2.png"
import book3 from "../../../assets/book3.png"
import book4 from "../../../assets/book4.png"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Modal } from "react-bootstrap";
import { API } from "../../../config/api";
import { useNavigate } from "react-router-dom";

const SubContent = () => {
    const navigate = useNavigate()
    const bookdetails = (bid) => {
        navigate('/bookinformation/' + bid)
    }

    const [book, setBook] = useState([])

    useEffect(() => {
        let isMount = false
        const getBook = async() => {
            try {
                const response = await API.get('/books')
                if (!isMount){
                    setBook(response.data.Book)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getBook()
        return () => {
            isMount = true
        }
    }, [])
    return (
        <div>
            <div className={styleCSS.firstSection}>
                <div className={styleCSS.leftSide}>
                    <p className={styleCSS.leftSideText}>subscribe now to access the entire book</p>
                </div>
                <div className={styleCSS.rightSide}>
                    <img src={book5} />
                </div>
            </div>
            <div className={styleCSS.secondSection}>
                <div className={styleCSS.sectionHeader}>
                    <h1>List Book</h1>
                    <p className={styleCSS.moreBookButton} onClick={() => navigate('/allbook')}>More Book</p>
                </div>
                <div className={styleCSS.bookList}>
                    {book && book?.map((item, index) => (
                        <div className={styleCSS.bookSection} key={index}>
                            <img src={item.bookCover} onClick={() => bookdetails(item.id)}/>
                            <p className={styleCSS.bookTitle}>{item.title}</p>
                            <p className={styleCSS.bookAuthor}>{item.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SubContent