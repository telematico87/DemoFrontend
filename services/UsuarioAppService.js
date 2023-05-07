import { API_URL } from "../helpers/constans";

export class UsuarioAppService {

    async getAppsUsuario(token,idusuario) {

      const response = await fetch(`${API_URL}/UsuApp/AplicacionesXusu${idusuario}`, {
      method: "get",
      headers: {
        "Authorization":'"'+token+'"'
      }
      
    });
      const data = await response.json();


      return data.data;

      
    }
 



}