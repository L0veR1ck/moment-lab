import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ApiError } from '../../api/client';

export default function QuestsPage() {
  const page = 1;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['events', 'quests-admin', page],
    queryFn: () => api.events.getAll(page, 100),
  });

  // Фильтруем только квесты (slug начинается с quest-)
  const questEvents = data?.items.filter(
    (event: any) => event.urlSlug.startsWith('quest-')
  ) || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.events.update(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
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
    },
    onError: (error) => {
      console.error('Ошибка при удалении:', error);
    },
  });

  if (isLoading) return <div className="admin-loading">Загрузка...</div>;
  if (error) return <div className="admin-error">Ошибка загрузки квестов</div>;

  return (
    <div style={{ width: '100%' }}>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Иммерсивные квесты</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowCreateModal(true)}>
          + Создать квест
        </button>
      </div>

      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>URL slug</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {questEvents.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
                  Квестов пока нет. Создайте первый квест!
                </td>
              </tr>
            ) : (
              questEvents.map((event: any) => (
                <tr key={event.id}>
                  <td>
                    <strong
                      style={{ cursor: 'pointer', color: '#3498db' }}
                      onClick={() => setSelectedEvent(event)}
                      title="Нажмите для просмотра"
                    >
                      {event.title}
                    </strong>
                  </td>
                  <td><code>{event.urlSlug}</code></td>
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
                        if (confirm('Удалить квест?')) {
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

      {showCreateModal && (
        <QuestFormModal mode="create" onClose={() => setShowCreateModal(false)} />
      )}

      {showEditModal && editingEvent && (
        <QuestFormModal
          mode="edit"
          event={editingEvent}
          onClose={() => { setShowEditModal(false); setEditingEvent(null); }}
          onSave={(data) => updateMutation.mutate({ id: editingEvent.id, data })}
          isSaving={updateMutation.isPending}
          saveError={updateMutation.error}
        />
      )}
    </div>
  );
}

type QuestFormModalProps =
  | { mode: 'create'; onClose: () => void; event?: undefined; onSave?: undefined; isSaving?: undefined; saveError?: undefined }
  | { mode: 'edit'; event: any; onClose: () => void; onSave: (data: any) => void; isSaving?: boolean; saveError?: Error | null };

function QuestFormModal({ mode, event, onClose, onSave, isSaving, saveError }: QuestFormModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: event?.title ?? '',
    urlSlug: event?.urlSlug ?? 'quest-',
    description: event?.description ?? '',
    programDescription: event?.programDescription ?? '',
    keyValues: event?.keyValues ?? '',
    mainPhotoUrl: event?.mainPhotoUrl ?? null,
    isActive: event?.isActive ?? true,
    displayOrder: event?.displayOrder ?? 0,
    characteristics: event?.characteristics ?? [],
  });
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [photos, setPhotos] = useState<any[]>(event?.photos ?? []);
  const [createError, setCreateError] = useState('');

  const createMutation = useMutation({
    mutationFn: api.events.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      onClose();
    },
    onError: (error) => {
      if (error instanceof ApiError && error.details) {
        setCreateError(error.details);
      } else {
        setCreateError('Ошибка при создании. Попробуйте ещё раз.');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    if (mode === 'create') {
      createMutation.mutate(formData);
    } else {
      onSave!(formData);
    }
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
    if (mode === 'create' || !event?.id) return;
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
    if (!event?.id || !confirm('Удалить фото из галереи?')) return;
    try {
      const res = await fetch(`http://localhost:5009/api/Events/${event.id}/photos/${photoId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Delete failed');
      setPhotos(prev => prev.filter((p: any) => p.id !== photoId));
      queryClient.invalidateQueries({ queryKey: ['events'] });
    } catch {
      alert('Ошибка при удалении фото');
    }
  };

  return (
    <div className="admin-modal" onClick={onClose}>
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">
            {mode === 'create' ? 'Создать квест' : 'Редактировать квест'}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Название *</label>
            <input type="text" required value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>URL slug *</label>
            <input type="text" required pattern="^quest-[a-z0-9]+(?:-[a-z0-9]+)*$"
              placeholder="quest-night-at-museum" value={formData.urlSlug}
              onChange={(e) => setFormData({ ...formData, urlSlug: e.target.value })} />
            <small style={{ color: '#7f8c8d', fontSize: '12px' }}>
              Обязательно начинается с "quest-", затем строчные буквы, цифры и дефисы
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
            <small style={{ color: '#7f8c8d', fontSize: '12px' }}>Максимум 219 символов — показывается в карточке квеста</small>
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

          {/* Gallery — only in edit mode */}
          {mode === 'edit' && (
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
              {mode === 'edit' && photos.length === 0 && (
                <small style={{ color: '#7f8c8d', fontSize: '12px' }}>Добавьте фото для галереи на странице квеста</small>
              )}
            </div>
          )}

          <div className="admin-form-group">
            <label>
              <input type="checkbox" checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
              {' '}Активно (показывать на сайте)
            </label>
          </div>
          {(createError || (mode === 'edit' && saveError)) && (
            <div style={{ background: '#fde8e8', border: '1px solid #e74c3c', borderRadius: '6px', padding: '10px 14px', color: '#c0392b', fontSize: '14px', whiteSpace: 'pre-wrap', marginBottom: '8px' }}>
              ⚠️ {createError || (saveError instanceof ApiError && saveError.details ? saveError.details : saveError?.message)}
            </div>
          )}
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>Отмена</button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={createMutation.isPending || isSaving}>
              {createMutation.isPending || isSaving
                ? (mode === 'create' ? 'Создание...' : 'Сохранение...')
                : (mode === 'create' ? 'Создать' : 'Сохранить')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
