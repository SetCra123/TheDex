import { Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import SearchResultsPage from './components/SearchResultsPage';
import TemplateSelectionPage from './components/TemplateSelectionPage';
import PresentationPreviewPage from './components/PresentationPreviewPage';

function App() {
  return (

      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/select-template" element={<TemplateSelectionPage />} />
        <Route path="/presentation/:id" element={<PresentationPreviewPage />} />
      </Routes>
    
  );
}

export default App;