import { SelectedPage } from "@/components/enum/selectedPage";

import Home from "@/scenes/home";
import Benefits from "./scenes/benefits";
import OurClasses from "./scenes/OurClasses";
import ContactUs from "./scenes/ContactUs";
import Footer from "./scenes/Footer";

type Props = {
  setSelectedPage: (page: SelectedPage) => void;
};

function HomePage({ setSelectedPage }: Props) {
  return (
    <div className="app bg-gray-20">
      <Home setSelectedPage={setSelectedPage} />
      <Benefits setSelectedPage={setSelectedPage} />
      <OurClasses setSelectedPage={setSelectedPage} />
      <ContactUs setSelectedPage={setSelectedPage} />
    </div>
  );
}

export default HomePage;
