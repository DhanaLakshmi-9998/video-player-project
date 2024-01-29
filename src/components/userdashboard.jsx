import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export function UserDashboard(){
const [video, setVideo]=useState([{video_id:0,title:'',url:'',likes:0,dislikes:0,comments:'',category_id:0}])
const [cookie,setCookie]=useCookies("uname")
let navigate=useNavigate()

     useEffect(()=>{
        axios.get("http://127.0.0.1:4400/videos")
        .then(response=>{
            if(cookie['uname']===undefined){
                navigate("/userlogin")
            }
            else{
                setVideo(response.data)
            }
        })
     },[])
    return(
        <div className="shade pt-4">
            <div>           
            <h2 className="text-white ms-5">{cookie['uname']}-Dashboard</h2>
            </div>

            <section className="d-flex flex-wrap ms-2 pt-2">

            {
                video.map(vd=>
                    <div key={vd.video_id} className="card shadow w-25 me-2 mt-2">
                        <div className="card-header h-25">
                            <h3>{vd.title}</h3>
                        </div>
                        <div className="card-body">
                            <iframe src={vd.url} width="100%" height="150" allowFullScreen></iframe>
                        </div>
                        <div className="card-footer h-25">
                            <button className="btn btn-outline-none me-2"><span className="bi bi-hand-thumbs-up me-2"></span>{vd.likes}</button>
                            <button className="btn btn-outline-none me-2"><span className="bi bi-hand-thumbs-down me-2"></span>{vd.dislikes}</button>
                            <div>
                                Comments : {vd.comments}
                            </div>
                        </div>
                    </div>)

            }
            </section>
        </div>
    )
}