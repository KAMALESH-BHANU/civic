import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import civicLogo from '@/assets/civic-logo.png';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center civic-hero-gradient">
      <div className="text-center space-y-8 animate-pulse">
        <div className="w-32 h-32 mx-auto civic-shadow-strong rounded-3xl bg-white p-4">
          <img 
            src={civicLogo} 
            alt="CivicConnect Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">CivicConnect</h1>
          <p className="text-xl text-white/90">Your Voice, Your Community</p>
        </div>
        <div className="w-16 h-1 bg-white/50 rounded-full mx-auto animate-pulse" />
      </div>
    </div>
  );
};

export default SplashScreen;