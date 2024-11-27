import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StockPage from './components/StockPage';

const App: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/stock/:symbol" element={<StockPage />} /> {/* No need to pass symbol here */}
      </Routes>
    </Router>
  );
};

export default App;
