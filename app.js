// credentials API (TODO: create a rest API)
const baseId = 'appgCrmLuZvylkpzc';
const apiKey = 'pat5kc1u10LoJ6IQY.f5261398ec5440336b8b08514f37c7ad9b42b6ebf37d0db740ba64783ff4e16a';

//capta el search
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(tableName) {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}?sort[0][field]=MQ-135&sort[0][direction]=asc`, {
        headers: {
            Authorization: `Bearer ${apiKey}`  // Aquí se incluye la clave de la API
        }
    });

    if (!response.ok) {
        // Si ocurre un error, oculta el clima y muestra solo la barra de búsqueda
        console.error(`Error: ${response.status} ${response.statusText}`);
        document.querySelector(".weather").classList.add("hidden");
        return;
    }

    var data = await response.json();

    if (data.records.length === 0) {
        // Si no hay registros, oculta el clima y muestra solo la barra de búsqueda
        console.log("No se encontraron registros.");
        document.querySelector(".weather").classList.add("hidden");
        return;
    }

    const ultimoRegistro = data.records[0];
    console.log(ultimoRegistro.fields);

    //extraer datos
    document.querySelector(".temp").innerHTML = ultimoRegistro.fields["Temp (C)"] + "°C";
    
    // redondeo de la temp
    //document.querySelector(".temp").innerHTML = Math.round(ultimoRegistro.fields["Temp (C)"]) + "°C";

    document.querySelector(".humidity").innerHTML = ultimoRegistro.fields["Hum %"] + "%";

    //convierte la primera letra en mayuscula
    tableName = tableName.charAt(0).toUpperCase() + tableName.slice(1);

    document.querySelector(".city").innerHTML = tableName;

    // Muestra el contenedor del clima removiendo la clase 'hidden'
    document.querySelector(".weather").classList.remove("hidden");
}

//definir los eventos de search
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// También define el evento para la tecla "Enter" en el campo de búsqueda
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Llama a la función cada 5 segundos para refrescar el clima
//setInterval(checkWeather, 5000)