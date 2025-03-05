import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Usuario',
    phone: '+1234567890',
    email: 'usuario@ejemplo.com',
    avatar: '👤'
  });

  const menuItems = [
    { icon: '✏️', label: t('profile.editProfile'), action: () => setIsEditing(true) },
    { icon: '📋', label: t('profile.history'), action: () => {} },
    { icon: '⭐️', label: t('profile.favorites'), action: () => {} },
    { icon: '💳', label: t('profile.payments'), action: () => {} },
    { icon: '🔔', label: t('profile.notifications'), action: () => {} },
    { icon: '⚙️', label: t('profile.settings'), action: () => {} },
    { icon: '❓', label: t('profile.help'), action: () => {} },
    { icon: '🚪', label: t('profile.logout'), action: () => {}, isDestructive: true }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Aquí iría la lógica para guardar los cambios
  };

  const handleSocialLogin = (provider) => {
    // Aquí iría la lógica para iniciar sesión con cada proveedor
    console.log(`Iniciando sesión con ${provider}`);
  };

  return (
    <div className="profile-section">
      {!userData.name && (
        <div className="social-login">
          <h3 className="social-login-title">{t('profile.loginWith')}</h3>
          <div className="social-buttons">
            <button 
              className="social-btn google" 
              onClick={() => handleSocialLogin('google')}
              title="Google"
            >
              G
            </button>
            <button 
              className="social-btn facebook" 
              onClick={() => handleSocialLogin('facebook')}
              title="Facebook"
            >
              f
            </button>
            <button 
              className="social-btn instagram" 
              onClick={() => handleSocialLogin('instagram')}
              title="Instagram"
            >
              i
            </button>
          </div>
        </div>
      )}

      {userData.name && (
        <>
          <div className="profile-header">
            <div className="profile-avatar-container">
              <div className="profile-avatar">{userData.avatar}</div>
              {isEditing && (
                <button className="avatar-edit-btn">
                  📷
                </button>
              )}
            </div>
            <div className="profile-info">
              {isEditing ? (
                <div className="profile-edit-form">
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="profile-input"
                    placeholder={t('profile.name')}
                  />
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="profile-input"
                    placeholder={t('profile.phone')}
                  />
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="profile-input"
                    placeholder={t('profile.email')}
                  />
                  <div className="profile-edit-actions">
                    <button 
                      className="secondary-btn" 
                      onClick={() => setIsEditing(false)}
                    >
                      {t('app.cancel')}
                    </button>
                    <button 
                      className="primary-btn" 
                      onClick={handleSaveProfile}
                    >
                      {t('profile.save')}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="profile-name">{userData.name}</h2>
                  <p className="profile-phone">{userData.phone}</p>
                  <p className="profile-email">{userData.email}</p>
                </>
              )}
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">12</span>
              <span className="stat-label">{t('profile.totalVisits')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">4.8</span>
              <span className="stat-label">{t('profile.rating')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">3</span>
              <span className="stat-label">{t('profile.favoriteStores')}</span>
            </div>
          </div>

          <div className="profile-menu">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`profile-menu-item ${item.isDestructive ? 'destructive' : ''}`}
                onClick={item.action}
              >
                <span className="menu-item-icon">{item.icon}</span>
                <span className="menu-item-text">{item.label}</span>
                <span className="menu-item-arrow">›</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile; 