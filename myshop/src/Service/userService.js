import GenericService from "./GenericService";
import jwtDecode from 'jwt-decode';

class UserService extends GenericService {
  
//get users from user table all

getusers=()=> new Promise((resolve,reject)=>{
  this.get("/users").then((res)=>{

    resolve(res)
  }).catch(err=>reject(err))
})

//localstorage code 
 Expirelocal=()=>{
//let hours = 2; // Reset when storage is more than 24hours
var now = new Date().getTime();
var setupTime = localStorage.getItem('setupTime');
if (setupTime == null) {
    localStorage.setItem('setupTime', now)
} else {
    if(now-setupTime > 15*60*1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now);
        return 
    }
}
}
//reset password
reset=(email) =>
new Promise((resolve, reject) => {
  this.post("/users/reset", { email })
    .then((data) => {
     
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});


//new password request
newpassowrd=(password,token) =>
new Promise((resolve, reject) => {
  this.post("/users/new-password", { password,token })
    .then((data) => {
     
      resolve(data);
    })
    .catch((err) => {
      reject(err);
    });
});


//end of localstorage code

  login = (email, password) =>
  new Promise((resolve, reject) => {
    this.post("/users/login", { email, password })
      .then((token) => {
        localStorage.setItem("token", token);
        resolve(token);
      })
      .catch((err) => {
        reject(err);
      });
  });



  register=(firstname,lastname,email,password)=> this.post('/users/register',{firstname,lastname,email,password});
  

getLoggedInUser=()=>{
  try {
    const jwt=localStorage.getItem("token")
    return jwtDecode(jwt);
  } catch (error) {

    return null;
  }

}  


 logout = () => {
    localStorage.removeItem("token");
  };

  isLoggedIn=()=>{
    return localStorage.getItem("token") ? true :false;
}

isAdmin=() =>{
  if(this.isLoggedIn() ){
   if(this.getLoggedInUser().role ==="admin"){
     return true;

   } 
   else  return false;
  }
  else return false;
}

}



let userService = new UserService();
export default userService;