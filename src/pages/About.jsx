import AboutHero from '../components/AboutHero.jsx';
import AboutStats from '../components/AboutStats.jsx';
import SkillsGrid from '../components/SkillsGrid.jsx';
import AboutTimeline from '../components/AboutTimeline.jsx';

export default function About() {
  return (
    <main>
      <AboutHero />
      <AboutStats />
      <SkillsGrid />
      <AboutTimeline />
    </main>
  );
}