'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import NavBar from '@/components/NavBar'
import { fetchUserLogs } from '@/lib/supabase'

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [logs, setLogs] = useState<any[]>([]) // State to store fetched logs
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push('/')
    }, 3000)
  }

  // Fetch logs on component mount
  useEffect(() => {
    async function getLogs() {
      try {
        const fetchedLogs = await fetchUserLogs()
        setLogs(fetchedLogs || [])
      } catch (error) {
        console.error('Error fetching logs:', error)
      }
    }
    getLogs()
  }, [])

  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <NavBar isMobile={false} hideButton />
        <Card className="w-[380px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <CardDescription>
              Enter your username and password to sign in
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <form onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="johndoe" />
              </div>
              <div className="grid gap-2 mt-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                {isLoading && (
                  true
                )}
                Sign In
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
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Logs Section */}
        <Card className="w-full mt-8 p-4">
          <CardHeader>
            <CardTitle>User Logs</CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                    <th className="border border-gray-300 px-4 py-2">User</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{log.timestamp}</td>
                      <td className="border border-gray-300 px-4 py-2">{log.user_id || 'Unknown'}</td>
                      <td className="border border-gray-300 px-4 py-2">{log.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No logs available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
