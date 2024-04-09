import { useState } from "react";
import { SelectedPage } from "@/components/enum/selectedPage";

import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import Benefits from "./scenes/benefits";
import OurClasses from "./scenes/OurClasses";
import ContactUs from "./scenes/ContactUs";
import Footer from "./scenes/Footer";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (page: SelectedPage) => void;
  isTopOfPage: boolean;
};

function HomePage({ selectedPage, setSelectedPage, isTopOfPage }: Props) {
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
