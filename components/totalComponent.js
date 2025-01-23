export class TotalComponent extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'})

        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'; 
    
        // Agregar la plantilla HTML del componente
        const template = document.createElement('template');
        template.innerHTML = /*html*/ `
   
        <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 id="subtotal" >Subtotal: </h2>
            <h3 id="iva">IVA (19%): </h3>
            <h4 id="total">Total: </h4>
          </div>
        </div>
      </div>
    </div>
   ` ;  
    // Agregar el CSS y la plantilla al Shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    };

};
customElements.define('total-component', TotalComponent);