
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: string) => {
    let demoEmail = '';
    
    switch (role) {
      case 'student':
        demoEmail = 'john.doe@dccp.edu.ph';
        break;
      case 'faculty':
        demoEmail = 'maria.santos@dccp.edu.ph';
        break;
      case 'admin':
        demoEmail = 'admin@dccp.edu.ph';
        break;
    }
    
    setEmail(demoEmail);
    setPassword('12345678');
    
    setTimeout(() => {
      login(demoEmail, '12345678').then(success => {
        if (success) {
          navigate('/');
        }
      });
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dccp-light to-blue-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-dccp-primary rounded-lg flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">DC</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-dccp-dark">
            DCCP Baguio Attendance System
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access your attendance record
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@dccp.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-dccp-primary hover:bg-dccp-secondary"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                <span>Quick demo login as: </span>
                <button 
                  type="button" 
                  className="underline text-dccp-secondary hover:text-dccp-primary ml-1" 
                  onClick={() => handleDemoLogin('student')}
                >
                  Student
                </button>
                <span> | </span>
                <button 
                  type="button" 
                  className="underline text-dccp-secondary hover:text-dccp-primary" 
                  onClick={() => handleDemoLogin('faculty')}
                >
                  Faculty
                </button>
                <span> | </span>
                <button 
                  type="button" 
                  className="underline text-dccp-secondary hover:text-dccp-primary" 
                  onClick={() => handleDemoLogin('admin')}
                >
                  Admin
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DCCP Baguio. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
