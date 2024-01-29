import axios from "axios"
import { useState,useEffect } from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"

export function AdminDashboard(){
    const [video, setVideo]=useState([{video_id:0,title:'',url:'',likes:0,dislikes:0,comments:'',category_id:0}])
    const [cookie,setCookie,removeCookie]=useCookies("adminname")
    let navigate=useNavigate();

    useEffect(()=>{     
        axios.get("http://127.0.0.1:4400/videos")
        .then(response=>{
            if(cookie['adminname']===undefined){
                navigate("/adminlogin")
            }
            else{
                setVideo(response.data)
            }
        })
        
    },[])

    return(
        <div className="shade">
            <div className="pt-4 ps-2">
                <Link to="/addvideo" className="h6 p-2 text-decoration-none bg-secondary text-light rounded">Add new video</Link>
            </div>
            <table className="table table-hover mt-4">
                <thead>
                    <tr>
                        <th>Video_Title</th>
                        <th>Video_Preview</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                {
                video.map(vd=>
                    <tr key={vd.video_id}>
                        <td >{vd.title}</td>
                        <td>
                            <iframe width="300" height="200" src={vd.url}></iframe>
                        </td>
                        <td className="pt-5">
                            <Link to={`/editvideo/${vd.video_id}`} className="bi bi-pen-fill bg-warning text-black fs-5  p-3 rounded"></Link>
                            <Link to={`/deletevideo/${vd.video_id}`}className="bi bi-trash-fill bg-danger p-3 text-black ms-3 fs-5 rounded"></Link>

                        </td>
                    </tr>
                    
                    )
            }
            </tbody>
            </table>
        </div>
    )
}