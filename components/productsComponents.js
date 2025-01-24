export class ProductsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';

    this.productsList = [
      { code: '001', name: 'Manzana', unitPrice: 3.3 },
      { code: '002', name: 'Pera', unitPrice: 3.5 },
      { code: '003', name: 'Durazno', unitPrice: 2.5 },
      { code: '004', name: 'Fresa', unitPrice: 10.2 },
    ];

    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
    <style>
      h3 {
        text-shadow: 2px 2px 4px rgb(196, 196, 196);
      }
    </style>
    <div class="container">
      <!-- Formulario de Producto -->
      <div class="card mt-3">
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
                <input type="text" class="form-control" name="codeProduct" required readonly>
              </div>
              <div class="col-6">
                <label class="form-label">Nombre del producto: </label>
                <select class="form-control" name="nameP" required>
                  <option value="" disabled selected>Selecciona un producto</option>
                  ${this.productsList.map(product => `<option value="${product.name}">${product.name}</option>`).join('')}
                </select>
              </div>
              <div class="col-6">
                <label class="form-label">Valor unit: </label>
                <input type="number" class="form-control" name="valorUnit" required readonly>
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

      <!-- Tabla de Productos -->
      <table id="table" class="table table-striped mt-3">
        <thead>
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Valor Unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>

      <!-- Resumen de Totales -->
      <div id="divTotal" class="mt-3">
        <div class="row">
          <div class="col-12">
            <h2 id="subtotal">Subtotal: $0.00</h2>
            <h3 id="iva">IVA (19%): $0.00</h3>
            <h4 id="total">Total: $0.00</h4>
          </div>
        </div>
      </div>
    </div>
    `;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    const form = this.shadowRoot.querySelector('#productForm');
    const codeInput = form.querySelector('[name="codeProduct"]');
    const nameSelect = form.querySelector('[name="nameP"]');
    const priceInput = form.querySelector('[name="valorUnit"]');
    const table = this.shadowRoot.querySelector('#table tbody');
    const divTotal = this.shadowRoot.querySelector('#divTotal');
  
    const formatCurrency = (value) => new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(value);
  
    const updateTotals = () => {
      let subtotal = 0;
      table.querySelectorAll('tr').forEach(row => {
        const subTotalP = parseFloat(row.querySelector('td:nth-child(5)').textContent);
        subtotal += subTotalP;
      });
  
      const iva = subtotal * 0.19;
      const total = subtotal + iva;
  
      this.shadowRoot.querySelector('#subtotal').textContent = `Subtotal: ${formatCurrency(subtotal)}`;
      this.shadowRoot.querySelector('#iva').textContent = `IVA (19%): ${formatCurrency(iva)}`;
      this.shadowRoot.querySelector('#total').textContent = `Total: ${formatCurrency(total)}`;
    };
  
    nameSelect.addEventListener('change', () => {
      const selectedProduct = this.productsList.find(product => product.name === nameSelect.value);
      if (selectedProduct) {
        codeInput.value = selectedProduct.code;
        priceInput.value = selectedProduct.unitPrice;
      }
    });
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const codeProduct = codeInput.value;
      const nameP = nameSelect.value;
      const valorUnit = parseFloat(priceInput.value);
      const cantidad = parseInt(form.querySelector('[name="cantidad"]').value);
  
      if (!nameP) {
        alert("Por favor, selecciona un producto.");
        return;
      }
      if (cantidad <= 0) {
        alert("La cantidad debe ser mayor a 0.");
        return;
      }
  
      const existingRow = Array.from(table.querySelectorAll('tr')).find(row => row.querySelector('td').textContent === codeProduct);
      if (existingRow) {
        const cantidadCell = existingRow.querySelector('td:nth-child(4)');
        const subtotalCell = existingRow.querySelector('td:nth-child(5)');
  
        const nuevaCantidad = parseInt(cantidadCell.textContent) + cantidad;
        cantidadCell.textContent = nuevaCantidad;
        subtotalCell.textContent = (valorUnit * nuevaCantidad).toFixed(2);
  
        updateTotals();
        return;
      }
  
      const subTotalP = (valorUnit * cantidad).toFixed(2);
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${codeProduct}</td>
        <td>${nameP}</td>
        <td>${valorUnit}</td>
        <td>${cantidad}</td>
        <td>${subTotalP}</td>
        <td><button type="button" class="btn btn-danger">X</button></td>
      `;
      table.appendChild(row);
  
      form.reset();
      codeInput.value = '';
      priceInput.value = '';
  
      const removeBtn = row.querySelector('.btn-danger');
      removeBtn.addEventListener('click', () => {
        row.remove();
        updateTotals();
      });
  
      updateTotals();
    });
  }
  }


customElements.define('products-component', ProductsComponent);
