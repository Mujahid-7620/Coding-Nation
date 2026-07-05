import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
