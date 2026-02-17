import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Smart Bookmark App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
