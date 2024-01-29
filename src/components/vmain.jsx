import { useEffect, useState } from "react"
// import { UserRegister } from "./userregister"
import axios from "axios"
import { ErrorRegister } from "./errorregister"
import { Link, useNavigate } from "react-router-dom"

export function MainPage(){

    let navigate=useNavigate()
    const [Email,setEmail]=useState('')
const [users, setUser]=useState([{user_id:'',user_name:"",password:"",email:'',mobile:0}])
const [error, setError]=useState("")

useEffect(()=>{
    axios.get("http://127.0.0.1:4400/user")
    .then(response=>{
        setUser(response.data)
    })
},[])

function handleEmail(e){
    setEmail(e.target.value)
}
function GetstartedClick(){
    var user=users.find(num=>num.email===Email)
    if(user===undefined || user.email===""){
        setError(<ErrorRegister/>)
    }
    else{
        navigate("/userlogin")
    }
}
    return(
        <div className="shade">
            <main className="d-flex justify-content-center text-center text-light">
                <div className="mt-5">
                    <h1 className="fw-semibold">Watch videos from any where</h1>
                    <p className="fw-bold">
                        for more videos follow here
                    </p>
                    <div className="input-group">
                        <input onChange={handleEmail} type="email" placeholder="Enter your email address" className="form-control"/>
                        <button onClick={GetstartedClick} className="btn btn-primary">Get started</button>
                    </div>
                    <p>
                        {error}
                    </p>
                    <div className="fw-semibold fs-6">
                    <span className="me-2">Not an user?</span><Link to="/userregister">Register here</Link>
                    </div>
                </div>

            </main>
        </div>
    )
}