const botonProx = document.querySelector("#prox");
const botonPrev = document.querySelector("#prev");
const botonPrimer = document.querySelector("#primer");
const botonUltima = document.querySelector("#ultima");

const urlBase = "http://gateway.marvel.com/v1/public/";
const apiKey = "a5c341737de7aeb8ed26d028706b8313";
let paginaActual = 0;
let comicsPorPagina = 20;
let total = 0;

const resultadosTitulo = document.querySelector("#resultados");

const cantidadDeResultados = document.querySelector("#cantidad-encontrada");

const seccion = document.querySelector("section");

const tipo = document.querySelector("#tipo");
const orden = document.querySelector("#orden");
const botonBuscar = document.querySelector(".boton-principal");

//buscando personajes del comic elegido
buscarPersonajesDelComic = (comic) => {
  fetch(
    `http://gateway.marvel.com/v1/public/comics/${comic.dataset.id}/characters?apikey=a5c341737de7aeb8ed26d028706b8313`
  )
    .then((res) => res.json())
    .then((dataComicsPersonajes) => {
      console.log("personaje de un comic", dataComicsPersonajes);

      infoPersonajes = dataComicsPersonajes.data.results;

      seccion.innerHTML += `
      <div>
      <h2> Personajes </h2>
      <h3>${dataComicsPersonajes.data.total} RESULTADOS</h3> 
      </div>
      `;

      if (dataComicsPersonajes.data.total === 0) {
        seccion.innerHTML += `
        <p> No se han encontrado resultados </p>
        `;
      }

      infoPersonajes.map((comic) => {
        seccion.innerHTML += `
      <div class="contenedor_info-extra">
      
      <article class = "personaje" data-id="${infoPersonajes.id}"> 
       <div class="contenedor__tarjetas-imagen">
       <img  class="imagen" src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" alt="">
       </div> 
       <h3 class="contenedor__tarjetas-titulo">
       ${comic.name}
       </h3> 
        </article> 
      </div>
      `;
      });
    });
};

//buscando descripcion del comic elegido
const buscarDescripcionDelComic = (comic) => {
  fetch(
    `http://gateway.marvel.com/v1/public/comics/${comic.dataset.id}?apikey=a5c341737de7aeb8ed26d028706b8313`
  )
    .then((res) => res.json())
    .then((dataComic) => {
      descripcionComic = dataComic.data.results[0];
      fechaPublicado = descripcionComic.dates[0].date;
      soloFecha = fechaPublicado.slice(0, 10);

      resultadosTitulo.innerHTML = " ";
      cantidadDeResultados.innerHTML = " ";

      seccion.innerHTML = " ";

      seccion.innerHTML = `
    <div class="contenedor_descripcion">
<div class="contenedor_descripcion-imagen">
  <img class="imagen-descripcion" src="${descripcionComic.images[0].path}/portrait_uncanny.${descripcionComic.images[0].extension}" alt="">
</div>
<div class="contenedor_descripcion-texto">
  <h2>${descripcionComic.title}</h2>
  <h3>Publicado:</h3>



  <p>${soloFecha}</p>
  <h3>Guionistas:</h3>
  <p>${descripcionComic.creators.items[0].name}</p>
  <h3>Descripcion:</h3>
  <p id="descripcion">${descripcionComic.description}</p>
</div>
</div> `;

      const descripcion = document.querySelector("#descripcion");

      if (descripcionComic.description === null) {
        descripcion.innerHTML = `
  <p> Informacion no disponible </p>
  `;
      }
      //fech para personajes lo vuelvo funcion
      buscarPersonajesDelComic(comic);
    });
};

////////////////////////////////////////////////////
//buscando comics del personaje elegido
buscarComicsDelPersonaje = (comic) => {
  fetch(
    `http://gateway.marvel.com/v1/public/characters/${comic.dataset.id}/comics?apikey=a5c341737de7aeb8ed26d028706b8313`
  )
    .then((res) => res.json())
    .then((dataComicsPersonajes) => {
      console.log("personaje de un comic", dataComicsPersonajes);

      infoPersonaje = dataComicsPersonajes.data.results;

      seccion.innerHTML += `
      <div>
      <h2> Comics </h2>
      <h3>${dataComicsPersonajes.data.total} Resultados</h3>
      </div>
      `;
      if (dataComicsPersonajes.data.total === 0) {
        seccion.innerHTML += `
        <p> No se han encontrado resultados </p>
        `;
      }

      infoPersonaje.map((personaje) => {
        seccion.innerHTML += `
            <div class="contenedor_info-extra">
            
            <article class = "comic" data-id="${infoPersonaje.id}"> 
            <div class="contenedor__tarjetas-imagen">
            <img  class="imagen" src="${personaje.thumbnail.path}/portrait_uncanny.${personaje.thumbnail.extension}" alt="">
            </div> 
            <h3 class="contenedor__tarjetas-titulo">
            ${personaje.title}
            </h3> 
              </article> 
            </div>
      `;
      });
    });
};

