import { API_URL } from "../helpers/constans";

export class ClienteService {

 
    async getClientes(token) {

      const response = await fetch(`${API_URL}/Cliente/GetAllAsync`, {
      method: "get",
      headers: {
        "Authorization":'"'+token+'"'
      }
      
    });
      const data = await response.json();

      let dropdownClientes=[];
      dropdownClientes=data.data.map((item, i) => {
        
        let postData = {
                name:item.nombre,  
                value:item.id,            
            };
  
          return postData;
      });

      return dropdownClientes;

      
    }
 



}