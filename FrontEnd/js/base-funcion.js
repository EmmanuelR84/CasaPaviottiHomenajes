$(document).ready(function () {
  function condolencias(codigoExtinto) {
    $.ajax({
      url: "../../../CasaPaviottiHomenajes-main/back/logic/datos.php",
      type: "POST",
      datatype: "json",
      data: { opcion: 3, cod: codigoExtinto },
      success: function (data) {
        cargarFrases(data);
      },
    });
  }

  function cargarDato(data) {
    num = 0;
    let dato = JSON.parse(data);

    const fImagen = document.querySelector("[data-imgFallecido]");

    const fNombre = document.querySelector("[data-nombreFallecido]");
    fNombre.innerHTML = dato[num].apellido;

    const fInfo = document.querySelector("[data-infoFallecido]");

    const fInhumacion = document.querySelector("[data-cementerio]");
    fInhumacion.innerHTML = "<b>INUMACHON</b>" + dato[num].cementerio;

    const fInhuFechaHora = document.querySelector("[data-inhumacionFH]");

    const contenedorInfoExtra = document.querySelector(
      ".contenedor__infoExtra"
    );
    const codigoQR = document.querySelector("[data-qr]");
    const fraseHomenaje = document.querySelector("#fraseHomenaje");
    const body = document.querySelector("body");
    var codigoExtinto = dato[num].COD_EXTINTO;

    condolencias(codigoExtinto);
  }

  function ajax() {
    $.ajax({
      url: "../../../CasaPaviottiHomenajes-main/back/logic/datos.php",
      type: "POST",
      datatype: "json",
      data: { opcion: 2 },
      success: function (data) {
        setInterval(cargarDato(data), 10000);
      },
    });
  }

  function cargarFrases(data, codigoExtinto) {
    let fallecido = JSON.parse(data);

    const infoExtra = document.querySelector("[data-mjsQR]");
    infoExtra.innerHTML = fallecido[0].mensaje;
  }

  setInterval(ajax(), 100000);

  ajax();
}); ////// cierre de jquery

///// setInterval(cambiarFallecido, 4000);
