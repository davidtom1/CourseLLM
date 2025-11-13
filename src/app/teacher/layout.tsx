import { AppHeader } from '@/components/layout/AppHeader';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const breadcrumbs = [{ href: '/teacher/dashboard', label: 'Teacher' }];
  return (
    <div className="flex min-h-screen w-full flex-col">
       <AppHeader breadcrumbs={breadcrumbs} userRole="Teacher" />
       <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        {children}
      </main>
    </div>
  );
}
