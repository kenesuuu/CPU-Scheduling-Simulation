import Link from 'next/link';
import { useState, useEffect } from 'react';

const HomePage: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 820); // Adjusted for smaller screens
    }
    handleResize(); // Check initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`h-screen flex flex-col justify-center items-center font-inter transition-background duration-500 ${hovered ? 'bg-black' : 'bg-white'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h1 className={`text-4xl font-semibold mb-4 ${hovered ? 'text-white' : 'text-black'} text-center`}>Welcome to CPU Scheduling System</h1>
      <p className={`text-lg mb-8 ${hovered ? 'text-white' : 'text-black'} ${isMobile ? 'text-center' : ''}`}>Simplify your process management with our CPU Scheduling System. Dive into our simulations and take your understanding to the next level.</p>
      <Link href="/simulation" passHref>
        <button className={`py-3 px-6 rounded-md text-lg transition-colors duration-300 ${hovered ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>Go to Simulation</button>
      </Link>
    </div>
  );
};

export default HomePage;
