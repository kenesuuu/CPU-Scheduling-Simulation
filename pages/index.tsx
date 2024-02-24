import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-semibold mb-4">Home Page</h1>
      <Link href="/simulation">
        <button className="hover:underline">Go to Simulation</button>
      </Link>
    </div>
  );
};

export default HomePage;
