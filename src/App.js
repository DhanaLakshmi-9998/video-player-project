import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css"
import { MainPage } from "./components/vmain";
import { UserRegister } from "./components/userregister";
import { UserLogin } from "./components/userlogin";
import { UserDashboard } from "./components/userdashboard";
import { useCookies } from "react-cookie";
import { AdminLogin } from "./components/adminlogin";
import { AdminDashboard } from "./components/admindashboard";
import { AddVideo } from "./components/addVideo";
import { EditVideo } from "./components/editVideo";
import { DeleteVideo } from "./components/deleteVideo";

function SignoutComponent(){ // we are using this function in the same component.
    const [cookie,setCookie,removeCookie]=useCookies("uname")
    let navigate=useNavigate()
    function handleSignout(){
        removeCookie('uname');
        navigate("/")

    }
    return(
      <button onClick={handleSignout} className="btn btn-danger me-2">Signout</button>
    )
}
function AdminSignoutComponent(){
  const [cookie,setCookie,removeCookie]=useCookies("adminname")
  let navigate=useNavigate();
  function handleAdminSignout(){
      removeCookie("adminname")
      navigate("/adminlogin")
  }
  return(
    <button onClick={handleAdminSignout} className="bi bi-person-fill btn btn-danger me-2">Admin Signout</button>
  )

}
function App(){
  const [cookie]=useCookies()


  return(
      <div className="container-fluid">
        <BrowserRouter>
          <header className="d-flex justify-content-between p-3 bg-dark text-white">
              <h2>V D</h2>
              <Link to="/" className="h2 text-decoration-none">Video-Player</Link>
              <div>{
                  (cookie['uname']===undefined)?<Link to="/userlogin" className="btn btn-warning me-2">Sign in</Link>:<SignoutComponent/>
                }
                {
                  (cookie['adminname']===undefined)?<Link to="/adminlogin" className="btn btn-warning me-2"><span className="bi bi-person-fill ">Admin dashboard</span></Link>:<AdminSignoutComponent/>
                }
             
              </div>
          </header>
         
         <section>
            <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/userregister" element={<UserRegister/>}/>
              <Route path="/userlogin" element={<UserLogin/>}/>
              <Route path="/userdashboard" element={<UserDashboard/>} />
              <Route path="/adminlogin" element={<AdminLogin/>}/>
              <Route path="/admindashboard" element={<AdminDashboard/>} />
              <Route path="/addvideo" element={<AddVideo/>}/>
              <Route path="/editvideo/:videoid" element={<EditVideo/>}/>
              <Route path="/deletevideo/:videoid" element={<DeleteVideo/>}/>
            </Routes>
         </section>
         </BrowserRouter>
      </div>
  )
}
export default App;