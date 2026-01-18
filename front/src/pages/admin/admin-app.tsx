import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EventsPage from './events-page';
import ReviewsPage from './reviews-page';
import TeamMembersPage from './team-members-page';
import ApplicationsPage from './applications-page';
import NotificationSettingsPage from './notification-settings-page';
import AuthLogin from './auth-login';
import ProtectedRoute from './protected-route';
import { api } from '../../api/client';
import './admin.css';

const queryClient = new QueryClient();

function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      navigate('/admin/login');
    }
  };

  return (
    <div className="admin-app">
      <nav className="admin-nav">
        <div className="admin-nav-brand">Moment Lab Admin</div>
        <div className="admin-nav-links">
          <Link to="/admin/events">Мероприятия</Link>
          <Link to="/admin/reviews">Отзывы</Link>
          <Link to="/admin/team">Команда</Link>
          <Link to="/admin/applications">Заявки</Link>
          <Link to="/admin/notifications">Уведомления</Link>
          <button 
            onClick={handleLogout}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            Выйти
          </button>
        </div>
      </nav>

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}

function AdminApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<AuthLogin />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <EventsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <EventsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <ReviewsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <TeamMembersPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <ApplicationsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <NotificationSettingsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default AdminApp;
