import { SelectedPage } from "@/components/enum/selectedPage";

import Home from "@/scenes/home";
import Benefits from "./scenes/benefits";
import OurClasses from "./scenes/OurClasses";
import ContactUs from "./scenes/ContactUs";

type Props = {
  setSelectedPage: (page: SelectedPage) => void;
};

function HomePage({ setSelectedPage }: Props) {
  return (
    <>
      <Home setSelectedPage={setSelectedPage} />
      <Benefits setSelectedPage={setSelectedPage} />
      <OurClasses setSelectedPage={setSelectedPage} />
      <ContactUs setSelectedPage={setSelectedPage} />
    </>
  );
}

export default HomePage;
