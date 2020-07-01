
function continuarLeyendo() {
    $('#texto_oculto').toggle();
    if ($('#texto_oculto').is(":visible")) {
        $('#btn_continuar').text("Ocultar...");
    }
    else {
        $('#btn_continuar').text("Seguir Leyendo...");
    }
}

(function (factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        /** AMD. Register as an anonymous module. */
        define([
          'parsley'
        ], factory);
    } else if (typeof exports === 'object') {
        /** Node/CommonJS */
        module.exports = factory(
          require('parsley')
        );
    } else {
        /** Browser globals */
        factory();
    }


}(function () {
    
    'use strict';

    /**
     * Login form function
     */

    var $form = $('form[name=formLogin]');
    var empresas = null
    /** On button submit click */
    $form.on('click', 'button[type=submit]', function (e) {
        
        /** prevent default */
        e.preventDefault();
        //acepto_terminos = 
        var $this = $(this);
        /** Run parsley validation */
        if ($form.parsley().validate()) {
            /** Disable submit button */
            //empresas = null
            $.ajax({
                type: "POST",
                url: urlprefix + "/accounts/login/",
                // data: {"username":$('#username').val(),"password":$('#password').val(), formLogin},
                data: $("#login-form").serialize(),
                dataType: "json",
                beforeSend: function () {
                    $("#indicador_loading").removeClass('hide');
                    $("#username").prop("disabled", true);
                    $("#password").prop("disabled", true);
                    $("#btn_submit").prop("disabled", true);
                },
                success: function (data) {
                    if (data['cambiar_password']) {
                        window.location.replace("/sistema/administracion/clave_olvidada/?expiro=1");
                        return;
                    }
                    if (data['errors']) {
                        showMessage('Error',
                          data['errors']);
                        //$('#entrar').show();
                        //$('#username').focus();
                    } else {
                        
                        var auth = data.auth;
                        // auth = data['auth'];
                        empresas = data['empresas'];
                        if (auth && empresas) {
                            if (data['mostrar_terminos']) {
                                $('#dlgTerms').modal();
                            } else {
                                seleccionEmpresa(empresas);
                            }
                        } else {
                            $('#username').focus();
                        }
                    }
                },
                error: function () {
                    showMessage('Error', 'OcurriÃ³ un error al intentar iniciar sesiÃ³n, por favor intÃ©ntelo despuÃ©s de unos minutos.');
                    $("#username").prop("disabled", false);
                    $("#password").prop("disabled", false);
                    $("#btn_submit").prop("disabled", false);
                },
                complete: function () {
                    $("#indicador_loading").addClass('hide');
                    $("#username").prop("disabled", false);
                    $("#password").prop("disabled", false);
                    $("#btn_submit").prop("disabled", false);
                    $("#username").focus();
                }
            });

            // /**
            //  * you can do the ajax request here
            //  * this is for demo purpose only
            //  */
            // setTimeout(function() {
            //   /** redirect user */
            //   location.href = 'index.html';
            // }, 500);
        } else {
            /** toggle animation */
            $form
              .removeClass('animation animating shake')
              .addClass('animation animating shake')
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                  $(this).removeClass('animation animating shake');
              });
        }
    });

    $("#btn_aceptar_terms").click(function () {
        $("#flag_mostrar_terminos").val('1');
        $("#btn_submit").trigger('click');
        $("#dlgTerms").modal('hide');
    });

    $("#btn_no_aceptar_terms").click(function () {
        $("#flag_mostrar_terminos").val('0');
        $("#dlgTerms").modal('hide');
    });

}));



$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

// var empresas = null;

// $(function() {
//     $('#username').focus();
//     //Funcion para demorar la ejecuciÃ³n
//     $.fn.wait = function(time, type) {
//         time = time || 1000;
//         type = type || "fx";
//         return this.queue(type, function() {
//             var self = this;
//             setTimeout(function() {
//                 $(self).dequeue();
//             },
//             time);
//         });
//     };

//     //Se crea dialogo para seleccionar empresas
//     $("#dlgEmpresa").dialog({
//         bgiframe: true,
//         modal: true,
//         autoOpen: false,
//         resizable: false,
//         open: function() {
//             $('.ui-dialog-buttonpane').find('button:contains("Ok")').attr('class','').addClass('btn btn-primary');
//             $('.ui-dialog-buttonpane').find('button:contains("Cancel")').attr('class','').addClass('btn btn-default');
//         }
//     });

// 	//Se crea el diÃ¡logo de aceptaciÃ³n de tÃ©rminos
// 	$("#dlgTerms").dialog({
// 		bgiframe: true,
// 		modal: true,
// 		autoOpen: false,
// 		width: 535,
// 		height: 400,
// 		buttons: {
// 			'Aceptar': function() {
// 				$('#dlgTerms').dialog("close");
// 				seleccionEmpresa();
// 			},
// 			'Cancelar': function(){
// 				$('#entrar').show();
// 				$('#dlgTerms').dialog("close");
// 				$('#username').focus();
// 			}
// 		}
// 	});	


