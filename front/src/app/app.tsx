import CorporateEventScreen from '../pages/corporate-event-screen/corporate-event-screen';
import MainScreen from '../pages/main-screen/main-screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SchoolEventScreen from '../pages/school-event-screen/school-event-screen';
import RentScreen from '../pages/rent-screen/rent-screen';
import PrivateEventsScreen from '../pages/ private-events-screen/ private-events-screen';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainScreen />} />
        <Route path='/corporate-events' element={<CorporateEventScreen />} />
        <Route path='/school-events' element={<SchoolEventScreen/>} />
        <Route path='/rent' element={<RentScreen/>} />
        <Route path='/private' element={<PrivateEventsScreen/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
