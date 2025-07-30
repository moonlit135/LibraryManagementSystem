// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
import BookSection from '../components/BookSection';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';






const Home = () => {
  return (
    <>
      <Hero/>
      <BookSection />
      <About />
      <Footer />
    </>    
  );
};

export default Home;
