export class ProductsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Crear el link para importar el CSS
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'; // O tu archivo CSS local

    // Agregar la plantilla HTML del componente
    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
    <style>
      h3 {
  
        text-shadow: 2px 4px 4px rgb(196, 196, 196);
      }
      .product-fields {
        margin-bottom: 10px;
      }
    </style>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-6">
              <h3>Producto</h3>
            </div>
          </div>
        </div>
        <div class="card-body">
          <form id="productForm">
            <div class="row">
              <div class="col-6">
                <label class="form-label">Cod Producto: </label>
                <input type="text" class="form-control" name="codeProduct" required>
              </div>
              <div class="col-6">
                <label class="form-label">Nombre del producto: </label>
                <input type="text" class="form-control" name="nameP" required>
              </div>
              <div class="col-6">
                <label class="form-label">Valor unit: </label>
                <input type="number" class="form-control" name="valorUnit" required>
              </div>
              <div class="col-6">
                <label class="form-label">Cantidad: </label>
                <input type="number" class="form-control" name="cantidad" required>
              </div>
            </div>
            <div class="col-12 mt-3">
              <button type="submit" class="btn btn-secondary">Agregar Producto</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    `;

    // Agregar el CSS y la plantilla al Shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const form = this.shadowRoot.querySelector('#productForm');

    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

      // Obtener los valores del formulario
      const codeProduct = form.querySelector('[name="codeProduct"]').value;
      const nameP = form.querySelector('[name="nameP"]').value;
      const valorUnit = form.querySelector('[name="valorUnit"]').value;
      const cantidad = form.querySelector('[name="cantidad"]').value;

      // Crear la fila de la tabla
      const table = document.getElementById('table'); // Aquí se asume que el contenedor de la tabla tiene el id="table"
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${codeProduct}</td>
        <td>${nameP}</td>
        <td>${valorUnit}</td>
        <td>${cantidad}</td>
        <td>${(valorUnit * cantidad).toFixed(2)}</td>
        <td><button type="button" class="btn btn-danger">X</button></td>
      `;

      // Agregar la fila a la tabla
      table.appendChild(row);

      // Limpiar el formulario después de agregar
      form.reset();

      // Agregar evento de eliminación en el botón "X"
      const removeBtn = row.querySelector('.btn-danger');
      removeBtn.addEventListener('click', () => {
        row.remove();
      });

      

    });
  }
}

customElements.define('products-component', ProductsComponent);
