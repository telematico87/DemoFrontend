import { API_URL } from "../helpers/constans";
import { TOKEN } from "../helpers/constans";

export class AuthentificacionService {
    
    async login(dataLogin) {
          
      
      const response = await fetch(`${API_URL}/Login/Authenticate`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: dataLogin
      });
      
      
      const data = await response

      console.log(data);
      
    
      return data;
   
  } 
 



}