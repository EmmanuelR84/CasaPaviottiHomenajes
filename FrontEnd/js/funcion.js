$(document).ready(function () {


  
function condolencias(codigoExtinto) {
  $.ajax({
    url: "../../../CasaPaviottiHomenajes-main/back/logic/datos.php",
    type: "POST",
    datatype: "json",
    data: {opcion:3,cod : codigoExtinto},
    success: function (data) {
      cargarFrases(data);
      ;
    }
  });
}


let rotarFallecido;
var num = 0;

function repetirCadaMinuto() {
  rotarFallecido = setInterval(posicionFallecido, 2000);
}

function posicionFallecido() {
  console.log(`${num}`);
  if (num == 0) {
    num++
  } else if(num == 1){
    num++;
  } else if(num == 2) {
    num -= 2;
  }
}

repetirCadaMinuto();



  function cargarDato(data) {
    // num = 0;
    let dato = JSON.parse(data);

    const fImagen = document.querySelector("[data-imgFallecido]");

    const fNombre = document.querySelector("[data-nombreFallecido]");
    fNombre.innerHTML = dato[num].apellido;

    const fInfo = document.querySelector("[data-infoFallecido]");
    fInfo.innerHTML = 'El ' + dato[num].fechafal + ' A los ' + dato[num].edad;

    const fInhumacion = document.querySelector("[data-cementerio]");
    fInhumacion.innerHTML = '<b>INUMACHON </b>'+ `<b>${dato[num].cementerio}</b>`;

    const fInhuFechaHora = document.querySelector("[data-inhumacionFH]");
    fInhuFechaHora.innerHTML = `<b>${dato[num].fechasep}</b>` + ' a las ' + `<b>${dato[num].horasep}</b>`;

    const contenedorInfoExtra = document.querySelector(".contenedor__infoExtra");
    const codigoQR = document.querySelector("[data-qr]");
    const fraseHomenaje = document.querySelector("#fraseHomenaje");
    const body = document.querySelector("body");
    var codigoExtinto = dato[num].COD_EXTINTO;

condolencias(codigoExtinto)


  }

  function ajax() {
    $.ajax({
      url: "../../../CasaPaviottiHomenajes-main/back/logic/datos.php",
      type: "POST",
      datatype: "json",
      data: {opcion:2},
      success: function (data) {
        setInterval(cargarDato(data),10000)
        ;
      },
    });
  }


  function cargarFrases(data,codigoExtinto) {
    let fallecido = JSON.parse(data);

    const infoExtra = document.querySelector("[data-mjsQR]");
    infoExtra.innerHTML = fallecido[0].mensaje;
  }



  setInterval(ajax(),100000);



ajax()


}); ////// cierre de jquery

///// setInterval(cambiarFallecido, 4000);
