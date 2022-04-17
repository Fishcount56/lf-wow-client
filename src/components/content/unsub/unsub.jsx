import React, { useEffect, useState, Component } from "react";
import styleCSS from "./unsub.module.css"
import book5 from "../../../assets/book5.png"
import book1 from "../../../assets/book1.png"
import book2 from "../../../assets/book2.png"
import book3 from "../../../assets/book3.png"
import book4 from "../../../assets/book4.png"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Modal } from "react-bootstrap";
import { API } from "../../../config/api";

const UnSubContent = () => {
    const [showNotification, setshowNotification] = useState(false)
    const closeNotification = () => {
        setshowNotification(!showNotification)
    }

    const [book, setBook] = useState([])

    useEffect(() => {
        let isUnmount = false
        const getBook = async() => {
            try {
                const response = await API.get('/books')
                if(!isUnmount){
                    setBook(response.data.Book)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getBook()
        return () => {
            isUnmount = true
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
                <h1>List Book</h1>
                <div className={styleCSS.bookList}>
                    {book.map((item, index) => (
                        <div className={styleCSS.bookSection} key={index}>
                            <img onClick={() => setshowNotification(!showNotification)} src={item.bookCover} />
                            <p className={styleCSS.bookTitle}>{item.title}</p>
                            <p className={styleCSS.bookAuthor}>{item.author}</p>
                        </div>
                    ))}
                </div>
            </div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showNotification}
                    onHide={closeNotification}
                    >
                    <Modal.Body>
                        <p className={styleCSS.notificationBody}>please make a payment to read the latest books</p>                    
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default UnSubContent