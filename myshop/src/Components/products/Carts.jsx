import React from "react"


import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from "@material-ui/core";

import productService from "../../Service/ProductService";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Purchase from './purchase'

import userService from "../../Service/userService";
import { toast } from "react-toastify";


const TAX_RATE = 0.07;
const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 700,
  },
  addbtn:{
    position:"absolute",
    bottom:theme.spacing(2),
    right:theme.spacing(2)

}
}));

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  
  function subtotal(items) {
    return items.map(({ price,quantity }) => price*quantity).reduce((sum, i) => sum + i, 0);
  }

const Carts = (props) => {
    
  
  
    const[products,setproducts]=React.useState([]);
   
           
    const getdata=()=>{
        productService.getdbcarts().then(data=>{
            
            setproducts(data)
            
          
           
            
        }).catch((err)=>{console.log(err)})
    }


 //getdata()
 React.useEffect(getdata,[])
 const invoiceSubtotal = subtotal(products);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
 const classes=useStyles()

 const incre=(id)=>{
  
  //let price=this.state.total make update function on query on cart
    productService.cartinc_qty(id).then((data) =>{
        console.log(data)
        getdata()
        window.location.reload()
        window.history.push('/db-cart')

    }).catch(err=>console.log(err))
 }
 const decre=(id)=>{
    productService.cartdec_qty(id).then((data) =>{
        console.log(data)
        getdata()
        window.location.reload()
        window.history.push('/db-cart')

    }).catch(err=>console.log(err))
  
   }
 
    return (  
        <div>

      
            <Grid container spacing={3}>
                <Grid md={4}></Grid>
    <Grid md={5}>  <h1 style={{color:"blue"}}>All  Products in Cart</h1> </Grid>
            <Grid md={3}></Grid>
            </Grid>
        {products.length === 0 ? (<p>There is no products</p>) : ( 
        <Grid container spacing={3}>

<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>


        


  
  {products.map((product)=> (
       <TableRow key={product._id}>
       <TableCell>{product.name}</TableCell>
  <TableCell align="right">

     
       <Button  variant="outlined" color="primary" 
       onClick={(e)=>{incre(product._id)}} 
       
      
    >+</Button>        {product.quantity} 
         <Button disabled={product.quantity===1} variant="outlined" color="primary"
         onClick={(e)=>{decre(product._id)}}
          >-</Button>
      
      
      
      </TableCell>
       <TableCell align="right">{product.price}</TableCell>
       
       <TableCell align="right">{ccyFormat(product.price*product.quantity)}</TableCell>

       <TableCell align="right"><Button variant="contained" color="primary" 
       onClick={(e)=>{


        productService
        .deldbcart(product._id)
        .then((data) => {
          toast.success(data, {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(data);

          getdata()
          
          window.location.reload()
          window.history.push ("/db-cart") ;
          
          

        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      }}
        >Remove</Button></TableCell>
       
       
     </TableRow>
     
            
      ))}
    
    <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(subtotal(products))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Grid item md={3}></Grid>
    <Grid item md={8}></Grid>
    
    


        
    </Grid>   
    ) }

   { userService.isLoggedIn()&&( <>
<Purchase  amount={ccyFormat(invoiceTotal)} product={products} delcart={()=>{  productService.removeallcarts().then(data=>{

}).catch(err=>console.log(err))}} />

</>  )}
        
      
    </div>
    );
}
 
export default Carts;