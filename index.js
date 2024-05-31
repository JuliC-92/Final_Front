const btnAnterior = document.getElementById("botonAnterior");
const btnSiguiente = document.getElementById("botonSiguiente");
const contenedor = document.getElementById("listaTendencias");
const botonConexion = document.getElementById("conexion");

let pagina = 1;

btnAnterior.addEventListener("click", ()=>{
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
});

btnSiguiente.addEventListener("click", ()=>{
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    }
});

const cargarPeliculas = async()=>{

   try{

    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1a21c766caea35fe8afbf593fb2bef32&language=es-MX&page=${pagina}`)
    console.log(respuesta);

    if(respuesta.status === 200){

        const datos = await respuesta.json();
        console.log(datos);

        let peliculas = [];
    
        datos.results.forEach(pelicula => {
            peliculas += `
            <a href="index.html">
                <div class="pelicula">
                    
                <img class="imgTendencia" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}" loading="lazy">
            
                    <div class="tituloPelicula">
                      <h4>${pelicula.title}</h4>
                 </div>
                </div>
            </a>      
            `;            
        });
        contenedor.innerHTML = peliculas;

    }

   }
   
   catch(error){
    console.log(error.message);

   }

}

botonConexion.addEventListener("click", ()=>{
    cargarPeliculas();    
});

cargarPeliculas();