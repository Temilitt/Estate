import Hero from '../components/home/Hero'
import Marquee from '../components/home/Marquee'
import FeaturedListings from '../components/home/FeaturedListings'
import WhyUs from '../components/home/WhyUs'
import Testimonials from '../components/home/Testimonials'
import CTABanner from '../components/home/CTABanner'

const Home = () => {
  return (
    <div>
      <Hero />
      <Marquee />
      <FeaturedListings />
      <WhyUs />
      <Testimonials />
      <CTABanner />
    </div>
  )
}

export default Home