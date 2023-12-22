function init(){
	// creo <header>, <main> y <footer> dentro del body
	const newheader = document.createElement("header");
	const newmain = document.createElement("main");
	const newfooter = document.createElement("footer");

	document.querySelector("body").appendChild(newheader);
	document.querySelector("body").appendChild(newmain);
	document.querySelector("body").appendChild(newfooter);

	//Creo la estructura del header
	const h1Header = document.createElement("h1");
	document.querySelector("header").appendChild(h1Header);

	const linkHeader = document.createElement("a");
	linkHeader.setAttribute('href','./index.html');
	linkHeader.textContent="Dog Api";
	document.querySelector("header>h1").appendChild(linkHeader);

	//Creo la estructura del footer
	const h2Footer = document.createElement("h2");
	document.querySelector("footer").appendChild(h2Footer);
	const h3Footer = document.createElement("h3");
	document.querySelector("footer").appendChild(h3Footer);

	const linkFooter = document.createElement("a");
	linkFooter.setAttribute('href','./index.html');
	linkFooter.textContent="Dog Api";
	document.querySelector("footer>h2").appendChild(linkFooter);
		
	h3Footer.innerHTML="Disfruta de las imágenes de perritos"

	//Creo la estructura que contendra el main
	//Contenedor para la imagen dentro del <main>
	const divContenedor = document.createElement("div");
	divContenedor.setAttribute('id','contenedor');
	divContenedor.classList.add("contenedor");
	document.querySelector("main").appendChild(divContenedor);

	const imagen = document.createElement("img");
	imagen.setAttribute('id','imagen-contenedor');
	imagen.setAttribute('alt','Pulse el botón para cargar imágenes');
	document.querySelector(".contenedor").appendChild(imagen);

	//Contenedor para los botones dentro del <main>
	const divBotones = document.createElement("div");
	divBotones.setAttribute('id','contenedor-botones');
	divBotones.classList.add("contenedor-botones");
	document.querySelector("main").appendChild(divBotones);
	
	//Botón para mostrar imagen
	const btnMostrar = document.createElement("button");
	btnMostrar.classList.add("boton");
	btnMostrar.setAttribute('type','submit');
	btnMostrar.setAttribute('onclick','mostrarImagen()');
	btnMostrar.innerHTML="Mostrar imagen";
	document.querySelector(".contenedor-botones").appendChild(btnMostrar);

	//Botón para eliminar imagen
	const btnEliminar = document.createElement("button");
	btnEliminar.classList.add("boton");
	btnEliminar.setAttribute('type','submit');
	btnEliminar.setAttribute('onclick','eliminarImagen()');
	btnEliminar.innerHTML="Eliminar imagen";
	document.querySelector(".contenedor-botones").appendChild(btnEliminar);
}

function mostrarImagen(){
	const url="https://dog.ceo/api/breeds/image/random";
	let imagen = document.getElementById("imagen-contenedor");

	//Compruebo que el elemento imagen está creado
	if(!imagen){
		const nuevaImagen = document.createElement("img");
		nuevaImagen.setAttribute('id','imagen-contenedor');
		nuevaImagen.setAttribute('alt','Pulse el botón para cargar imágenes');
		document.querySelector(".contenedor").appendChild(nuevaImagen);
	}

	recogerDatos(url);

}

function eliminarImagen(){
	const parent = document.querySelector(".contenedor");
	const child =  document.getElementById("imagen-contenedor");

	try{
		parent.removeChild(child);
	}catch (error){
		console.log(`No se puede borrar el elemento imagen porque éste no existe en el nodo contenedor: ${error}`);
	}

}

function recogerDatos(url){
	if (typeof(Storage) !== "undefined") {
    	obtenerDatos(url);
    } else {
    	console.log("El navegador no es compatible con localStorage");
    }
}

async function obtenerDatos(url){
	try{
		console.log('obtenerDatos');
		await fetch(url)
  			.then(response => {
  				if(response.ok){
  					console.log('response ok');
  					return response.json();
  				}

  				reject(
  					"No hemos podido recuperar ese json. El código de respuesta es: " + response.status
  				);
  			})
  			.then(json=>{
  				console.log(json.message);
  				cargarImagen(json.message);  				
  			})
  			.catch(error => console.error(error))
	}catch (error){
		alert(`Ha habido un error: ${error}`);
	}
}

function cargarImagen(message){
	let imagen = document.getElementById("imagen-contenedor");
	imagen.setAttribute('src',message);
}