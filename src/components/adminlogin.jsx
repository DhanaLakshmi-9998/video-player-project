import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export function AdminLogin(){

    const [admin,setAdmin]=useState([{A_Id:'',A_Name:'',Password:''}])
    const [error, setError]=useState('')
    const [cookie,setCookie]=useCookies("adminname")
    const navigate=useNavigate()
    const formik=useFormik({
        initialValues:{
            A_Id:'',
            Password:''
        },
        onSubmit:(values)=>{
            let adm=admin.find(a=>a.A_Id===values.A_Id);
            if(adm.Password===values.Password){
                setCookie("adminname",adm.A_Id)
                navigate("/admindashboard")
            }
            else{
                setError("Invalid credentials")
            }
        }
    })
    useEffect(()=>{
        axios.get("http://127.0.0.1:4400/admin")
        .then(response=>{
            setAdmin(response.data)
        })
    },[])

    return(
        <div className="shade text-white">
            <h2 className="ms-5 pt-5">Admin Login Page</h2>
            
            <form onSubmit={formik.handleSubmit} className="w-25 ms-5">
                <dl>
                    <dt>Admin Id</dt>
                    <dd>
                        <input onChange={formik.handleChange} className="form-control" name="A_Id" placeholder="Enter admin id"/>
                    </dd>
                    <dt>Password</dt>
                    <dd>
                        <input onChange={formik.handleChange} className="form-control" name="Password" placeholder="Enter password"/>
                    </dd>
                    <dd className="text-warning">{error}</dd>
                    <button className="btn btn-primary">Login</button>
                </dl>
            </form>
        </div>
    )
}