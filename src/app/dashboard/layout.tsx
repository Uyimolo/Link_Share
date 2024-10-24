import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <DashboardHeader />
      <div className='px-4 rounded-xl'>{children}</div>
    </section>
  );
}
