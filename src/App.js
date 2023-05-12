import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './screens/MainScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<MainScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
