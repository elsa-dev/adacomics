const botonProx = document.querySelector("#prox");
const botonPrev = document.querySelector("#prev");

const urlBase = "http://gateway.marvel.com/v1/public/";
const apiKey = "a5c341737de7aeb8ed26d028706b8313";
let paginaActual = 0;
let comicsPorPagina = 20;

botonProx.onclick = () => {
    paginaActual++;
    console.log("paginaActual", paginaActual)
    buscarComics("comics", paginaActual, "title");
}

botonPrev.onclick = () => {
    paginaActual--;
    console.log("paginaActual", paginaActual)
    buscarComics("comics", paginaActual, "title");
}

const buscarComics = (url, paginaActual, title) => {
  fetch(
    `${urlBase + url}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina}`
  )
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      console.log(info);

      const seccion = document.querySelector("section");

      seccion.innerHTML = " ";
      info.data.results.map((comic) => {
        seccion.innerHTML += `
    <article>
         <div class="contenedor__tarjetas-imagen">
            <img  class="imagen" src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" alt="">
          </div> 
          <h3 class="contenedor__tarjetas-titulo">
          ${comic.title}
          </h3> 
      </article> 
    `;
      });
    });
};

buscarComics("comics", paginaActual, "title");
