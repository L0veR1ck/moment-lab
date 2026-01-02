import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EventsPage from './pages/EventsPage';
import ReviewsPage from './pages/ReviewsPage';
import TeamMembersPage from './pages/TeamMembersPage';
import ApplicationsPage from './pages/ApplicationsPage';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app">
          <nav className="nav">
            <div className="nav-brand">Moment Lab Admin</div>
            <div className="nav-links">
              <Link to="/events">Мероприятия</Link>
              <Link to="/reviews">Отзывы</Link>
              <Link to="/team">Команда</Link>
              <Link to="/applications">Заявки</Link>
            </div>
          </nav>

          <main className="main">
            <Routes>
              <Route path="/" element={<EventsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/team" element={<TeamMembersPage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
