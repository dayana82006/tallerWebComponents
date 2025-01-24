import { getData } from './data/data.js';

document.addEventListener('DOMContentLoaded', () => {
  const saveFacturaBtn = document.getElementById('saveFactura');
  
  saveFacturaBtn.addEventListener('click', () => {
    try {
      const headerComponent = document.querySelector('header-component');
      const productsComponent = document.querySelector('products-component');
      
      // Obtener datos del HeaderComponent
      const nroId = headerComponent.shadowRoot.querySelector('#nroFactura').textContent.split(': ')[1];
      const nameuser = headerComponent.shadowRoot.querySelector('#nameuser').value.trim();
      const lastNameUser = headerComponent.shadowRoot.querySelector('#lastNameUser').value.trim();
      const emailUser = headerComponent.shadowRoot.querySelector('#emailUser').value.trim();
      const adressUser = headerComponent.shadowRoot.querySelector('#adressUser').value.trim();
      
      if (!nroId || !nameuser || !lastNameUser || !emailUser || !adressUser) {
        throw new Error("Por favor, completa todos los campos en el registro del usuario.");
      }
      
      // Obtener datos del ProductsComponent (productos)
      const productsTable = productsComponent.shadowRoot.querySelector('#table tbody');
      const products = [];
      productsTable.querySelectorAll('tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        const product = {
          code: cells[0].textContent,
          nombreP: cells[1].textContent,
          valorUnit: parseFloat(cells[2].textContent),
          cantidad: parseInt(cells[3].textContent),
          subtotal: parseFloat(cells[4].textContent)
        };
        if (!product.code || !product.nombreP || isNaN(product.valorUnit) || isNaN(product.cantidad) || isNaN(product.subtotal)) {
          throw new Error("Por favor, revisa los datos de los productos. Algunos campos están incompletos o mal formateados.");
        }
        products.push(product);
      });

      // Crear la estructura de datos para la factura
      const dataFactura = {
        nroFact: {
          header: {
            nroId,
            nombres: nameuser,
            apellidos: lastNameUser,
            direccion: adressUser,
            email: emailUser
          },
          detailFact: products,
          sumary: {
            subtotal: parseFloat(productsComponent.shadowRoot.querySelector('#subtotal').textContent.split('$')[1]),
            iva: parseFloat(productsComponent.shadowRoot.querySelector('#iva').textContent.split('$')[1]),
            total: parseFloat(productsComponent.shadowRoot.querySelector('#total').textContent.split('$')[1])
          }
        }
      };

      // Llamar a la función getData de data.js y pasarle los datos de la factura
      getData(dataFactura).then(() => {
        console.log("Factura procesada y guardada con éxito:", dataFactura);
        alert("Factura guardada con éxito.");

        // Mostrar la factura procesada
        const facturaDisplay = document.createElement('div');
        facturaDisplay.innerHTML = `
          <h2>Factura N°: ${dataFactura.nroFact.header.nroId}</h2>
          <p><strong>Nombre:</strong> ${dataFactura.nroFact.header.nombres} ${dataFactura.nroFact.header.apellidos}</p>
          <p><strong>Email:</strong> ${dataFactura.nroFact.header.email}</p>
          <p><strong>Dirección:</strong> ${dataFactura.nroFact.header.direccion}</p>
          <h3>Productos:</h3>
          <ul>
            ${dataFactura.nroFact.detailFact.map(product => `
              <li>${product.nombreP} (Código: ${product.code}) - Cantidad: ${product.cantidad} - Subtotal: $${product.subtotal}</li>
            `).join('')}
          </ul>
          <p><strong>Subtotal:</strong> $${dataFactura.nroFact.sumary.subtotal}</p>
          <p><strong>IVA:</strong> $${dataFactura.nroFact.sumary.iva}</p>
          <p><strong>Total:</strong> $${dataFactura.nroFact.sumary.total}</p>
        `;
        document.body.appendChild(facturaDisplay); // Puedes agregar este div en cualquier lugar de tu HTML

        // Limpiar los campos del formulario
        headerComponent.shadowRoot.querySelector('#nroFactura').textContent = 'Factura N°:';
        headerComponent.shadowRoot.querySelector('#idUser') = '';
        headerComponent.shadowRoot.querySelector('#nameuser').value = '';
        headerComponent.shadowRoot.querySelector('#lastNameUser').value = '';
        headerComponent.shadowRoot.querySelector('#emailUser').value = '';
        headerComponent.shadowRoot.querySelector('#adressUser').value = '';
        
        productsTable.querySelectorAll('tr').forEach(row => {
          row.querySelectorAll('td').forEach(cell => {
            cell.textContent = '';
          });
          
        });

      }).catch((error) => {
        console.error("Error al guardar la factura:", error);
      });
    } catch (error) {
      console.error("Error en el procesamiento de la factura:", error);
      alert(error.message);
    }
  });
});
