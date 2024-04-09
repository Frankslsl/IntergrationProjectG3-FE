import { SelectedPage } from "@/components/enum/selectedPage";
import useMediaQuery from "@/hooks/useMediaQuery";
import HomePageGraphic from "@/assets/HomePageGraphic.png";
import TinyLogo1 from "@/assets/tinyLogo1.png";
import TinyLogo2 from "@/assets/tinyLogo2.png";

import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Home = ({ setSelectedPage }: Props) => {
  const navigate = useNavigate();
  const isAboveMeiumScreens = useMediaQuery("(min-width:1060px)");

  return (
    <section
      id="home"
      className="gap-16 bg-gray-20 md:h-full md:pb-0 mt-[100px]"
    >
      {/* IMAGE AND MAIN HEADER */}
      <motion.div
        className="md:flex mx-auto w-5/6 md:items-center md:justify-center md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.home)}
      >
        {/* Main Headers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          className="md:basis-3/5 z-10 mt-32"
        >
          {/* HEADINGS */}
          <div className="md:-mt-20">
            <div className=" relative">
              <div>
                <h1 className="text-7xl">Programming Academy</h1>
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm">
            Unmatched Courses. Exceptional Coding Bootcamps. Industry-Leading
            Instructors to Guide You to the Career You Dream of. Launch Your
            Coding Journey Now.
          </p>
          {/* ACTIONS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            className="flex gap-8 items-center mt-8"
          >
            <button
              className="bg-secondary-500 rounded-md px-10 py-2 hover:bg-primary-500 hover:text-white"
              onClick={() => {
                navigate("/register");
              }}
            >
              Join Us
            </button>
            <AnchorLink
              className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
              onClick={() => {
                setSelectedPage(SelectedPage.contactUs);
              }}
              href="#contactUs"
            >
              <p>Learn More</p>
            </AnchorLink>
          </motion.div>
        </motion.div>
        {/* IMAGE */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          className="flex basis-3/5 justify-center md:z-10 md:ml-40 md:mt-16 md:justify-end"
        >
          <img alt="home-pageGraphic" src={HomePageGraphic} />
        </motion.div>
      </motion.div>
      {/* SPONSORS */}
      {isAboveMeiumScreens ? (
        <div className="h-[150px] w-full  bg-primary-500 shadow-md">
          <div className="w-5/6 mx-auto">
            <div className="flex gap-10 justify-between items-center w-3/5 mx-auto">
              <img
                alt="Sponsor-TinyLogo1"
                src={TinyLogo1}
                className="h-auto max-h-[150px]"
              />
              <img
                alt="Sponsor-TinyLogo2"
                src={TinyLogo2}
                className="h-auto max-h-[150px]"
              />
              {/* <img alt="Sponsor-fortune" src={SponsorFortune} /> */}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Home;
