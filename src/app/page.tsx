import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import Services from "@/components/Services";
import PricingTable from "@/components/PricingTable";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PortfolioGrid />
      <Services />
      <PricingTable />
      <Footer />
    </main>
  );
}
