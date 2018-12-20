window.addEventListener("DOMContentLoaded",function(){



	let ProductosLista;



	let articleWrapper = $s('#article_wrapper_products');



/*	var verNota = function()

	{

		let linkbeableRead = document.querySelectorAll('.viewNote');



		for(let i = 0; i < linkbeableRead.length; i++)

		{

			linkbeableRead[i].addEventListener('click',function(e){

				e.preventDefault();

				let __nota = linkbeableRead[i].href.substr(this.href.lastIndexOf('/')+1); 

				







			});

		}

	}*/



	var showProductos = function()

	{

		articleWrapper.innerHTML = '';

		ajax({

			url: '../../Cafeterias_Landing_API/productos-router.php?productos=true',

			successCallback: function(rta)

			{

				ProductosLista = JSON.parse(rta).data;

				console.log(ProductosLista);

				for(let arr = 0; arr < ProductosLista.length; arr ++)

				{

					let divWrapper = document.createElement('div');

						divWrapper.className = 'first-item';

					let divImgContainer = document.createElement('div');

					let linkImgContainer = document.createElement('a');

						linkImgContainer.href = 'verProducto.php?id='+ProductosLista[arr].id;

						linkImgContainer.className = 'viewProduct';

					let imgContainer = document.createElement('img');

						imgContainer.src = '../img/products/'+ProductosLista[arr].img_portada;

						imgContainer.style.height = '400px';
						imgContainer.style.width = '400px';



					let tituloNota = document.createElement('h3');

						tituloNota.innerHTML = ProductosLista[arr].nombre;

					let separator = document.createElement('hr');



					let divDescContainer = document.createElement('div');

						divDescContainer.className = 'desc-recommended';

					let paragraphCafeteria = document.createElement('p');

						paragraphCafeteria.innerHTML = 'Precio: $'+ProductosLista[arr].precio;

					let paragraphCreation = document.createElement('p');

						paragraphCreation.innerHTML = 'Categoria: '+ProductosLista[arr].categoria;

					let linkRead = document.createElement('a');

						linkRead.innerHTML = 'Ver Producto';

						linkRead.href = 'verProducto.php?id='+ProductosLista[arr].id;

						linkRead.className = 'viewProduct';



						articleWrapper.appendChild(divWrapper);

						divWrapper.appendChild(divImgContainer);



						divImgContainer.appendChild(linkImgContainer);

						linkImgContainer.appendChild(imgContainer);



						divWrapper.appendChild(tituloNota);

						divWrapper.appendChild(separator);

						divWrapper.appendChild(divDescContainer);



						divDescContainer.appendChild(paragraphCafeteria);

						divDescContainer.appendChild(paragraphCreation);

						divDescContainer.appendChild(linkRead);



				}



			}

		});

	}



	showProductos();



});