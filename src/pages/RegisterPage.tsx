import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';
import type { Program, YearLevel } from '@/types/academic';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [program, setProgram] = useState<Program>('BSIT');
  const [yearLevel, setYearLevel] = useState<YearLevel>('1st Year');
  const [isLoading, setIsLoading] = useState(false);
  const { register, login } = useAuth(); // Assuming you have a register function in your AuthContext
  const navigate = useNavigate();

  const programs: Program[] = ['BSIT', 'BSHM', 'BSBA', 'DHRT'];
  const yearLevels: YearLevel[] = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Call the register function from AuthContext
      const registrationSuccess = await register({ name, email, password, studentId, program, yearLevel });
      if (registrationSuccess) {
        // Automatically log the user in after successful registration
        const loginSuccess = await login(email, password);
        if (loginSuccess) {
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error (e.g., show a notification)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dccp-light to-blue-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-dccp-primary rounded-lg flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">DC</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-dccp-dark">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join DCCP Baguio Attendance System
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create an account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Juan Dela Cruz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  placeholder="BSIT-2024-xxxx"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
