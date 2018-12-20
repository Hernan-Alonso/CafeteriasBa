window.addEventListener("DOMContentLoaded",function(){



    let categoriasCompletas;



    /***

     * Peticion Ajax que devuelve todas las categorias de productos

     */

    

    ajax({

        url:'../../Cafeterias_Landing_API/categoria-router.php',

        successCallback: function(rta)

        {

            let ajaxData = JSON.parse(rta);



            categoriasCompletas = ajaxData.data;

        }

    });



    let flagCrud = true;

    let messageInfo = document.createElement('p');

    let productosTab = $s('#productos');

    let tablaDashboard = $s('#listado-dashboard');

    let divAddProducto = document.createElement('div');

    divAddProducto.className = 'divButton';

    let linkAddProducto = document.createElement('a');

    linkAddProducto.href = '#';

    linkAddProducto.id = "crear-p";

    linkAddProducto.innerHTML = 'Añadir Producto';

    let crudForm = $s('#crudForm');

    let divShow = $s('#divShow');

    let tableHeader = $s('#headerTable');

    let tableBody = $s('#bodyTable');

    let divContainer = $s('.text-dashboard');

    let preHeader = $s('.page-bg-wrapper').getElementsByTagName('h1')[0];

    /**

     * Funcion Editar - Recibe el producto del listado y llama por peticion AJAX al router del controlador.

     * @param producto

     */

    let editFunction = function(producto){

        //TODO: Eliminar y Editar;



        let editarProducto = $s('#editar-p');

        editarProducto.addEventListener("click",function(){

            let formEdit = document.createElement('form');

            preHeader.innerHTML = 'Editar Producto';

            formEdit.action = '../../Cafeterias_Landing_API/crud-router.php';

            //console.log("clicked me to edit: "+producto.horario_apertura);

            divShow.className = 'listado-oculto';

            messageInfo.innerHTML = '';

            crudForm.className = '';

            crudForm.id = 'editarForm';

            let inputNombre = document.createElement('input');

            inputNombre.name = "nombre";

            inputNombre.type = "text";

            inputNombre.value = producto.nombre;

            let inputPrecio = document.createElement('input');

            inputPrecio.name = "precio";

            inputPrecio.type = "number";

            inputPrecio.value = producto.precio;

            let inputImg = document.createElement('input');

            inputImg.name = "imagen_portada";
            inputImg.type = "file";
            inputImg.accept = '.jpg'; 
            inputImg.id = 'fileNew';       

            let inputCategoria = document.createElement('select');

            inputCategoria.name = "categoria";

            inputCategoria.className = 'select-crud';

            let inputDescripcion = document.createElement('textarea');

            inputDescripcion.name = "descripcion";

            inputDescripcion.value = producto.descripcion;

            inputDescripcion.className = 'descriptionArea';

            inputDescripcion.cols = '60';

            inputDescripcion.rows = '5';

            if(flagCrud == true)

            {

                let divContainer = document.createElement('div');

                divContainer.className = "wrapper-form";

                let labelNombre = document.createElement('label');

                labelNombre.innerHTML = "Nombre: ";

                let labelPrecio = document.createElement('label');

                labelPrecio.innerHTML = "Precio en AR$: ";

                let labelImg = document.createElement('label');

                labelImg.innerHTML = "Imagen de Portada: ";

                let divImgs = document.createElement("div");
                    divImgs.style.display = 'flex';
                    divImgs.style.flexFlow = 'row nowrap';
                    divImgs.style.justifyContent = 'space-evenly';
                    divImgs.style.width = '100%';
                    divImgs.style.boxShadow = 'none';

                let spanOldImg = document.createElement("span");
                    spanOldImg.innerHTML = 'foto anterior: ';
                    spanOldImg.style.display = 'block';

                let imgPrev = document.createElement('img');
                //imgPrev.alt = 'preview_de_imagen';
                imgPrev.id = 'preview';    
                imgPrev.style.width = '70px';
                imgPrev.style.height = '70px';
                imgPrev.style.display = 'block';
                imgPrev.src = '../img/products/'+producto.img_portada;


                let spanNewImg = document.createElement("span");
                    spanNewImg.innerHTML = 'foto nueva: ';

                let imgPrevNew = document.createElement('img');
                //imgPrev.alt = 'preview_de_imagen';
                imgPrevNew.id = 'previewNew';    
                imgPrevNew.style.width = '70px';
                imgPrevNew.style.height = '70px';
                imgPrevNew.style.display = 'block';

                let divFirst = document.createElement('div');

                let labelCategoria = document.createElement('label');

                labelCategoria.innerHTML = "Categoria: ";

                let labelDescripcion = document.createElement('label');

                labelDescripcion.innerHTML = "Descripcion: ";

                let divSecond = document.createElement('div');

                let divForth= document.createElement('div');

                divForth.className = 'divButton';



                let editButton = document.createElement('input');

                editButton.type = 'submit';

                editButton.value = "Actualizar Producto";



                crudForm.appendChild(formEdit);

                formEdit.appendChild(messageInfo);

                formEdit.appendChild(divContainer);

                formEdit.appendChild(divForth);

                divContainer.appendChild(divFirst);

                divFirst.appendChild(labelNombre);

                divFirst.appendChild(labelPrecio);

                divFirst.appendChild(labelImg);

                divFirst.appendChild(divImgs);

                divFirst.style.width = "50%";

                divContainer.appendChild(divSecond);

                divSecond.appendChild(labelCategoria);

                divSecond.appendChild(labelDescripcion);

                divSecond.style.width = "50%";

                labelNombre.appendChild(inputNombre);

                labelPrecio.appendChild(inputPrecio);

                labelImg.appendChild(inputImg);

                divImgs.appendChild(spanOldImg);

                divImgs.appendChild(imgPrev);

                divImgs.appendChild(spanNewImg);

                divImgs.appendChild(imgPrevNew);

                labelCategoria.appendChild(inputCategoria);

                for(let i = 0; i<categoriasCompletas.length;i++)

                {

                    let optionCategoria = document.createElement('option');

                    optionCategoria.value = categoriasCompletas[i].id_categoria_producto;

                    optionCategoria.innerHTML = categoriasCompletas[i].descripcion;

                    inputCategoria.appendChild(optionCategoria);

                    if(optionCategoria.value == producto.fk_categoria)

                    {

                        optionCategoria.selected = true;

                    }

                    else

                    {

                        optionCategoria.selected = false;

                    }

                }

                labelDescripcion.appendChild(inputDescripcion);

                divForth.appendChild(editButton);

                flagCrud = false;

            }

            //TODO: Enviar el formulario para EDITAR

            /***

             * Evento submit para realizar la peticion ajax de la edicion

             */
             document.getElementById('fileNew').onchange = function()
            {

            var readPrev = new FileReader();
                readPrev.onload = function(e)
                {
                    document.getElementById('previewNew').src = e.target.result;
                    
                };
            readPrev.readAsDataURL(this.files[0]);   
            //imgPrev.style.display = 'block'; 
            }
            formEdit.addEventListener("submit",function(ev){

                ev.preventDefault();

               // console.log("editar: "+producto.id);

                if(inputPrecio.value != ''&& inputNombre.value != '' && inputCategoria.value != '' && inputDescripcion.value)

                {

                    var base64Img = null;
                    if(inputImg.value != '')
                    {
                        var ImgUploadedvalue = inputImg.value;
                        var imgUrls = ImgUploadedvalue.split('\\');
                        var imgRealName = imgUrls[imgUrls.length-1];
                        var imgSeparated = imgRealName.split('.');
                        var imgExtension = imgSeparated[imgSeparated.length-1];
                            imgExtension = imgExtension.toUpperCase();
                    if(imgExtension == 'JPG')
                        {
                            let streamImg = inputImg.files[0];
                            //console.log(streamImg);
                            var reader = new FileReader();
                            reader.onload = callbackRd;
                            reader.readAsDataURL(streamImg);
                          function callbackRd()
                            {

                                base64Img = reader.result;

                                let dataForm =

                                {

                                    idproducto: producto.id,

                                    nombre: inputNombre.value,

                                    precio: inputPrecio.value,

                                    fk_categoria: inputCategoria.value,

                                    descripcion: inputDescripcion.value,

                                    img_portada: streamImg.name,

                                    old_img : producto.img_portada,

                                    stream_img : base64Img,

                                    crud: 'producto'

                                };

                               // console.log(dataForm);

                                ajax({

                                    method:'PUT',

                                    url: '../../Cafeterias_Landing_API/crud-router.php',

                                    data: JSON.stringify(dataForm),

                                    successCallback: function(rta)

                                    {



                                        let EditeddataBack = JSON.parse(rta).data;

                                        //console.log(EditeddataBack);

                                        let divContainerModal = document.createElement("div");

                                        divContainerModal.className = "modalWrapper";

                                        let divModal = document.createElement("div");

                                        divModal.className = "modal";

                                        let textoInfo = document.createElement("p");

                                        textoInfo.innerHTML = "Producto Actualizado correctamente";

                                        let body = document.getElementsByTagName("body")[0];

                                        body.appendChild(divContainerModal);

                                        divContainerModal.appendChild(divModal);

                                        divModal.appendChild(textoInfo);

                                        inputNombre.value = "";

                                        inputPrecio.value = "";

                                        inputDescripcion.value = "";

                                        textoInfo.style.color = "#197328";

                                        divModal.style.transition = "all .35s";

                                        divModal.style.width = "35%";

                                        setTimeout(function() {

                                            divContainerModal.innerHTML = "";

                                            body.removeChild(divContainerModal);

                                        }, 2000);



                                        showTableProductos();

                                    }

                                });

                            }
                        }
                        else
                        {
                            messageInfo.className = "msgErr";

                            messageInfo.innerHTML = 'La extensión de la imagen debe ser JPG.';
                        }
                    }else
                    {
                       let dataForm =

                                {

                                    idproducto: producto.id,

                                    nombre: inputNombre.value,

                                    precio: inputPrecio.value,

                                    fk_categoria: inputCategoria.value,

                                    descripcion: inputDescripcion.value,

                                    img_portada: producto.img_portada,

                                    stream_img : base64Img,

                                    crud: 'producto'

                                };

                               // console.log(dataForm);

                                ajax({

                                    method:'PUT',

                                    url: '../../Cafeterias_Landing_API/crud-router.php',

                                    data: JSON.stringify(dataForm),

                                    successCallback: function(rta)

                                    {



                                        let EditeddataBack = JSON.parse(rta).data;

                                        //console.log(EditeddataBack);

                                        let divContainerModal = document.createElement("div");

                                        divContainerModal.className = "modalWrapper";

                                        let divModal = document.createElement("div");

                                        divModal.className = "modal";

                                        let textoInfo = document.createElement("p");

                                        textoInfo.innerHTML = "Producto Actualizado correctamente";

                                        let body = document.getElementsByTagName("body")[0];

                                        body.appendChild(divContainerModal);

                                        divContainerModal.appendChild(divModal);

                                        divModal.appendChild(textoInfo);

                                        inputNombre.value = "";

                                        inputPrecio.value = "";

                                        inputDescripcion.value = "";

                                        textoInfo.style.color = "#197328";

                                        divModal.style.transition = "all .35s";

                                        divModal.style.width = "35%";

                                        setTimeout(function() {

                                            divContainerModal.innerHTML = "";

                                            body.removeChild(divContainerModal);

                                        }, 2000);



                                        showTableProductos();

                                    }

                                });  
                    }
                }
                else
                {

                    messageInfo.className = "msgErr";

                    messageInfo.innerHTML = 'Existen datos vacios, por favor completar todos los campos.';

                }

            });

        });

    };

    /**

     * Funcion Borrar que recibe como parametro el producto del listado a borrar.

     * @param producto

     */

    let borrarFunction = function(producto){



        let borrarButton = $s('#borrar-p');

        borrarButton.addEventListener("click",function(){



            // console.log("eliminar: "+producto.id);

            let divContainerModal = document.createElement("div");

            divContainerModal.className = "modalWrapper";

            let divModal = document.createElement("div");

            divModal.className = "modal";

            let textoInfo = document.createElement("p");

            textoInfo.innerHTML = "Estas seguro que queres borrar el producto?";

            let confirmarBorrar = document.createElement("a");

            confirmarBorrar.href = "#";

            confirmarBorrar.innerHTML = "Borrar";

            let cancelarBorrar = document.createElement("a");

            cancelarBorrar.href = "#";

            cancelarBorrar.innerHTML = "Cancelar";

            let body = document.getElementsByTagName("body")[0];

            body.appendChild(divContainerModal);

            divContainerModal.appendChild(divModal);

            divModal.appendChild(textoInfo);

            divModal.appendChild(confirmarBorrar);

            divModal.appendChild(cancelarBorrar);





            cancelarBorrar.addEventListener("click",function(){

                divContainerModal.innerHTML = "";

                body.removeChild(divContainerModal);

            });

            /**

             * evento onclick dispara funcion Ajax para realizar una eliminacion "LOGICA" en la base de datos.

             */

            confirmarBorrar.addEventListener("click",function(){

                //console.log("eliminar: "+producto.id);

                let idToDelete = producto.id;

                ajax({

                    method:'DELETE',

                    url: '../../Cafeterias_Landing_API/productos-router.php',

                    data: 'id='+idToDelete,

                    successCallback: function(rta){

                        console.log(rta);

                        textoInfo.innerHTML = "Producto Eliminado Satisfactoriamente";

                        textoInfo.style.color = "#197328";

                        divModal.style.transition = "all .35s";

                        divModal.style.width = "35%";

                        divModal.removeChild(confirmarBorrar);

                        divModal.removeChild(cancelarBorrar);

                        setTimeout(function() {

                            divContainerModal.innerHTML = "";

                            body.removeChild(divContainerModal);

                        }, 2000);



                        showTableProductos();



                    }



                });

            });



        });



    };

    /**

     * funcion para ver el producto que se clickeo. peticion Ajax envia el ID del producto clickeado para ver.

     */

    let verProductoId = function()

    {

        divShow.innerHTML = '';

        let rowItems = tableBody.getElementsByTagName('tr');

        for(let iteracion = 0; iteracion < rowItems.length;iteracion++)

        {

            rowItems[iteracion].addEventListener("click",function(){

                let idToSee = this.firstChild.innerHTML;

                //console.log(idToSee);

                ajax({

                    url:'../../Cafeterias_Landing_API/productos-router.php',

                    data: 'id='+idToSee,

                    successCallback: function(rta)

                    {

                        //console.log(JSON.parse(rta).data[0]);

                        let producto = JSON.parse(rta).data[0];

                        tablaDashboard.className = 'listado-oculto';

                        divAddProducto.className = 'listado-oculto';

                        divShow.className = 'showID';

                        preHeader.innerHTML = 'Detalle de Producto';

                        let divContainer = document.createElement('div');

                        divContainer.className = 'show-wrapper';

                        let divColumnOne = document.createElement('div');

                        let divColumnTwo = document.createElement('div');

                        let divColumnFour = document.createElement('div');

                        divColumnFour.className = 'columnFourHeader';

                        let linkEdit = document.createElement('a');

                        linkEdit.href = '#';

                        linkEdit.innerHTML = 'Editar Producto';

                        linkEdit.id = 'editar-p';

                        let linkBorrar = document.createElement('a');

                        linkBorrar.href = '#';

                        linkBorrar.innerHTML = 'Eliminar Producto';

                        linkBorrar.id = 'borrar-p';

                        let divTitleInfo = document.createElement('div');

                        divTitleInfo.className = 'titleInfoShow';

                        let titleInfo = document.createElement('h1');

                        titleInfo.innerHTML = "Datos del Producto";

                        let divInfoContainerNombre = document.createElement('div');

                        let divInfoContainerPrecio = document.createElement('div');

                        let divInfoContainerDescripcion= document.createElement('div');

                        let divInfoContainerCategoria= document.createElement('div');

                        

                        let titleNombre = document.createElement('h2');

                        titleNombre.innerHTML = "Nombre:";

                        let titlePrecio = document.createElement('h2');

                        titlePrecio.innerHTML = "Precio:";

                        let titleDescripcion = document.createElement('h2');

                        titleDescripcion.innerHTML = "Descripcion:";

                        let titleCategoria = document.createElement('h2');

                        titleCategoria.innerHTML = "Categoria:";

                        

                        let textNombre = document.createElement('p');

                        textNombre.innerHTML = producto.nombre;

                        let textPrecio = document.createElement('p');

                        textPrecio.innerHTML = "$ "+producto.precio;

                        let textDescripcion = document.createElement('p');

                        textDescripcion.innerHTML = producto.descripcion;

                        let textCategoria = document.createElement('p');

                        textCategoria.innerHTML = producto.categoria;



                        divShow.appendChild(divColumnFour);

                        divColumnFour.appendChild(linkEdit);

                        divColumnFour.appendChild(linkBorrar);

                        divColumnFour.appendChild(divTitleInfo);

                        divTitleInfo.appendChild(titleInfo);



                        divShow.appendChild(divContainer);

                        divContainer.appendChild(divColumnOne);

                        divContainer.appendChild(divColumnTwo);



                        divColumnOne.className = 'column-show';

                        divColumnTwo.className = 'column-show';



                        divColumnOne.style.width = "50%";

                        divColumnTwo.style.width = "50%";



                        divColumnOne.appendChild(divInfoContainerNombre);

                        divColumnOne.appendChild(divInfoContainerPrecio);



                        divInfoContainerNombre.appendChild(titleNombre);

                        divInfoContainerNombre.appendChild(textNombre);

                        divInfoContainerPrecio.appendChild(titlePrecio);

                        divInfoContainerPrecio.appendChild(textPrecio);



                        divColumnTwo.appendChild(divInfoContainerCategoria);

                        divColumnTwo.appendChild(divInfoContainerDescripcion);



                        divInfoContainerCategoria.appendChild(titleCategoria);

                        divInfoContainerCategoria.appendChild(textCategoria);

                        divInfoContainerDescripcion.appendChild(titleDescripcion);

                        divInfoContainerDescripcion.appendChild(textDescripcion);



                        editFunction(producto);

                        borrarFunction(producto);

                    }

                });

            });

        } 

    };

    /**

     * funcion para ver el listado de productos quitando aquellos que tienen como status "inactivo". Peticion Ajax para traer los productos de

     * status "Activo"

     */

    var showTableProductos = function (){



        divContainer.innerHTML = '';

        //tablaDashboard.innerHTML = '';

        divContainer.appendChild(divAddProducto);

        divAddProducto.appendChild(linkAddProducto);

        divShow.innerHTML = '';

        preHeader.innerHTML = 'Listado de Productos';

        divShow.className = 'listado-oculto';

        divAddProducto.className = 'divButton';

        ajax({

            url: '../../Cafeterias_Landing_API/productos-router.php',

            successCallback: function(rta){

                flagCrud = true;

                crudForm.innerHTML = "";

                tablaDashboard.className = "";

                let arrayProductos = JSON.parse(rta).data;



                let headerID = 'ID';

                let headerNombre = 'Nombre';

                let headerPrecio = 'Precio';

                let headerDescripcion = 'Descripcion';

                let headerFkCategoria= 'Categoria';





                tableHeader.innerHTML = "<tr>"+"<th>"+headerID+"</th>"+

                    "<th>"+headerNombre+"</th>"+

                    "<th>"+headerPrecio+"</th>"+

                    "<th>"+headerDescripcion+"</th>"+

                    "<th>"+headerFkCategoria+"</th>";



                tableBody.innerHTML = "";

                for(let arr = 0; arr < arrayProductos.length; arr++)

                {

                    tableBody.innerHTML += "<tr>"+"<td>"+arrayProductos[arr].id+"</td>"+

                        "<td>"+arrayProductos[arr].nombre+"</td>"+

                        "<td> $ "+arrayProductos[arr].precio+"</td>"+

                        "<td>"+arrayProductos[arr].descripcion+"</td>"+

                        "<td>"+arrayProductos[arr].categoria+"</td>"+

                        "</tr>";

                }

                verProductoId();

            }

        });

    };

    /**

     * evento disparado por click en el link de la botonera

     */

    productosTab.addEventListener("click",function(){

        showTableProductos();

    });





    /***

    ** evento click para crear el formulario de creacion. Peticion Ajax realiza la insercion en la base de datos.

    **/

    linkAddProducto.addEventListener("click",function(){

        //console.log(categoriasCompletas);

        let formAlta = document.createElement('form');

        preHeader.innerHTML = 'Nuevo Producto';

        formAlta.action = '../../Cafeterias_Landing_API/crud-router.php';

        messageInfo.className = '';

        messageInfo.innerHTML = '';

        divAddProducto.className = 'listado-oculto';

        tablaDashboard.className="listado-oculto";

        crudForm.className = "";

        let inputNombre = document.createElement('input');

        inputNombre.name = "nombre";

        inputNombre.type = "text";

        let inputPrecio = document.createElement('input');

        inputPrecio.name = "precio";

        inputPrecio.type = "text";


        let inputImg = document.createElement('input');

            inputImg.name = "imagen_portada";
            inputImg.type = "file";
            inputImg.accept = '.jpg';
            inputImg.id = 'file';

        let inputCategoria = document.createElement('select');

        inputCategoria.name = "categoria";



        let inputDescripcion = document.createElement('textarea');

        inputDescripcion.name = "descripcion";

        inputDescripcion.placeholder = 'Ingresar descripcion del producto...';

        inputDescripcion.cols = '60';

        inputDescripcion.rows = '5'; 

        inputDescripcion.className = 'descriptionArea';

        inputDescripcion.style.resize = 'none';

        inputDescripcion.style.overflow = 'auto';

        inputDescripcion.addEventListener("focus",function(){

            this.style.outlineColor = '#91303a';

        });

        //inputDescripcion.type = "";



        if(flagCrud == true)

        {

            let divContainer = document.createElement('div');

                divContainer.className = "wrapper-form";

            let labelNombre = document.createElement('label');

                labelNombre.innerHTML = "Nombre: ";

            let labelPrecio = document.createElement('label');

                labelPrecio.innerHTML = "Precio en AR$: ";

            let labelCategoria = document.createElement('label');

                labelCategoria.innerHTML = "Categoria: ";


            let labelImg = document.createElement('label');

                labelImg.innerHTML = "Imagen de Portada: ";

            let imgPrev = document.createElement('img');
                //imgPrev.alt = 'preview_de_imagen';
                imgPrev.id = 'preview';    
                imgPrev.style.width = '70px';
                imgPrev.style.height = '70px';
                imgPrev.style.marginLeft = '10%';
                imgPrev.style.display = 'block';
    

            let divFirst = document.createElement('div');

            let divSecond = document.createElement('div');

            let labelDescripcion = document.createElement('label');

                labelDescripcion.innerHTML = "Descripcion: ";



             let divForth= document.createElement('div');

                divForth.className = 'divButton';



            let createButton = document.createElement('input');

                createButton.type = 'submit';

                createButton.value = "Crear Producto";



                //formAlta.className = '';

            crudForm.appendChild(formAlta);

            formAlta.appendChild(messageInfo);

            formAlta.appendChild(divContainer);

            formAlta.appendChild(divForth);

            divContainer.appendChild(divFirst);

            divFirst.appendChild(labelNombre);

            divFirst.appendChild(labelPrecio);

            divFirst.appendChild(labelImg);

            divFirst.style.width = "50%";

            divContainer.appendChild(divSecond);

            divSecond.appendChild(labelCategoria);

            divSecond.appendChild(labelDescripcion);

            divSecond.style.width = "50%";

            labelNombre.appendChild(inputNombre);

            labelPrecio.appendChild(inputPrecio);

            labelImg.appendChild(inputImg);

            labelImg.appendChild(imgPrev);

            labelCategoria.appendChild(inputCategoria);

            inputCategoria.className = 'select-crud';

            for(let i = 0; i<categoriasCompletas.length;i++)

            {

                let optionCategoria = document.createElement('option');

                    optionCategoria.value = categoriasCompletas[i].id_categoria_producto;

                    optionCategoria.innerHTML = categoriasCompletas[i].descripcion;

                inputCategoria.appendChild(optionCategoria);

            }

            labelDescripcion.appendChild(inputDescripcion);

            divForth.appendChild(createButton);

            flagCrud = false;

        }

        /**

         * evento Submit para crear el nuevo producto.

         */
         document.getElementById('file').onchange = function()
         {

            var readPrev = new FileReader();
                readPrev.onload = function(e)
                {
                    document.getElementById('preview').src = e.target.result;
                    
                };
            readPrev.readAsDataURL(this.files[0]);   
            //imgPrev.style.display = 'block'; 
         }

        formAlta.addEventListener("submit",function(ev){

            ev.preventDefault();

            if(inputNombre.value != '' && inputDescripcion.value != '' && inputPrecio.value != '' && inputCategoria.value != '' && inputImg.value != '')

            {

                var ImgUploadedvalue = inputImg.value;
                var imgUrls = ImgUploadedvalue.split('\\');
                var imgRealName = imgUrls[imgUrls.length-1];
                var imgSeparated = imgRealName.split('.');
                var imgExtension = imgSeparated[imgSeparated.length-1];
                    imgExtension = imgExtension.toUpperCase();
                var base64Img;

                if(imgExtension == 'JPG')
                {
                    let streamImg = inputImg.files[0];
                    console.log(streamImg);
                    var reader = new FileReader();
                        reader.onload = callbackRd;
                        reader.readAsDataURL(streamImg);

                     //console.log(streamImg);   
                function callbackRd()
                {
                    base64Img = reader.result;
                    let loadedData =

                    {

                        nombre: inputNombre.value,

                        precio: inputPrecio.value,

                        fk_categoria: inputCategoria.value,

                        descripcion: inputDescripcion.value,

                        img_portada: streamImg.name,

                        stream_img : base64Img,

                        crud: 'producto'

                    };



                    ajax({

                        method: 'POST',

                        url: '../../Cafeterias_Landing_API/crud-router.php',

                        data: JSON.stringify(loadedData),

                        successCallback: function(rta)

                        {

                            //console.log(rta);

                            let divContainerModal = document.createElement("div");

                            divContainerModal.className = "modalWrapper";

                            let divModal = document.createElement("div");

                            divModal.className = "modal";

                            let textoInfo = document.createElement("p");

                            textoInfo.innerHTML = "Producto Creado correctamente";

                            let body = document.getElementsByTagName("body")[0];

                            body.appendChild(divContainerModal);

                            divContainerModal.appendChild(divModal);

                            divModal.appendChild(textoInfo);

                            inputNombre.value = "";

                            inputPrecio.value = "";

                            inputDescripcion.value = "";

                            textoInfo.style.color = "#197328";

                            divModal.style.transition = "all .35s";

                            divModal.style.width = "35%";

                            setTimeout(function() {

                                divContainerModal.innerHTML = "";

                                body.removeChild(divContainerModal);

                            }, 2000);



                            showTableProductos();

                        }

                    });

                }
            }else
            {
                messageInfo.className = "msgErr";

                messageInfo.innerHTML = 'La extensión de la imagen debe ser JPG.';

            }
        }

            else

            {

                messageInfo.className = "msgErr";

                messageInfo.innerHTML = 'Existen datos vacios, por favor completar todos los campos.';

            }

        });

    });





});