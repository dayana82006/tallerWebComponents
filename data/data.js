// Función para guardar los datos de la factura
export async function getData(factura) {
    try {
      // Simulando el guardado de datos en localStorage (puedes adaptarlo según sea necesario)
      const facturasGuardadas = JSON.parse(localStorage.getItem('facturas')) || [];
      
      // Agregar la nueva factura al conjunto de facturas
      facturasGuardadas.push(factura);
      
      // Guardar las facturas actualizadas en localStorage
      localStorage.setItem('facturas', JSON.stringify(facturasGuardadas));
      
      // Simular un retraso en el guardado de datos (como si fuera una solicitud al servidor)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log("Factura guardada correctamente:", factura);
      return true;
    } catch (error) {
      console.error("Error al guardar la factura:", error);
      throw error;
    }
  }
  