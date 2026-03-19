'use client';
import { useState, useEffect } from 'react';
import { useRouter, Link } from '@/router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@ultra-ui-library';
import { Input } from '@ultra-ui-library';
import { View } from '@ultra-ui-library';
import { Text } from '@ultra-ui-library';
import { Svg } from '@ultra-ui-library';
import { Path } from '@ultra-ui-library';

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace('dashboard');
  }, [user, loading, router]);

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email address';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 300));
    const ok = await register(name, email, password);
    if (ok) router.navigate('dashboard');
    setSubmitting(false);
  };

  if (loading) return null;

  return (
    <View className="min-h-screen items-center justify-center bg-[#0a0f1e] px-4 py-12">
      <View className="absolute inset-0 overflow-hidden pointer-events-none">
        <View className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <View className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </View>

      <View className="relative w-full max-w-md">
        <View className="flex-row items-center gap-3 mb-10 justify-center">
          <View className="w-10 h-10 rounded-xl bg-indigo-500 items-center justify-center shadow-lg">
            <Svg size={24} fill="none" stroke="white" viewBox="0 0 24 24">
              <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </Svg>
          </View>
          <Text className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Mono, monospace' }}>FlowBoard</Text>
        </View>

        <View className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
          <Text className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>Create account</Text>
          <Text className="text-white/50 text-sm mb-7">Start managing your projects</Text>

          <View className="gap-4">
            <Input label="Full Name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" error={errors.name} autoComplete="name" />
            <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" error={errors.email} autoComplete="email" />
            <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" error={errors.password} autoComplete="new-password" />

            <Button className="w-full mt-2" disabled={submitting} onPress={handleSubmit}>
              {submitting ? (
                <View className="flex-row items-center gap-2">
                  <View className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <Text className="text-white text-sm font-semibold">Creating account...</Text>
                </View>
              ) : 'Create account'}
            </Button>
          </View>

          <View className="flex-row items-center justify-center gap-1 mt-6">
            <Text className="text-sm text-white/40">Already have an account?</Text>
            <Link to="login" className="text-indigo-400 hover:text-indigo-300 transition-colors">Sign in</Link>
          </View>
        </View>
      </View>
    </View>
  );
}
