export class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Crear el link para importar el CSS
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'; 

    // Agregar la plantilla HTML del componente
    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
      <style>
        h2 {
          color: rgb(56, 163, 192);
          text-shadow: 2px 4px 4px rgb(196, 196, 196);
        }
      </style>
      <div class="container">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-6">
                <h2 class="card-title">Registro Usuario</h2>
              </div>
              <div class="col-6">
                <p id="nroFactura">Nro factura: </p>
              </div>
            </div>
            <form>
              <div class="row">
                <div class="col-12">
                  <label class="form-label">Nro Id:</label>
                  <input for="" class="form-control" type="text" name="idUser" id="idUser">
                </div>
                <div class="col-6"> 
                  <label for="nameuser" class="form-label">Nombre: </label>
                  <input class="form-control" type="text" name="nameuser" id="nameuser">
                </div>
                <div class="col-6">  
                  <label for="lastNameUser" class="form-label">Apellido: </label>
                  <input class="form-control" type="text" name="lastNameUser" id="lastNameUser">
                </div>
                <div class="col-6"> 
                  <label for="emailUser" class="form-label">Correo electronico: </label>
                  <input class="form-control" type="email" id="emailUser">
                </div>
                <div class="col-6">
                  <label for="adressUser" class="form-label">Direccion: </label>
                  <input class="form-control" type="text" id="adressUser">
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

  connectedCallback() {
    const nroFacturaElement = this.shadowRoot.querySelector('#nroFactura');
    
    // Obtener el último número de factura del localStorage
    let lastFactura = parseInt(localStorage.getItem('lastFactura')) || 0;
    lastFactura++;
    
    // Mostrar el número de factura en la interfaz
    nroFacturaElement.textContent = `Nro factura: ${String(lastFactura).padStart(3, '0')}`;
    
    // Guardar el nuevo número de factura en localStorage
    localStorage.setItem('lastFactura', lastFactura);
    
  }
}

customElements.define('header-component', HeaderComponent);
