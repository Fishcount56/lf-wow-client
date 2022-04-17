import React, { useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import styleCSS from "./transaction.module.css"
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";
import { DropdownButton, Dropdown } from "react-bootstrap"
import UpdateData from "../modal/update/UpdateData";

export default function TransactionTable()  {
    // declare transaction with useState
    const [transactions, setTransactions] = useState([])

    let isMounted = false

    // get transactions data from database
    const getTransactions = async () => {
        try {
            const response = await API.get('/transactions')
            if(!isMounted){
                setTransactions(response.data.transactions)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        
        if(!isMounted){
            getTransactions()
        }
        return () => {
            isMounted = true
        }
    }, [])

    // Update Transaction
    const [idUpdate, setIdUpdate] = useState(null)
    const [confirmUpdate, setConfirmUpdate] = useState(null)

    const [showUpdate, setShowUpdate] = useState(false)
    const handleCloseUpdate = () => setShowUpdate(false)
    const handleShowUpdate = () => setShowUpdate(true)

    const updateTransaction = async (id) => {
        try {
            await API.patch(`/updatetransaction/${id}`)
            getTransactions()
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = (id) => {
        setIdUpdate(id)
        handleShowUpdate()
    }

    useEffect(() => {
        handleCloseUpdate()
        updateTransaction(idUpdate)
        setConfirmUpdate(null)
    }, [confirmUpdate])

    return (
        <>
        <div className={styleCSS.tableparent}>
            <h2>Incoming Transaction</h2>
            {transactions?.length !== 0 ? (
                <table className="table table-striped">
                <thead className={styleCSS.tableheadcontent}>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Users</th>
                        <th scope="col">Bukti Transfer</th>
                        <th scope="col">Remain Active</th>
                        <th scope="col">Status User</th>
                        <th scope="col">Status Payment</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody className={styleCSS.tablebodycontent}>
                    {transactions?.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1 }</td>
                            <td>{item.User.fullname}</td>
                            <td><img src={item.transferProof} style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover"
                            }} /> </td>
                            <td>{item.remainActive}</td>
                            <td>{item.userStatus}</td>
                            <td>{item.paymentStatus}</td>
                            <td>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => {handleUpdate(item.id)}} className={styleCSS.approve}>Approve</Dropdown.Item>
                                    <Dropdown.Item className={styleCSS.cancel}>Cancel</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            ) : (
                <h2>No Data</h2>
            )}
            <UpdateData setConfirmUpdate={setConfirmUpdate} show={showUpdate} handleCloseUpdate={handleCloseUpdate}/>
        </div>
        </>
    )
}