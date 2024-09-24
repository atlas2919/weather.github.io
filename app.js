// credentials API (TODO: create a rest API)
const baseId = 'appgCrmLuZvylkpzc';
const apiKey = 'pat5kc1u10LoJ6IQY.f5261398ec5440336b8b08514f37c7ad9b42b6ebf37d0db740ba64783ff4e16a';

//capta el search
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(tableName) {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}?sort[0][field]=MQ-135&sort[0][direction]=asc`, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    });

    if (!response.ok) {
        console.error(`Error: ${response.status} ${response.statusText}`);
        document.querySelector(".weather").classList.add("hidden");

        // Mostrar la imagen de error y el mensaje
        const errorImage = document.createElement('img');
        errorImage.src = 'images/404.svg';  // Asegúrate que la ruta sea correcta
        errorImage.alt = 'Error 404 - Not Found';
        errorImage.classList.add('error-image');

        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Oops! Location not found';
        errorMessage.classList.add('error-message');

        // Remover cualquier imagen o mensaje de error previos
        const previousErrorImage = document.querySelector('.error-image');
        const previousErrorMessage = document.querySelector('.error-message');
        if (previousErrorImage) {
            previousErrorImage.remove();
        }
        if (previousErrorMessage) {
            previousErrorMessage.remove();
        }

        // Insertar la imagen de error y el mensaje en el card
        const card = document.querySelector('.card');
        card.appendChild(errorImage);
        card.appendChild(errorMessage);

        return;
    }

    var data = await response.json();

    if (data.records.length === 0) {
        console.log("No se encontraron registros.");
        document.querySelector(".weather").classList.add("hidden");

        const errorImage = document.createElement('img');
        errorImage.src = 'images/404.svg';
        errorImage.alt = 'Error 404 - Not Found';
        errorImage.classList.add('error-image');

        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Oops! Location not found';
        errorMessage.classList.add('error-message');

        const previousErrorImage = document.querySelector('.error-image');
        const previousErrorMessage = document.querySelector('.error-message');
        if (previousErrorImage) {
            previousErrorImage.remove();
        }
        if (previousErrorMessage) {
            previousErrorMessage.remove();
        }

        const card = document.querySelector('.card');
        card.appendChild(errorImage);
        card.appendChild(errorMessage);
        return;
    }

    const ultimoRegistro = data.records[0];
    document.querySelector(".temp").innerHTML = ultimoRegistro.fields["Temp (C)"] + "°C";
    document.querySelector(".humidity").innerHTML = Math.round(ultimoRegistro.fields["Hum %"]) + "%";
    tableName = tableName.charAt(0).toUpperCase() + tableName.slice(1);
    document.querySelector(".city").innerHTML = tableName;

    document.querySelector(".weather").classList.remove("hidden");

    const previousErrorImage = document.querySelector('.error-image');
    const previousErrorMessage = document.querySelector('.error-message');
    if (previousErrorImage) {
        previousErrorImage.remove();
    }
    if (previousErrorMessage) {
        previousErrorMessage.remove();
    }
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

