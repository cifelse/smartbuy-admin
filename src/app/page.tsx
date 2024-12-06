"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { isAdmin, login } from '@/lib/supabase/server';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setIsLoading(true);
      setError('');

      // Check if the user is an admin
      if (!await isAdmin(email)) {
        setError('Invalid username and/or password.');
        return;
      }

      // Attempt to log in
      const { error } = await login(email, password);
      if (error) {
        setError('Invalid username and/or password.');
        return;
      }

      // Redirect to the dashboard when successful
      router.push('/dashboard');
    } catch (error) {
      setError('Invalid username and/or password.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="flex items-center mb-4">
            <ShoppingBag className="h-6 w-6 mr-1" />
            <h1 className="text-2xl font-bold">SmartBuy</h1>
        </div>

        <Card className="w-[380px] mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>
              Enter your email and password to sign in.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <form onSubmit={onSubmit}>
              {error && (
                <div className="flex items-center bg-red-50 p-3 rounded-md mb-4 text-red-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="johndoe@gmail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className={error ? 'border-red-500' : ''}
                />
              </div>
              <div className="grid gap-2 mt-3">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className={error ? 'border-red-500' : ''}
                />
              </div>
              <Button 
                className="w-full mt-4" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative mt-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Only authorized personnel are allowed to access this system. To go to the main site, <Link className="underline" href="https://smartbuy-one.vercel.app/">click here</Link>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}