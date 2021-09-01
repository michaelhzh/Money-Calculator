import React, { useState} from "react";

export default function Payment({pay, paymentComplete, setRefresh}) {

    return (
        <div>
            <h3>{pay.payer} {"===>"}{pay.payee}</h3>
            <h2>{pay.amount}</h2>
            <button onClick={()=> {
                paymentComplete(pay.payer, pay.payee);
                setRefresh(true);}}> 
            PAID!!!</button>
        </div>
    );
}