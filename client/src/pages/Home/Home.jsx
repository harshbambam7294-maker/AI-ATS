import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/common/HeroSection";
import LatestJobs from "../../components/common/LatestJob";
import FeaturedCompanies from "../../components/common/FeaturedCompanies";
import Footer from "../../components/layout/Footer";

function Home() {
  return (
    <>
        <Navbar />
        <HeroSection />
        <LatestJobs />
        <FeaturedCompanies />
        <Footer />
    </>
  );
}

export default Home;