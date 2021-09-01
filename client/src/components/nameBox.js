import React, {useState}from 'react'

export default function NameBox({nameList, setNameList}){
    const [newName, setNewName] = useState("");
    return(
        <ul>
            <div>
                <label>
                    Who Owns You?
                </label>
                {nameList.map(name=>(
                    <form
                    key = {name}>
                        <label>{name}</label>
                        <input type='button' value={"delete"} onClick={e=>{
                        let newNameList = [...nameList];
                        let index = newNameList.indexOf(name);
                        newNameList.splice(index,1);
                        setNameList(newNameList)
                    }}/>
                    </form>

                ))}
            </div>
            <form>
                <input type='text' value ={newName} onChange={e=>setNewName(e.target.value)}/>
                <input type="button" value={"save"} onClick={e=>{
                    e.preventDefault();
                    setNameList(arr=>[...arr, newName]);
                    setNewName("");
                }}
                />
            </form>

        </ul>
    );
}