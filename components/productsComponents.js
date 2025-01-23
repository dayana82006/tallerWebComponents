export class ProductsComponent extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});

    // Crear el link para importar el CSS
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'; // O tu archivo CSS local

    // Agregar la plantilla HTML del componente
    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
    
    <style>
      h3{
        color: rgb(56, 163, 192);
        text-shadow: 2px 4px 4px rgb(196, 196, 196);
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
          <form>
             <div class="row">
                <div class="col-6">
                  <label class="form-label">Cod Producto: </label>
                  <input for="codProducto" type="text" class="form-control name=" codeProduct" id="codeProduct">
                </div>
                <div class="col-6">
                  <label class="form-label">Nombre del producto: </label>
                  <input type="text" for="nameP" name="nameP" id="nameP" class="form-control">
                </div>
                <div class="col-6">
                  <label class="form-label">Valor unit: </label>
                  <input type="text" class="form-control" name="valorUnit" id="valorUnit" for="valorUnit">
                </div>
                <div class="col-6">
                  <label class="form-label">Cantidad: </label>
                  <input type="number" class="form-control" name="cantidad" id="cantidad" for="cantidad">
                </div>      
              </div>
          </form>
        </div>
      </div>
    </div>
    `;

    // Agregar el CSS y la plantilla al Shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  
    };
    connectedCallback(){
      const btnMore = this.shadowRoot.querySelector('#btnMore');

    }
};
 

customElements.define('products-component', ProductsComponent);
