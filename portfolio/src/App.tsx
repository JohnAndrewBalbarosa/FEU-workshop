import { useLenis } from './hooks/useLenis';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Masthead } from './components/sections/Masthead';
import { Lede } from './components/sections/Lede';
import { CredentialsStrip } from './components/sections/CredentialsStrip';
import { HighlightsGrid } from './components/sections/HighlightsGrid';
import { SkillDomains } from './components/sections/SkillDomains';
import { Scholastic } from './components/sections/Scholastic';
import { Now } from './components/sections/Now';
import { Colophon } from './components/sections/Colophon';

export default function App() {
  useLenis();
  return (
    <ErrorBoundary>
      <main>
        <Masthead />
        <Lede />
        <CredentialsStrip />
        <HighlightsGrid />
        <SkillDomains />
        <Scholastic />
        <Now />
        <Colophon />
      </main>
    </ErrorBoundary>
  );
}
