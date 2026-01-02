import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';

export default function EventsPage() {
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['events', page],
    queryFn: () => api.events.getAll(page, 10),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.events.update(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.refetchQueries({ queryKey: ['events', page] });
      setShowEditModal(false);
      setEditingEvent(null);
    },
    onError: (error) => {
      console.error('Ошибка при обновлении:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.events.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.refetchQueries({ queryKey: ['events', page] });
    },
    onError: (error) => {
      console.error('Ошибка при удалении:', error);
    },
  });

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка загрузки мероприятий</div>;

  return (
    <div style={{ width: '100%' }}>
      <div className="page-header">
        <h1 className="page-title">Мероприятия</h1>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          + Создать мероприятие
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
                  Мероприятий пока нет. Создайте первое мероприятие!
                </td>
              </tr>
            ) : (
              data?.items.map((event: any) => (
                <tr key={event.id}>
                  <td><strong>{event.title}</strong></td>
                  <td>
                    <span 
                      style={{ cursor: 'pointer', color: '#3498db' }}
                      onClick={() => setSelectedEvent(event)}
                      title="Нажмите для просмотра"
                    >
                      {event.description.substring(0, 100)}...
                    </span>
                  </td>
                  <td>
                    <span className={event.isActive ? 'badge badge-success' : 'badge badge-warning'}>
                      {event.isActive ? 'Активно' : 'Неактивно'}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setEditingEvent(event);
                        setShowEditModal(true);
                      }}
                    >
                      Изменить
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        if (confirm('Удалить мероприятие?')) {
                          deleteMutation.mutate(event.id);
                        }
                      }}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedEvent && (
        <div className="modal" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEvent.title}</h2>
            
            <div className="form-group">
              <label>Описание:</label>
              <p style={{ whiteSpace: 'pre-wrap', color: '#2c3e50' }}>{selectedEvent.description}</p>
            </div>

            <div className="form-group">
              <label>Программа:</label>
              <p style={{ whiteSpace: 'pre-wrap', color: '#2c3e50' }}>{selectedEvent.programDescription}</p>
            </div>

            <div className="form-group">
              <label>Ключевые ценности:</label>
              <p style={{ whiteSpace: 'pre-wrap', color: '#2c3e50' }}>{selectedEvent.keyValues}</p>
            </div>

            {selectedEvent.characteristics && selectedEvent.characteristics.length > 0 && (
              <div className="form-group">
                <label>Характеристики:</label>
                <ul style={{ color: '#2c3e50', paddingLeft: '1.5rem' }}>
                  {selectedEvent.characteristics.map((char: any) => (
                    <li key={char.id}><strong>{char.name}:</strong> {char.value}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="form-actions">
              <button className="btn btn-secondary" onClick={() => setSelectedEvent(null)}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-secondary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ← Назад
          </button>
          <span>
            Страница {page} из {data.totalPages}
          </span>
          <button
            className="btn btn-secondary"
            disabled={page === data.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Вперед →
          </button>
        </div>
      )}

      {showCreateModal && (
        <CreateEventModal onClose={() => setShowCreateModal(false)} />
      )}
      
      {showEditModal && editingEvent && (
        <EditEventModal 
          event={editingEvent}
          onClose={() => {
            setShowEditModal(false);
            setEditingEvent(null);
          }}
          onSave={(data) => {
            updateMutation.mutate({ id: editingEvent.id, data });
          }}
        />
      )}
    </div>
  );
}

function CreateEventModal({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    programDescription: '',
    keyValues: '',
    mainPhotoUrl: null,
    isActive: true,
    displayOrder: 0,
    characteristics: [],
  });

  const createMutation = useMutation({
    mutationFn: api.events.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Создать мероприятие</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Описание *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Программа *</label>
            <textarea
              required
              value={formData.programDescription}
              onChange={(e) => setFormData({ ...formData, programDescription: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Ключевые ценности *</label>
            <textarea
              required
              value={formData.keyValues}
              onChange={(e) => setFormData({ ...formData, keyValues: e.target.value })}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditEventModal({ event, onClose, onSave }: { event: any; onClose: () => void; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    programDescription: event.programDescription,
    keyValues: event.keyValues,
    mainPhotoUrl: event.mainPhotoUrl,
    isActive: event.isActive,
    displayOrder: event.displayOrder || 0,
    characteristics: event.characteristics || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Редактировать мероприятие</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Описание *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Программа *</label>
            <textarea
              required
              value={formData.programDescription}
              onChange={(e) => setFormData({ ...formData, programDescription: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Ключевые ценности *</label>
            <textarea
              required
              value={formData.keyValues}
              onChange={(e) => setFormData({ ...formData, keyValues: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              Активно
            </label>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

