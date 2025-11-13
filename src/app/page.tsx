import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-grid-slate-50/[0.05] dark:bg-grid-slate-900/[0.2]">
      <LoginForm />
    </main>
  );
}
