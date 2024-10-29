import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register_user_route } from '../Apis/IsvalidUser';

const Register = () => {
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const Navigate = useNavigate();
    const handlesubmit = async() => {
        // Handle the submit logic here
        if(name.length<2 || email.length<2 || password.length<2){
            // return toast.warn("lenth of each field greater than 5");
            toast.warn("Each field must be at least 3 characters long.", {
                position: "top-right",
                autoClose: 2000,
            });
            console.log("filed greater then 2",name)
        }else{
            console.log("submit")
            const resp = await register_user_route({name,email,password})
                const result = await resp.json()
                if(result.status==true){
                    //            res.json({status : true ,user_data ,auth_token})
                    
                    localStorage.setItem("token",result.auth_token)
                    Navigate('/')
                }else{
                    console.log(result)
                    
                }
            }
    };

    return (
        <> 
        <div style={{ backgroundColor: "red",  width: "100vw", height: "80vh",flexDirection:"column", display: "flex", justifyContent: "center", alignItems: "center" }}>
           <div  > <h1 > Register </h1></div>
            <div style={{ backgroundColor: "yellow", padding: "20px",   borderRadius: "8px", }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px"  }}>
                    <label style={{ width: "100px" }}>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setname(e.target.value)} 
                        style={{ marginLeft: "10px", flexGrow: 1 , }} 
                        />
                </div>

                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <label style={{ width: "100px" }}>Email:</label>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={{ marginLeft: "10px", flexGrow: 1 }} 
                        />
                </div>

                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <label style={{ width: "100px" }}>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={{ marginLeft: "10px", flexGrow: 1 }} 
                        />
                </div>

                <div>
                    <button onClick={handlesubmit}>Submit</button>
                </div>
            </div>
        </div>
                        </>
    );
}

export default Register;
