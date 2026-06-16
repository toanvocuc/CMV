import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import NewsSection from "../../components/NewsSection/NewsSection";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <Hero />
      <NewsSection />
      <Footer />
    </>
  );
}

export default Home;