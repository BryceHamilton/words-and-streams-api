import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Stream from './pages/Stream';
import Admin from './pages/Admin';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route path='/stream/:id' element={<Stream />} />
        <Route exact path='/admin' element={<Admin />} />
      </Routes>
    </Router>
  );
}