//buscando descripcion del personaje elegido
const buscarDescripcionDelPersonaje = (comic) => {
  fetch(
    `http://gateway.marvel.com/v1/public/characters/${comic.dataset.id}?apikey=a5c341737de7aeb8ed26d028706b8313`
  )
    .then((res) => res.json())
    .then((dataPersonaje) => {
      console.log("un solo personaje", dataPersonaje);
      descripcionPersonaje = dataPersonaje.data.results[0];

      resultadosTitulo.innerHTML = " ";
      cantidadDeResultados.innerHTML = " ";

      seccion.innerHTML = " ";

      seccion.innerHTML = `
    <div class="contenedor_descripcion">
<div class="contenedor_descripcion-imagen">
  <img class="imagen-descripcion" src="${descripcionPersonaje.thumbnail.path}/portrait_uncanny.${descripcionPersonaje.thumbnail.extension}" alt="">
</div>
<div class="contenedor_descripcion-texto">
  <h2>${descripcionPersonaje.name}</h2>
  <p>${descripcionPersonaje.description}</p>
</div>
</div> `;
      //fech para personajes lo vuelvo funcion
      buscarComicsDelPersonaje(comic);
    });
};
////////////////////////////////////

////busqueda inicial de los comics///
const buscarInfo = (coleccion, paginaActual, texto, orden = "title") => {
  fetch(
    `${urlBase + coleccion}?apikey=${apiKey}&offset=${
      paginaActual * comicsPorPagina
    }&orderBy=${orden}`
  )
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      // console.log(info);
      seccion.innerHTML = " ";

      total = info.data.total

      info.data.results.map((comic) => {
        cantidadDeResultados.innerHTML = `<span>${info.data.total} RESULTADOS</span>`;
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
          // console.log("fui a buscar la descripcion del comic")
          // console.log("hiciste clic a un comic fui a buscar la descripcion del comic", comic, comic.dataset.id);

          //elijo que descripcion traer
          if (tipo.value === "comics") {
            buscarDescripcionDelComic(comic);
          } else {
            buscarDescripcionDelPersonaje(comic);
          }
        };
      });
    });
};

buscarInfo("comics", paginaActual, "title"); //ejecucion parametros inicial

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
    `${urlBase + coleccion}?apikey=${apiKey}&offset=${
      paginaActual * comicsPorPagina
    }&orderBy=${orden}&titleStartsWith=${filtro}`
  )
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      console.log(info);

      const seccion = document.querySelector("section");

      cantidadDeResultados.innerHTML = `<span>${info.data.total} RESULTADOS</span>`;
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
      ////////////////////////////////////////////////////////////////
      const comicsHTML = document.querySelectorAll(".comic");

      comicsHTML.forEach((comic) => {
        comic.onclick = () => {
          console.log("fui a buscar la descripcion del comic");
          console.log(
            "hiciste clic a un comic fui a buscar la descripcion del comic",
            comic,
            comic.dataset.id
          );
          buscarDescripcionDelComic(comic);
        };
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
    `${urlBase + coleccion}?apikey=${apiKey}&offset=${
      paginaActual * comicsPorPagina
    }&orderBy=${orden}&nameStartsWith=${filtro}`
  )
    .then((res) => {
      return res.json();
    })
    .then((info) => {
      console.log(info);

      const seccion = document.querySelector("section");

      cantidadDeResultados.innerHTML = `<span>${info.data.total} RESULTADOS</span>`;
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
      //////////////////////////////////////////////////////////////////

      const comicsHTML = document.querySelectorAll(".comic");
      console.log(comicsHTML);
      comicsHTML.forEach((comic) => {
        comic.onclick = () => {
          console.log("hice click en un comic");
          console.log("fui a buscar la descripcion del comic");
          console.log(
            "hiciste clic a un comic fui a buscar la descripcion del comic",
            comic,
            comic.dataset.id
          );

          buscarDescripcionDelPersonaje(comic);
        };
      });
    });
};

/////////busquedas por seleccion

const form = document.forms[0];

form.onsubmit = (e) => {
  e.preventDefault();
};

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

//paginacion
botonProx.onclick = () => {
  paginaActual++;
  console.log("paginaActual", paginaActual, tipo.value)
  // buscarInfo(tipo.value, paginaActual, "title");
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

botonPrev.onclick = () => {
  paginaActual--;
  console.log("paginaActual", paginaActual, tipo.value)
  // buscarInfo(tipo.value, paginaActual, "title");
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

botonPrimer.onclick = () => {
  paginaActual = 0
  console.log("paginaActual", paginaActual, tipo.value)
  // buscarInfo(tipo.value, paginaActual, "title");
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

botonUltima.onclick = () => {
  const resto = total % comicsPorPagina
 if (resto > 0) {              
   paginaActual = (total - (total % comicsPorPagina)) / comicsPorPagina
 }  
 else { 
   paginaActual = ((total - (total % comicsPorPagina)) / comicsPorPagina) - comicsPorPagina
 }


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

