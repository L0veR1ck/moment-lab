import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';

export default function ReviewsPage() {
  const [page, setPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    reviewText: '',
    rating: 5,
    isApproved: true,
  });
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['reviews', page],
    queryFn: () => api.reviews.getAll(page, 10),
  });

  const createMutation = useMutation({
    mutationFn: api.reviews.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['reviews'] });
      await queryClient.refetchQueries({ queryKey: ['reviews', page] });
      setShowCreateModal(false);
      setFormData({ clientName: '', reviewText: '', rating: 5, isApproved: true });
    },
    onError: (error) => {
      console.error('Ошибка при создании:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.reviews.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['reviews'] });
      await queryClient.refetchQueries({ queryKey: ['reviews', page] });
    },
    onError: (error) => {
      console.error('Ошибка при удалении:', error);
    },
  });

  if (isLoading) return <div className="admin-loading">Загрузка...</div>;
  if (error) return <div className="admin-error">Ошибка загрузки отзывов</div>;

  return (
    <div style={{ width: '100%' }}>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Отзывы</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowCreateModal(true)}>
          + Создать отзыв
        </button>
      </div>

      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Отзыв</th>
              <th>Рейтинг</th>
              <th>Дата</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data?.items.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
                  Отзывов пока нет
                </td>
              </tr>
            ) : (
              data?.items.map((review: any) => (
                <tr key={review.id}>
                  <td><strong>{review.clientName}</strong></td>
                  <td>
                    <span 
                      style={{ cursor: 'pointer', color: '#3498db' }}
                      onClick={() => setSelectedReview(review)}
                      title="Нажмите для просмотра"
                    >
                      {review.reviewText.substring(0, 100)}...
                    </span>
                  </td>
                  <td style={{ fontSize: '1.1rem' }}>{'⭐'.repeat(review.rating)}</td>
                  <td>{new Date(review.createdAt).toLocaleDateString('ru-RU')}</td>
                  <td className="admin-actions">
                    <button
                      className="admin-btn admin-btn-danger"
                      onClick={() => {
                        if (confirm('Удалить отзыв?')) {
                          deleteMutation.mutate(review.id);
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

      {selectedReview && (
        <div className="admin-modal" onClick={() => setSelectedReview(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Отзыв от {selectedReview.clientName}</h2>
            
            <div className="admin-form-group">
              <label>Рейтинг:</label>
              <div style={{ fontSize: '1.5rem' }}>
                {'⭐'.repeat(selectedReview.rating)}
              </div>
            </div>

            <div className="admin-form-group">
              <label>Текст отзыва:</label>
              <p style={{ whiteSpace: 'pre-wrap', color: '#2c3e50', lineHeight: '1.6' }}>
                {selectedReview.reviewText}
              </p>
            </div>

            <div className="admin-form-group">
              <label>Дата создания:</label>
              <p style={{ color: '#2c3e50' }}>
                {new Date(selectedReview.createdAt).toLocaleString('ru-RU')}
              </p>
            </div>

            <div className="admin-form-actions">
              <button className="admin-btn admin-btn-secondary" onClick={() => setSelectedReview(null)}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="admin-modal" onClick={() => setShowCreateModal(false)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Создать отзыв</h2>
            
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
                <label>Текст отзыва *</label>
                <textarea
                  value={formData.reviewText}
                  onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                  rows={6}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Рейтинг *</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 звезд)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 звезды)</option>
                  <option value={3}>⭐⭐⭐ (3 звезды)</option>
                  <option value={2}>⭐⭐ (2 звезды)</option>
                  <option value={1}>⭐ (1 звезда)</option>
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
