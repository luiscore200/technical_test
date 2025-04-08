const BASE_URL =  'http://172.29.32.1:4000';

type EmpresaPayload = {
    email: string;
    password: string;
    profile: {
      name: string;  // Nombre es obligatorio
      category: string;  // Categoría es obligatorio
      location: string;  // Ubicación es obligatorio
      instagram?: string;  // Opcional
      facebook?: string;  // Opcional
      tiktok?: string;  // Opcional
    };
  };

  type CreadorPayload = {
    name: string;  // Nombre es obligatorio
    location: string;  // Ubicación es obligatorio
    instagram?: string;  // Opcional
    facebook?: string;  // Opcional
    tiktok?: string;  // Opcional
    categories?: string[];  // Al menos una categoría debe ser asociada
  };
  
  export async function registrarEmpresa(data: EmpresaPayload) {
    try {
    console.log(data);
      const response = await fetch(`${BASE_URL}/api/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();  // Parsear la respuesta
  
      if (!response.ok) {
        // Si no es exitosa, lanzar error
        throw new Error(responseData.message || "Error al registrar la empresa");
      }

     
  
      // Retornar la respuesta exitosa (o lo que el backend retorne)
      return {
        success: responseData.success,
        message: responseData.message,
        data: responseData.data,  // Si el backend envía un 'data', lo retornamos también
      };
    } catch (error:any) {
      console.error("Error en registrarEmpresa:", error);
      return {
        success: false,
        message: error.message || "Ocurrió un error al registrar la empresa",
      };
    }
  }
  

  export async function registrarCreador(data: CreadorPayload) {
    try {
      
      const response = await fetch(`${BASE_URL}/api/creators`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();  // Parsear la respuesta
  
      console.log(responseData);
      if (!response.ok) {
        // Si no es exitosa, lanzar error
        throw new Error(responseData.message || "Error al registrar el creador");
      }
  
      // Retornar la respuesta exitosa (o lo que el backend retorne)
      return {
        success: responseData.success,
        message: responseData.message,
        data: responseData.data,  // Si el backend envía un 'data', lo retornamos también
      };
    } catch (error: any) {
      console.error("Error en registrarCreador:", error);
      return {
        success: false,
        message: error.message || "Ocurrió un error al registrar el creador",
      };
    }
  }
  