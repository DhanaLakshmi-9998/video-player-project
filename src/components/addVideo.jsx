import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
export function AddVideo(){

    
    const [category,setCateagory]=useState([{category_id:0,category_name:''}])
    const navigate=useNavigate();

    let formik=useFormik({
        initialValues:{
            video_id:0,title:'',url:'',likes:0,dislikes:0,comments:'',category_id:0
        },
        validationSchema:yup.object({
            title:yup.string().required("Title required"),
            url:yup.string().required("url mandatory")
        }),
        onSubmit:(values)=>{
            axios.post("http://127.0.0.1:4400/addvideo",values)
            alert("video added successfully")
            navigate("/admindashboard")
        }
    })
    function LoadCategories(){
        axios.get("http://127.0.0.1:4400/categories")
            .then(res=>{
                res.data.unshift({category_id:-1,category_name:"Select Category"})
                setCateagory(res.data)
            })
    }
  
    useEffect(()=>{
        LoadCategories();
    },[])
    return(
        <div className="shade pt-2 text-white ps-5">
            <h3>Add new video</h3>            
            <form className="w-25" onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" className="form-control" onChange={formik.handleChange} name="video_id"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} name="title" /></dd>
                    <dd className="text-warning">{formik.errors.title}</dd>
                    <dt>Url</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} name="url" /></dd>
                    <dd className="text-warning">{formik.errors.url}</dd>
                    <dt>Likes</dt>
                    <dd><input type="number" className="form-control" onChange={formik.handleChange}  name="likes"/></dd>
                    <dt>Dislikes</dt>
                    <dd><input type="number" className="form-control" onChange={formik.handleChange}  name="dislikes"/></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" className="form-control" onChange={formik.handleChange} name="comments"/></dd>
                    <dt>Category</dt>
                    <dd>
                    <select className=" form-select" onChange={formik.handleChange}>
                {
                    category.map(item=>
                        <option value={item.category_id} key={item.category_id}>{item.category_name}</option>                        
                        )
                }
            </select>
                    </dd>
                </dl>
                <div>
                    <button className="btn btn-primary">Add</button>
                    <Link to="/admindashboard" className="btn btn-danger ms-2">Cancel</Link>
                </div>
            </form>
            
        </div>
    )
}
