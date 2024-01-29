import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie";
import { useNavigate, useParams, Link } from "react-router-dom"

export function EditVideo(){

    const [videos,setVideo]=useState([{video_id:0,title:'',url:'',likes:0,dislikes:0,comments:'',category_id:0}])
    const [category,setCategory]=useState([{category_id:0,category_name:''}])
    const [cookie,setCookie,removeCookie]=useCookies("adminnanme")

    let navigate=useNavigate();
    let params=useParams();


    const formik=useFormik({
        initialValues:{
            video_id:videos[0].video_id,
            title:videos[0].title,
            url:videos[0].url,
            likes:videos[0].likes,
            dislikes:videos[0].dislikes,
            comments:videos[0].comments,
            category_id:videos[0].category_id
        },
        enableReinitialize:true, 
        onSubmit:(values)=>{
        axios.put(`http://127.0.0.1:4400/editvideo/${params.videoid}`,values)
        .then(response=>{
            if(cookie['adminname']===undefined){
                alert("video updated successfully")
                navigate("/admindashboard")
            }
            else{
                setVideo(response.data)
            }
        })
            
        }
    })
    function LoadCategories(){
        axios.get("http://127.0.0.1:4400/categories")
            .then(res=>{
                res.data.unshift({category_id:-1,category_name:"Select Category"})
                setCategory(res.data)
            })
    }
  
    useEffect(()=>{
        LoadCategories();
        axios.get(`http://127.0.0.1:4400/videos/${params.videoid}`)
        .then(response=>{
            setVideo(response.data);
        })
        
    })

    return(
        <div className="shade pt-2 text-white ps-5">
            <h3>Edit video</h3>
            <form className="w-25" onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" value={formik.values.video_id} className="form-control" onChange={formik.handleChange} name="video_id"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" value={formik.values.title} className="form-control" onChange={formik.handleChange} name="title" /></dd>                    
                    <dt>Url</dt>
                    <dd><input type="text" value={formik.values.url} className="form-control" onChange={formik.handleChange} name="url" /></dd>                  
                    <dt>Likes</dt>
                    <dd><input type="number" value={formik.values.likes} className="form-control" onChange={formik.handleChange}  name="likes"/></dd>
                    <dt>Dislikes</dt>
                    <dd><input type="number" value={formik.values.dislikes} className="form-control" onChange={formik.handleChange}  name="dislikes"/></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" value={formik.values.comments} className="form-control" onChange={formik.handleChange} name="comments"/></dd>
                    <dt>Category</dt>
                    <dd>
                    <select name="category_id" className="form-select" value={formik.values.category_id} onChange={formik.handleChange}>
                {
                    category.map(item=>
                        <option value={item.category_id} key={item.category_id}>{item.category_name.toUpperCase()}</option>                        
                        )
                }
            </select>
                    </dd>
                </dl>
                <div>
                    <button className="btn btn-primary">Save</button>
                    <Link to="/admindashboard" className="btn btn-danger ms-2">Cancel</Link>
                </div>
                </form>
            
        </div>
    )
}