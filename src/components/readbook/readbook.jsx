import React, { useState, useEffect, useContext } from "react";
import styleCSS from "./readbook.module.css"
import { API } from "../../config/api";
import { ReactReader, ReactReaderStyle } from "react-reader"
import iconsm from "../../assets/iconsm.png"
import { useNavigate, useParams } from "react-router-dom";

const ReadBook = () => {
    const ownStyles = {
        ...ReactReaderStyle,
        readerArea: {
          ...ReactReaderStyle.readerArea,
          width: '90%',
          height: '90%',
          marginRight: 'auto',
          marginLeft: 'auto'
        },
        tocArea: {
            ...ReactReaderStyle.tocArea,
            height: '90%',
            marginLeft: '5%',
            marginTop: '8.6%',
          }
      }

    const navigate = useNavigate()
    const backtodashboard = () => {
        navigate('/dashboard')
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

    useEffect(() => {
        getBook(bid)
    }, [])

    return (
        <div className={styleCSS.readbookcontent}>
            <img src={iconsm} onClick={() => {backtodashboard()}}/>
            <div style={{ height: "100vh" }}>
            <ReactReader
                url={dataBook?.bookFile}
                styles={ownStyles}
            />
            </div>
        </div>
    )
}

export default ReadBook