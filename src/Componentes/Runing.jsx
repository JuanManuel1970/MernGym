import React, { useEffect, useState, useCallback } from 'react';
import '../Css/runing.css';
import { Container } from 'react-bootstrap';
import pesaImage from '../assets/1.png';

const Running = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const coordResults = useCallback((lat, long) => {
    const api = {
      key: "0286f7c152c2b8f490a0973c12dc81e7",
      base: "https://api.openweathermap.org/data/2.5/",
      lang: "sp",
      units: "metric"
    };

    fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`http error: status ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        alert(error.message);
      })
      .then(response => {
        setWeatherData(response);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const getPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
      } else {
        alert('Su navegador no soporta geolocalización');
      }
    };

    const setPosition = position => {
      const { latitude: lat, longitude: long } = position.coords;
      coordResults(lat, long);
    };

    const showError = error => {
      alert(`error: ${error.message}`);
    };

    getPosition();
  }, [coordResults]);

  const dateBuilder = d => {
    let days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Container>
      <h2 className="text-center mb-5">
        <img src={pesaImage} alt="Pesa" className="pesa-image" /> Salidas Runing!!!!
        <img src={pesaImage} alt="Pesa" className="pesa-image" />
      </h2>

      <Container className="dos">
      </Container>
<Container>
<h2 className="text-center mb-5">
        <img src={pesaImage} alt="Pesa" className="pesa-image" /> Antes de salir chequeea el clima!!!
        <img src={pesaImage} alt="Pesa" className="pesa-image" />
      </h2>
      <h3>Para hoy se espera:</h3>
<Container className="yo2">
  {isLoading ? (
    <p>Cargando datos...</p>
  ) : (
    <div>
      <h3>{weatherData?.name}, {weatherData?.sys?.country}</h3>
      <p>{dateBuilder(new Date())}</p>
      <div className="container-img"></div>
      <div className="container-temp">
        <div>{Math.round(weatherData?.main?.temp)}</div>
        <span>°C</span>
      </div>
      <p>{weatherData ? capitalizeFirstLetter(weatherData.weather[0].description) : ""}</p>
      <p>{Math.round(weatherData?.main?.temp_min)}°C / {Math.round(weatherData?.main?.temp_max)}°C</p>
    </div>
  )}
</Container>
      </Container>
    </Container>
  );
};

export default Running;
