import React, {useState, useEffect} from "react";
import Payments from '../components/payments';
import MoneyInput from '../components/moneyInput';


export default function HomePage() {
    const [refresh, setRefresh] = useState(true);
    return (
    <div>
        <MoneyInput setRefresh = {setRefresh}/>
        <Payments refresh = {refresh} setRefresh = {setRefresh}/>
    </div>);
}