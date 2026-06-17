import HeroBanner from "../../components/hero/HeroBanner/HeroBanner";
import QuickLinks from "../../components/sections/QuickLinks/QuickLinks";
import NewsSection from "../../components/sections/NewsSection/NewsSection";
import AboutSection from "../../components/sections/AboutSection/AboutSection";
import StatsSection from "../../components/sections/StatsSection/StatsSection";
import SubsidiarySection from "../../components/sections/SubsidiarySection/SubsidiarySection";
import MediaSection from "../../components/sections/MediaSection/MediaSection";
import PartnersSection from "../../components/sections/PartnersSection/PartnersSection";

function Home() {
  return (
    <>
      <HeroBanner />
      <QuickLinks />
      <NewsSection />
      <AboutSection />
      <StatsSection />
      <SubsidiarySection />
      <MediaSection />
      <PartnersSection />
    </>
  );
}

export default Home;
