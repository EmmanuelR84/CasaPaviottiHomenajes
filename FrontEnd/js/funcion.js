$(document).ready(function () {

  /////////////////// RECIBE JSON de AJAX y LLAMA A FUNCION CAMBIO PANTALLA Y ESCRIBIR HTML////////////////////////
      function cargarDato(data,canServicios) {
        var inhumados = data;
        let num = 0;
        var cantidadServicios = canServicios;
  
        setInterval(() => {
          num = num + 1;
          if (num < cantidadServicios) {
              escribirHTML(inhumados, num);
              cambiarPantalla(inhumados,cantidadServicios)
          } else {
              num = 0;
              escribirHTML(inhumados, num);
              cambiarPantalla(inhumados,cantidadServicios)
          }
        }, 180000);
        ///3Min Son 180000
  
        escribirHTML(inhumados, 0);
      }
  
    ////////////////// ESCRIBE DATOS EN HTML (screen0) //////////////////////
      function escribirHTML(data, num) {
        let dato = JSON.parse(data);
  
        if (dato[num].foto != null) {
          const fImagen = document.querySelector("[data-imgFallecido]");
          $("#fimagen").attr("src", "../autogestion/images/" + dato[num].foto);
        }
        
        const fNombre = document.querySelector("[data-nombreFallecido]");
        fNombre.innerHTML = dato[num].apellido;

        let iconoReligion = document.querySelector('#religionIcon');
        
        let cristianismo = "✝";
        let Judaismo = "✡";
        let Hinduismo = "ॐ";
        let Islam = "☪";
        let Budismo = "☸";
        let Taoismo = "☯";

        switch (dato[num].religion) {
          case '1':
            iconoReligion.innerHTML = cristianismo;
            break;
          case '2':
            iconoReligion.innerHTML = Judaismo;
              break;
          case '3':
            iconoReligion.innerHTML = Hinduismo;
              break;
          case '4':
            iconoReligion.innerHTML = Islam;
              break;
          case '5':
            iconoReligion.innerHTML = Budismo;
              break;
          case '6':
            iconoReligion.innerHTML = Taoismo;
              break;
          
          default:
            iconoReligion.classList.add('inactive');
              break;
        }




  
        const fInfo = document.querySelector("[data-infoFallecido]");
        fInfo.innerHTML = "El " + dato[num].fechafal + " A los " + dato[num].edad;
  
        const fInhumacion = document.querySelector("[data-cementerio]");
        fInhumacion.innerHTML =
          "<b>INHUMACION </b>" + `<b>${dato[num].cementerio}</b>`;
  
        const fInhuFechaHora = document.querySelector("[data-inhumacionFH]");
        fInhuFechaHora.innerHTML = `<b>${dato[num].fechasep}</b>` + " a las " + `<b>${dato[num].horasep}</b>`;
  
        const contenedorInfoExtra = document.querySelector(".contenedor__infoExtra");
        const codigoQR = document.querySelector("[data-qr]");
        const fraseHomenaje = document.querySelector("#fraseHomenaje");
        const body = document.querySelector("body");

        let codigoExtinto = dato[num].COD_EXTINTO;
          ajaxCondolencias(codigoExtinto);
  
        generarQR(codigoExtinto + "99"); //// LLAMO A LA FUNCION QUE GENERA QR
      }
  
    //////cambiar entre un pantalla y otra
      function cambiarPantalla(inhumados,canServicios) {
        let dato = JSON.parse(inhumados);
              $("#screen0").hide();
              $("#screen1").show();
  
          for (let num = 0; num < canServicios; num++) {
            
              if(dato[num].apellido != undefined || dato[num].apellido != null){
                $("#sala"+num).html(dato[num].apellido);
              }
  
              if (dato[num].foto != undefined) {
                $("#img"+num).attr("src", "../autogestion/images/" + dato[num].foto);
              }
              if(dato[num].sala){
                $(".salaVelatoria"+num).html(dato[num].sala);
              }
          }
          setTimeout(()=> {
              $("#screen1").hide();
              $("#screen0").show();
          },10000)
      }
    ///////////// CONSULTA BASE DE DATOS DE PAVIOTTI/////////////////
  
      function ajax() {
        $.ajax({
          url: "../../../CasaPaviottiHomenajes/back/logic/datos.php",
          type: "POST",
          datatype: "json",
          data: { opcion: 3 },
          success: function (cuenta) {
            let conteo = JSON.parse(cuenta);
            let cantServicio = conteo[0].CONTEO;
                if (cantServicio > 0) {
                  $.ajax({
                    url: "../../../CasaPaviottiHomenajes/back/logic/datos.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: 1 },
                    success: function (data) {
                      cargarDato(data,cantServicio);
                    },
                    error: function () {
                        return null;
                    },
                  });
  
                }else{
                  return null;
                }
          },
          error: function () {
            console.error('fallo llamada Ajax');
          },
        });
      }

      /////////CONSULTO A BASE LAS CONDOLENCIAS DE EL INHUMADOS
      function ajaxCondolencias(codigoExtinto){
        $.ajax({
          url: "../../../CasaPaviottiHomenajes/back/logic/datos.php",
          type: "POST",
          datatype: "json",
          data: { opcion: 4, codigo:codigoExtinto },
          success: function (cantCondolencias) {
            let cantidad = JSON.parse(cantCondolencias);
            let NumComentarios = cantidad[0].CANTCOMENTARIO;
            if (NumComentarios > 0) {
                  $.ajax({
                      url: "../../../CasaPaviottiHomenajes/back/logic/datos.php",
                      type: "POST",
                      datatype: "json",
                      data: { opcion: 5, codigo:codigoExtinto },
                      success: function (comentarios) {
                            mostrarCondolencia(comentarios,NumComentarios);
                      }
                  })
            }else{
              //// si NO HAY COMENTARIO 
              let comentario = document.querySelector('[data-comentario]');
              comentario.innerHTML = '';
              comentario.innerHTML += `<p class="infoExtra"><strong>La muerte de un ser querido es siempre dolorosa, pero insluso esa tristeza da lugar a los momentos dedicados a recordar con una sonrisa a esa persona. Te deseo que muy pronto puedas hacerlo.</strong><br> Anonimo</p>`;
            }
          }
        })
      }

      ////////////// ESCRIBE LAS CONDOLENCIAS EN LA PANTALLA ///////////////
      function mostrarCondolencia(condolencia , NumComentarios){
            let comentario = document.querySelector('[data-comentario]');
            comentario.innerHTML = '';
            let msjCondolencias = JSON.parse(condolencia); 
            for (let i = 0; i < NumComentarios; i++){
                    comentario.innerHTML += `<p class="infoExtra"><strong>${msjCondolencias[i].mensaje} </strong><br> ${msjCondolencias[i].nombre} ${msjCondolencias[i].apellido}</p>`;

                    //COLOCAR MSJ AL AZAR
                    // let c = Math.floor(Math.random()*comentario.length);
                    // document.getElementById("contenedor__mensajes").innerHTML += `<p>${comentario[c].mensaje}</p>` + `<p>${comentario[c].mensaje}</p>` + `<p>${comentario[c].mensaje}</p>`;

            }
      }

    /////////////////Funcion que Genera El codigo QR (recibe el ID del Inhumado)
      function generarQR(id) {
          const contenedorQR = document.getElementById('contenedorQR');
          contenedorQR.innerHTML= '';
          const QR = new QRCode(contenedorQR,'https://paviotti.com.ar/CasaPaviottiHomenajes/envio-condolencias/index.php?condolencia='+id);
      }

          //////////// RECARGAR PAGINA
          fullscreen.addEventListener('click', () => {
            window.location.reload();
        })
  
      setInterval(ajax, 600000); ////Llamo Ajax Cada 10 Min
      ajax(); ////LLamo a Ajax por Primera Vez
    
  }); ///FIN JQUERY