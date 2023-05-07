import { API_URL } from "../helpers/constans";

export class RolService {

  async getRoles(token) {

    const response = await fetch(`${API_URL}/Rol/GetAllAsync`, {
    method: "get",
    headers: {
      "Authorization":'"'+token+'"'
    }
    
  });
    const data = await response.json();

    let dropdownRol=[];
    dropdownRol=data.data.map((item, i) => {
      
      let postData = {
              name:item.nombre,  
              value:item.id,            
          };

        return postData;
    });

    return dropdownRol;

    
  }
 



}