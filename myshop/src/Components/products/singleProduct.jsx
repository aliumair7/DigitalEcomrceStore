import React from 'react'
import { Grid, Button, Avatar, CardHeader } from "@material-ui/core";
import productService from '../../Service/ProductService';
import { withRouter } from 'react-router';
import userService from '../../Service/userService';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCartRounded';

import Typography from '@material-ui/core/Typography';
import Purcahse from './purchase';
import { toast } from 'react-toastify';



const SingleProduct = (props) => {

   const  {product,ondelete,history} = props
   
   const price=`Rs.  ${product.price}`;
   
   
   
    return (
      
      
         <Grid item xs={12} sm={4}  >
          
         

           

<Card>

<CardHeader
 style={{color: 'orange'}}
        avatar={<Avatar src={product.photo} />}

        
        title={product.name}
       
       
        subheader={price}
      />
      <a href="/products">
      <CardMedia style={{ height: "150px" }}  component="img"
          alt={product.name}
          image={product.photo} />
          </a>
      <CardContent>
        <Typography variant="body2" component="p">
          {product.details}
        </Typography>
      </CardContent>
      <CardActions>
       {/* <Button size="small">BUY NOW</Button>  */}
    {   userService.isLoggedIn()&&(
      <>
      <Purcahse amount={product.price} product={product} delcart={()=>{}}/>
      </>
    )
    }
        <IconButton color="primary" aria-label="add to shopping cart"

onClick={(e)=>{
{
  userService.isLoggedIn() ?
  productService.postdbcart(product._id)
  .then((data) => {
    console.log(data);
    window.location.reload()
    props.history.push("/product")})
  .catch((err) => {
    console.log(err);
  })      :  
         props.history.push("/login")
  }
}} 


>

        <AddShoppingCartIcon />
      </IconButton>
        
        {userService.isAdmin() && (     
    <>

      <Button size="small" color="primary" 
    onClick={(e)=>{
        history.push("/update/"+product._id)

    }}
    >Edit</Button>{" "}
        
        <Button size="small" color="secondary"  
   
   onClick={e=> {
       productService.deleteProduct(product._id).then(data=>{
           ondelete()
           toast.success(data, {
            position: toast.POSITION.TOP_RIGHT,
          });

       })
       .catch(err=>{
           console.log(err)
           toast.error(err.response.data, {
            position: toast.POSITION.TOP_RIGHT,
          });
       })
       

   }}
   
   
   
   >Delete</Button>
    </>
      )}

      </CardActions>
    </Card>









  </Grid>)
}
 
export default withRouter(SingleProduct);