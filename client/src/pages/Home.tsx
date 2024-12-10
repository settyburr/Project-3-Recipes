import React from 'react';
import RandomRecipes from '../components/RandomRecipes/index.tsx';
import '../styling/home.css'

// import { QUERY_THOUGHTS } from '../utils/queries.ts';
// import { QUERY_THOUGHTS } from '../utils/queries.ts';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <RandomRecipes />
    </div>
  );
};

export default Home;
