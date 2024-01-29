import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { Link } from "react-router-dom";

export function UserLogin(){

    let navigate=useNavigate();
    const [user,setUser]=useState([{user_id:'',user_name:'',password:'',email:'',mobile:0}])
    const [cookie,setCookie]=useCookies('uname')
    const [error, setError]=useState('')

    const formik=useFormik({
        initialValues:{
            user_id:'',
            password:''
        },
        onSubmit: (values)=>{
            var usr = user.find(item=> item.user_id===values.user_id);
          
            if(usr.password==values.password){
                setCookie("uname", usr.user_name);
                navigate("/userdashboard");
            } else {
                setError("Invalid Credentials");
            }
        }
    })
    
    useEffect(()=>{
        axios.get("http://127.0.0.1:4400/user")
        .then(response=>{
            setUser(response.data)
        })
    },[])

    return(
        
            <div className="shade text-white">
            <h2 className="ms-5">User Login</h2>
            <form onSubmit={formik.handleSubmit} className="w-25 ms-5">
                <dl>
                    
                    <dt>User Id</dt>
                    <dd>
                        <input type="text" className="form-control" placeholder="Enter user id" name="user_id" onChange={formik.handleChange}/>
                    </dd>
                    <dt>Password</dt>
                    <dd>
                        <input type="password" className="form-control" placeholder="Enter Password" name="password"onChange={formik.handleChange}/>
                    </dd>
                    
                </dl>
                <div>
                    <p className="text-warning">{error}</p>
                </div>
                <div>
                    <button className="btn btn-primary">
                        Login
                    </button>
                    <Link to="/">
                    <button className="btn btn-danger ms-2">Cancel</button></Link>
                </div>
            </form>
            <div className="fw-semibold fs-6 ms-5 mt-2">
                    <span className="me-2">Not an user?</span><Link to="/userregister">Register here</Link>
                    </div>
        </div>
            
       
    )
}