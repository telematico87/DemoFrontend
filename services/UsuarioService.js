import { API_URL } from "../helpers/constans";

export class UsuarioService {

    async getUsuarios(token) {

      const response = await fetch(`${API_URL}/Usuario/GetAllAsync`, {
      method: "get",
      headers: {
        "Authorization":'"'+token+'"'
      }
      
    });
      const data = await response.json();

      var new_usuarios=data.data.map((item, i) => {
        item["idrol"]=item['rol']['id'];        
        item["idcliente"]=item['cliente']['id'];
        item["rol"]=item['rol']['nombre'];
        item["cliente"]=item['cliente']['nombre'];

        const nombre = item['nombre'].split(' ');
        var c_nombre=nombre.length;

        if(c_nombre==4){
          item["nombre"] =nombre[0] + " "+nombre[1];
          item["apellido_paterno"] =nombre[2];
          item["apellido_materno"] =nombre[3];
        }else if(c_nombre==3){
          item["nombre"] =nombre[0] ;
          item["apellido_paterno"] =nombre[1];
          item["apellido_materno"] =nombre[2];
        }else if(c_nombre==2){
          item["nombre"] =nombre[0] ;
          item["apellido_paterno"] =nombre[1];
        }else if(c_nombre==1){
          item["nombre"] =nombre[0] ;
        }
  

        return item;
     
    });

      return new_usuarios;

    }

    async  deleteUsuario(idUsuario,token){  


        
      try {
          const response = await fetch(`${API_URL}/Usuario/${idUsuario}`, { method: "delete" ,   "Authorization":'"'+token+'"'});
          return response;
      } catch (err) {
          
      }
    }

  async  postData(postData,token) {
     
      
      const response = await fetch(`${API_URL}/Usuario/Add`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization":'"'+token+'"'
        },
        body: postData
      });
      const data = await response.json()
   
      return data;
      
  }

  async getDataById(usuarioId){
  
    if (usuarioId) {
      try {
        const res = await fetch(`${API_URL}/Usuario/${usuarioId}`, {
          method: "get",
          headers: {
            'Authorization':TOKEN
          }
                
        });
  
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
  
        const data = await res.json();
        if(data!=null){ 
          return data;
        }
      } catch (err) {
        
      }
    }
  }

  async putData(putData,token) {
 
      try {
        const res = await fetch(`${API_URL}/Usuario/Update`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization":'"'+token+'"'
          },
          body: putData,
        });

        const data = await res.json();
  

      } catch (err) {
        
      }
      
    
  }
 



}