import CorporateEventScreen from '../pages/corporate-event-screen/corporate-event-screen';
import MainScreen from '../pages/main-screen/main-screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SchoolEventScreen from '../pages/school-event-screen/school-event-screen';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainScreen />} />
        <Route path='/corporate-events' element={<CorporateEventScreen />} />
        <Route path='/school-events' element={<SchoolEventScreen/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
