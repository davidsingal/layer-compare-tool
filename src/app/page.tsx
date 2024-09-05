import Header from '@/components/header';
import Component from '@/app/component';

export default function Home() {
  return (
    <div className="flex h-screen min-h-[768px] w-full flex-col">
      <Header />
      <main className="flex grow px-6">
        <Component />
      </main>
    </div>
  );
}
