import React from 'react';
import productService from '../../Service/ProductService';
import moment from 'moment';


  function subtotal(items) {
    return items.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
  }

 
const RecentDeposit = ()=> {

    const[orders,setorders]=React.useState([])

 const getdata=()=>{productService.getlastdy().then(data=>{
     setorders(data)
     console.log(data)
 }).catch(err=>console.log(err))
}

 React.useEffect(getdata,[])
 


    return ( 
      <>
      <h2 style={{color:'blue'}}>Recent Deposits</h2>
 
    
    <h2>Rs {subtotal(orders)}</h2>
    <p>on {moment().format("DD-MM-YYYY")}</p>


      </>


     );
}
 
export default RecentDeposit;