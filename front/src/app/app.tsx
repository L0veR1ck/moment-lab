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

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainScreen />} />
        <Route path='/corporate-events' element={<CorporateEventScreen />} />
        <Route path='/personal-iq-game' element={<PersonalIqGameScreen />} />
        <Route path='/live-action-quests' element={<LiveActionQuestsScreen />} />
        <Route path='/art-team-building' element={<ArtTeamBuildingScreen />} />
        <Route path='/family-event' element={<FamilyEventScreen />} />
        <Route path='/school-events' element={<SchoolEventScreen />} />
        <Route path='/rent' element={<RentScreen />} />
        <Route path='/private' element={<PrivateEventsScreen />} />
        <Route path='/intellectual-games' element={<IntellectualGamesScreen/>} />
        <Route path='/entertainment-games' element={<EntertainmentGamesScreen/>} />
        <Route path='/trainings' element={<TrainingsScreen/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
