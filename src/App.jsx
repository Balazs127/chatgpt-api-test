import Layout from './components/layout/Layout.jsx';
import Home from './components/views/Home.jsx';
import InterviewPage from './components/views/InterviewPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<InterviewPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;