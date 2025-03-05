import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LocationFinder = () => {
  const { t } = useTranslation();
  const [stores, setStores] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          fetchNearbyStores(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          setLoading(false);
        }
      );
    }
  }, []);

  const fetchNearbyStores = async (lat, lng) => {
    // Aquí se conectaría con una API real para obtener las barberías cercanas
    // Por ahora usamos datos de ejemplo
    const mockStores = [
      {
        id: 1,
        name: 'Barber Style Centro',
        address: 'Calle Principal 123',
        distance: '0.5km',
        lat: lat + 0.01,
        lng: lng - 0.01,
        waitTime: '15 min'
      },
      {
        id: 2,
        name: 'Classic Cuts',
        address: 'Av. Libertador 456',
        distance: '1.2km',
        lat: lat - 0.01,
        lng: lng + 0.01,
        waitTime: '30 min'
      },
      {
        id: 3,
        name: 'Modern Barber Shop',
        address: 'Plaza Central 789',
        distance: '2.1km',
        lat: lat + 0.02,
        lng: lng + 0.02,
        waitTime: '45 min'
      }
    ];

    setStores(mockStores);
    setLoading(false);
  };

  const handleStoreSelect = (store) => {
    // Aquí se manejaría la selección de una barbería
    console.log('Barbería seleccionada:', store);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>{t('locations.loading')}</p>
      </div>
    );
  }

  return (
    <div className="location-finder">
      <div className="store-map">
        {/* Aquí iría el componente del mapa */}
        <div className="map-placeholder">
          {t('locations.mapPlaceholder')}
        </div>
      </div>

      <div className="store-list">
        <h2>{t('locations.nearbyStores')}</h2>
        {stores.map(store => (
          <div
            key={store.id}
            className="store-item"
            onClick={() => handleStoreSelect(store)}
          >
            <div className="store-info">
              <div className="store-name">{store.name}</div>
              <div className="store-address">{store.address}</div>
              <div className="store-details">
                <span className="store-distance">📍 {store.distance}</span>
                <span className="store-wait">⏱ {store.waitTime}</span>
              </div>
            </div>
            <button className="primary-btn store-select-btn">
              {t('locations.select')} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationFinder; 