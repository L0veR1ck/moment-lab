import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';

export default function ApplicationsPage() {
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingApp, setEditingApp] = useState<any>(null);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientWishes: '',
    attachedFileName: '',
    attachedFileUrl: '',
    requestDate: new Date().toISOString().split('T')[0],
    status: 0,
  });
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['applications', page],
    queryFn: () => api.applications.getAll(page, 10),
  });

  const createMutation = useMutation({
    mutationFn: api.applications.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['applications'] });
      await queryClient.refetchQueries({ queryKey: ['applications', page] });
      setShowCreateModal(false);
      setFormData({ 
        clientName: '', 
        clientEmail: '',
        clientPhone: '', 
        clientWishes: '',
        attachedFileName: '',
        attachedFileUrl: '',
        requestDate: new Date().toISOString().split('T')[0],
        status: 0 
      });
    },
    onError: (error) => {
      console.error('Ошибка при создании:', error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.applications.update(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['applications'] });
      await queryClient.refetchQueries({ queryKey: ['applications', page] });
      setShowEditModal(false);
      setEditingApp(null);
    },
    onError: (error) => {
      console.error('Ошибка при обновлении:', error);
    },
  });

  if (isLoading) return <div className="admin-loading">Загрузка...</div>;
  if (error) return <div className="admin-error">Ошибка загрузки заявок</div>;

  return (
    <div style={{ width: '100%' }}>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Заявки</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowCreateModal(true)}>
          + Создать заявку
        </button>
      </div>

      <div className="admin-table-container" style={{ width: '100%' }}>
        <table style={{ width: '100%', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Имя</th>
              <th style={{ width: '15%' }}>Телефон</th>
              <th style={{ width: '12%' }}>Дата</th>
              <th style={{ width: '12%' }}>Статус</th>
              <th style={{ width: '16%' }}>Уведомления</th>
              <th style={{ width: '25%' }}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
                  Заявок пока нет
                </td>
              </tr>
            ) : (
              data?.items.map((app: any) => (
                <tr key={app.id}>
                  <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <strong>{app.clientName}</strong>
                    {(app.clientWishes || app.attachedFileUrl) && (
                      <div style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '0.25rem' }}>
                        {app.clientWishes && '💬 '}
                        {app.attachedFileUrl && '📎'}
                      </div>
                    )}
                  </td>
                  <td style={{ fontSize: '0.9rem' }}>{app.clientPhone}</td>
                  <td style={{ fontSize: '0.9rem' }}>{new Date(app.requestDate).toLocaleDateString('ru-RU')}</td>
                  <td>
                    <span className="admin-badge admin-badge-info" style={{ fontSize: '0.85rem', padding: '0.25rem 0.5rem' }}>
                      {app.status === 0 ? 'Новая' : app.status === 1 ? 'В работе' : app.status === 2 ? 'Завершена' : 'Ошибка'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.9rem' }}>
                      <span title={app.isTelegramNotificationSent ? 'Telegram отправлен' : 'Telegram не отправлен'}>
                        {app.isTelegramNotificationSent ? '✅' : '❌'} ✈️
                      </span>
                      <span title={app.isEmailSent ? 'Email отправлен' : 'Email не отправлен'}>
                        {app.isEmailSent ? '✅' : '❌'} 📧
                      </span>
                      <span title={app.isBitrixSent ? 'Bitrix отправлен' : 'Bitrix не отправлен'}>
                        {app.isBitrixSent ? '✅' : '❌'} 💼
                      </span>
                    </div>
                  </td>
                  <td className="admin-actions">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <button
                        className="admin-btn admin-btn-secondary"
                        onClick={() => {
                          setSelectedApp(app);
                          setShowDetailsModal(true);
                        }}
                        style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem', width: '100%' }}
                      >
                        Подробнее
                      </button>
                      <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => {
                          setEditingApp(app);
                          setShowEditModal(true);
                        }}
                        style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem', width: '100%' }}
                      >
                        Изменить
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <div className="admin-modal" onClick={() => setShowCreateModal(false)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Создать заявку</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              createMutation.mutate(formData);
            }}>
              <div className="admin-form-group">
                <label>Имя клиента *</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Телефон клиента *</label>
                <input
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Дата мероприятия *</label>
                <input
                  type="date"
                  value={formData.requestDate}
                  onChange={(e) => setFormData({ ...formData, requestDate: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Статус *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) })}
                >
                  <option value={0}>Новая</option>
                  <option value={1}>В работе</option>
                  <option value={2}>Завершена</option>
                  <option value={3}>Ошибка</option>
                </select>
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Создание...' : 'Создать'}
                </button>
                <button 
                  type="button" 
                  className="admin-btn admin-btn-secondary" 
                  onClick={() => setShowCreateModal(false)}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && editingApp && (
        <div className="admin-modal" onClick={() => setShowEditModal(false)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Редактировать заявку</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = {
                clientName: editingApp.clientName,
                clientEmail: editingApp.clientEmail,
                clientPhone: editingApp.clientPhone,
                clientWishes: editingApp.clientWishes,
                attachedFileName: editingApp.attachedFileName,
                attachedFileUrl: editingApp.attachedFileUrl,
                requestDate: editingApp.requestDate,
                status: editingApp.status,
              };
              updateMutation.mutate({ id: editingApp.id, data: formData });
            }}>
              <div className="admin-form-group">
                <label>Имя клиента *</label>
                <input
                  type="text"
                  value={editingApp.clientName}
                  onChange={(e) => setEditingApp({ ...editingApp, clientName: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Телефон клиента *</label>
                <input
                  type="tel"
                  value={editingApp.clientPhone}
                  onChange={(e) => setEditingApp({ ...editingApp, clientPhone: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Дата мероприятия *</label>
                <input
                  type="date"
                  value={editingApp.requestDate?.split('T')[0]}
                  onChange={(e) => setEditingApp({ ...editingApp, requestDate: e.target.value })}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Статус *</label>
                <select
                  value={editingApp.status}
                  onChange={(e) => setEditingApp({ ...editingApp, status: Number(e.target.value) })}
                >
                  <option value={0}>Новая</option>
                  <option value={1}>В работе</option>
                  <option value={2}>Завершена</option>
                  <option value={3}>Ошибка</option>
                </select>
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button 
                  type="button" 
                  className="admin-btn admin-btn-secondary" 
                  onClick={() => setShowEditModal(false)}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetailsModal && selectedApp && (
        <div className="admin-modal" onClick={() => setShowDetailsModal(false)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Детали заявки</h2>
            
            <div className="admin-form-group">
              <label>Имя клиента:</label>
              <p style={{ color: '#2c3e50', fontSize: '1.1rem', fontWeight: 'bold' }}>
                {selectedApp.clientName}
              </p>
            </div>

            {selectedApp.clientEmail && (
              <div className="admin-form-group">
                <label>Email:</label>
                <p style={{ color: '#2c3e50' }}>
                  <a href={`mailto:${selectedApp.clientEmail}`}>{selectedApp.clientEmail}</a>
                </p>
              </div>
            )}

            <div className="admin-form-group">
              <label>Телефон:</label>
              <p style={{ color: '#2c3e50' }}>
                <a href={`tel:${selectedApp.clientPhone}`}>{selectedApp.clientPhone}</a>
              </p>
            </div>

            {selectedApp.clientWishes && (
              <div className="admin-form-group">
                <label>Пожелания:</label>
                <p style={{ 
                  whiteSpace: 'pre-wrap', 
                  color: '#2c3e50', 
                  lineHeight: '1.6',
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '4px'
                }}>
                  {selectedApp.clientWishes}
                </p>
              </div>
            )}

            {selectedApp.attachedFileUrl && (
              <div className="admin-form-group">
                <label>Прикрепленный файл:</label>
                <p>
                  <a 
                    href={`http://localhost:5009${selectedApp.attachedFileUrl}`}
                    download={selectedApp.attachedFileName}
                    className="admin-btn admin-btn-secondary"
                    style={{ display: 'inline-block' }}
                  >
                    📎 Скачать {selectedApp.attachedFileName}
                  </a>
                </p>
              </div>
            )}

            <div className="admin-form-group">
              <label>Дата мероприятия:</label>
              <p style={{ color: '#2c3e50' }}>
                {new Date(selectedApp.requestDate).toLocaleDateString('ru-RU')}
              </p>
            </div>

            <div className="admin-form-group">
              <label>Статус:</label>
              <p>
                <span className="admin-badge admin-badge-info">
                  {selectedApp.status === 0 ? 'Новая' : selectedApp.status === 1 ? 'В работе' : selectedApp.status === 2 ? 'Завершена' : 'Ошибка'}
                </span>
              </p>
            </div>

            <div className="admin-form-group">
              <label>Отправленные уведомления:</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {selectedApp.isTelegramNotificationSent ? '✅' : '❌'} ✈️
                  </span>
                  <span style={{ color: selectedApp.isTelegramNotificationSent ? '#27ae60' : '#e74c3c', fontWeight: 500 }}>
                    {selectedApp.isTelegramNotificationSent ? 'Telegram отправлен' : 'Telegram не отправлен'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {selectedApp.isEmailSent ? '✅' : '❌'} 📧
                  </span>
                  <span style={{ color: selectedApp.isEmailSent ? '#27ae60' : '#e74c3c', fontWeight: 500 }}>
                    {selectedApp.isEmailSent ? 'Email отправлен' : 'Email не отправлен'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {selectedApp.isBitrixSent ? '✅' : '❌'} 💼
                  </span>
                  <span style={{ color: selectedApp.isBitrixSent ? '#27ae60' : '#e74c3c', fontWeight: 500 }}>
                    {selectedApp.isBitrixSent ? 'Bitrix отправлен' : 'Bitrix не отправлен'}
                  </span>
                </div>
              </div>
              {selectedApp.bitrixDealId && (
                <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: '#7f8c8d', background: '#f8f9fa', padding: '0.5rem', borderRadius: '4px' }}>
                  💼 ID сделки в Bitrix: <strong>{selectedApp.bitrixDealId}</strong>
                </p>
              )}
            </div>

            <div className="admin-form-group">
              <label>Дата создания:</label>
              <p style={{ color: '#2c3e50' }}>
                {new Date(selectedApp.createdAt).toLocaleString('ru-RU')}
              </p>
            </div>

            <div className="admin-form-actions">
              <button 
                className="admin-btn admin-btn-secondary" 
                onClick={() => setShowDetailsModal(false)}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="admin-pagination">
          <button
            className="admin-btn admin-btn-secondary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ← Назад
          </button>
          <span>
            Страница {page} из {data.totalPages}
          </span>
          <button
            className="admin-btn admin-btn-secondary"
            disabled={page === data.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Вперед →
          </button>
        </div>
      )}
    </div>
  );
}
