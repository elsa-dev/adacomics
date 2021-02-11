
fetch("http://gateway.marvel.com/v1/public/comics?ts=1&apikey=a5c341737de7aeb8ed26d028706b8313")
.then( ( res ) => {
    return res.json()
})
.then((data) => {
    console.log(data)
}

)