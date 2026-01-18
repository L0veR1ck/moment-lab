import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';

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

  if (isLoading) return <div className="admin-loading">Загрузка...</div>;
  if (error) return <div className="admin-error">Ошибка загрузки мероприятий</div>;

  return (
    <div style={{ width: '100%' }}>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Мероприятия</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowCreateModal(true)}>
          + Создать мероприятие
        </button>
      </div>

      <div className="admin-table-container">
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
                    <span className={event.isActive ? 'admin-badge admin-badge-success' : 'admin-badge admin-badge-warning'}>
                      {event.isActive ? 'Активно' : 'Неактивно'}
                    </span>
                  </td>
                  <td className="admin-actions">
                    <button
                      className="admin-btn admin-btn-primary"
                      onClick={() => {
                        setEditingEvent(event);
                        setShowEditModal(true);
                      }}
                    >
                      Изменить
                    </button>
                    <button
                      className="admin-btn admin-btn-danger"
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
        <div className="admin-modal" onClick={() => setSelectedEvent(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEvent.title}</h2>
            
            <div className="admin-form-group">
              <label>Описание:</label>
              <p style={{ whiteSpace: 'pre-wrap', color: '#2c3e50' }}>{selectedEvent.description}</p>
            </div>

            <div className="admin-form-group">
              <label>Программа:</label>
              <p style={{ whiteSpace: 'pre-wrap', color: '#2c3e50' }}>{selectedEvent.programDescription}</p>
            </div>

            <div className="admin-form-group">
              <label>Ключевые ценности:</label>
              <p style={{ whiteSpace: 'pre-wrap', color: '#2c3e50' }}>{selectedEvent.keyValues}</p>
            </div>

            {selectedEvent.characteristics && selectedEvent.characteristics.length > 0 && (
              <div className="admin-form-group">
                <label>Характеристики:</label>
                <ul style={{ color: '#2c3e50', paddingLeft: '1.5rem' }}>
                  {selectedEvent.characteristics.map((char: any) => (
                    <li key={char.id}><strong>{char.name}:</strong> {char.value}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="admin-form-actions">
              <button className="admin-btn admin-btn-secondary" onClick={() => setSelectedEvent(null)}>
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
    urlSlug: '',
    description: '',
    programDescription: '',
    keyValues: '',
    mainPhotoUrl: null,
    isActive: true,
    displayOrder: 0,
    characteristics: [],
  });
  const [uploading, setUploading] = useState(false);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('folder', 'events');

      const response = await fetch('http://localhost:5009/api/Files/upload', {
        method: 'POST',
        body: formDataUpload,
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setFormData({ ...formData, mainPhotoUrl: data.fileUrl });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Ошибка при загрузке файла');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-modal" onClick={onClose}>
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">Создать мероприятие</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Название *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>URL (slug) *</label>
            <input
              type="text"
              required
              pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
              placeholder="active-team-building"
              value={formData.urlSlug}
              onChange={(e) => setFormData({ ...formData, urlSlug: e.target.value })}
            />
            <small style={{ color: '#7f8c8d', fontSize: '12px' }}>
              Только строчные буквы, цифры и дефисы
            </small>
          </div>
          <div className="admin-form-group">
            <label>Изображение превью</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            {uploading && <span style={{ color: '#3498db', fontSize: '14px' }}>Загрузка...</span>}
            {formData.mainPhotoUrl && (
              <div style={{ marginTop: '8px' }}>
                <img 
                  src={`http://localhost:5009${formData.mainPhotoUrl}`} 
                  alt="Preview" 
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
            )}
          </div>
          <div className="admin-form-group">
            <label>Описание *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Программа *</label>
            <textarea
              required
              rows={5}
              value={formData.programDescription}
              onChange={(e) => setFormData({ ...formData, programDescription: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Ключевые ценности *</label>
            <textarea
              required
              rows={3}
              value={formData.keyValues}
              onChange={(e) => setFormData({ ...formData, keyValues: e.target.value })}
            />
          </div>
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="admin-btn admin-btn-primary">
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
    urlSlug: event.urlSlug,
    description: event.description,
    programDescription: event.programDescription,
    keyValues: event.keyValues,
    mainPhotoUrl: event.mainPhotoUrl,
    isActive: event.isActive,
    displayOrder: event.displayOrder || 0,
    characteristics: event.characteristics || [],
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('folder', 'events');

      const response = await fetch('http://localhost:5009/api/Files/upload', {
        method: 'POST',
        body: formDataUpload,
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setFormData({ ...formData, mainPhotoUrl: data.fileUrl });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Ошибка при загрузке файла');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-modal" onClick={onClose}>
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">Редактировать мероприятие</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Название *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>URL (slug) *</label>
            <input
              type="text"
              required
              pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
              placeholder="active-team-building"
              value={formData.urlSlug}
              onChange={(e) => setFormData({ ...formData, urlSlug: e.target.value })}
            />
            <small style={{ color: '#7f8c8d', fontSize: '12px' }}>
              Только строчные буквы, цифры и дефисы
            </small>
          </div>
          <div className="admin-form-group">
            <label>Изображение превью</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            {uploading && <span style={{ color: '#3498db', fontSize: '14px' }}>Загрузка...</span>}
            {formData.mainPhotoUrl && (
              <div style={{ marginTop: '8px' }}>
                <img 
                  src={`http://localhost:5009${formData.mainPhotoUrl}`} 
                  alt="Preview" 
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
            )}
          </div>
          <div className="admin-form-group">
            <label>Описание *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Программа *</label>
            <textarea
              required
              rows={5}
              value={formData.programDescription}
              onChange={(e) => setFormData({ ...formData, programDescription: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Ключевые ценности *</label>
            <textarea
              required
              rows={3}
              value={formData.keyValues}
              onChange={(e) => setFormData({ ...formData, keyValues: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              Активно
            </label>
          </div>
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="admin-btn admin-btn-primary">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
