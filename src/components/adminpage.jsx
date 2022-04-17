import React from "react";
import { Container, Row } from "react-bootstrap";
import NavBar from "./navbar/navbar";
import TransactionTable from "./admin/transaction";
import { useQuery } from "react-query";
import { API } from "../config/api";

const AdminPage = () => {
    const { coba: transactions } = useQuery("transactionsCache", async () => {
        const config = {
          method: "GET",
          headers: {
            Authorization: "Basic " + localStorage.token,
          }
        }
        const response = await API.get("/transactions", config);
        return response.data;
    })

    return(
        <div style={{backgroundColor : "#F2F2F2", height : "100vh"}}>
            <NavBar />
            <TransactionTable />
        </div>
    )
}

export default AdminPage