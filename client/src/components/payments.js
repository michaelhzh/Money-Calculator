import React, {useState, useEffect} from "react";
import Payment from './payment'
import axios from "axios";


export default function Payments({refresh, setRefresh}) {
    const [paymentList,setPaymentList] = useState([]);
    const paymentComplete=(payer, payee)=>{
        axios.delete("/api/money/delete",{params:{payer:payer, payee, payee}})
        .then(console.log("successful delete sent"));
    }

    useEffect(() => {
        axios.get("/api/money/all")
        .then((res) => {
          setPaymentList(res.data)
          console.log(res.data);
          setRefresh(false);
        })
        .catch((err) => console.error(err));
    },[refresh]);


    return (
        <div>
            {paymentList.map(pay=>(
                <Payment pay={pay} paymentComplete={paymentComplete} setRefresh={setRefresh}/>
            ))}
        </div>
    );
}