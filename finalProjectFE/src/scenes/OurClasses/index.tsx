import { SelectedPage } from "@/components/enum/selectedPage";
import H from "@/components/h";
import fetchCourseTypeQuery from "./fetchCourseTypeQuery";
import { toast } from "react-toastify";
import toastConfig from "@/components/toastConfig/toastConfig";

import { motion } from "framer-motion";
import Class from "./Class";
import { useQuery } from "@tanstack/react-query";

type CourseType = {
  name: string;
  description: string;
  image: string;
};

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const OurClasses = ({ setSelectedPage }: Props) => {
  const { data, error, isError, isLoading } = useQuery<CourseType[]>({
    queryKey: ["courseTypes"],
    queryFn: fetchCourseTypeQuery,
  });
  if (isError) {
    toast.error(error.message, { ...toastConfig, position: "top-center" });
  }
  return (
    <div className="w-full bg-primary-100 py-10" id="ourClasses">
      <motion.div
        onViewportEnter={() => {
          setSelectedPage(SelectedPage.ourClasses);
        }}
        className=" w-5/6 mx-auto"
      >
        {/* description */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <H>OUR CLASSES</H>
          <p className="p-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            excepturi dignissimos, quos, soluta sed impedit nulla rem atque
            totam amet reprehenderit perferendis quas at fugiat officiis,
            assumenda incidunt numquam dolores repudiandae iste perspiciatis
            ratione? Earum, facilis obcaecati? Vel amet, quisquam explicabo
            corrupti veritatis odio velit nobis ab molestiae quae esse.
          </p>
        </motion.div>
        <div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
          <ul className="w-[2800px] whitespace-nowrap">
            {data?.map((item, index) => (
              <Class
                key={`${item.name}-${index}`}
                name={item.name}
                description={item.description}
                image={item.image}
                isLoading={isLoading}
              />
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default OurClasses;
