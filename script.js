
$(document).ready(function() {
    console.log("Listo el DOM");
});
$(window).on('load', function() {
    console.log("Se cargó todo, ¡incluyendo imagenes y archivos externos!");
});


let boton = document.getElementsByClassName( "btn btn-danger");

boton[0].onclick = () =>{agregarAlCarrito(0)};
boton[1].onclick = () =>{agregarAlCarrito(1)};     
boton[2].onclick = () =>{agregarAlCarrito(2)};
boton[3].onclick = () =>{agregarAlCarrito(3)};
boton[4].onclick = () =>{agregarAlCarrito(4)};
boton[5].onclick = () =>{agregarAlCarrito(5)};
boton[6].onclick = () =>{localStorage.clear()};

function activarPrecios() {
  
    let precio = document.getElementsByClassName("precio");
    precio[0].innerText = "$1000";
    precio[0].style.font = "italic bold 30px Georgia";
    precio[1].innerText = "$900";
    precio[1].style.font = "italic bold 30px Georgia";
    precio[2].innerText = "$1500";
    precio[2].style.font = "italic bold 30px Georgia";
    precio[3].innerText = "$1200";
    precio[3].style.font = "italic bold 30px Georgia";
    precio[4].innerText = "$950";
    precio[4].style.font = "italic bold 30px Georgia";
    precio[5].innerText = "$920";
    precio[5].style.font = "italic bold 30px Georgia";
    
   
}

activarPrecios();

let Productos = [
{ id: 1, nombre: "Ensalada Fattoush", precio: 1000, img:"img/ensalada fattoush.jpg",descripcion:"La ensalada fattoush es una receta típica de Siria, Palestina y Turquía del mediterráneo oriente." },
{ id: 2, nombre: "Escalativa Catalana Vegana", precio: 900, img:"img/ensaladacatalana1.jpg", descripcion:"La ensalada catalana es una ensalada típica de la gastronomía de Cataluña, es elaborada con lechuga, tomate, cebolla, aceitunas y a veces otras hortalizas y verduras." },
{ id: 3, nombre: "Vegetales Asados", precio: 1500, img:"img/vegetales asados.jpg", descripcion:"Las verduras y hortalizas cocinadas a la plancha o en la parrilla, son una excelente guarnición, y más que eso, son la mejor opción para comer sano y ligero, disfrutando del sabor más auténtico de estos productos y sin ingerir demasiadas calorías." },
{ id: 4, nombre: "Sushi Vegano", precio: 1200,img:"img/sushivegano.jpg", descripcion:"La Shiitake es una receta con un sabor fuerte y sabroso, a menudo se seca para ser utilizado en la elaboración de caldos. Cuando se utilizan en el sushi, las shiitake suelen estar ligeramente aderezadas con sal o salsa de soja y ligeramente flameadas para mejorar su fragancia. La jugosa textura y el rico sabor de las shiitake hacen de este sushi vegano un bocado extremadamente satisfactorio."},
{ id: 5, nombre: "Hamburgueza de Lentejas", precio: 950, img:"img/hamburguesa1.jpg", descripcion:"Hamburgueza de  lentejas elaborada con cereales y vegetales frescos, con suaves condimentos, sin harinas, sin conservantes, sin colorantes y sin grasas."},
{ id: 6, nombre: "Sandwich de Milanesa de Seitán", precio: 920, img:"img/sandwich_seitan.jpg",descripcion:"El seitán es un preparado a base de glúten de trigo, lo que le ha conferido el pseudónimo de 'carne vegetal'. Junto con el tofu y el tempeh, el seitán es un alimento rico en proteínas, a tener en cuenta en dietas vegetarianas o veganas para asegurar el aporte proteico." }
];



let carrito = [];
//funcion para agregar la propiedad cantidad al objeto literal para el carrito
function agregarItem(objeto) {
    console.log("Agregando objeto:");
    Object.defineProperty(objeto, 'cant', { value: 1, writable: true });
    carrito.push(objeto);
}
// Recorremos el array con for..of
for (const producto of Productos) {
    //Por cada producto además de los datos agregamos un botón 
    $("#app").append(`<div class="col-md-3">   
        <div class="card  " style="width: 18rem;">
            <img src="${producto.img}" class="card-img-top">
            <div class="card-body">
             <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text" >${producto.descripcion}</p>
                <h2>$ ${producto.precio}</h2>
                <a href="#" class="btn btn-danger" id="btn${producto.id}"><i class="bi bi-cart-plus"></i>  Agregar</a>
            </div>
        </div>
    </div>    `
                        
                        );
                       
    //Asociamos el evento a botón recién creado.
    $(`#btn${producto.id}`).on('click', () =>{
        console.log(`Agregaste ${producto.nombre}`);
        //modificiacion
        //find con funcion flecha y desestructuración
        let objetoBuscado = carrito.find(({ id }) => id == producto.id);
        //undefined si no lo encuentra
        console.log("El objeto:");
        console.log(objetoBuscado);
        //if ternario
        (objetoBuscado != undefined) ? objetoBuscado.cant++: agregarItem(productos[producto.id - 1]);
        console.log("Carrito:");
        console.log(carrito);
    });
}