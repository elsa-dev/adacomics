const botonProx = document.querySelector("#prox");
const botonPrev = document.querySelector("#prev");

const urlBase = "http://gateway.marvel.com/v1/public/";
const apiKey = "a5c341737de7aeb8ed26d028706b8313";
let paginaActual = 0;
let comicsPorPagina = 20;

const buscarInfo = (coleccion, paginaActual, texto, orden = "title") => {
  fetch(
    `${urlBase + coleccion}?apikey=${apiKey}&offset=${paginaActual * comicsPorPagina
    }&orderBy=${orden}`
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

buscarInfo("comics", paginaActual, "title");

const filtro = document.querySelector("#filtro_busqueda");
console.log(filtro.value);

const buscarInfoPorTextoComics = (coleccion, paginaActual, texto, orden,  filtro) => {
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

const buscarInfoPorTextoPersonajes = (   coleccion, paginaActual, texto, orden, filtro) => {
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
      buscarInfoPorTextoComics(tipo.value, paginaActual, "title", orden.value, filtro.value);
    }else {
      if ((tipo.value === "characters") & (orden.value === "title")) {
        buscarInfoPorTextoPersonajes("characters", paginaActual, "name", "name", filtro.value);
      }
      if ((tipo.value === "characters") & (orden.value === "-title")) {
        buscarInfoPorTextoPersonajes("characters", paginaActual, "name", "-name", filtro.value);
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
