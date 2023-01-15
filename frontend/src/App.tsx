import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import CatImages from './pages/catImages/CatImages';
import DogImages from './pages/dogImages/DogImages';
import Clients from './pages/clients/Clients';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/main" element={ <Main /> } />
      <Route path="/cat-images" element={ <CatImages /> } />
      <Route path="/dog-images" element={ <DogImages /> } />
      <Route path="/clients" element={ <Clients /> } />
    </Routes>
  );
}
