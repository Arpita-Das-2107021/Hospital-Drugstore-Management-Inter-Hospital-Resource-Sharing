import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/healthcare';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Activity, Shield, Lock, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const roles: { value: UserRole; label: string; description: string }[] = [
  { value: 'admin', label: 'Administrator', description: 'Full system access' },
  { value: 'pharmacist', label: 'Pharmacist', description: 'Inventory management' },
  { value: 'doctor', label: 'Doctor', description: 'Clinical access' },
  { value: 'coordinator', label: 'Coordinator', description: 'Resource coordination' },
  { value: 'regulator', label: 'Regulator', description: 'Compliance oversight' },
];

const Login = () => {
  const [email, setEmail] = useState('admin@hospital.local');
  const [password, setPassword] = useState('demo123');
  const [role, setRole] = useState<UserRole>('admin');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(email, password, role);
    
    if (success) {
      toast({
        title: 'Welcome to HealthSync',
        description: `Logged in as ${roles.find(r => r.value === role)?.label}`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20">
              <Activity className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">HealthSync</h1>
              <p className="text-sm text-primary-foreground/80">Resource Management System</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold leading-tight">
                Unified Healthcare<br />Resource Management
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-md">
                Streamline inventory, coordinate multi-hospital resource sharing, 
                and optimize supply chain decisions with AI-powered forecasting.
              </p>
            </div>
            
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-sm">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                  <Lock className="h-5 w-5" />
                </div>
                <span className="text-sm">Secure Access</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-primary-foreground/60">
            © 2024 HealthSync.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-primary-foreground/5" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">HealthSync</h1>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>
                Enter your credentials to access the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@hospital.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Login as (Demo)</Label>
                  <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          <div className="flex flex-col">
                            <span>{r.label}</span>
                            <span className="text-xs text-muted-foreground">{r.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>

                <div className="text-center">
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Forgot your password?
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* <p className="mt-6 text-center text-sm text-muted-foreground">
            <Shield className="inline h-4 w-4 mr-1" />
            This is a demo system for academic research purposes.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;