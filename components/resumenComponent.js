class ResumenComponent extends HTMLElement{
    constructor(){
     super();
     this.attachShadow({mode:'open'});
     
     //Crear el link para importar el CSS
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'; 

    // Agregar la plantilla HTML del componente
    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
   
    <table class="table">
    <thead>
      <tr>
        <th scope="col">Resumen de Compra</th>
       
      </tr>
      <tr>
        <th scope="col">Nro </th>
        <th scope="col">Nombre</th>
        <th scope="col">V unit</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Sub Total</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody class="table-group-divider">
      <tr>
        <th scope="row">001</th>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><button class="btn btn-secondary" id="eliminarProducto">X</button></td>
      </tr>
    </tbody>
  </table>

`;    
    // Agregar el CSS y la plantilla al Shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('resumen-component', ResumenComponent);