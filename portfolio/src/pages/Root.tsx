import { useRef } from 'react';
import { Masthead } from '../components/sections/Masthead';
import { IndexOfContents } from '../components/ui/IndexOfContents';
import { SectionHeader } from '../components/ui/SectionHeader';
import { useRouteTimeline } from '../hooks/useRouteTimeline';

export function Root() {
  const root = useRef<HTMLDivElement>(null);

  useRouteTimeline(root, (tl) => {
    tl.from('.masthead__row > *', {
      y: 22,
      opacity: 0,
      stagger: 0.05,
      duration: 0.9,
    })
      .from(
        '.ioc__item',
        { y: 30, opacity: 0, stagger: 0.07, duration: 0.7 },
        '-=0.4',
      );
  });

  return (
    <div ref={root}>
      <Masthead />
      <section className="section">
        <div className="shell">
          <SectionHeader
            index="00"
            kicker="Index of contents"
            title={<>Three rooms. <em>One volume.</em></>}
            aside="Read in any order"
          />
          <IndexOfContents />
        </div>
      </section>
    </div>
  );
}
