import React from 'react';
import TopMenue from './Components/topmenu';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Components/home';
import Contact from './Components/contact';
import Products from './Components/products/product';
import NotFound from './Components/Notfound';
import NewProduct from './Components/products/Newproduct';
import UpdateProduct from './Components/products/updateProduct';
import Login from './Components/users/login';
import Register from './Components/users/register';
import { ToastContainer } from 'react-toastify';
import Carts from './Components/products/Carts';
import Customers from './Components/customers';
import OrderData from './Components/ordersdata'
import Lastmonth from './Components/lastmonth';
import ResetPassword from './Components/users/reset';
import Newpassword from './Components/users/newpassord';
import { Grid } from '@material-ui/core';
import UpperFooter from './Components/upperfooter';

function App() {
  return (
    
    <Router>
      <div>
      <ToastContainer />
      
      
      
      <TopMenue />
      <UpperFooter/>

     
      <Switch>

      <Route path="/register"exact component={Register} />
     <Route path="/login" exact component={Login} />
     <Route path="/reset"exact component={ResetPassword} />
     <Route  path="/reset/:token" exact component={Newpassword} />
    
     <Route path="/update/:id" component={UpdateProduct} />
     <Route path="/new-product" component={NewProduct} />
      <Route path="/product/:page?" component={Products}/>
       <Route path="/customers" component={Customers}        />
       <Route path="/ordersdata" component={OrderData}     />
       <Route path="/lastmonth" component={Lastmonth}   />
      <Route path="/contact-us" component={Contact} />
      <Route path="/db-cart" component={Carts} />
      <Route path="/"exact component={Home} />
      <Route path="/not-found" component={NotFound} />

      <Redirect to="/not-found" />
      

      </Switch>
      </div>
    </Router>
    
  );
}

export default App;
