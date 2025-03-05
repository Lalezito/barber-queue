import React from 'react';
import { useTranslation } from 'react-i18next';

const BottomNavigation = ({ currentTab, onTabChange }) => {
  const { t } = useTranslation();

  const tabs = [
    { 
      id: 'queue', 
      icon: '📋', 
      activeIcon: '📋',
      label: t('nav.queue') 
    },
    { 
      id: 'locations', 
      icon: '📍', 
      activeIcon: '📍',
      label: t('nav.locations') 
    },
    { 
      id: 'services', 
      icon: '💈', 
      activeIcon: '💈',
      label: t('nav.services') 
    },
    { 
      id: 'profile', 
      icon: '👤', 
      activeIcon: '👤',
      label: t('nav.profile') 
    }
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-content">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-item ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
          >
            <span className="nav-item-icon">
              {currentTab === tab.id ? tab.activeIcon : tab.icon}
            </span>
            <span className="nav-item-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation; 