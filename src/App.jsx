import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import LandingPage from './pages/LandingPage';
import StoryPage from './pages/StoryPage';
import QuestionPage from './pages/QuestionPage';
import ResultPage from './pages/ResultPage';
import BurnoutStoryPage from './pages/BurnoutStoryPage';
import SunriseStoryPage from './pages/SunriseStoryPage';
import ReflectStoryPage from './pages/ReflectStoryPage';
import NewDayStoryPage from './pages/NewDayStoryPage';
import FinalStoryPage from './pages/FinalStoryPage';

function BgmPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.2;
    const play = () => audio.play().catch(() => {});
    document.addEventListener('click', play, { once: true });
    document.addEventListener('touchstart', play, { once: true });
    return () => {
      document.removeEventListener('click', play);
      document.removeEventListener('touchstart', play);
    };
  }, []);

  return <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />;
}

function App() {
  return (
    <Router>
      <div className="text-decor-zone">
        <BgmPlayer />
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
