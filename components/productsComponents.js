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
        color: rgb(56, 163, 192);
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
            <div class="col-6">
              <button type="button" class="btn btn-info" id="btnMore" name="btnMore">+</button>
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
            <input type="text" class="form-control" name="valorUnit" required>
          </div>
          <div class="col-6">
            <label class="form-label">Cantidad: </label>
            <input type="number" class="form-control" name="cantidad" required>
          </div>
        
        </div>
            <div id="productList"></div>
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
    const btnMore = this.shadowRoot.querySelector('#btnMore');
    const productList = this.shadowRoot.querySelector('#productList');

    // Evento para agregar un nuevo conjunto de campos
    btnMore.addEventListener('click', () => {
      const productField = document.createElement('div');
      productField.classList.add('product-fields');
      productField.innerHTML = /*html*/ `
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
            <input type="text" class="form-control" name="valorUnit" required>
          </div>
          <div class="col-6">
            <label class="form-label">Cantidad: </label>
            <input type="number" class="form-control" name="cantidad" required>
          </div>
          <div class="col-12 text-end mt-2">
            <button type="button" class="btn btn-danger">X</button>
          </div>
        </div>
      `;

      // Añadir el nuevo campo de producto a la lista
      productList.appendChild(productField);

      // Evento para eliminar el campo de producto
      const removeBtn = productField.querySelector('.btn-danger');
      removeBtn.addEventListener('click', () => {
        productField.remove();
      });
    });
  }
}

customElements.define('products-component', ProductsComponent);
