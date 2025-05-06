import { Auth } from "./auth/auth.js";

if(Auth.isAuthenticated()){
    console.log("authenticated!");
}
else{
    console.log("Not authenticated.");
    
}