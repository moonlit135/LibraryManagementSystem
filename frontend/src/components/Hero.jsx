import { Link } from 'react-router-dom';
import LightRays from '../../Reactbits/LightRays/LightRays';

const Hero = () => {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden' }}>
      {/* LightRays container with absolute positioning */}
      <div className="absolute inset-0 w-full h-full">
        <LightRays
          raysOrigin="top-center"
          raysColor="#0000FF"
          raysSpeed={1.5}
          lightSpread={1.5}
          rayLength={1.9}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="w-full h-full"
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 w-full h-full">
        {/* Logo */}
        <div className="absolute top-4 left-4 z-20">
          <img 
            src="/images/central-library-high-resolution-logo-transparent.png" 
            alt="Central Library Logo" 
            className="h-20 w-auto"
          />
        </div>
        
        {/* Top Navigation Links */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex space-x-6">
            <Link to="/login" className="text-white hover:text-blue-200 transition-colors duration-300 font-bold">
              Login
            </Link>
            <a href="#about" className="text-white hover:text-blue-200 transition-colors duration-300 font-bold">
              About
            </a>
            <a href="#contact" className="text-white hover:text-blue-200 transition-colors duration-300 font-bold">
              Contact Us
            </a>
          </div>
        </div>

        <div className="hero-overlay"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
              Central Library
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Your Gateway to Knowledge and Discovery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;