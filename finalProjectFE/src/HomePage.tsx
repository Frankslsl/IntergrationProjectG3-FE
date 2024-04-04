import { useState } from "react";
import { SelectedPage } from "@/components/enum/selectedPage";

import Navbar from "@/scenes/navbar";
import useTopPage from "./hooks/useTopPage";
import Home from "@/scenes/home";
import Benefits from "./scenes/benefits";
import OurClasses from "./scenes/OurClasses";
import ContactUs from "./scenes/ContactUs";
import Footer from "./scenes/Footer";

function HomePage() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.home,
  );
  const isTopOfPage = useTopPage();
  return (
    <div className="app bg-gray-20">
      <Navbar
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        isTopOfPage={isTopOfPage}
      />
      <Home setSelectedPage={setSelectedPage} />
      <Benefits setSelectedPage={setSelectedPage} />
      <OurClasses setSelectedPage={setSelectedPage} />
      <ContactUs setSelectedPage={setSelectedPage} />
      <Footer />
    </div>
  );
}

export default HomePage;
