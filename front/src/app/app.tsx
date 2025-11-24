import MainScreen from '../pages/main-screen/main-screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
