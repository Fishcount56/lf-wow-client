import React, { useState, useContext} from "react";
import { UserContext } from "../../context/userContext";
import styleCSS from "./addbook.module.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { useQuery, useMutation } from "react-query";
import NavBar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";

import { API } from "../../config/api";


const AddBookAdmin = () => {
    const navigate = useNavigate()
    const isNotAdmin = () => {
        navigate('/dashboard')
    }
    const [state, dispatch] = useContext(UserContext)
    const isAdmin = state.user.role

    // Start Add Book
    const [reqForm, setReqForm] = useState ({
        title: "",
        publicationDate: "",
        pages: "",
        author: "",
        isbn: "",
        about: "",
        bookFile: "",
        // bookCover: ""
    })

    const handleChange = (e) => {
        setReqForm({
            ...reqForm,
            [e.target.name] : e.target.value,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            }

            // const bodyregister = JSON.stringify(reqForm)
            const formData = new FormData()
            formData.set("title", reqForm.title)
            formData.set("publicationDate", reqForm.publicationDate)
            formData.set("pages", reqForm.pages)
            formData.set("author", reqForm.author)
            formData.set("isbn", reqForm.isbn)
            formData.set("about", reqForm.about)
            formData.set("bookFile", reqForm.bookFile[0], reqForm.bookFile[0].name)
            formData.set("bookCover", reqForm.bookCover[0], reqForm.bookCover[0].name)

            const response = await API.post("/book", formData, config)
            console.log(response)
            navigate("/administrator")
        } catch (error) {
            console.log(error)
        }
    }


 
    return(
        <div className={styleCSS.addbookContent}>
            {isAdmin == "admin" ? 
            <div className={styleCSS.addbookparents}>
            <NavBar />
            <div className={styleCSS.contentaddform}>
                <h1>Add Book</h1>
                <form className={styleCSS.addform} onSubmit={handleSubmit}>
                        <label>Book Title</label>
                        <input type="text" name="title" className="form-control" onChange={handleChange}  placeholder="title" />
                        <label>Publication Date</label>
                        <input type="date" name="publicationDate" className="form-control" onChange={handleChange}  placeholder="Publication Date" />
                        <label>Book Pages</label>
                        <input type="text" name="pages" className="form-control" onChange={handleChange}  placeholder="Pages" />
                        <label>Book Author</label>
                        <input type="text" name="author" className="form-control" onChange={handleChange}  placeholder="Author" />
                        <label>ISBN</label>
                        <input type="text" name="isbn" className="form-control" onChange={handleChange}  placeholder="ISBN" />
                        <label>Book Description</label>
                        <textarea name="about" rows="10" onChange={handleChange}>About the book</textarea>
                        <label>Book File</label>
                        <input type="file" name="bookFile" className="form-control" id="bookFile" onChange={handleChange} accept=".epub"/>
                        <label>Book Cover</label>
                        <input type="file" name="bookCover" className="form-control" id="bookFile" onChange={handleChange} accept="image/*"/>
                    <button type="submit" className="btn btn-danger">Add Book</button>
                </form>
            </div>
        </div> : 
        isNotAdmin()
        }
        </div>
    )
}

export default AddBookAdmin