import React from "react"
import SingleProduct from "./singleProduct"
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import productService from "../../Service/ProductService";
import userService from "../../Service/userService";
import Pagination from '@material-ui/lab/Pagination';



const useStyles = makeStyles((theme) => ({
    addbtn:{
        position:"absolute",
        bottom:theme.spacing(2),
        right:theme.spacing(2)

    }
  }));
  
const Products = (props) => {
    const handlerbtn=()=>{
        
        props.history.push("/new-product")

    }
    const page=props.match.params.page ? props.match.params.page :1
    const[products,setproducts]=React.useState([]);
    const[total,settoatl]=React.useState(0)
    const[perPage,setperPage]=React.useState(10)
    
    const getdata=()=>{
        productService.getProducts(page,perPage).then(data=>{
            setproducts(data.products)
            console.log(data.products)
            settoatl(data.total)
        }).catch((err)=>{console.log(err)})
    }
 //getdata()
 React.useEffect(getdata,[page,perPage])
 const classes=useStyles()
    return (
        <div>
           
            <Grid container direction="column">
      
            <Grid container spacing={3}>
                <Grid md={4}></Grid>
                <Grid md={5}>
            <h1 style={{color:"blue"}}>All Available Products</h1>
            </Grid>

            <Grid md={3}></Grid>

            </Grid>
                
         
        
Record Per Page: {""}
            <select value={perPage} onChange={(e)=>{setperPage(e.target.value)}}   style={{width:"100px",height:"20px"}} >
                <option value="2">2</option>
                <option value="10">10</option>




            </select>
               
               { userService.isLoggedIn() && (  <Fab color="primary" aria-label="add" className={classes.addbtn} onClick={handlerbtn}>

<AddIcon />
</Fab>)}
            
      
    
        {products.length === 0 ? (<p>There is no products</p>) : (
        
        <Grid item container spacing={3}>
        <Grid item xs={false} sm={2} md={2}/>
        <Grid item xs={12} sm={8} md={8}>
            <Grid container spacing={2}>
        {products.map((product)=>(<SingleProduct product={product}   ondelete={getdata}/>))}
        </Grid>
        </Grid>
        <Grid item xs={false} sm={2} md={2} />
      </Grid>
        

    ) }

    
    <Pagination count={Math.ceil(total/perPage)} variant="outlined" shape="rounded" onChange={(e,value)=>{
        console.log(value)
        props.history.push("/product/"+value)
    }} />   Total : {total}


    

</Grid>

    </div>
    
    );
}
 
export default Products;