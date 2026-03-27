import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface LoginScreenProps {
  onLogin: (url: string, token: string) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [url, setUrl] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    const savedUrl = localStorage.getItem('craft_server_url') || 'ws://127.0.0.1:9100'
    const savedToken = localStorage.getItem('craft_server_token') || ''
    setUrl(savedUrl)
    setToken(savedToken)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('craft_server_url', url)
    localStorage.setItem('craft_server_token', token)
    onLogin(url, token)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Connect to Craft</h1>
          <p className="text-muted-foreground">Enter your server credentials to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Server URL</Label>
            <Input
              id="url"
              placeholder="ws://127.0.0.1:9100"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="token">Bearer Token</Label>
            <Input
              id="token"
              type="password"
              placeholder="CRAFT_SERVER_TOKEN"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Connect
          </Button>
        </form>
      </div>
    </div>
  )
}
