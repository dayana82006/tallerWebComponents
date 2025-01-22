export class HeaderComponent extends HTMLElement {
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
      h2{
        color: rgb(77, 84, 148);
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
                <div class="col-6">
                  <label class="form-label">Nro Id:</label>
                  <input class="form-control" type="text" name="idUsuario">
                  <label for="nameuser" class="form-label">Nombre:</label>
                  <input class="form-control" type="text" name="nameuser" id="nameuser">
                  <label for="exampleInputEmail1" class="form-label">Email address:</label>
                  <input class="form-control" type="email" id="exampleInputEmail1">
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
  }
}

customElements.define('header-component', HeaderComponent);
