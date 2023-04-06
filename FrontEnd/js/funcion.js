$(document).ready(function () {

/////////////////// RECIBE JSON de AJAX y LLAMA A FUNCION CAMBIO PANTALLA Y ESCRIBIR HTML////////////////////////
    function cargarDato(data,canServicios) {
      var inhumados = data;
      let num = 0;
      var cantidadServicios = canServicios;
      console.log('cantidad de numeros q llega '+cantidadServicios);

      setInterval(() => {
        num = num + 1;
        if (num < cantidadServicios) {
          escribirHTML(inhumados, num);
          cambiarPantalla(inhumados,cantidadServicios)
          console.warn(num);
        } else {
          num = 0;
          console.warn("vuelve a " + num);
          escribirHTML(inhumados, num);
          cambiarPantalla(inhumados,cantidadServicios)
        }
      }, 26000);
      ///3Min Son 180000

      escribirHTML(inhumados, 0);
      //cambiarPantalla(inhumados);
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

      const fInfo = document.querySelector("[data-infoFallecido]");
      fInfo.innerHTML = "El " + dato[num].fechafal + " A los " + dato[num].edad;

      const fInhumacion = document.querySelector("[data-cementerio]");
      fInhumacion.innerHTML =
        "<b>INHUMACION </b>" + `<b>${dato[num].cementerio}</b>`;

      const fInhuFechaHora = document.querySelector("[data-inhumacionFH]");
      fInhuFechaHora.innerHTML =
        `<b>${dato[num].fechasep}</b>` +
        " a las " +
        `<b>${dato[num].horasep}</b>`;

      const contenedorInfoExtra = document.querySelector(
        ".contenedor__infoExtra"
      );
      const codigoQR = document.querySelector("[data-qr]");
      const fraseHomenaje = document.querySelector("#fraseHomenaje");
      const body = document.querySelector("body");

      let codigoExtinto = dato[num].COD_EXTINTO;
        ajaxCondolencias(codigoExtinto);

      generarQR(codigoExtinto + "99");
      //cargarMsj(data,codigoExtinto)
      //return codigoExtinto;


    }

  //////cambiar entre un pantalla y otra
    function cambiarPantalla(inhumados,canServicios) {
      let dato = JSON.parse(inhumados);
      //let Cantidad = JSON.parse(canServicios);
      //console.log('cantidad de numeros q llega for '+canServicios);
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
                    //console.warn("llama ajax");
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
                      console.log(comentarios);
                  }
                })

          }else{
            //// si NO HAY COMENTARIO 
            console.log('NO HAY COMENTARIOS');
          }
            //////////// LA VARIABLE condolencias TIENE LOS COMENTARIOS DE CADA INHUMADOS
        }
      })
    }

  /////////////////Funcion que Genera El codigo QR (recibe el ID del Inhumado)
    function generarQR(id) {
    const contenedorQR = document.getElementById('contenedorQR');
    contenedorQR.innerHTML= '';
    const QR = new QRCode(contenedorQR,'https://paviotti.com.ar/CasaPaviottiHomenajes/envio-condolencias/index.php?condolencia='+id);
    }


    setInterval(ajax, 600000); ////Llamo Ajax Cada 10 Min
    ajax(); ////LLamo a Ajax por Primera Vez
    
  
}); ///FIN JQUERY