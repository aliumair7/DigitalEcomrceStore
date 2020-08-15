import React from 'react';

import { Grid, TextField, Button } from '@material-ui/core';
import productService from '../../Service/ProductService';
import Admin from "../users/admin"
import { toast } from 'react-toastify';
const UpdateProduct = (props) =>   {

const[name,setName]=React.useState("")
const[price,setPrice]=React.useState(0)
const[details,setdetails]=React.useState('')
const[image,setimage]=React.useState('')
const[url,setUrl]=React.useState('')

const id=props.match.params.id;
console.log(id)
React.useEffect(()=>{
  if(url){
    productService.updateProduct(id,{name,price,details,image:url}).then((data)=>{
      console.log(data)
      toast.success(data, {
        position: toast.POSITION.TOP_RIGHT,
      }); 
     props.history.push('/product')
    }).catch(err=>console.log(err))
   
}},[url])

const updateprodutcs = ()=>{
   const data = new FormData()
   data.append("file",image)
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
   })

}





React.useEffect(() => {
    productService.getSingleProduct(id).then((data) => {
        console.log(data)
      setName(data.name);
      setPrice(data.price);
      setdetails(data.details)
          setimage(data.photo)
  
        
    });
  }, []);

return (

  <Admin>
    <Grid container spacing={3}>
        <Grid item md={12}>
        <h1>Update Product</h1>
        </Grid>
<Grid item md={3}></Grid>
        <Grid item md={6}>   
        
        <TextField    label="name" value={name} onChange={(e)=>{setName(e.target.value)}}  />
        </Grid>
       
        <Grid item md={3}></Grid>

<Grid item md={3}></Grid>
        <Grid item md={6}>  
        <TextField     label="price" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
         </Grid>
       <Grid item md={3}></Grid>

       <Grid item md={3}></Grid>
           <Grid item md={6}>

           <TextField
          id="standard-multiline-static"
          label="Descrption"
          value={details}
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
  
  
onChange={e=>{  setimage(e.target.files[0])}}

/>

<img src={image} alt="Not found"/>
           
           
           
                    </Grid>
    <Grid item md={3}></Grid>



      <Grid item md={3}></Grid>
      <Grid item md={3}><Button variant="contained" color="primary"
       onClick={
           (e)=>{updateprodutcs()}

           
           
}  
       >Update Product</Button></Grid>
      <Grid item md={6}></Grid>

        </Grid>
        </Admin>
  );
  
}
 
export default UpdateProduct;