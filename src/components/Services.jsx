import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeTab, setActiveTab] = useState('recharge');

  const rechargeAmounts = [
    { value: 100, label: '$100' },
    { value: 200, label: '$200' },
    { value: 500, label: '$500' },
    { value: 1000, label: '$1000' },
    { value: 2000, label: '$2000' },
    { value: 5000, label: '$5000' }
  ];

  const dataPackages = [
    {
      id: 1,
      name: '2GB',
      price: '$200',
      duration: '7 días',
      features: ['2GB datos', 'Redes sociales ilimitadas', 'Llamadas ilimitadas']
    },
    {
      id: 2,
      name: '5GB',
      price: '$400',
      duration: '15 días',
      features: ['5GB datos', 'Redes sociales ilimitadas', 'Llamadas ilimitadas']
    },
    {
      id: 3,
      name: '10GB',
      price: '$700',
      duration: '30 días',
      features: ['10GB datos', 'Redes sociales ilimitadas', 'Llamadas ilimitadas']
    }
  ];

  const handleRecharge = () => {
    if (!phoneNumber || !selectedAmount) return;
    // Aquí iría la lógica para procesar la recarga
    console.log('Procesando recarga:', { phoneNumber, amount: selectedAmount });
  };

  const handlePackagePurchase = (packageData) => {
    if (!phoneNumber) return;
    // Aquí iría la lógica para procesar la compra del paquete
    console.log('Comprando paquete:', { phoneNumber, package: packageData });
  };

  return (
    <div className="services-container">
      <div className="services-tabs">
        <button
          className={`tab-btn ${activeTab === 'recharge' ? 'active' : ''}`}
          onClick={() => setActiveTab('recharge')}
        >
          {t('services.recharge')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          {t('services.data')}
        </button>
      </div>

      <div className="services-content">
        {activeTab === 'recharge' ? (
          <div className="recharge-section">
            <input
              type="tel"
              className="recharge-input"
              placeholder={t('services.enterPhone')}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <div className="recharge-options">
              {rechargeAmounts.map((amount) => (
                <button
                  key={amount.value}
                  className={`recharge-amount ${selectedAmount === amount.value ? 'selected' : ''}`}
                  onClick={() => setSelectedAmount(amount.value)}
                >
                  {amount.label}
                </button>
              ))}
            </div>

            <button
              className="primary-btn"
              onClick={handleRecharge}
              disabled={!phoneNumber || !selectedAmount}
            >
              {t('services.rechargeNow')}
            </button>
          </div>
        ) : (
          <div className="data-packages">
            {dataPackages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="package-header">
                  <span className="package-name">{pkg.name}</span>
                  <span className="package-price">{pkg.price}</span>
                </div>
                <div className="package-details">{pkg.duration}</div>
                <div className="package-features">
                  {pkg.features.map((feature, index) => (
                    <span key={index} className="package-feature">
                      {feature}
                    </span>
                  ))}
                </div>
                <button
                  className="primary-btn"
                  onClick={() => handlePackagePurchase(pkg)}
                  disabled={!phoneNumber}
                >
                  {t('services.buyPackage')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services; 