import { Routes, Route, Navigate } from 'react-router-dom';
import './globalStyle.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/main" element={ <Main /> } />
      <Route path="/cat-image" element={ <CatImage /> } />
      <Route path="/dog-image" element={ <DogImage /> } />
      <Route path="/clients" element={ <Clients /> } />
    </Routes>
  );
}
