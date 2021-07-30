$(document).ready(function() {
  console.log("Listo el DOM");
});
$(window).onload= function() {
  console.log("Se cargó todo, ¡incluyendo imagenes y archivos externos!");
};


//--------------------------------------------   
  


$(document).onload = function (){
  $("body").fadeIn();
};

//--------------------------------------------   
document.addEventListener('DOMContentLoaded', cargarDatos);

var carrito = localStorage.carrito ? JSON.parse(localStorage.carrito) : [];
var divCarrito = document.querySelector("#contenedor_carrito");
var divTotal = document.querySelector("#contenedor_total");

console.log(divCarrito);
console.log(divTotal);
//----------------------------------------------

// MIRO POR CONSOLA MI JSON

console.log(productos);

//---------------------------------------------

function cargarDatos(){

    const card = document.querySelector(".productos");
    cargarProd(productos,card);

} //CIERRE FUNCION CargarDatos


function cargarProd(cadena,tag){
    
    cadena.forEach(nombre=>{
        console.log(nombre.nombre);
        console.log(nombre.precio);
        console.log(nombre.img);
        
        let divgeneral = document.createElement("div");
        divgeneral.className="card col-sm-12 col-md-6 col-lg-4 col-xl-4";
        divgeneral.style="width: 18rem;"
         divgeneral.innerHTML=`<img class="img-fluid m-auto" src=${nombre.img} alt="${nombre.nombre}">
        <div class="card-body">
          <h2 class="card-title">${nombre.nombre}</h2>
          <div class="preboton">
          <p class="card-text precio valor">$ ${nombre.precio}</p>
          <button id="hover" class="add-cart" onclick="agregarACarrito(${productos.indexOf(nombre)})"><i class="fas fa-cart-plus"></i></button></div>
        </div>`;

        tag.appendChild(divgeneral);


    });
    

};


// AGREGAR AL CARRITO

function agregarACarrito(index) {
  $(divCarrito).empty();
  let producto = productos[index];
  if (carrito.length > 0) {
    var noExiste = true;
    
    for (let i = 0; i < carrito.length; i++) {
      if (producto.nombre === carrito[i].nombre) {
        carrito[i].cantidad++;
        noExiste = false;
      }
    }
    if (noExiste) {
      producto.cantidad = 1;
      carrito.push(producto);
    }
  } else {
    producto.cantidad = 1;
    carrito.push(producto);
  }


  loadCarrito();
  localStorage.carrito = JSON.stringify(carrito);
}


  //---------------------------------------------------

  function loadCarrito() {
    divCarrito.innerHTML = "";
    divTotal.innerHTML = "";
    carroVacio();
  
    if (carrito.length > 0) {
      let sumador = 0;
      carrito.forEach((producto) => {
        let divCar = document.createElement("div");
        divCar.className= "carrito"
        divCar.style = "clear:both; style:margin: 10px 0 0 0";
        divCar.innerHTML = `<img class="img-carrito" src="${producto.img}"> <h2>${producto.nombre}</h2> <p>$${
          producto.precio * producto.cantidad}</p><input name="${carrito.indexOf(
          producto)}" style="float:left; width:50px;   vertical-align: baseline;
        " value="${producto.cantidad}" onchange="inputChange(event)">
        <button style="float:left" onclick="removerCarrito(${carrito.indexOf(
          producto)})"><i class="fas fa-trash"></i></button>`;
        divCarrito.appendChild(divCar);
        sumador = sumador + (producto.precio * producto.cantidad);
      });
  

  let divTot = document.createElement("div");
      divTotal.className="total"
      divTot.style = "clear: both";
      divTot.innerHTML = `<h2>Total: $ ${sumador}</h2>
      <a class= "btn-dark" href="pedido.html">Confirmar compra</a>
      <a onclick="borrarCarrito()"> Borrar todo </a>`;
      divTotal.appendChild(divTot);
    }
  }

  //--------------------------------------------------------

  function removerCarrito(index) {
    carrito[index].cantidad = carrito[index].cantidad - 1;
    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1);
    }
    localStorage.carrito = JSON.stringify(carrito);
    loadCarrito();
  }

  function borrarCarrito(){
    
    // TAGS NECESARIAS PARA LA FUNCION

    let miCarrito = document.querySelectorAll(".carrito");
    let miTotal = document.querySelectorAll(".total");

    $(divCarrito).empty();
    localStorage.clear();
    $(miCarrito).empty();
    $(miTotal).empty();
    carrito = [];
    carroVacio();
  };

  //FILTRO DE BÚSQUEDA
  
  const busqueda = document.querySelector('#buscar');
  const botonBusqueda = document.querySelector('#botonBuscar');
  const resultado = document.querySelector('.productos');
  console.log(resultado);
  
  const filtrar = ()=>{
   
    resultado.innerHTML=''

    const text = busqueda.value.toLowerCase();
    for (let producto of productos){
      let divgeneral = document.createElement("div");
      let nombre = producto.nombre.toLowerCase();
      if (nombre.indexOf(text) !== -1){
        divgeneral.className="card col-sm-12 col-md-6 col-lg-4 col-xl-4";
        divgeneral.style="width: 18rem;"
        divgeneral.innerHTML += `<img class="img-fluid m-auto" src=${producto.img} alt="${producto.nombre}">
        <div class="card-body">
          <h2 class="card-title">${producto.nombre}</h2>
          <div class="preboton">
          <p class="card-text precio valor">$ ${producto.precio}</p>
          <button id="hover" class="add-cart" onclick="agregarACarrito(${productos.indexOf(producto)})"><i class="fas fa-cart-plus"></i></button></div>
        </div>`
        resultado.appendChild(divgeneral);
      }      
    };

        if (resultado.innerHTML === ''){
          let noEncontrado = document.createElement("div");
          noEncontrado.className = "noEncontrado"
          noEncontrado.innerHTML = `<h3> Producto no encontrado. ERROR 404 ... </h3>`
          resultado.appendChild(noEncontrado);
        }
      }
  
  busqueda.addEventListener('keyup', filtrar);

  function inputChange(e) {
    if (e.target.value == 0) {
      carrito.splice(e.target.name, 1);
    } else {
      carrito[e.target.name].cantidad = e.target.value;
    }
    loadCarrito();
    localStorage.carrito = JSON.stringify(carrito);
  }

  function carroVacio() {    
    if (carrito.length<=0){
      let carritoVacio = document.querySelector(".carritoVacio");
      if (carritoVacio === null){
    let divcarr = document.createElement("p");
    divcarr.className = "carritoVacio";
    divcarr.innerHTML = `Tu carrito está vacío. Agregá algo... ComéVeggie es bueno para tu salud.`;
    $(divCarrito).append(divcarr);
    };
  } 
}

