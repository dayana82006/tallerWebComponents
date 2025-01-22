/*import '../../../Models/userModel.js';*/
export class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = /*html*/`
        <style>
        @import url('../components/header/styleHeader.css');
      </style>
        <div class="card-body">

        <div class="row">
          <div class="col-6">
            <h2 class="card-title">Registro Usuario</h2>
          </div>
          <div-col-6>
            <p id= "nroFactura">Nro factura: </p>
          </div-col-6>
        </div>
        <form>
          <div class="row">
            <div class="col-6">
              <label class="form-label">Nro Id: </label>
              <input class="form-control" type="text" name="idUsuario">

              <label for="nameuser" class="form-label">Nombre: </label>
              <input type="email" class="form-control" name="nameuser" id="nameuser">

            </div>
           
      
        </form>
        
      </div>
        `;
    }
    connectedCallback() {

    }

    
    
    
}
customElements.define("header-component",HeaderComponent);