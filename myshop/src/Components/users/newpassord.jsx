import React from 'react';
import userService from '../../Service/userService';
import Button from '@material-ui/core/Button';


import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import { toast } from 'react-toastify';
const Newpassword = (props) => {
   const[password,setpassword]=React.useState("")
   const token=props.match.params.token;
   console.log(token)

    return ( 
          
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} sm={6}>
            <h3 style={{paddingLeft:"400px"}}>Digital Ecomrce Store</h3>


          </Grid>
      
            <Grid item xs={12} md={12} sm={6} style={{padding:"30px"}}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
               
                value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
                autoFocus
              />
              <span style={{color:"red"}}>password must be of length 5</span>
            </Grid>
            <Grid item xs={12} md={12} sm={6} style={{paddingLeft:"400px"}}>
            <Button variant="contained" color="primary" onClick={(e)=>{
                userService.newpassowrd(password,token).then(data=>{
                 console.log(data)
                 toast.success(data, {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                 props.history.push("/login")
                }).catch(err=>{console.log(err)
                    toast.error(err.response.data, {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                
                })
            }}>Change</Button>
   </Grid>
         </Grid>



     );
}
 
export default Newpassword;