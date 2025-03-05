import React from 'react';

// Definir los tiempos de los servicios
const serviceDurations = {
  buzzcut: 12,
  fade: 30,
  beard_trim: 15,
  full_service: 45
};

// Función para obtener el tiempo del servicio
const getServiceTime = (service) => {
  return serviceDurations[service] || 0;
};

// Componente que muestra el tiempo estimado del servicio
const ServiceTimer = ({ service }) => {
  const serviceTime = getServiceTime(service);

  return (
    <div>
      {service ? (
        <>
          <p><strong>Tiempo estimado:</strong> {serviceTime} minutos</p>
          <p><strong>Precio estimado:</strong> ${calculatePrice(service)}</p>
        </>
      ) : (
        <p>Selecciona un servicio para ver el tiempo estimado.</p>
      )}
    </div>
  );
};

// Función para calcular precio del servicio
const calculatePrice = (service) => {
  const prices = {
    buzzcut: 10,
    fade: 25,
    beard_trim: 15,
    full_service: 35
  };
  return prices[service] || 0;
};

export default ServiceTimer;