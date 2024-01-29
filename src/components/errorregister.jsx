import { Link, useNavigate } from "react-router-dom"


export function ErrorRegister(){
    let navigate=useNavigate()
    function handleError(){

        navigate("/userregister")
    }
    return(
        <div>
          <Link to="/userregister" onClick={handleError} className='btn btn-light mt-3 text-danger'>Account Not found - Register</Link>

        </div>
    )
}