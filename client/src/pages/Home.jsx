import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/home/Hero';

// Landing Page

const Home = () => {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
        <Navbar />

        <Hero />

        <Footer />
    </div>
  );
};

export default Home;