import React, { useContext, useEffect, useState } from 'react';
import {IsValidUser, login_user_route} from '../Apis/IsvalidUser'

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { setActiveUser } from '../../context/UserReducer';
import { useDispatch } from 'react-redux';

const Signin = () => {
    // const [name, setname] = useState("");
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setloading] = useState(false)
    const Navigate = useNavigate();
    
    useEffect(()=>{
        const isvalid = async () => {
            const valid_user = await IsValidUser();
            console.log({valid_user});
            
            if(valid_user.status){
                Navigate('/home')
            }
        }
        isvalid()
    },[])
   
    const handlesubmit = async() => {
        setloading(true);
        if( email.length<2 || password.length<2){
            setloading(false)
            toast.warn("Each field must be at least 3 characters long.", {
                position: "top-right",
                autoClose: 2000,
            });
        }else{
            const resp = await login_user_route({email,password})
               
                const result = await resp.json()
                console.log({result});
                
                if(result.status==true){
                    console.log({result});
                    // console.log();
                    
                    // console.log(result.authToken);
                    // let AuthToken = result.authToken;
                    // let Name = result.Name;
                    // let email = result.email;
                    // let id = result._id;
                    localStorage.setItem("token",result.authToken)
                    setloading(false);

                        Navigate('/home') //navigate to home page
                
                }else{
                    toast.error("An error occurred during registration. Please try again.", { position: "top-right", autoClose: 2000 });

                    setloading(false);
                }
            }
    };

    const element = (
        <>
        <div style={{ backgroundColor: "red", width: "100vw", height: "80vh", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
        <div> <h1> Signin </h1></div>
    
    <div style={{ backgroundColor: "yellow", padding: "20px", borderRadius: "8px" }}>
   
    
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
    )
    return (
<>
    {loading? <div>...loading</div> : element }
</>
       
    );
}




export default Signin;
