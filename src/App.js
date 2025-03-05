import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import ServiceTimer from './components/ServiceTimer.jsx';
import ReminderScheduler from './components/ReminderScheduler.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import BottomNavigation from './components/BottomNavigation.jsx';
import LocationFinder from './components/LocationFinder.jsx';
import Services from './components/Services.jsx';
import Notification from './components/Notification.jsx';
import Profile from './components/Profile.jsx';

// Iconos para los servicios
const ServiceIcons = {
  buzzcut: '✂️',
  fade: '💈',
  beard_trim: '🧔',
  full_service: '👨‍💼'
};

function App() {
  const { t, i18n } = useTranslation();
  const [currentTab, setCurrentTab] = useState('queue');
  const [serviceQueue, setServiceQueue] = useState([]);
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState('system');
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleSystemThemeChange = (e) => {
      if (theme === 'system') {
        document.documentElement.setAttribute(
          'data-theme',
          e.matches ? 'dark' : 'light'
        );
      }
    };

    if (theme === 'system') {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      document.documentElement.setAttribute(
        'data-theme',
        darkModeMediaQuery.matches ? 'dark' : 'light'
      );
      darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    // Verificar si el navegador soporta notificaciones
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        new Notification(t('notifications.enabled'), {
          body: t('notifications.welcome'),
          icon: '🔔'
        });
      }
    }
  };

  const sendNotification = (title, body) => {
    if (notificationPermission === 'granted') {
      if (sound) {
        const audio = new Audio('/notification.mp3');
        audio.play().catch(e => console.log('Error playing sound:', e));
      }
      
      if (vibration && 'vibrate' in navigator) {
        navigator.vibrate(200);
      }

      new Notification(title, {
        body,
        icon: '⏰'
      });
    }
  };

  const toggleSound = () => {
    setSound(prev => {
      if (!prev && notificationPermission !== 'granted') {
        requestNotificationPermission();
      }
      return !prev;
    });
  };

  const toggleVibration = () => {
    setVibration(prev => {
      if (!prev && notificationPermission !== 'granted') {
        requestNotificationPermission();
      }
      return !prev;
    });
  };

  // Definir duraciones de servicios en segundos
  const SERVICE_DURATIONS = {
    buzzcut: 12 * 60,
    fade: 30 * 60,
    beard_trim: 15 * 60,
    full_service: 45 * 60
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const showNotification = (message, type = 'info') => {
    setToast({ message, type });
  };

  const addToQueue = () => {
    if (name && service) {
      const newClient = { 
        id: Date.now(), 
        name, 
        service, 
        frequency: null,
        waitTime: SERVICE_DURATIONS[service]
      };
      
      setServiceQueue(prevQueue => [...prevQueue, newClient]);
      
      setName('');
      setService('');
      setIsModalOpen(false);
      
      showNotification(
        t('notifications.queueJoined', { name: newClient.name }),
        'success'
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (name && !service) {
        setIsModalOpen(true);
      } else if (name && service) {
        addToQueue();
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setServiceQueue(prevQueue => {
        if (prevQueue.length === 0) return prevQueue;

        const updatedQueue = [...prevQueue];
        if (updatedQueue[0].waitTime > 0) {
          // Verificar si es momento de enviar una notificación
          const client = updatedQueue[0];
          if (client.frequency) {
            const minutes = Math.floor(client.waitTime / 60);
            if (minutes === parseInt(client.frequency)) {
              sendNotification(
                t('notifications.timeReminder'),
                t('notifications.yourTurnSoon', { name: client.name, minutes })
              );
            }
          }
          updatedQueue[0].waitTime -= 1;
        }

        if (updatedQueue[0].waitTime === 0) {
          const finishedClient = updatedQueue[0];
          sendNotification(
            t('notifications.turnReady'),
            t('notifications.yourTurnNow', { name: finishedClient.name })
          );
          updatedQueue.shift();
        }

        return updatedQueue;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sound, vibration, notificationPermission]);

  const handleChangeName = (e) => setName(e.target.value);

  const handleServiceSelection = (selectedService) => {
    setService(selectedService);
    setIsModalOpen(false);
  };

  const updateClientFrequency = (id, frequency) => {
    setServiceQueue(prevQueue =>
      prevQueue.map(client => 
        client.id === id ? { ...client, frequency } : client
      )
    );
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'queue':
        return (
          <>
            <div className="input-group">
              <input
                type="text"
                value={name}
                onChange={handleChangeName}
                onKeyPress={handleKeyPress}
                placeholder={t('app.name')}
                className="name-input"
              />
            </div>

            {name && !service && (
              <div className="service-selection">
                <button onClick={() => setIsModalOpen(true)} className="primary-btn mobile-friendly-btn">
                  {t('app.selectService')} ➜
                </button>
              </div>
            )}

            {isModalOpen && (
              <div className="modal mobile-modal" onClick={() => setIsModalOpen(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <div className="gesture-handle"></div>
                  <h3>{t('app.service')}</h3>
                  <div className="service-buttons">
                    {Object.entries(ServiceIcons).map(([key, icon]) => (
                      <button 
                        key={key}
                        onClick={() => handleServiceSelection(key)} 
                        className="service-btn"
                      >
                        <span className="service-icon">{icon}</span>
                        {t(`services.${key}`)}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)} 
                    className="secondary-btn cancel-btn"
                  >
                    {t('app.cancel')}
                  </button>
                </div>
              </div>
            )}

            {service && (
              <div className="service-summary">
                <div className="selected-service">
                  <span className="service-icon">{ServiceIcons[service]}</span>
                  <h4>{t(`services.${service}`)}</h4>
                </div>
                <ServiceTimer service={service} />
                <button 
                  onClick={addToQueue} 
                  className="primary-btn mobile-friendly-btn"
                  onKeyPress={handleKeyPress}
                >
                  {t('app.joinQueue')} ✓
                </button>
              </div>
            )}

            <h2 className="section-title">{t('app.waitingList')}</h2>
            <ul className="client-list">
              {serviceQueue.map((client, index) => (
                <li key={client.id} className={`client-item ${index === 0 ? 'in-service' : ''}`}>
                  <div className="client-info">
                    <div className="client-header">
                      <div className="client-name">{client.name}</div>
                      {index === 0 && <span className="status-badge">{t('app.beingServed')}</span>}
                    </div>
                    <div className="service-info">
                      <span className="service-icon">{ServiceIcons[client.service]}</span>
                      <div className="client-service">{t(`services.${client.service}`)}</div>
                    </div>
                    {index === 0 ? (
                      <div className="remaining-time">{formatTime(client.waitTime)}</div>
                    ) : (
                      <p className="time-info">
                        ⏱ {t('app.remainingTime')}: {formatTime(client.waitTime)}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <ErrorBoundary>
              {serviceQueue.length > 0 && (
                <div className="reminder-scheduler">
                  <h3 className="reminder-title">{t('reminder.title')}</h3>
                  <ReminderScheduler 
                    clients={serviceQueue} 
                    updateClientFrequency={updateClientFrequency}
                  />
                </div>
              )}
            </ErrorBoundary>
          </>
        );
      case 'locations':
        return <LocationFinder />;
      case 'services':
        return <Services />;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>{t('app.title')}</h1>
        <div className="settings-menu">
          <button className="settings-trigger">⚙️</button>
          <div className="settings-rosette">
            <div className="settings-section">
              <div className="settings-title">{t('settings.theme')}</div>
              <div className="settings-options">
                <button 
                  onClick={() => setTheme('dark')} 
                  className={`settings-btn icon-only ${theme === 'dark' ? 'active' : ''}`}
                >
                  🌙
                </button>
                <button 
                  onClick={() => setTheme('system')} 
                  className={`settings-btn icon-only ${theme === 'system' ? 'active' : ''}`}
                >
                  🌓
                </button>
                <button 
                  onClick={() => setTheme('light')} 
                  className={`settings-btn icon-only ${theme === 'light' ? 'active' : ''}`}
                >
                  ☀️
                </button>
              </div>
            </div>
            <div className="settings-section">
              <div className="settings-title">{t('settings.notifications')}</div>
              <div className="settings-options">
                <button 
                  onClick={toggleSound} 
                  className={`settings-btn icon-only ${sound ? 'active' : ''}`}
                  title={notificationPermission !== 'granted' ? t('notifications.needPermission') : ''}
                >
                  🔔
                </button>
                <button 
                  onClick={toggleVibration} 
                  className={`settings-btn icon-only ${vibration ? 'active' : ''}`}
                  title={notificationPermission !== 'granted' ? t('notifications.needPermission') : ''}
                >
                  📳
                </button>
              </div>
            </div>
            <div className="settings-section">
              <div className="settings-title">{t('settings.fontSize')}</div>
              <div className="settings-options">
                <button 
                  onClick={() => setFontSize('small')} 
                  className={`settings-btn icon-only ${fontSize === 'small' ? 'active' : ''}`}
                >
                  A
                </button>
                <button 
                  onClick={() => setFontSize('medium')} 
                  className={`settings-btn icon-only ${fontSize === 'medium' ? 'active' : ''}`}
                >
                  A+
                </button>
                <button 
                  onClick={() => setFontSize('large')} 
                  className={`settings-btn icon-only ${fontSize === 'large' ? 'active' : ''}`}
                >
                  A++
                </button>
              </div>
            </div>
            <div className="settings-section">
              <div className="settings-title">{t('settings.language')}</div>
              <div className="settings-options">
                <button 
                  onClick={() => changeLanguage('es')} 
                  className={`settings-btn icon-only ${i18n.language === 'es' ? 'active' : ''}`}
                >
                  🇪🇸
                </button>
                <button 
                  onClick={() => changeLanguage('en')} 
                  className={`settings-btn icon-only ${i18n.language === 'en' ? 'active' : ''}`}
                >
                  🇺🇸
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="main-content">
        {renderContent()}
      </main>
      <BottomNavigation currentTab={currentTab} onTabChange={setCurrentTab} />
      {toast && (
        <Notification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;