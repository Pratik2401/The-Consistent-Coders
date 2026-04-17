import React from 'react';
import { Hero } from '../components/Hero';
import { Vision } from '../components/Vision';
import { Stats } from '../components/Stats';
import { HowItWorks } from '../components/HowItWorks';
import { Comparator } from '../components/Comparator';
import { Fame } from '../components/Fame';
import { JoinCTA } from '../components/JoinCTA';
import { Footer } from '../components/Footer';
export const HomePage = () => {
    return (<>
      <Hero />
      <Vision />
      <Stats />
      <HowItWorks />
      <Comparator />
      <Fame />
      <JoinCTA />
      <Footer />
    </>);
};
