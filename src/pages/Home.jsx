import React from 'react'
import Hero from '../components/Home/Hero'
import About from '../components/Home/About'
import SelectedWork from '../components/Home/SelectedWork'
import Footer from '../components/Reusable/Footer'


const Home = () => {
  return (
    <div>
      <Hero />
      <About/>
      <SelectedWork/>
      <Footer/>
    </div>
  )
}

export default Home