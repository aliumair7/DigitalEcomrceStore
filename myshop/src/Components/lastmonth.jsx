import React from 'react';
import productService from '../Service/ProductService';

function subtotal(items) {
    let arr=items.map(({ products }) => products).filter(i=>i.name===i.name)
    alert(arr)
    for(let i=0;i<arr.length;i++)
    return arr.map(({ quantity }) => quantity)
  }


const Lastmonth = () => {
    const[orders,setorders]=React.useState([])

 const data=()=>{
     productService.getthirtydaysdeposit().then(data=>{
       setorders(data)
     }).catch(err =>console.log(err))

 }


React.useEffect(data,[])

    return ( 
    <>
   <h5>{subtotal(orders)}</h5> 

    </>
    );
}
 
export default Lastmonth;