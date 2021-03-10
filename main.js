const botonProx = document.querySelector("#prox");
const botonPrev = document.querySelector("#prev");

const urlBase = "http://gateway.marvel.com/v1/public/";
const apiKey = "a5c341737de7aeb8ed26d028706b8313";
let paginaActual = 0;
let comicsPorPagina = 20;

////busqueda inicial de los comics///
const buscarInfo = (coleccion, paginaActual, texto, orden = "title") => {
  fetch(
    `${urlBase + coleccion}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina
    }&orderBy=${orden}`
  )
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      // console.log(info);

      const seccion = document.querySelector("section");

      seccion.innerHTML = " ";
      info.data.results.map((comic) => {
        seccion.innerHTML += `
    <article class = "comic" data-id="${comic.id}"> 
         <div class="contenedor__tarjetas-imagen">
            <img  class="imagen" src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" alt="">
          </div> 
          <h3 class="contenedor__tarjetas-titulo">
          ${comic[texto]}
          </h3> 
      </article> 
    `;
      });

      const comicsHTML = document.querySelectorAll(".comic");
      // console.log(comicsHTML)

      comicsHTML.forEach((comic) => {
        comic.onclick = () => {
          console.log("hiciste clic a un comic", comic, comic.dataset.id);

          fetch(
            `http://gateway.marvel.com/v1/public/comics/${comic.dataset.id}?apikey=a5c341737de7aeb8ed26d028706b8313`
          )
            .then((res) => res.json())
            .then((dataComic) => {
              // console.log('un solo comic', dataComic)
              descripcionComic = dataComic.data.results[0];

              //borro contenido seccion
              seccion.innerHTML = " ";
              //meto descripcion comic
              seccion.innerHTML = `
            <div class="contenedor_descripcion">
        <div class="contenedor_descripcion-imagen">
          <img class="imagen-descripcion" src="${descripcionComic.images[0].path}/portrait_uncanny.${descripcionComic.images[0].extension}" alt="">
        </div>
        <div class="contenedor_descripcion-texto">
          <h2>${descripcionComic.title}</h2>
          <h3>Publicado:</h3>
          <p>${descripcionComic.dates[0].date}</p>
          <h3>Guionistas:</h3>
          <p>${descripcionComic.creators.items[0].name}</p>
          <h3>Descripcion:</h3>
          <p>${descripcionComic.description}</p>
        </div>
      </div>
            `;
              //fech para personajes
              fetch(
                `http://gateway.marvel.com/v1/public/comics/${comic.dataset.id}/characters?apikey=a5c341737de7aeb8ed26d028706b8313`
              )
                .then((res) => res.json())
                .then((dataComicsPersonajes) => {
                  console.log("personaje de un comic", dataComicsPersonajes);

                  infoPersonaje = dataComicsPersonajes.data.results[0];

                  seccion.innerHTML += `
                  <div class="contenedor_info-extra">
                  <h2> Personajes </h2>
                  <h3>${dataComicsPersonajes.data.total}</h3>
                  <article class = "comic" data-id="${comic.id}"> 
                   <div class="contenedor__tarjetas-imagen">
                   <img  class="imagen" src="${infoPersonaje.thumbnail.path}/portrait_uncanny.${infoPersonaje.thumbnail.extension}" alt="">
                   </div> 
                   <h3 class="contenedor__tarjetas-titulo">
                   ${infoPersonaje.name}
                   </h3> 
                    </article> 
                  </div>
            `;
                });
            });
        };
      });
    });
};

buscarInfo("comics", paginaActual, "title");

const filtro = document.querySelector("#filtro_busqueda");
// console.log(filtro.value);

const buscarInfoPorTextoComics = (
  coleccion,
  paginaActual,
  texto,
  orden,
  filtro
) => {
  fetch(
    `${urlBase + coleccion}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina
    }&orderBy=${orden}&titleStartsWith=${filtro}`
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
          ${comic[texto]}
          </h3> 
      </article> 
    `;
      });
    });
};

const buscarInfoPorTextoPersonajes = (
  coleccion,
  paginaActual,
  texto,
  orden,
  filtro
) => {
  fetch(
    `${urlBase + coleccion}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina
    }&orderBy=${orden}&nameStartsWith=${filtro}`
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
          ${comic[texto]}
          </h3> 
      </article> 
    `;
      });
    });
};

/////////busquedas por seleccion

const form = document.forms[0];

form.onsubmit = (e) => {
  e.preventDefault();
};

const tipo = document.querySelector("#tipo");
const orden = document.querySelector("#orden");
const botonBuscar = document.querySelector(".boton-principal");

botonBuscar.onclick = () => {
  validarSeleccion();
};

const validarSeleccion = () => {
  if (filtro.value == "") {
    if (tipo.value === "comics") {
      buscarInfo("comics", paginaActual, "title", orden.value);
    } else {
      if ((tipo.value === "characters") & (orden.value === "title")) {
        buscarInfo("characters", paginaActual, "name", "name");
      }
      if ((tipo.value === "characters") & (orden.value === "-title")) {
        buscarInfo("characters", paginaActual, "name", "-name");
      }
    }
  }

  if (filtro.value != "") {
    if (tipo.value === "comics") {
      buscarInfoPorTextoComics(
        tipo.value,
        paginaActual,
        "title",
        orden.value,
        filtro.value
      );
    } else {
      if ((tipo.value === "characters") & (orden.value === "title")) {
        buscarInfoPorTextoPersonajes(
          "characters",
          paginaActual,
          "name",
          "name",
          filtro.value
        );
      }
      if ((tipo.value === "characters") & (orden.value === "-title")) {
        buscarInfoPorTextoPersonajes(
          "characters",
          paginaActual,
          "name",
          "-name",
          filtro.value
        );
      }
    }
  }
};

///paginacion
// botonProx.onclick = () => {
//   paginaActual++;
//   console.log("paginaActual", paginaActual)
//   buscarInfo("comics", paginaActual, "title");
// }

// botonPrev.onclick = () => {
//   paginaActual--;
//   console.log("paginaActual", paginaActual)
//   buscarInfo("comics", paginaActual, "title");
// }
