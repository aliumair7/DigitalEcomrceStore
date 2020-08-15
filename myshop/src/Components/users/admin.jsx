import React from 'react';
import userService from '../../Service/userService';
import { withRouter } from 'react-router-dom';
const Admin = (props) => {
    React.useEffect ( ()=> {
        if(!userService.isAdmin()){
           props.history.push("/login")
        }

    },[])

return ( <> {props.children}</> );
}
 
export default withRouter(Admin);