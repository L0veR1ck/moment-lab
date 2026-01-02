import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';

export default function TeamMembersPage() {
  const [page, setPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
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

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка загрузки команды</div>;

  return (
    <div style={{ width: '100%' }}>
      <div className="page-header">
        <h1 className="page-title">Команда</h1>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          + Добавить члена команды
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Должность</th>
              <th>Телефон</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
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
                  <td>{member.phoneNumber || '-'}</td>
                  <td>
                    <span className={member.isActive ? 'badge badge-success' : 'badge badge-warning'}>
                      {member.isActive ? 'Активен' : 'Неактивен'}
                    </span>
                  </td>
                  <td className="actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        if (confirm('Удалить члена команды?')) {
                          deleteMutation.mutate(member.id);
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

      {selectedMember && (
        <div className="modal" onClick={() => setSelectedMember(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedMember.firstName} {selectedMember.lastName}</h2>
            
            <div className="form-group">
              <label>Должность:</label>
              <p style={{ color: '#2c3e50' }}>{selectedMember.position || '-'}</p>
            </div>

            <div className="form-group">
              <label>Телефон:</label>
              <p style={{ color: '#2c3e50' }}>{selectedMember.phoneNumber || '-'}</p>
            </div>

            {selectedMember.wishes && (
              <div className="form-group">
                <label>Пожелания:</label>
                <p style={{ whiteSpace: 'pre-wrap', color: '#2c3e50', lineHeight: '1.6' }}>
                  {selectedMember.wishes}
                </p>
              </div>
            )}

            {selectedMember.photoUrl && (
              <div className="form-group">
                <label>Фото:</label>
                <img 
                  src={selectedMember.photoUrl} 
                  alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                  style={{ maxWidth: '200px', borderRadius: '8px' }}
                />
              </div>
            )}

            {selectedMember.attachmentUrl && (
              <div className="form-group">
                <label>Вложение:</label>
                <a 
                  href={selectedMember.attachmentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#3498db' }}
                >
                  Открыть файл
                </a>
              </div>
            )}

            <div className="form-group">
              <label>Статус:</label>
              <span className={selectedMember.isActive ? 'badge badge-success' : 'badge badge-warning'}>
                {selectedMember.isActive ? 'Активен' : 'Неактивен'}
              </span>
            </div>

            <div className="form-actions">
              <button className="btn btn-secondary" onClick={() => setSelectedMember(null)}>
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
        <CreateTeamMemberModal onClose={() => setShowCreateModal(false)} />
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
    phoneNumber: '',
    photoUrl: null,
    wishes: null,
    attachmentUrl: null,
    isActive: true,
  });

  const createMutation = useMutation({
    mutationFn: api.teamMembers.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
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
          <h2 className="modal-title">Добавить члена команды</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Имя *</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Фамилия *</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Должность</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Телефон</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

