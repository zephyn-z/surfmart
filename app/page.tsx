import { Hero } from "@/components/hero"
import { ProductSlider } from "@/components/product-slider"
import { Solutions } from "@/components/solutions"
import { TrustBar } from "@/components/trust-bar"

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductSlider />
      <Solutions />
      <TrustBar />
    </main>
  )
}
