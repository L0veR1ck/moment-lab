import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';

export default function ApplicationsPage() {
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingApp, setEditingApp] = useState<any>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
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
        clientPhone: '', 
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

      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>Имя клиента</th>
              <th>Телефон</th>
              <th>Дата мероприятия</th>
              <th>Статус</th>
              <th>Дата создания</th>
              <th>Действия</th>
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
                  <td><strong>{app.clientName}</strong></td>
                  <td>{app.clientPhone}</td>
                  <td>{new Date(app.requestDate).toLocaleDateString('ru-RU')}</td>
                  <td>
                    <span className="admin-badge admin-badge-info">
                      {app.status === 0 ? 'Новая' : app.status === 1 ? 'В работе' : 'Завершена'}
                    </span>
                  </td>
                  <td>{new Date(app.createdAt).toLocaleDateString('ru-RU')}</td>
                  <td className="admin-actions">
                    <button
                      className="admin-btn admin-btn-primary"
                      onClick={() => {
                        setEditingApp(app);
                        setShowEditModal(true);
                      }}
                    >
                      Изменить
                    </button>
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
                clientPhone: editingApp.clientPhone,
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
