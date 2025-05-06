import { Auth } from "./auth/auth.js";
import { Theme } from "./api/theme.js";

await Theme.getTheme();


if(Auth.isAuthenticated()){
    console.log("authenticated!");
}
else{
    console.log("Not authenticated.");
    
}