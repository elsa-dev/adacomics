
fetch("http://gateway.marvel.com/v1/public/comics?ts=1&apikey=a5c341737de7aeb8ed26d028706b8313")
.then( ( res ) => {
    return res.json()
})
.then((info) => {
    console.log(info)

    console.log(info.data.results[4].thumbnail.path)
    console.log(info.data.results[4].title)

    const seccion = document.querySelector('section');

    seccion.innerHTML = " ";
    info.data.results.map( (comic) => {
        seccion.innerHTML += `
    <article >
         <div class="contenedor__tarjetas-imagen">
            <img  class="imagen" src="${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}" alt="">
          </div>
          <h3 class="contenedor__tarjetas-titulo">
          ${comic.title}
          </h3> 
      </article> 
    ` 
    })
   

}

)