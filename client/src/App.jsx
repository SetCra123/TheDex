import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import SearchResultsPage from './components/SearchResultsPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;