// 	$('#login-form').submit(function() {
// 		submitForm();
// 		return false;
// 	});
// });

// function submitForm() {
//     //Validar que los campos de user y password esten con datos antes de ser enviados
//     var errors = new Array();
//     empresas = null;
//     if(!$('#username').val()){
//         errors.push({"field":"username-errors-box","field_error":"username-errors-msg","error":"Debe escribir el usuario"});
//     }
//     if(!$('#password').val()){
//         errors.push({"field":"password-errors-box","field_error":"password-errors-msg","error":"Debe escribir la contraseÃ±a"});
//     }
//     if(errors.length>0) {
//         renderErrorMessages(errors);
//     } 
//     $('#entrar').hide();
//     $.ajax({
//         type: "POST",
//         url: urlprefix + "/accounts/login/",
//         data: {"username":$('#username').val(),"password":$('#password').val()},
//         dataType: "json",
//         success: function(data){
//             if (data['errors']) {
//                 showMessage('Error',data['errors']);
//                 $('#entrar').show();
//                 $('#username').focus();
//             } else {
//                 auth = data['auth'];
//                 empresas = data['empresas'];
//                 if (auth && empresas){
//                     if (data['mostrar_terminos']) {
//                         $('#dlgTerms').dialog('open');
//                     } else {
//                         seleccionEmpresa();	
//                     }
//                 } else {
//                     $('#entrar').show();
//                     $('#username').focus();
//                 }
//             }
//         },
//         error: function() {
//             showMessage('Error', 'OcurriÃ³ un error al intentar iniciar sesiÃ³n, por favor intÃ©ntelo despuÃ©s de unos minutos.');
//             $('#entrar').show();
//             $('#username').focus();
//         }
//     });	
// }

// function seleccionEmpresa(){
//     var options = '';
//     $('#empresas').empty();
//     for(var i=0;i<empresas.length;i++){
//         options = options + '<option value=\''+ empresas[i].id +'\'>'+ empresas[i].empresa +'</option>';
//     }
//     $('#empresas').html(options);
//     if (empresas.length == 1) {
//         loginContifico(empresas[0].id, false);
//     } else {
//         showConfirm('Iniciar SesiÃ³n',
//                     'Seleccione una empresa:',
//                     function(){loginContifico($('#empresas').val(), false);},
//                     function(){
//                         $('#entrar').show();
//                         $('#username').focus();
//                     }
//         );
//     }
// }
function seleccionEmpresa(empresas) {
    var options = "<option value='0'> - Seleccionar - </option>";
    $('#empresas').empty();

    $("#username").prop("disabled", true);
    $("#password").prop("disabled", true);
    $("#btn_submit").prop("disabled", true);

    for (var i = 0; i < empresas.length; i++) {
        options = options + '<option value=\'' + empresas[i].id + '\'>' + empresas[i].empresa + '</option>';
    }
    $('#empresas').html(options);

    if ($("#seleccionar_empresa").hasClass('hide')) {
        $("#seleccionar_empresa").removeClass('hide');
    }

    $("#empresas").focus();

    if (empresas.length == 1) {
        loginContifico(empresas[0].id, false);
    } else {
        $("#empresas").change(function () {
            loginContifico($('#empresas').val(), false);
        });
    }

}


function loginContifico(empresa, isContifcoUno) {
    $.ajax({
        type: "POST",
        url: urlprefix + "/accounts/login/",
        data: { "username": $('#username').val(), "password": $('#password').val(), 'empresa': empresa, 'next': $.getUrlVar('next'), 'contificoUno': isContifcoUno },
        dataType: "json",
        beforeSend: function () {
            $("#spinner_loading_empresas").removeClass('hide').addClass('show');
        },
        success: function (data) {
            if (data['url_redirect']) {
                window.location.href = data['url_redirect'];
            } else {
                showMessage('Error', data['errors']);
            }
        },
        error: function (e) {
            showMessage('Error', 'OcurriÃ³ un error al intentar iniciar sesiÃ³n, por favor intÃ©ntelo despuÃ©s de unos minutos.');
            //$('#entrar').show();
            //$('#username').focus();
        }
    });
}

// function renderErrorMessages(errors){
//     if(errors.length>0){
//         for(var i=0;i<errors.length;i++){
//             var field = $('#'+errors[i].field);
//             var field_error = $('#'+errors[i].field_error);
//             var error_msg = errors[i].error;
//             field_error.text(error_msg);
//             field.slideDown('slow');
//         }

//         for(var i=0;i<errors.length;i++){
//             var field = $('#'+errors[i].field);
//             var field_error = $('#'+errors[i].field_error);
//             var error_msg = errors[i].error;
//             field_error.text(error_msg);
//             field.wait(1500).slideUp('slow');
//         }
//     }
// }