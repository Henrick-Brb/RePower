import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/pages/Inicio'
import NovoProjeto from './components/pages/NovoProjeto'
import Projetos from './components/pages/Projetos'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Projeto from './components/pages/Projeto';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/NovoProjeto" element={<NovoProjeto />} />
          <Route path="/projeto/:id" element={<Projeto />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
