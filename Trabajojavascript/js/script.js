// Selecciona el contenedor principal donde se van a mostrar las noticias
document.addEventListener("DOMContentLoaded", function () {


  const contenedorNoticias = document.getElementById("contenedor-noticias");

  fetch('../data_noticias/noticias.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar las noticias');
      }
      return response.json();
    })
    .then(data => {
      // Limpia el contenedor antes de agregar las noticias (por si se recarga)
      contenedorNoticias.innerHTML = "";

      // Recorre cada noticia y crea sus elementos
      data.noticias.forEach(noticia => {
        const noticiaDiv = document.createElement("div");
        noticiaDiv.classList.add("noticia");

        const titulo = document.createElement("h3");
        titulo.textContent = noticia.titulo;

        const fecha = document.createElement("p");
        fecha.classList.add("fecha");
        fecha.textContent = noticia.fecha;

        const resumen = document.createElement("p");
        resumen.classList.add("resumen");
        resumen.textContent = noticia.resumen;

        // Agrega los elementos al div de la noticia
        noticiaDiv.appendChild(titulo);
        noticiaDiv.appendChild(fecha);
        noticiaDiv.appendChild(resumen);

        // Finalmente, agrega la noticia al contenedor principal
        contenedorNoticias.appendChild(noticiaDiv);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

    })

  //Swiper JS
  var swiper = new Swiper(".mySwiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiper = new Swiper(".mySwiper-2", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    looppFillGroupWithBlank: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 2,
      },
      950: {
        slidesPerView: 3,
      }
    }
  });

  let tabInputs = document.querySelectorAll(".tabInput");
  console.log(tabInputs);
  tabInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      let id = input.ariaValueMax;
      let thisSwiper = document.getElementById("swiper" + id);
      thisSwiper.swiper.update();
    })
  });



  // script.js

// Campos del formulario
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const producto = document.getElementById("producto");
const plazo = document.getElementById("plazo");
const extras = document.querySelectorAll(".extra");
const resultado = document.getElementById("resultado");
const condiciones = document.getElementById("condiciones");
const form = document.getElementById("formPresupuesto");

// Crear mensajes de error dinámicos
function mostrarError(campo, mensaje) {
  eliminarError(campo);
  campo.classList.add("error");
  const small = document.createElement("small");
  small.classList.add("error-msg");
  small.textContent = mensaje;
  campo.insertAdjacentElement("afterend", small);
}

function eliminarError(campo) {
  campo.classList.remove("error");
  const errorMsg = campo.parentNode.querySelector(".error-msg");
  if (errorMsg) errorMsg.remove();
}

// Validación de datos
function validarFormulario() {
  let valido = true;

  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
  const soloNumeros = /^[0-9]+$/;
  const emailReg = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;

  // Validar nombre
  eliminarError(nombre);
  if (!soloLetras.test(nombre.value) || nombre.value.length > 15) {
    mostrarError(nombre, "Sólo letras (máx. 15).");
    valido = false;
  }

  // Validar apellidos
  eliminarError(apellidos);
  if (!soloLetras.test(apellidos.value) || apellidos.value.length > 40) {
    mostrarError(apellidos, "Sólo letras (máx. 40).");
    valido = false;
  }

  // Validar teléfono
  eliminarError(telefono);
  if (!soloNumeros.test(telefono.value) || telefono.value.length !== 9) {
    mostrarError(telefono, "Debe tener 9 números.");
    valido = false;
  }

  // Validar email
  eliminarError(email);
  if (!emailReg.test(email.value)) {
    mostrarError(email, "Email no válido.");
    valido = false;
  }

  return valido;
}

// Calcular presupuesto
function calcularPresupuesto() {
  let total = parseFloat(producto.value);

  extras.forEach((extra) => {
    if (extra.checked) total += parseFloat(extra.value);
  });

  const meses = parseInt(plazo.value) || 100;
  if (meses >= 6) total *= 0.9; // 10% descuento
  if (meses >= 12) total *= 0.8; // 20% descuento

  resultado.textContent = total.toFixed(2) + " €";
}

// Eventos automáticos
producto.addEventListener("change", calcularPresupuesto);
plazo.addEventListener("input", calcularPresupuesto);
extras.forEach((extra) => extra.addEventListener("change", calcularPresupuesto));

// Enviar formulario
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const valido = validarFormulario();

  if (!valido) {
    alert("Revisa los campos marcados en rojo.");
    return;
  }

  if (!condiciones.checked) {
    alert("Debes aceptar las condiciones de privacidad.");
    return;
  }

  validarPrecioFinal()


  alert("Formulario enviado correctamente ✔");
});

  

  