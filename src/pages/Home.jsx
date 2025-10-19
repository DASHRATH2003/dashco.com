import Hero from '../components/Hero.jsx';
import ProfileShowcase from '../components/ProfileShowcase.jsx';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProfileShowcase />
    </div>
  );
}