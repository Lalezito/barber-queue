import React from 'react';
import { useTranslation } from 'react-i18next';

// Función para programar recordatorios
const scheduleReminder = (client) => {
  const reminderTimes = {
    seguido: 10,
    mantenerme_arreglado: 21,
    ocasional: 30,
  };

  // Validación de frecuencia
  if (!client.frequency) {
    console.error('La frecuencia del cliente no está definida:', client);
    return;
  }

  const days = reminderTimes[client.frequency] || 15; // Valor predeterminado de 15 días
  const reminderTime = new Date();
  reminderTime.setDate(reminderTime.getDate() + days);

  // Registro del recordatorio programado
  console.log(`🔔 Recordatorio programado para ${client.name}: ${reminderTime.toLocaleDateString()}`);
};

const ReminderScheduler = ({ clients, updateClientFrequency }) => {
  const { t } = useTranslation();
  const reminderOptions = ['never', '5', '10', '15'];
  const currentClient = clients[0];

  const handleReminderChange = (frequency) => {
    if (currentClient) {
      updateClientFrequency(currentClient.id, frequency === currentClient.frequency ? null : frequency);
    }
  };

  if (!currentClient) return null;

  return (
    <div className="reminder-options">
      {reminderOptions.map((option) => (
        <button
          key={option}
          onClick={() => handleReminderChange(option)}
          className={`reminder-btn ${currentClient.frequency === option ? 'active' : ''}`}
        >
          {option === 'never' ? t('reminder.never') : t('reminder.minutes', { minutes: option })}
        </button>
      ))}
    </div>
  );
};

export default ReminderScheduler;