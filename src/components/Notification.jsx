import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Notification = ({ message, type = 'info', onClose, duration = 3000 }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`notification notification-${type}`}>
      <span className="notification-icon">{getIcon()}</span>
      <span className="notification-message">{message}</span>
      <button className="notification-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Notification; 