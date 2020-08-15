import React from 'react';
import userService from '../../Service/userService';
import { withRouter } from 'react-router-dom';





const Auth = (props) => {
    React.useEffect ( ()=> {
        if(!userService.isLoggedIn()){
           props.history.push("/login")
        }

    },[])

return ( <> {props.children}</> );
}
 
export default withRouter(Auth);