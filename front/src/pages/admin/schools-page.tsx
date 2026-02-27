import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ApiError } from '../../api/client';

export default function SchoolsPage() {
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['events', 'schools', page],
    queryFn: () => api.events.getAll(page, 10),
  });

  // Фильтруем только школы (не квесты)
  const schoolEvents = data?.items.filter(
    (event: any) => !event.urlSlug.startsWith('quest-')
  ) || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.events.update(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.refetchQueries({ queryKey: ['events', 'schools', page] });
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
      await queryClient.refetchQueries({ queryKey: ['events', 'schools', page] });
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
        <h1 className="admin-page-title">Мероприятия для школ</h1>
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
            {schoolEvents.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
                  Мероприятий для школ пока нет. Создайте первое мероприятие!
                </td>
              </tr>
            ) : (
              schoolEvents.map((event: any) => (
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
          isSaving={updateMutation.isPending}
          saveError={updateMutation.error}
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
  const [apiError, setApiError] = useState('');

  const createMutation = useMutation({
    mutationFn: api.events.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      onClose();
    },
    onError: (error) => {
      if (error instanceof ApiError && error.details) {
        setApiError(error.details);
      } else {
        setApiError('Ошибка при создании. Попробуйте ещё раз.');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
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
          <h2 className="admin-modal-title">Создать мероприятие для школ</h2>
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
              placeholder="school-event-name"
              value={formData.urlSlug}
              onChange={(e) => setFormData({ ...formData, urlSlug: e.target.value })}
            />
            <small style={{ color: '#7f8c8d', fontSize: '12px' }}>
              Только строчные буквы, цифры и дефисы. НЕ начинайте с "quest-"
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
            <label>
              Описание *
              <span style={{ fontWeight: 400, color: formData.description.length > 219 ? '#e74c3c' : '#7f8c8d', fontSize: '12px', marginLeft: '8px' }}>
                {formData.description.length}/219 символов
              </span>
            </label>
            <textarea
              required
              rows={3}
              maxLength={219}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <small style={{ color: '#7f8c8d', fontSize: '12px' }}>Максимум 219 символов — показывается в карточке мероприятия</small>
          </div>
          <div className="admin-form-group">
            <label>Программа</label>
            <textarea
              rows={5}
              placeholder="Каждый пункт с новой строки"
              value={formData.programDescription}
              onChange={(e) => setFormData({ ...formData, programDescription: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Ключевые ценности</label>
            <textarea
              rows={3}
              value={formData.keyValues}
              onChange={(e) => setFormData({ ...formData, keyValues: e.target.value })}
            />
          </div>
          {apiError && (
            <div style={{ background: '#fde8e8', border: '1px solid #e74c3c', borderRadius: '6px', padding: '10px 14px', color: '#c0392b', fontSize: '14px', whiteSpace: 'pre-wrap', marginBottom: '8px' }}>
              ⚠️ {apiError}
            </div>
          )}
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Создание...' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditEventModal({ event, onClose, onSave, isSaving, saveError }: { event: any; onClose: () => void; onSave: (data: any) => void; isSaving?: boolean; saveError?: Error | null }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: event.title,
    urlSlug: event.urlSlug,
    description: event.description,
    programDescription: event.programDescription || '',
    keyValues: event.keyValues || '',
    mainPhotoUrl: event.mainPhotoUrl,
    isActive: event.isActive,
    displayOrder: event.displayOrder || 0,
    characteristics: event.characteristics || [],
  });
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [photos, setPhotos] = useState<any[]>(event.photos || []);
  const [apiError, setApiError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    onSave(formData);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'events');
      const response = await fetch('http://localhost:5009/api/Files/upload', { method: 'POST', body: fd, credentials: 'include' });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setFormData({ ...formData, mainPhotoUrl: data.fileUrl });
    } catch {
      alert('Ошибка при загрузке файла');
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingGallery(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', 'events');
        const uploadRes = await fetch('http://localhost:5009/api/Files/upload', { method: 'POST', body: fd, credentials: 'include' });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const uploadData = await uploadRes.json();
        const addRes = await fetch(`http://localhost:5009/api/Events/${event.id}/photos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ photoUrl: uploadData.fileUrl, displayOrder: photos.length }),
        });
        if (!addRes.ok) throw new Error('Add photo failed');
        const newPhoto = await addRes.json();
        setPhotos(prev => [...prev, newPhoto]);
      }
      queryClient.invalidateQueries({ queryKey: ['events'] });
    } catch {
      alert('Ошибка при загрузке фото в галерею');
    } finally {
      setUploadingGallery(false);
      e.target.value = '';
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm('Удалить фото из галереи?')) return;
    try {
      const res = await fetch(`http://localhost:5009/api/Events/${event.id}/photos/${photoId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Delete failed');
      setPhotos(prev => prev.filter(p => p.id !== photoId));
      queryClient.invalidateQueries({ queryKey: ['events'] });
    } catch {
      alert('Ошибка при удалении фото');
    }
  };

  return (
    <div className="admin-modal" onClick={onClose}>
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">Редактировать мероприятие для школ</h2>
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
              placeholder="school-event-name"
              value={formData.urlSlug}
              onChange={(e) => setFormData({ ...formData, urlSlug: e.target.value })}
            />
            <small style={{ color: '#7f8c8d', fontSize: '12px' }}>
              Только строчные буквы, цифры и дефисы. НЕ начинайте с "quest-"
            </small>
          </div>
          <div className="admin-form-group">
            <label>Изображение превью</label>
            <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
            {uploading && <span style={{ color: '#3498db', fontSize: '14px' }}>Загрузка...</span>}
            {formData.mainPhotoUrl && (
              <div style={{ marginTop: '8px' }}>
                <img src={`http://localhost:5009${formData.mainPhotoUrl}`} alt="Preview"
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
              </div>
            )}
          </div>
          <div className="admin-form-group">
            <label>
              Описание *
              <span style={{ fontWeight: 400, color: formData.description.length > 219 ? '#e74c3c' : '#7f8c8d', fontSize: '12px', marginLeft: '8px' }}>
                {formData.description.length}/219 символов
              </span>
            </label>
            <textarea required rows={3} maxLength={219} value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <small style={{ color: '#7f8c8d', fontSize: '12px' }}>Максимум 219 символов — показывается в карточке мероприятия</small>
          </div>
          <div className="admin-form-group">
            <label>Программа</label>
            <textarea rows={5} placeholder="Каждый пункт с новой строки" value={formData.programDescription}
              onChange={(e) => setFormData({ ...formData, programDescription: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>Ключевые ценности</label>
            <textarea rows={3} value={formData.keyValues}
              onChange={(e) => setFormData({ ...formData, keyValues: e.target.value })} />
          </div>

          {/* Gallery */}
          <div className="admin-form-group">
            <label>Галерея ({photos.length}/10)</label>
            {photos.length < 10 && (
              <>
                <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} disabled={uploadingGallery} />
                {uploadingGallery && <span style={{ color: '#3498db', fontSize: '14px' }}>Загрузка фото...</span>}
              </>
            )}
            {photos.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                {photos.map((photo: any) => (
                  <div key={photo.id} style={{ position: 'relative' }}>
                    <img src={`http://localhost:5009${photo.photoUrl}`} alt=""
                      style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px', display: 'block' }} />
                    <button type="button" onClick={() => handleDeletePhoto(photo.id)}
                      style={{
                        position: 'absolute', top: '-6px', right: '-6px',
                        background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '50%',
                        width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px', lineHeight: '20px', padding: 0,
                      }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="admin-form-group">
            <label>
              <input type="checkbox" checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
              {' '}Активно
            </label>
          </div>
          {(saveError || apiError) && (
            <div style={{ background: '#fde8e8', border: '1px solid #e74c3c', borderRadius: '6px', padding: '10px 14px', color: '#c0392b', fontSize: '14px', whiteSpace: 'pre-wrap', marginBottom: '8px' }}>
              ⚠️ {saveError instanceof ApiError && saveError.details ? saveError.details : saveError?.message || apiError}
            </div>
          )}
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>Отмена</button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={isSaving}>
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
