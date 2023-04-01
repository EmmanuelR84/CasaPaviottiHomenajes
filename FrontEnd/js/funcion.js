$(document).ready(function () {

/////////////////// RECIBE JSON de AJAX y LLAMA A FUNCION CAMBIO PANTALLA Y ESCRIBIR HTML////////////////////////
    function cargarDato(data) {
      var inhumados = data;
      let num = 0;

      setInterval(() => {
        num = num + 1;
        if (num < 3) {
          escribirHTML(inhumados, num);
          cambiarPantalla(inhumados)
          console.warn(num);
        } else {
          num = 0;
          console.warn("vuelve a " + num);
          escribirHTML(inhumados, num);
          cambiarPantalla(inhumados)
        }
      }, 6000);
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
        "<b>INUMACION </b>" + `<b>${dato[num].cementerio}</b>`;

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

      generarQR(codigoExtinto + "99");
      //cargarMsj(data,codigoExtinto)
      return codigoExtinto;
    }

  //////cambiar entre un pantalla y otra
    function cambiarPantalla(inhumados) {
        let dato = JSON.parse(inhumados);
            $("#screen0").hide();
            $("#screen1").show();

        for (let num = 0; num < 3; num++) {
            $("#sala"+num).html(dato[num].apellido);
            if (dato[num].foto != null) {
              $("#img"+num).attr("src", "../autogestion/images/" + dato[num].foto);
            }
            $(".salaVelatoria"+num).html(dato[num].sala);
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
        data: { opcion: 2 },
        success: function (data) {
          cargarDato(data);
          console.warn("llama ajax");
        },
        error: function () {
          console.error('fallo llamada Ajax');
        },
      });
    }

  /////////////////Funcion que Genera El codigo QR (recibe el ID del Inhumado)
    function generarQR(id) {
    const contenedorQR = document.getElementById('contenedorQR');
    contenedorQR.innerHTML= '';
    const QR = new QRCode(contenedorQR,'https://paviotti.com.ar/CasaPaviottiHomenajes/envio-condolencias/index.php?condolencia='+id);
    }


    ///function cargarMsj(data,codigoExtinto) {
    ///      let fallecido = JSON.parse(data);
    ///      const infoExtra = document.querySelector("[data-mjsQR]");
    ///      infoExtra.innerHTML = fallecido[0].mensaje;
    ///}

    //function condolencias(codigoExtinto) {
    //  $.ajax({
    //    url: "../../../CasaPaviottiHomenajes-main/back/logic/datos.php",
    //    type: "POST",
    //    datatype: "json",
    //    data: {opcion:3,cod : codigoExtinto},
    //    success: function (data) {
    //      cargarFrases(data);
    //      ;
    //    }
    //  });
    //}

    setInterval(ajax, 600000); ////Llamo Ajax Cada 10 Min
    ajax(); ////LLamo a Ajax por Primera Vez
    
  
}); ///FIN JQUERY