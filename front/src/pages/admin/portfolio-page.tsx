import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, ApiError } from '../../api/client';

export default function PortfolioPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => api.portfolio.getAll(),
  });

  const deleteMutation = useMutation({
    mutationFn: api.portfolio.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['portfolio'] }),
  });

  if (isLoading) return <div className="admin-loading">Загрузка...</div>;
  if (error) return <div className="admin-error">Ошибка загрузки портфолио</div>;

  return (
    <div style={{ width: '100%' }}>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Портфолио</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowCreateModal(true)}>
          + Добавить кейс
        </button>
      </div>

      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Фото</th>
              <th>Порядок</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
                  Кейсов пока нет. Добавьте первый!
                </td>
              </tr>
            ) : (
              projects.map((project: any) => (
                <tr key={project.id}>
                  <td><strong>{project.title}</strong></td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {project.photos.slice(0, 4).map((photo: any) => (
                        <img
                          key={photo.id}
                          src={`http://localhost:5009${photo.photoUrl}`}
                          alt=""
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      ))}
                      {project.photos.length > 4 && (
                        <div style={{ width: '48px', height: '48px', background: '#ecf0f1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#7f8c8d' }}>
                          +{project.photos.length - 4}
                        </div>
                      )}
                      {project.photos.length === 0 && (
                        <span style={{ color: '#bdc3c7', fontSize: '13px' }}>нет фото</span>
                      )}
                    </div>
                  </td>
                  <td>{project.displayOrder}</td>
                  <td className="admin-actions">
                    <button
                      className="admin-btn admin-btn-primary"
                      onClick={() => setEditingProject(project)}
                    >
                      Изменить
                    </button>
                    <button
                      className="admin-btn admin-btn-danger"
                      onClick={() => {
                        if (confirm(`Удалить кейс "${project.title}" и все его фотографии?`)) {
                          deleteMutation.mutate(project.id);
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

      {showCreateModal && (
        <ProjectFormModal mode="create" onClose={() => setShowCreateModal(false)} />
      )}
      {editingProject && (
        <ProjectFormModal
          mode="edit"
          project={editingProject}
          onClose={() => setEditingProject(null)}
        />
      )}
    </div>
  );
}

type ProjectFormModalProps =
  | { mode: 'create'; onClose: () => void; project?: undefined }
  | { mode: 'edit'; project: any; onClose: () => void };

function ProjectFormModal({ mode, project, onClose }: ProjectFormModalProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(project?.title ?? '');
  const [displayOrder, setDisplayOrder] = useState(project?.displayOrder ?? 0);
  const [photos, setPhotos] = useState<any[]>(project?.photos ?? []);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [apiError, setApiError] = useState('');

  // For create: store created project id after first save to enable photo upload
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);
  const editId = mode === 'edit' ? project.id : createdProjectId;

  const createMutation = useMutation({
    mutationFn: () => api.portfolio.create({ title, displayOrder }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      setCreatedProjectId(data.id);
    },
    onError: (err) => {
      setApiError(err instanceof ApiError && err.details ? err.details : 'Ошибка при создании');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id: string) => api.portfolio.update(id, { title, displayOrder }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
    onError: (err) => {
      setApiError(err instanceof ApiError && err.details ? err.details : 'Ошибка при сохранении');
    },
  });

  const handleSaveMeta = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    if (mode === 'create' && !createdProjectId) {
      // First save — create the project
      createMutation.mutate();
    } else {
      // Project already exists — update title/order only (photos stay intact)
      const idToUpdate = mode === 'edit' ? project!.id : createdProjectId!;
      updateMutation.mutate(idToUpdate);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editId) return;
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingGallery(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', 'portfolio');
        const uploadRes = await fetch('http://localhost:5009/api/Files/upload', {
          method: 'POST', body: fd, credentials: 'include',
        });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const uploadData = await uploadRes.json();

        const addRes = await fetch(`http://localhost:5009/api/Portfolio/${editId}/photos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ photoUrl: uploadData.fileUrl, displayOrder: photos.length }),
        });
        if (!addRes.ok) throw new Error('Add photo failed');
        const newPhoto = await addRes.json();
        setPhotos(prev => [...prev, newPhoto]);
      }
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    } catch {
      alert('Ошибка при загрузке фото');
    } finally {
      setUploadingGallery(false);
      e.target.value = '';
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!editId || !confirm('Удалить фото?')) return;
    try {
      await fetch(`http://localhost:5009/api/Portfolio/${editId}/photos/${photoId}`, {
        method: 'DELETE', credentials: 'include',
      });
      setPhotos(prev => prev.filter((p: any) => p.id !== photoId));
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    } catch {
      alert('Ошибка при удалении фото');
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isSaved = mode === 'edit' || !!createdProjectId;
  const saveLabel = isSaving
    ? 'Сохранение...'
    : isSaved
    ? 'Сохранить название'
    : 'Создать и добавить фото';

  return (
    <div className="admin-modal" onClick={onClose}>
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">
            {mode === 'create' ? 'Новый кейс портфолио' : `Редактировать: ${project.title}`}
          </h2>
        </div>

        <form onSubmit={handleSaveMeta}>
          <div className="admin-form-group">
            <label>Название *</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label>Порядок отображения</label>
            <input
              type="number"
              min={0}
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value))}
            />
            <small style={{ color: '#7f8c8d', fontSize: '12px' }}>Меньше = выше в списке</small>
          </div>

          {apiError && (
            <div style={{ background: '#fde8e8', border: '1px solid #e74c3c', borderRadius: '6px', padding: '10px 14px', color: '#c0392b', fontSize: '14px', whiteSpace: 'pre-wrap', marginBottom: '8px' }}>
              ⚠️ {apiError}
            </div>
          )}

          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
              {isSaved ? 'Отмена' : 'Отмена'}
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={isSaving}>
              {saveLabel}
            </button>
          </div>
        </form>

        {/* Gallery section — available after project is saved */}
        {isSaved && (
          <div className="admin-form-group" style={{ marginTop: '24px', borderTop: '1px solid #ecf0f1', paddingTop: '20px' }}>
            <label style={{ fontSize: '16px', fontWeight: 600 }}>
              Фотографии галереи ({photos.length})
            </label>
            <div style={{ marginTop: '10px' }}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                disabled={uploadingGallery}
              />
              {uploadingGallery && (
                <span style={{ color: '#3498db', fontSize: '14px', marginLeft: '10px' }}>Загрузка...</span>
              )}
            </div>
            {photos.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '14px' }}>
                {photos.map((photo: any) => (
                  <div key={photo.id} style={{ position: 'relative' }}>
                    <img
                      src={`http://localhost:5009${photo.photoUrl}`}
                      alt=""
                      style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px', display: 'block' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(photo.id)}
                      style={{
                        position: 'absolute', top: '-7px', right: '-7px',
                        background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '50%',
                        width: '22px', height: '22px', cursor: 'pointer', fontSize: '13px',
                        lineHeight: '22px', padding: 0, textAlign: 'center',
                      }}
                    >×</button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#bdc3c7', fontSize: '14px', marginTop: '10px' }}>
                Фото ещё не добавлены. Выберите файлы выше.
              </p>
            )}

            {/* Done button */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={onClose}
                disabled={uploadingGallery}
                style={{ minWidth: '120px' }}
              >
                ✓ Готово
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
