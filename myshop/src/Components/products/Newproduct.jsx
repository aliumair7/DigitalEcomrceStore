import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import productService from '../../Service/ProductService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from '../users/auth'


const NewProduct = (props) => {
  
    const[name,setname]=React.useState("")
    const[price,setprice]=React.useState(0)
    const[details,setdetails]=React.useState('')
    const[photo,setphoto]=React.useState('')
    const [url,setUrl] = React.useState("")
          

    React.useEffect(()=>{
      if(url){
        productService.addnewprodduct({name,price,details,photo:url}).then((data)=>{
          console.log(data) 
          toast.success(data, {
            position: toast.POSITION.TOP_RIGHT,
          });
         props.history.push('/product')
        }).catch(err=>{console.log(err)
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
       
   }},[url])

    const postDetails = ()=>{
       const data = new FormData()
       data.append("file",photo)
       data.append("upload_preset","ecomrce-project")
       data.append("cloud_name","ali7347")
       fetch("https://api.cloudinary.com/v1_1/ali7347/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
          console.log(data.url)
       })
       .catch(err=>{
           console.log(err)
           toast.error(err.response.data, {
            position: toast.POSITION.TOP_RIGHT,
          });
       })
    
   }
    return (
      <Auth>
        <Grid container spacing={3}>
            <Grid item md={12}>
            <h1>Add new Product</h1>
            </Grid>
    <Grid item md={3}></Grid>
            <Grid item md={6}>   
            
            <TextField     label="name" onChange={(e)=>{setname(e.target.value)}}  />
            </Grid>
           
            <Grid item md={3}></Grid>

            <Grid item md={3}></Grid>
            <Grid item md={6}>  
            <TextField     label="price"  onChange={(e)=>{setprice(e.target.value)}} />
             </Grid>
           <Grid item md={3}></Grid>


           <Grid item md={3}></Grid>
           <Grid item md={6}>

           <TextField
          id="standard-multiline-static"
          label="Descrption"
          multiline
          rows={4}
          onChange={(e)=>{setdetails(e.target.value)}}
        
        />


           </Grid>
           <Grid item md={3}></Grid>

           <Grid item md={3} ></Grid>
           <Grid item md={6} >  
           
           <TextField   spacing={4}
  name="file"
  type="file"
onChange={e=>{setphoto(e.target.files[0])}}

/>
           
           
           
                    </Grid>
    <Grid item md={3}></Grid>

           


    <Grid item md={3}></Grid>
          <Grid item md={3}><Button variant="contained" color="primary"
           onClick={()=>{postDetails()}}  
           >ADD NEW</Button></Grid>
          <Grid item md={6}></Grid>

            </Grid>
            </Auth>
      );
}
 
export default NewProduct;