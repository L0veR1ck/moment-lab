import CorporateEventScreen from '../pages/corporate-event-screen/corporate-event-screen';
import MainScreen from '../pages/main-screen/main-screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SchoolEventScreen from '../pages/school-event-screen/school-event-screen';
import RentScreen from '../pages/rent-screen/rent-screen';
import PrivateEventsScreen from '../pages/private-events-screen/private-events-screen';
import PersonalIqGameScreen from '../pages/personal-iq-game-screen/personal-iq-game-screen';
import LiveActionQuestsScreen from '../pages/live-action-quests-screen/live-action-quests-screen';
import ArtTeamBuildingScreen from '../pages/art-team-building-screen/art-team-building-screen';
import FamilyEventScreen from '../pages/family-event-screen/family-event-screen';
import IntellectualGamesScreen from '../pages/intellectual-games-screen/intellectual-games-screen';
import EntertainmentGamesScreen from '../pages/entertainment-games-screen/entertainment-games-screen';
import TrainingsScreen from '../pages/trainings-screen/trainings-screen';
import {ROUTES} from '../consts/routes';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainScreen />} />
        <Route path={ROUTES.CORPORATE_EVENTS}  element={<CorporateEventScreen />} />
        <Route path={ROUTES.PERSONAL_IQ_GAME} element={<PersonalIqGameScreen />} />
        <Route path={ROUTES.LIVE_ACTION_QUESTS} element={<LiveActionQuestsScreen />} />
        <Route path={ROUTES.ART_TEAM_BUILDING} element={<ArtTeamBuildingScreen />} />
        <Route path={ROUTES.FAMILY_EVENT} element={<FamilyEventScreen />} />
        <Route path={ROUTES.SCHOOL_EVENTS} element={<SchoolEventScreen />} />
        <Route path={ROUTES.RENT} element={<RentScreen />} />
        <Route path={ROUTES.PRIVATE_EVENTS} element={<PrivateEventsScreen />} />
        <Route path={ROUTES.INTELLECTUAL_GAMES} element={<IntellectualGamesScreen/>} />
        <Route path={ROUTES.ENTERTAINMENT_GAMES} element={<EntertainmentGamesScreen/>} />
        <Route path={ROUTES.TRAININGS} element={<TrainingsScreen/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
