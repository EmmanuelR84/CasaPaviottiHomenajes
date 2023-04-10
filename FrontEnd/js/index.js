const iconConfig = document.querySelector(".iconConf");
const divEstilos = document.querySelector(".contenedor__estilos");
// const estilos = document.querySelector('#estilos');
// const estilo1 = document.querySelector('#estilo1');
// const estilo2 = document.querySelector('#estilo2');
// const estilo3 = document.querySelector('#estilo3');
// const estilo4 = document.querySelector('#estilo4');
// const estilo5 = document.querySelector('#estilo5');
const fImagen = document.querySelector("[data-imgFallecido]");
const fNombre = document.querySelector("[data-nombreFallecido]");
const fInfo = document.querySelector("[data-infoFallecido]");
const fInhumacion = document.querySelector("[data-inhumacion]");
const fInhuFechaHora = document.querySelector("[data-inhumacionFH]");
const contenedorInfoExtra = document.querySelector(".contenedor__infoExtra");
const codigoQR = document.querySelector("[data-qr]");
const infoExtra = document.querySelector("[data-mjsQR]");
const fraseHomenaje = document.querySelector("#fraseHomenaje");
const body = document.querySelector("body");

//PANTALLA SALAS VELATORIAS
const imgDali = document.querySelector("[data-imgFallecidoDali]");
const nombreDali = document.querySelector("[data-nombreFallecidoDali]");

const imgPicasso = document.querySelector("[data-imgFallecidoPicasso]");
const nombrePicasso = document.querySelector("[data-nombreFallecidoPicasso]");

const imgVanGogh = document.querySelector("[data-imgFallecidoVanGogh]");
const nombreVanGogh = document.querySelector("[data-nombreFallecidoVanGogh]");

// body.addEventListener('mousemove', () => {
//     iconConfig.classList.remove('inactive');
// })

// function ocultar(){
//     iconConfig.classList.add('inactive');
// }
// setInterval(ocultar, 4000);

// iconConfig.addEventListener('click', () => {
//     divEstilos.classList.remove('inactive');
// })
// estilos.addEventListener('click', () => {
//     divEstilos.classList.add('inactive');
// })

// ESTILOS

// estilo1.addEventListener('mouseover', () => {
//     body.style.backgroundImage = "url('/FrontEnd/img/img6.jpg')";
//     fNombre.style.color = 'var(--col-black)';
//     fInfo.style.color = 'var(--col-black)';
//     infoExtra.style.color = 'var(--col-black)';
//     fraseHomenaje.style.color = 'var(--col-black)';
// })
// estilo2.addEventListener('mouseover', () => {
//     body.style.backgroundImage = "url('/FrontEnd/img/img2.jpg')";
//     fNombre.style.color = 'var(--col-white)';
//     fInfo.style.color = 'var(--col-white)';
//     infoExtra.style.color = 'var(--col-white)';
//     fraseHomenaje.style.color = 'var(--col-white)';
//     fImagen.style.border = '5px solid var(--first-col)';
//     contenedorInfoExtra.style.border = '2px solid var(--first-col)';
//     fNombre.style.textShadow = '2px 2px 5px var(--second-col)';
// })
// estilo3.addEventListener('mouseover', () => {
//     body.style.backgroundImage = "url('/FrontEnd/img/img3.jpg')";
//     fNombre.style.color = 'var(--col-white)';
//     fInfo.style.color = 'var(--col-white)';
//     infoExtra.style.color = 'var(--col-white)';
//     fraseHomenaje.style.color = 'var(--col-white)';
// })
// estilo4.addEventListener('mouseover', () => {
//     body.style.backgroundImage = "url('/FrontEnd/img/img4.jpg')";
//     fNombre.style.color = 'var(--col-white)';
//     fInfo.style.color = 'var(--col-white)';
//     infoExtra.style.color = 'var(--col-white)';
//     fraseHomenaje.style.color = 'var(--col-white)';
// })
// estilo5.addEventListener('mouseover', () => {
//     body.style.backgroundImage = "url('/FrontEnd/img/img5.jpg')";
//     fNombre.style.color = 'var(--col-white)';
//     fInfo.style.color = 'var(--col-white)';
//     infoExtra.style.color = 'var(--col-white)';
//     fraseHomenaje.style.color = 'var(--col-white)';
// })

function escribirFrase(data, num) {
  let dato = JSON.parse(data);

  if (dato[num].mensaje != null) {
    $("#contenedor__mensajes").html("La muerte de un ser querido es siempre dolorosa, pero insluso esa tristeza da lugar a los momentos dedicados a recordar con una sonrisa a esa persona. Te deseo que muy pronto puedas hacerlo.");
    // return msjFrase;
  }

  for (let i = 0; i < msjCondolencias.length; i++) {
    const frase = msjCondolencias[i];
    console.log(frase.mensaje);
    $("#contenedor__mensajes").html(`<p><strong>${frase[num].mensaje} </strong></p><br> ${frase[num].nombre} ${frase[num].apellido}`);
  }

  let codigoExtinto = dato[num].COD_EXTINTO;
  ajaxCondolencias(codigoExtinto);

}


  
$("#comentario").html('<b>' + frase.mensaje + '</b> <br>' + frase.apellido + ' ' + frase.nombre );