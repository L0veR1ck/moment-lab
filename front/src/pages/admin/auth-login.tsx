import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../api/client';

export default function AuthLogin() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      setLoading(true);
      api.auth.login(token)
        .then(() => {
          navigate('/admin/events');
        })
        .catch((err) => {
          console.error('Login error:', err);
          setError('Неверный токен авторизации');
          setLoading(false);
        });
    }
  }, [searchParams, navigate]);

  return (
    <div className="admin-app">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          textAlign: 'center',
          maxWidth: '500px',
        }}>
          <h1 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
            Moment Lab Admin
          </h1>
          
          {loading && (
            <p style={{ color: '#3498db', fontSize: '1.1rem', marginTop: '1rem' }}>
              Авторизация...
            </p>
          )}
          
          {error && (
            <p style={{ color: '#e74c3c', fontSize: '1.1rem', marginTop: '1rem' }}>
              {error}
            </p>
          )}
          
          {!loading && !error && (
            <>
              <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
                Для доступа к админ-панели используйте ссылку с токеном авторизации.
              </p>
              <p style={{ color: '#95a5a6', fontSize: '0.9rem', marginTop: '2rem' }}>
                Формат: /admin/login?token=ваш_токен
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
