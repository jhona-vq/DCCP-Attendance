
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dccp-light to-blue-50 p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mx-auto h-24 w-24 bg-dccp-primary rounded-lg flex items-center justify-center mb-6">
          <span className="text-white text-3xl font-bold">DC</span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-dccp-dark">DCCP Baguio Attendance</h1>
        <p className="text-lg text-gray-600 mb-8">
          Mobile biometric attendance system for BSIT students.
        </p>
        <Button 
          className="w-full bg-dccp-primary hover:bg-dccp-secondary text-lg py-6"
          onClick={() => navigate('/login')}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
