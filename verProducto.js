window.addEventListener('DOMContentLoaded',function(){



	let __producto = $s('#producto_id').value;

	let producto;



	ajax({

		url: '../../Cafeterias_Landing_API/productos-router.php?id='+__producto,

		successCallback: function(rta)

		{

			let divWrapper = $s('#productoWrapper');

			divWrapper.innerHTML = '';



			producto = JSON.parse(rta).data;

			console.log(producto);

			if(producto.length == 0)

			{

				window.location = 'pageNotFound.php';

			}else

			{



				

				//let subTitulo = document.createElement('h3');

				let bodyProducto_container = document.createElement('div');

					bodyProducto_container.className = 'resumenC';

				let bodyProducto_producto_container = document.createElement('p');

					bodyProducto_producto_container.className = 'detalleResumenC';



				let tituloProducto = document.createElement('h1');

					tituloProducto.innerHTML = producto[0].nombre;



				let formSolicitar = document.createElement('form');

					formSolicitar.className = "normal-search";

				let formDiv = document.createElement('div');

					formDiv.className = "paddingleft0 margintop20";

				let formButton = document.createElement('button');

					formButton.id = "search-input";

					formButton.className = "searchbarbutton heightsearch";

					formButton.innerHTML = "Solicitar";

				let blankSpace = document.createElement('br');



				let productoPrecio = document.createElement('p');

				let productoValue = document.createElement('span');

					productoValue.className = 'currentprice';

					productoValue.innerHTML = '$'+producto[0].precio;

				let productoDescripcion = document.createElement('p');	

				let productoCategoria = document.createElement('p');	

					productoPrecio.innerHTML = 'Precio: ';

					productoPrecio.appendChild(productoValue);

					productoDescripcion.innerHTML = 'Sobre el producto: '+producto[0].descripcion;

					productoCategoria.innerHTML = 'Categoria: '+producto[0].categoria;



				let imgWrapper = document.createElement('div');

					imgWrapper.className = 'imgnota';

				let img = document.createElement('img');

					img.src = '../img/products/'+producto[0].img_portada;
					img.style.height = '500px';
					img.style.width = '500px';



				divWrapper.appendChild(bodyProducto_container);

				bodyProducto_container.appendChild(bodyProducto_producto_container);

				bodyProducto_producto_container.appendChild(tituloProducto);

				bodyProducto_producto_container.appendChild(formSolicitar);

				formSolicitar.appendChild(formDiv);

				formSolicitar.appendChild(formButton);

				bodyProducto_producto_container.appendChild(blankSpace);

				bodyProducto_producto_container.appendChild(productoPrecio);

				bodyProducto_producto_container.appendChild(productoDescripcion);

				bodyProducto_producto_container.appendChild(productoCategoria);

				bodyProducto_container.appendChild(imgWrapper);

				imgWrapper.appendChild(img);

			}

			









		}



	});



});