
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import productService from '../../Service/ProductService';
import { Button } from '@material-ui/core';



const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const Order = () => {
    const classes=useStyles()
 const[orders,setorders]=React.useState([])

 const getdata=()=>{productService.getspecificorders().then(data=>{
     setorders(data)
 }).catch(err=>console.log(err))
}

 React.useEffect(getdata,[])
    return ( 
     <>
      <h3 style={{color:'blue'}}>Recent Orders</h3>
                <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Ship To</TableCell>
            <TableCell align="right">Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.Date}
              </TableCell>
          <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.city},{row.country}</TableCell>
              <TableCell align="right">{row.brand}....{row.cardNo}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                
   <Button variant="text"  style={{color:'blue'}}
   onClick={()=>{
       productService.getallorders().then(data=>{
           setorders(data)
       }).catch(err=>console.log(err))
   }}
   
   
   
   >See more orders</Button>

     </>


     );
}
 
export default Order;