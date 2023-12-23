let listaImagenes = [];
let listaRazas = [];

function crearRaza(nombre){
	this.nombre;
	this.visto=0;
}

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

	//Contenedor para los filtros dentro del <main>
	const divFiltros = document.createElement("div");
	divFiltros.setAttribute('id','contenedor-filtros');
	divFiltros.classList.add("contenedor-filtros");
	document.querySelector("main").appendChild(divFiltros);

	const labelFiltro = document.createElement("label");
	labelFiltro.setAttribute('for','filtroRaza');
	labelFiltro.textContent="Filtrar por raza:";
	document.getElementById("contenedor-filtros").appendChild(labelFiltro);

	const selectRaza = document.createElement("select");
	selectRaza.setAttribute('id','filtroRaza');
	selectRaza.setAttribute('onchange','mostrarImagen()');
	selectRaza.classList.add("filtros");
	document.getElementById("contenedor-filtros").appendChild(selectRaza);

	const option = document.createElement("option");
	option.value=0;
	option.setAttribute('selected','selected');
	option.innerHTML="Todas las razas";
	document.getElementById("filtroRaza").appendChild(option);

	const labelFiltroSubraza = document.createElement("label");
	labelFiltroSubraza.setAttribute('for','filtroSubraza');
	labelFiltroSubraza.textContent="Filtrar por Subraza:";
	document.getElementById("contenedor-filtros").appendChild(labelFiltroSubraza);

	crearFiltroSubrazas();

	//Div principal
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

	obtenerDatosRazas("https://dog.ceo/api/breeds/list/all");

	mostrarImagen();
	

}

function crearFiltroSubrazas(){
	const parent = "filtroSubraza";

	const selectSubraza = document.createElement("select");
	selectSubraza.setAttribute('id','filtroSubraza');
	selectSubraza.setAttribute('onchange','mostrarImagen()');
	selectSubraza.classList.add("filtros");
	document.getElementById("contenedor-filtros").appendChild(selectSubraza);

	const optionSubraza = document.createElement("option");
	optionSubraza.length=1;
	optionSubraza.value=0;
	optionSubraza.text="-";
	//optionSubraza.setAttribute('selected','selected');
	document.getElementById("filtroSubraza").appendChild(optionSubraza);
}

function mostrarImagen(){
	const filterSelected =document.getElementById("filtroRaza");
	const filterSubrazaSelected = document.getElementById("filtroSubraza");

	let url="";

	if(filterSubrazaSelected.length===0){
		filterSubrazaSelected.length=1;
		filterSubrazaSelected.options[0].value=0;
		filterSubrazaSelected.options[0].text="Todas las razas";
	}else{
		obtenerDatosSubrazas();
		//Aquí hay que hacer algo para que el select de subraza ponga el valor selected
	
	}

	
	obtenerDatos();

	if(filterSelected.value==0 && filterSubrazaSelected.value==0){
		url="https://dog.ceo/api/breeds/image/random";
	}else if(filterSelected.value!=0 && filterSubrazaSelected.value==0){
		url=`https://dog.ceo/api/breed/${filterSelected.value}/images/random`;
		} else {		
			url=`https://dog.ceo/api/breed/${filterSelected.value}/${filterSubrazaSelected.value}/images/random`;
		}

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
  				try{
  					cargarImagen(json.message);
  				}catch (error){
  					console.log(`No se pudo cargar la imagen. Error: ${error}`);
  				}
  				  				
  			})
  			.catch(error => console.error(error))
	}catch (error){
		alert(`Ha habido un error: ${error}`);
	}
}

async function obtenerDatosRazas(url){
	try{
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
  				try{
  					for(let prop in json.message){
  						const option = document.createElement("option");
						option.value=prop;
						option.innerHTML=prop;
						document.getElementById("filtroRaza").appendChild(option);
  					}
  				}catch (error){
  					console.log(`No se pudo cargar la imagen. Error: ${error}`);
  				}
  				  				
  			})
  			.catch(error => console.error(error))
	}catch (error){
		alert(`Ha habido un error: ${error}`);
	}
}

async function obtenerDatosSubrazas(){
	try{
		let filterSelected =document.getElementById("filtroRaza");
		let filterSubraza = document.getElementById("filtroSubraza");
		let opcionSeleccionada = filterSubraza.options[filterSubraza.selectedIndex].value;

		if(filterSelected.value!=0){
			let url =`https://dog.ceo/api/breed/${filterSelected.value}/list`;

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
  				try{
  					if(json.message.length==0){
  						filterSubraza.length=1;
						filterSubraza.options[0].value=0;
						filterSubraza.options[0].text="-";
  					}else{
  						filterSubraza.length=1;
						filterSubraza.options[0].value=0;
						filterSubraza.options[0].text="Todas las subrazas";

  						for(let i=0;i<json.message.length;i++){
  							const option = document.createElement("option");
							option.value=json.message[i];
							option.text=json.message[i];

							if(option.value === opcionSeleccionada){
								option.selected = true;	
							}
							document.getElementById("filtroSubraza").appendChild(option);
  						}
  					}

  				}catch (error){
  					console.log(`No se pudo cargar la imagen. Error: ${error}`);
  				}
  				  				
  			})
  			.catch(error => console.error(error))
		}
	}catch (error){
		alert(`Ha habido un error: ${error}`);
	}
}

function cargarImagen(message){
	if(!listaImagenes.includes(message)){
		listaImagenes.push(message);
		console.log(`Array de imágenes: ${listaImagenes}`);
		let imagen = document.getElementById("imagen-contenedor");
		imagen.setAttribute('src',message);
	}else{
		console.log("La imagen ya se ha cargado anteriormente");
	}
	
}