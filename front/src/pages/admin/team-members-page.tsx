import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';

export default function TeamMembersPage() {
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [editingMember, setEditingMember] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['teamMembers', page],
    queryFn: () => api.teamMembers.getAll(page, 10),
  });

  const deleteMutation = useMutation({
    mutationFn: api.teamMembers.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
      await queryClient.refetchQueries({ queryKey: ['teamMembers', page] });
    },
    onError: (error) => {
      console.error('Ошибка при удалении:', error);
    },
  });

  if (isLoading) return <div className="admin-loading">Загрузка...</div>;
  if (error) return <div className="admin-error">Ошибка загрузки команды</div>;

  return (
    <div style={{ width: '100%' }}>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Команда</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowCreateModal(true)}>
          + Добавить члена команды
        </button>
      </div>

      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Должность</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
                  Членов команды пока нет. Добавьте первого!
                </td>
              </tr>
            ) : (
              data?.items.map((member: any) => (
                <tr 
                  key={member.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedMember(member)}
                  title="Нажмите для просмотра деталей"
                >
                  <td><strong>{member.firstName}</strong></td>
                  <td><strong>{member.lastName}</strong></td>
                  <td>{member.position || '-'}</td>
                  <td>
                    <span className={member.isActive ? 'admin-badge admin-badge-success' : 'admin-badge admin-badge-warning'}>
                      {member.isActive ? 'Активен' : 'Неактивен'}
                    </span>
                  </td>
                  <td className="admin-actions" onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button
                        className="admin-btn admin-btn-secondary"
                        onClick={() => {
                          setEditingMember(member);
                          setShowEditModal(true);
                        }}
                      >
                        Редактировать
                      </button>
                      <button
                        className="admin-btn admin-btn-danger"
                        onClick={() => {
                          if (confirm('Удалить члена команды?')) {
                            deleteMutation.mutate(member.id);
                          }
                        }}
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedMember && (
        <div className="admin-modal" onClick={() => setSelectedMember(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedMember.firstName} {selectedMember.lastName}</h2>
            
            <div className="admin-form-group">
              <label>Должность:</label>
              <p style={{ color: '#2c3e50' }}>{selectedMember.position || '-'}</p>
            </div>

            {selectedMember.photoUrl && (
              <div className="admin-form-group">
                <label>Фото:</label>
                <img 
                  src={selectedMember.photoUrl} 
                  alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                  style={{ maxWidth: '200px', borderRadius: '8px' }}
                />
              </div>
            )}

            <div className="admin-form-group">
              <label>Статус:</label>
              <span className={selectedMember.isActive ? 'admin-badge admin-badge-success' : 'admin-badge admin-badge-warning'}>
                {selectedMember.isActive ? 'Активен' : 'Неактивен'}
              </span>
            </div>

            <div className="admin-form-actions">
              <button className="admin-btn admin-btn-secondary" onClick={() => setSelectedMember(null)}>
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
        <CreateTeamMemberModal onClose={() => setShowCreateModal(false)} />
      )}

      {showEditModal && editingMember && (
        <EditTeamMemberModal 
          member={editingMember} 
          onClose={() => {
            setShowEditModal(false);
            setEditingMember(null);
          }} 
        />
      )}
    </div>
  );
}

function CreateTeamMemberModal({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    photoUrl: null,
    isActive: true,
    displayOrder: 0,
  });
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: api.teamMembers.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
      onClose();
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'team');

      const response = await fetch('http://localhost:5009/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setFormData(prev => ({ ...prev, photoUrl: data.fileUrl }));
      setPhotoPreview(`http://localhost:5009${data.fileUrl}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Ошибка загрузки файла');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div className="admin-modal" onClick={onClose}>
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">Добавить члена команды</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Имя *</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Фамилия *</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Должность</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Фотография</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            {uploading && <p style={{ color: '#3498db', marginTop: '8px' }}>Загрузка...</p>}
            {photoPreview && (
              <img 
                src={photoPreview} 
                alt="Предварительный просмотр" 
                style={{ maxWidth: '200px', marginTop: '12px', borderRadius: '8px' }}
              />
            )}
          </div>
          <div className="admin-form-group">
            <label>Порядок отображения</label>
            <input
              type="number"
              min="0"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="admin-form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                style={{ marginRight: '8px' }}
              />
              Активен
            </label>
          </div>
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Добавление...' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditTeamMemberModal({ member, onClose }: { member: any; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    firstName: member.firstName,
    lastName: member.lastName,
    position: member.position || '',
    photoUrl: member.photoUrl,
    isActive: member.isActive,
    displayOrder: member.displayOrder,
  });
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    member.photoUrl ? `http://localhost:5009${member.photoUrl}` : null
  );

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.teamMembers.update(member.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
      onClose();
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'team');

      const response = await fetch('http://localhost:5009/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setFormData(prev => ({ ...prev, photoUrl: data.fileUrl }));
      setPhotoPreview(`http://localhost:5009${data.fileUrl}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Ошибка загрузки файла');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <div className="admin-modal" onClick={onClose}>
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h2 className="admin-modal-title">Редактировать члена команды</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Имя *</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Фамилия *</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Должность</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Фотография</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            {uploading && <p style={{ color: '#3498db', marginTop: '8px' }}>Загрузка...</p>}
            {photoPreview && (
              <img 
                src={photoPreview} 
                alt="Предварительный просмотр" 
                style={{ maxWidth: '200px', marginTop: '12px', borderRadius: '8px' }}
              />
            )}
          </div>
          <div className="admin-form-group">
            <label>Порядок отображения</label>
            <input
              type="number"
              min="0"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="admin-form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                style={{ marginRight: '8px' }}
              />
              Активен
            </label>
          </div>
          <div className="admin-form-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
