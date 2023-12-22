# Api-Dog

Usando la API de perros (https://dog.ceo/dog-api/) y con un HTML que debe tener el body vacío (sólo se permite tener etiquetas script en caso necesario), realiza las siguientes tareas usando Javascript:

Incluye dos botones en HTML, uno para mostrar una imagen y otro para eliminarla, en cuanto termine la carga de la página.

Realiza la función mostrar imagen (asociada al botón mostrar), que incluye una imagen de un perro random en el HTML usando una etiqueta img. La imagen del perro no se puede repetir, si la API nos da una imagen que ya se ha mostrado al usuario, debemos pedirle otra.

Realiza la función eliminar imagen (asociada al botón eliminar), que debe borrar la etiqueta img del HTML y su contenido.

No puede haber en el HTML más de una etiqueta img, es decir, si el usuario pulsa dos veces en el botón de mostrar, lo que se hará es sobreescribir el src de la imagen.

El borrado se debe realizar eliminando el nodo del árbol, no es suficiente con ocultarlo
