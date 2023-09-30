// Home.js
import ParticlesBackground from './ParticlesBackground';
import { useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
  const location = useLocation();
  
  // Determine if the current pathname corresponds to the home page
  const isHomePage = location.pathname === '/';
  return (
    <div className="home">
      <ParticlesBackground />
      <div className="center-content">
        <img src="/images/banner.png" alt="home-image" className="home-image" />
      </div>
      {isHomePage && (
        <div className="home-footer">
        </div>
      )}
    </div>
  );
}

export default Home;


  
  
  
  
  