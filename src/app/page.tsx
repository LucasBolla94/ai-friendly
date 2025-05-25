import Hero from '@/components/home/Hero'
import HowItWorks from '@/components/home/HowItWorks'
import Emotion from '@/components/home/Emotion'
import CreditsInfo from '@/components/home/CreditsInfo'
import CTASection from '@/components/home/CTASection'
import Footer from '@/components/home/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Emotion />
      <CreditsInfo />
      <CTASection />
      <Footer />
    </>
  )
}
