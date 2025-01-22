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
    
    `;

    // Agregar el CSS y la plantilla al Shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  
    }
}

customElements.define('products-component', ProductsComponent);
