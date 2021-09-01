import React, { useState, useEffect } from "react";
import NameBox from './nameBox';
import axios from "axios";


export default function MoneyInput({setRefresh}) {
  const [userName, setUserName] = useState("");
  const [moneyValue, setMoneyValue] = useState(0);
  const [nameList, setNameList] = useState([]);
  const submitValue = ()=>{
    const sendPost = {params:{names: nameList, owner: userName, amount: moneyValue}};
    console.log(nameList);
    console.log(userName);
    console.log(moneyValue);
    axios.get("/api/money/upload", sendPost)
    .then(res => {
      if(res.data.state == "success"){
        console.log("success see if rerender");
        setRefresh(true);
        setNameList([]);
        setMoneyValue([0]);
        setUserName("");
      }
      else{
        alert("The information did not get uploaded please try again")
      }
    })
  }

  return (
    <div>
      <br/>
      <form>
        <label>What is Your Name</label>
          <br/>
          <input type='Text'
            onChange={(event) => {
                setUserName(event.target.value);
              }
          }/>
        
      </form>
      <form>
        <label>How Much</label>
        <br/>
        <input type='number'
          onChange={(event) => {
              setMoneyValue(event.target.value);
            }
          }/>

      </form>

      <NameBox nameList={nameList} setNameList={setNameList}/>
      <button onClick={submitValue}>Submit</button>
    </div>
  );
}
