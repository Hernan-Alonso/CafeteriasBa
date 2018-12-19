document.addEventListener("DOMContentLoaded", function () {

  function $s(CssSelector)

  {

    return document.querySelector(CssSelector);

  }

  let registerForm = $s('#register-form');

  /**

   * evento click para el envio del formulario de registro.

   */

  registerForm.addEventListener("submit", function (e) {



    e.preventDefault();



    let userName = $s('#nombre-register');



    let email = $s('#email-register');



    let passwd = $s('#password-register');



    let passwdConfirm = $s('#password-confirmation');

    let passwordCR = $s('#passwordCR');

    let generalR = $s('#generalR');

    let nombreR = $s('#nombreR');

    let emailR = $s('#emailR');

    let passwordR = $s ('#passwordR');

    

    if(passwd.value == passwdConfirm.value){

      

        var dataUnParsed =

            {

              nombre: userName.value,

              email: email.value,

              passwd: passwd.value,

              passwdConfirm: passwdConfirm.value

            };

      

    }else{

          passwordCR.className = 'input_error';
          passwordCR.innerHTML = 'Las contraseñas no coinciden, por favor verificalas.';   
          generalR.innerHTML = '';
          generalR.className = '';  

    }





    let data = JSON.stringify(dataUnParsed);

    /**

     * peticion ajax que envia los datos de registro por POST al router del formulario. El mismo se encarga de verificar si es Login o Registro

     * para realizar las acciones correspondientes del controlador.

     */

     var filename= location.pathname.split('/').pop();

     var prePath = '../../';

     if(filename == 'index.php' || filename == '')

     {

       prePath = '../'

     }

    ajax({

      method: 'POST',

      url: prePath+'Cafeterias_Landing_API/router-form.php',

      data: data,

      successCallback: function (rta) {

        let rtaAjax = JSON.parse(rta);
        if(rtaAjax.data)
        {
          if(userName.value == '' || email.value == '' || passwd.value == '' || passwdConfirm.value == '')
          {
            generalR.innerHTML = rtaAjax.mensaje;
            generalR.className = 'input_error';
            emailR.className = '';
            passwordR.className = '';
            passwordR.className = '';
            nombreR.className = '';
            emailR.innerHTML = '';
            passwordR.innerHTML = '';
            passwordR.innerHTML = '';
            nombreR.innerHTML = '';
          }else
          {
            generalR.innerHTML = '';
          }
            


        }else
        {

          generalR.innerHTML = '';
          generalR.className = '';
          passwordCR.className = '';
          passwordCR.innerHTML = '';
          if(rtaAjax.errores.nombre)
          {
              nombreR.innerHTML = rtaAjax.errores.nombre[0];
              nombreR.className = 'input_error';
              //console.log('nombre',rtaAjax.errores.nombre[0]);
          }else
          {
            nombreR.className = '';
            nombreR.innerHTML = '';
            //console.log('borrar el error de nombre');
          }
          if(rtaAjax.errores.password)
          {
            passwordR.innerHTML = rtaAjax.errores.password[0];
            passwordR.className = 'input_error';
            //console.log('password',rtaAjax.errores.password[0]);
          }else
          {
            passwordR.className = '';
            passwordR.innerHTML = '';
            //console.log('borrar el error de password');
          }
          if(rtaAjax.errores.email)
          {
            emailR.innerHTML = rtaAjax.errores.email[0];
            emailR.className = 'input_error';
          }else
          {
            emailR.className = '';
            emailR.innerHTML = '';
          }
         
        }
        
        

        //for(let x = 0; x < rtaAjax.errores.length; x++){}



      }

    });

  });

});