// Selecciona el contenedor principal donde se van a mostrar las noticias
document.addEventListener("DOMContentLoaded", function () {


  const contenedorNoticias = document.getElementById("contenedor-noticias");

  fetch('./data_noticias/noticias.json')
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

 

  

  