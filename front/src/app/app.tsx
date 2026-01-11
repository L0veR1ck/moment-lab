import MainScreen from '../pages/main-screen/main-screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SchoolEventScreen from '../pages/school-event-screen/school-event-screen';
import PrivateEventsScreen from '../pages/private-events-screen/private-events-screen';
import ActiveTeamBuilding from '../pages/active-team-building/active-team-building';
import TrainingsScreen from '../pages/trainings-screen/trainings-screen';
import { ROUTES } from '../consts/routes';
import AboutMomentLab from '../pages/about-moment-lab-screen/about-moment-lab-screen';
import ScrollToTop from '../shared/scroll-to-top/scroll-to-top';
import ImmersiveQuestsScreen from '../pages/immersive-quests-screen/immersive-quests';
import PortfolioScreen from '../pages/portfolio-screen/portfolio-screen';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainScreen />} />
        <Route path={ROUTES.SCHOOL_EVENTS} element={<SchoolEventScreen />} />
        <Route
          path={ROUTES.IMMERSIVE_QUESTS}
          element={<ImmersiveQuestsScreen />}
        />
        <Route path={ROUTES.PRIVATE_EVENTS} element={<PrivateEventsScreen />} />
        <Route
          path={ROUTES.ACTIVE_TEAM_BUILDING}
          element={<ActiveTeamBuilding />}
        />
        <Route path={ROUTES.TRAININGS} element={<TrainingsScreen />} />
        <Route path={ROUTES.ABOUT_MOMENT_LAB} element={<AboutMomentLab />} />
        <Route path={ROUTES.PORTFOLIO} element={<PortfolioScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
