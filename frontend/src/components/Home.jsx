import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Home.css';

const Home = () => {
  const isAdmin = useSelector((state) => state.auth?.isAdmin);
  const isMechanic = useSelector((state) => state.auth?.isMechanic);
  return (
    <div className="home-container">
      <div className="home-overlay"></div>
      
      <div className="home-content">
        <div className="glass-panel hero-card animate-fade-in">
          <h1 className="title gradient-text">VHub</h1>
          <h2 className="subtitle">Precision. Performance. Perfection.</h2>
          <p className="description">
            Experience the future of automotive care. Drive in for quality repairs, every time, handled by state-of-the-art tech and expert mechanics.
          </p>
          
          <div className="hero-actions">
            {!isAdmin && !isMechanic && (
              <Link to="/book" className="btn-primary animate-float">
                Book Service Now
              </Link>
            )}
            <Link to="/service" className="btn-secondary">
              View Services
            </Link>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
