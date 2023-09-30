import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Episodes from './pages/Episodes'
import Locations from './pages/Locations'
import Characters from './components/Characters/Characters';
import CharacterDetails from './pages/CharacterDetails';
import Home from './pages/HomePage/Home';
import Footer from './components/Footer/Footer';
import CharacterGlobalStateProvider from './components/Context/GlobalState';
import ParticlesBackground from './pages/HomePage/ParticlesBackground';

function App() {
  return (
      <>
      <ParticlesBackground/>
      <CharacterGlobalStateProvider>
      <Navbar />
<Routes>
<Route path="/" element={<Home />} />
  <Route path="/home" element={<Home />} />
<Route path="/characters" element={<Characters />} />
<Route path="/characters/:pageNumber" element={<Characters />} />
<Route path="/characters/:characterId" element={<CharacterDetails />} /> 
<Route path="/episodes" element={<Episodes />} />
<Route path="/locations" element={<Locations />} />
</Routes>
<Footer/>
      </CharacterGlobalStateProvider>
  
    </>
  );
}

export default App;



