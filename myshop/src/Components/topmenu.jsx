import React from "react"
import {Link} from "react-router-dom"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Button,  Avatar, IconButton } from "@material-ui/core";
import userService from "../Service/userService";
import { withStyles } from "@material-ui/styles";
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import productService from "../Service/ProductService";
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';




const useStyles = makeStyles((theme) => ({
    linke: {
       color:"white",
       paddingRight:"1rem"
    },
    add_space:{
      
    }

  }));
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      padding: '0 4px',
    },
  }))(Badge);
const TopMenue = () => {
    const classclr=useStyles();
    const[count,setcount]=React.useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  function counts(items) {
    return items.map(({ quantity }) => quantity).reduce((sum, i) => sum + i, 0);
  }
  

   const getdata=()=>{productService.getdbcarts().then(data=>{
     
          setcount(data)
      
    
          
    }).catch(err=>console.log(err))

  }

React.useEffect(getdata,[])
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return ( 
    
      
        <AppBar position="static" style={{background:"grey"}}>
      
         <Toolbar>
 
         <Typography>
          <Link to="/" className={classclr.linke} > Home</Link>
        </Typography>   
        

        <Typography>
          <Link to="/product" className={classclr.linke}> Electronics</Link>
    
        </Typography>
            {userService.isLoggedIn() && (       <Typography>
          <Link to="/new-product" className={classclr.linke}>New Product</Link>
        </Typography>)  }
 

        <Typography>
          <Link to="/contact-us" className={classclr.linke}>About Us</Link>
        </Typography>  

    

        <Typography >
          <Link to="/db-cart" className={classclr.linke}  style={{paddingLeft:"800px"}} >
          <IconButton aria-label="cart">
      <StyledBadge badgeContent={counts(count)} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>

          </Link>
          
          
        </Typography> 


  {!userService.isLoggedIn () ? ( <>
    <Typography>
          <Link to="/login" className={classclr.linke}>Login</Link>
        </Typography> 
        <Typography>
          <Link to="/register" className={classclr.linke}>Register</Link>
        </Typography> 
        </> ):
        (
          <div>
            <IconButton
              aria-label="U"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              
              <Avatar alt={userService.getLoggedInUser().firstname} src="C:\Users\User\Desktop" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <h5>{userService.getLoggedInUser().firstname+" "+userService.getLoggedInUser().lastname}</h5> 
              <p>{userService.getLoggedInUser().role}</p>
              <Divider />
              
              <Button color="primary" onClick={handleClose}>Profile</Button> 
              <Button color="primary" onClick={(e) => {  
          userService.logout();
          productService.removeallcarts().then(data=>{

          }).catch(err=>console.log(err))
          window.location.reload()
          
        }}>Logout</Button>
            </Menu>
          </div>
        )




        



  }

      









    {/*  {!userService.isLoggedIn () ? ( <>
        <Typography>
          <Link to="/login" className={classclr.linke}>Login</Link>
        </Typography> 
        <Typography>
          <Link to="/register" className={classclr.linke}>Register</Link>
        </Typography> 
        </>    ):(
        <Button  variant="contained" 
        onClick={(e) => {
          userService.logout();
          window.location.reload()
          
        }}


        
        
        
        >Logout {userService.getLoggedInUser().username +" "+ userService.getLoggedInUser().role}
        
        
        </Button>
                   
        )}
        
      */}
     
        </Toolbar>   
        </AppBar>
       
       

        
     );
  
}
 
export default TopMenue;