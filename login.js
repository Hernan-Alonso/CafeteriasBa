window.addEventListener("DOMContentLoaded",function(){

    /***

     * funcion para buscar por querySelector

     * @param CssSelector

     * @returns {Element}

     */

    function $s(CssSelector)

    {

        return document.querySelector(CssSelector);

    }

    let loginForm = $s('#login-form');

    let generalErr = $s('#general');
    let emailErr = $s('#emailer');
    let passwdErr = $s('#passwd');
    

    /***

     * evento login para ingresar como administrador del sitio. ErrorCallback no implementado todavia.

     */

    loginForm.addEventListener("submit",function(e){

      

        e.preventDefault();

        let email = $s('#email');

        let passwd = $s('#password');

        let dataUnParsed ={

            email: email.value,

            passwd: passwd.value

        };

        

        let data = JSON.stringify(dataUnParsed);

        

        /**

         * peticion ajax que envia los datos de login por POST al router del formulario. El mismo se encarga de verificar si es Login o Registro

         * para realizar las acciones correspondientes del controlador.

         */

         var filename= location.pathname.split('/').pop();

         console.log(filename);

         var prePath = '../../';

         if(filename == 'index.php' || filename == '')

         {

            prePath = '../'

         }

        ajax({

            method: 'POST',

            url: prePath+'Cafeterias_Landing_API/router-form.php',

            data: data,

            successCallback: function(rta){

               let usuarioData = JSON.parse(rta);

               if(usuarioData.status == '1')

                {

                    switch (usuarioData.data.fk_rol_usuario)

                    {

                        case '1':

                            if(filename == 'index.php' || filename == '')

                            {

                                window.location = 'cpanel/index.php';

                            }

                            else

                            {

                                window.location = '../cpanel/index.php';

                            }

                        break;

                        case '2':

                        case '3':

                        case '4':

                            location.reload();

                        break;    

                    }

                    //console.log(usuarioData.data);



                }else{

                    switch(usuarioData.data)
                    {

                        case 'email':
                            emailErr.innerHTML = usuarioData.mensaje;
                            email.className = 'input_error';
                            generalErr.innerHTML = '';
                            passwdErr.innerHTML = '';
                            passwd.className = '';
                        break;
                        case 'passwd':
                            passwdErr.innerHTML = usuarioData.mensaje;
                            passwd.className = 'input_error';
                            generalErr.innerHTML = '';
                            emailErr.innerHTML = '';
                            email.className = '';
                        break;
                        case 'general':
                            generalErr.innerHTML = usuarioData.mensaje;
                            email.className = 'input_error';
                            passwd.className = 'input_error';
                            emailErr.innerHTML = '';
                            passwdErr.innerHTML = '';
                        break;            


                    }

                }

            }

        });

    });

    

});