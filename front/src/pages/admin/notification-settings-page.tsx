import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';

interface NotificationSettings {
  id: string;
  isTelegramEnabled: boolean;
  isEmailEnabled: boolean;
  isBitrixEnabled: boolean;
  updatedAt: string;
}

export default function NotificationSettingsPage() {
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);

  const { data: settings, isLoading, error } = useQuery<NotificationSettings>({
    queryKey: ['notificationSettings'],
    queryFn: api.notificationSettings.get,
  });

  const updateMutation = useMutation({
    mutationFn: api.notificationSettings.update,
    onMutate: () => {
      setIsSaving(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationSettings'] });
      setIsSaving(false);
    },
    onError: (error) => {
      console.error('Ошибка при обновлении настроек:', error);
      setIsSaving(false);
    },
  });

  const handleToggle = (service: 'telegram' | 'email' | 'bitrix') => {
    if (!settings) return;

    const updatedSettings = {
      isTelegramEnabled: service === 'telegram' ? !settings.isTelegramEnabled : settings.isTelegramEnabled,
      isEmailEnabled: service === 'email' ? !settings.isEmailEnabled : settings.isEmailEnabled,
      isBitrixEnabled: service === 'bitrix' ? !settings.isBitrixEnabled : settings.isBitrixEnabled,
    };

    updateMutation.mutate(updatedSettings);
  };

  if (isLoading) return <div className="admin-loading">Загрузка...</div>;
  if (error) return <div className="admin-error">Ошибка загрузки настроек</div>;
  if (!settings) return <div className="admin-error">Настройки не найдены</div>;

  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Управление сервисами уведомлений</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Telegram */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2.5rem' }}>✈️</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#2c3e50' }}>Telegram</h3>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#7f8c8d' }}>
                Отправка уведомлений в Telegram
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('telegram')}
            disabled={isSaving}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: isSaving ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s',
              background: settings.isTelegramEnabled ? '#27ae60' : '#e74c3c',
              color: 'white',
              opacity: isSaving ? 0.6 : 1
            }}
          >
            {settings.isTelegramEnabled ? '✓ Включено' : '✗ Выключено'}
          </button>
        </div>

        {/* Email */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2.5rem' }}>📧</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#2c3e50' }}>Email</h3>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#7f8c8d' }}>
                Отправка уведомлений по электронной почте
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('email')}
            disabled={isSaving}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: isSaving ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s',
              background: settings.isEmailEnabled ? '#27ae60' : '#e74c3c',
              color: 'white',
              opacity: isSaving ? 0.6 : 1
            }}
          >
            {settings.isEmailEnabled ? '✓ Включено' : '✗ Выключено'}
          </button>
        </div>

        {/* Bitrix */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2.5rem' }}>💼</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#2c3e50' }}>Bitrix24</h3>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#7f8c8d' }}>
                Создание сделок в Bitrix24 CRM
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggle('bitrix')}
            disabled={isSaving}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: isSaving ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s',
              background: settings.isBitrixEnabled ? '#27ae60' : '#e74c3c',
              color: 'white',
              opacity: isSaving ? 0.6 : 1
            }}
          >
            {settings.isBitrixEnabled ? '✓ Включено' : '✗ Выключено'}
          </button>
        </div>
      </div>
    </div>
  );
}
