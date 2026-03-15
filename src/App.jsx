import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StoryPage from './pages/StoryPage';
import QuestionPage from './pages/QuestionPage';
import ResultPage from './pages/ResultPage';
import BurnoutStoryPage from './pages/BurnoutStoryPage';
import SunriseStoryPage from './pages/SunriseStoryPage';
import ReflectStoryPage from './pages/ReflectStoryPage';
import NewDayStoryPage from './pages/NewDayStoryPage';
import FinalStoryPage from './pages/FinalStoryPage';

function App() {
  return (
    <Router>
      <div className="text-decor-zone">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/questions" element={<QuestionPage />} />
          <Route path="/story-burnout" element={<BurnoutStoryPage />} />
          <Route path="/story-sunrise" element={<SunriseStoryPage />} />
          <Route path="/story-reflect" element={<ReflectStoryPage />} />
          <Route path="/story-new-day" element={<NewDayStoryPage />} />
          <Route path="/story-final" element={<FinalStoryPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
