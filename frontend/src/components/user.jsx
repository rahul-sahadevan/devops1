import react, { useState } from 'react';
import "./counter.css"

import axios from 'axios'


const User = ()=>{
    const [user,setUser] = useState({})
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const handleSubmit = async () => {
        console.log("calling submit");

        // 1. Create the payload object directly from your input states
        const payload = {
            username,
            email,
            password
        };

        // 2. Keep this to update your local React state if needed elsewhere
        setUser(payload); 


        try{
            console.log(user)
            const response = await axios.post("http://localhost:3000/adduser",user,{
                withCredentials:true
            })
            console.log(response.data)

        }
        catch(error){
            console.log(error)
        }
    };


    console.log(user)





    return (
        <div className="user-container">
                <label>Username:</label>
                <input type='text' placeholder="Enter username" value={username} onChange={(e)=> setUsername(e.target.value)}></input>
                <label>Email:</label>
                <input type='email' placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                <label>Password:</label>
                <input type='password' placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                <button onClick={handleSubmit}>submit</button>
        </div>
    )
}


export default User