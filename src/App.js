import './css/main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandigPage from './pages/LandigPage';
import Home from './pages/Home';
import Detail from './pages/Detail';
import FormDog from './pages/FormDog';
import Favorits from './pages/Favorits';
import NotMatch from './pages/NotMatch';
function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandigPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/dog/:id' element={<Detail />} />
          <Route path='/form' element={<FormDog />} />
          <Route path='/favorits' element={<Favorits />} />
          <Route path='*' element={<NotMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
