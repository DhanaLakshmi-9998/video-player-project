import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

export function DeleteVideo()
{
    const [videos, setVideos] = useState([{video_id:0, title:'', url:'', likes:0,dislikes:0, comments:'', category_id:0}]);
    
    let navigate = useNavigate();
    
    let params = useParams();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4400/videos/${params.videoid}`)
        .then(response=>{
            setVideos(response.data);
        })
        
    },[]);

    function handleDeleteClick(){   
        axios.delete(`http://127.0.0.1:4400/deletevideo/${params.videoid}`);
        alert('Video Deleted');
        navigate('/admindashboard');
    }

     return(
        <div className="shade pt-2 text-white">
            <h3>Delete Video</h3>
            <div>
                <h3>{videos[0].title}</h3>
                <iframe src={videos[0].url} width="400" height="300"></iframe>
            </div>
            <div className="mt-3">
                <button onClick={handleDeleteClick} className="btn btn-danger me-2">Delete</button>
                <Link to="/admindashboard" className="btn btn-warning">Cancel</Link>
            </div>
        </div>
     )
}