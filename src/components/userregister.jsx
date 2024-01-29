import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup';

export function UserRegister(){

const [users,setUser]=useState([{user_id:'',user_name:'',password:'',email:'',mobile:0}])
const [error,setError]=useState('')
let navigate=useNavigate();

//initially load all users
useEffect(()=>{
    axios.get('http://127.0.0.1:4400/user')
    .then(response=>{
        setUser(response.data)
    })
},[])

//formik 
const formik=useFormik({
    initialValues:{
        user_id:'',
        user_name:'',
        password:'',
        email:'',
        mobile:0
    },
    validationSchema:yup.object({
        user_name:yup.string().required("Username required").min(4, "Name too short"),
        password:yup.string().required('Password required').max(10,'Choose short password'),
        mobile:yup.number().required("Mobile number required")
    }),
    onSubmit:(user)=>{
        axios.post(`http://127.0.0.1:4400/adduser`,user)
        alert("Registered successfully...")
        navigate("/userlogin")
    }
})
    // check user id already exists or not
    function checkUser(e){
        for(var user of users){
            if(user.user_id===e.target.value){
                setError("User id already taken - choose another")
                break; 
            }
            else{
                setError(" ")
            }
        }
    }

    return(
        <div className="shade text-white">
            <h2 className="ms-5">Register User</h2>
            <form onSubmit={formik.handleSubmit} className="w-25 ms-5">
                <dl>
                    <dt>User Id</dt>
                    <dd>
                        <input type="text" className="form-control" onKeyUp={checkUser} placeholder="Enter User Id" name="user_id" onChange={formik.handleChange}/>
                    </dd>
                    <dd className="text-warning">{error}</dd>
                    <dt>User Name</dt>
                    <dd>
                        <input type="text" className="form-control" placeholder="Enter User Name" name="user_name"onChange={formik.handleChange}/>
                    </dd>
                    <dd className="text-warning">{formik.errors.user_name}</dd>
                    <dt>Password</dt>
                    <dd>
                        <input type="password" className="form-control" placeholder="Enter Password" name="password"onChange={formik.handleChange}/>
                    </dd>
                    <dd className="text-warning">{formik.errors.password}</dd>
                    <dt>Email</dt>
                    <dd>
                        <input type="email" className="form-control" placeholder="Enter Email Address" name="email"onChange={formik.handleChange}/>
                    </dd>
                    <dt>Mobile</dt>
                    <dd>
                        <input type="number" className="form-control" placeholder="Enter Phone Number" name="mobile"onChange={formik.handleChange}/>
                    </dd>
                    <dd className="text-warning">{formik.errors.mobile}</dd>

                </dl>
                <div>
                    <button className="btn btn-primary">
                        Register
                    </button>
                    <Link to="/">
                    <button className="btn btn-danger ms-2">Cancel</button></Link>
                </div>
            </form>
        </div>
    )
}