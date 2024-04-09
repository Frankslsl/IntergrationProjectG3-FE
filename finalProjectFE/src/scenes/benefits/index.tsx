import { BenefitType, SelectedPage } from "@/components/enum/selectedPage";
import {
  HomeModernIcon,
  UserGroupIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import H from "@/components/h";
import Benefit from "./Benefit";
import BenefitsPageGraphic from "@/assets/BenefitsPageGraphic.png";
import { useNavigate } from "react-router-dom";

const benefits: Array<BenefitType> = [
  {
    icon: <HomeModernIcon className="h-6 w-6" />,
    title: "State of the Art Facilities",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas atque dolores accusamus laudantium iste nemo.",
  },
  {
    icon: <UserGroupIcon className="h-6 w-6" />,
    title: "100's of Diverse Courses",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas atque dolores accusamus laudantium iste nemo.",
  },
  {
    icon: <AcademicCapIcon className="h-6 w-6" />,
    title: "Expert and Pro Teachers",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas atque dolores accusamus laudantium iste nemo.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Benefits = ({ setSelectedPage }: Props) => {
  const navigate = useNavigate();
  return (
    <section id="benefits" className=" mx-auto min-h-full w-5/6 py-20">
      <motion.div
        onViewportEnter={() => {
          setSelectedPage(SelectedPage.benefits);
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <H>MORE THAN JUST SCHOOL.</H>
          <p className="my-5 text-sm">
            Here, we offer more than just education. Beyond top-tier learning
            resources, we provide world-class fitness equipment, professional
            trainers, and classes to help you achieve your ultimate fitness
            goals with ease. We pour genuine care into every member, ensuring
            that as you pursue academic excellence, you also enjoy holistic
            personal development.
          </p>
        </motion.div>
      </motion.div>
      {/* Benefit card */}
      <motion.div
        className="md:flex md:gap-8 items-center justify-between mt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        variants={container}
      >
        {benefits.map((benefit: BenefitType, index) => {
          return (
            <Benefit
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              text={benefit.text}
              setSelectedPage={setSelectedPage}
            />
          );
        })}
      </motion.div>
      {/* Benefits show-up */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className=" mx-auto"
      >
        <div className=" md:flex justify-between items-center p-10 px-20 gap-4">
          {/* Picture */}

          <img
            className="max-w-xl"
            src={BenefitsPageGraphic}
            alt="benefits-graphic"
          />

          {/* description */}
          <div className="basis-1/2">
            {/* relative */}
            <div className=" relative">
              {/* before::decoration */}
              <div className=" before:content-abstractwaves before:-left-20 before:-top-20 before:absolute before:z-[-1] after:absolute after:content-sparkles after:left-25 after:-bottom-20 after:z-[-1]">
                {/* content */}
                <div className="flex gap-4 flex-col justify-between items-start z-10">
                  {/* title */}
                  <H>
                    Thousand OF HAPPY MEMBERS GETTING<span>FIT</span>
                  </H>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod debitis est vero. Similique, ipsam consequuntur. Nobis
                    autem ex, incidunt quidem quos omnis sint obcaecati
                    inventore, accusantium temporibus delectus reiciendis sit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.ibus
                    delectus reiciendis sit. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit.
                    <br />
                    <br />
                    Quod debitis est vero. Similique, ipsam consequuntur. Nobis
                    autem ex, incidunt quidem quos omnis sint obcaecati
                    inventore, accusantium temporibus delectus reiciendis sit.
                  </p>
                  <button
                    className="bg-secondary-500 rounded-md px-10 py-2 hover:bg-primary-500 hover:text-white"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Join Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Benefits;
