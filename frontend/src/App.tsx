import { Routes, Route, Navigate } from 'react-router-dom';
import './globalStyle.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={  } />
    </Routes>
  );
}
