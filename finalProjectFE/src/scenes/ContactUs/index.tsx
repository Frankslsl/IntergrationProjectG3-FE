import { SelectedPage } from "@/components/enum/selectedPage";
import H from "@/components/h";
import axios from "axios";
import { motion } from "framer-motion";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import toastConfig from "@/components/toastConfig/toastConfig";
type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const inputStyle =
  "mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactUs = ({ setSelectedPage }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post(
        "https://formsubmit.co/franksl2018@gmail.com",
        data,
      );
      toast.success("Message has been sent!!", {
        ...toastConfig,
        position: "bottom-right",
      });
      console.log(res);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message, { ...toastConfig, position: "bottom-right" });
      }
    }
  };

  const onError = (errors: FieldErrors<FormData>) => {
    const errorMessages = Object.keys(errors)
      .map((key) => errors[key as keyof FormData]?.message)
      .join(", ");
    console.log(errorMessages);
    toast.warn(errorMessages, { ...toastConfig, position: "bottom-right" });
  };

  return (
    <section id="contactUs" className="mx-auto w-5/6 pt-24 pb-36">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.contactUs)}
      >
        {/* HEADERS */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <H>
            <span className="text-primary-500">CONTACT US</span> to start
            programming
          </H>
          <p className="my-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde
            explicabo illum necessitatibus sequi, ea excepturi impedit hic
            debitis, illo quas porro commodi nam corrupti earum perferendis amet
            soluta. Temporibus est assumenda inventore cum, doloremque
            voluptatem vitae! Consectetur dicta nihil, illum blanditiis tenetur
            ullam facilis praesentium omnis laboriosam cupiditate quibusdam ipsa
            nisi magni obcaecati vero aliquid molestiae ipsum laudantium,
            recusandae adipisci perspiciatis consequatur est. Cumque nobis
            recusandae, vel magnam sapiente autem ratione? Iste maiores,
            molestiae minus ullam amet sint quis velit quaerat animi dolor
            architecto laborum deserunt nostrum placeat recusandae in ad
            possimus neque fuga delectus fugit veritatis voluptas iure
            explicabo!
          </p>
        </motion.div>
        {/* FORMS AND IMAGE*/}
        <div className="mt-10 w-3/4 mx-auto">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="mt-10 basis-3/5 md:mt-0"
          >
            {/* target="_blank" 的意思是点击后在打开新的页面*/}
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                className={inputStyle}
                placeholder="NAME"
                {...register("name", {
                  required: "name is required",
                  maxLength: {
                    value: 100,
                    message: "name should not be more than 100 letters",
                  },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-primary-500">
                  {errors.name.type === "required" && "This field is required."}
                  {errors.name.type === "maxLength" &&
                    "Max length is 100 letters."}
                </p>
              )}
              <input
                type="text"
                className={inputStyle}
                placeholder="EMAIL"
                {...register("email", {
                  required: "email is required",
                  maxLength: {
                    value: 100,
                    message: "email should not be more than 100 letters",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-primary-500">
                  {errors.email.type === "required" &&
                    "This field is required."}
                  {errors.email.type === "pattern" && "Invalid email address."}
                </p>
              )}
              <textarea
                rows={4}
                cols={50}
                className={inputStyle + " h-48"}
                placeholder="MESSAGE"
                {...register("message", {
                  required: "message is required",
                  maxLength: {
                    value: 500,
                    message: "message should not be more than 500 letters",
                  },
                })}
              />
              {errors.message && (
                <p className="mt-1 text-primary-500">
                  {errors.message.type === "required" &&
                    "This field is required."}
                  {errors.message.type === "maxLength" &&
                    "Max length is 500 letters."}
                </p>
              )}
              <button
                type="submit"
                className="bg-secondary-500 rounded-md px-10 py-2 hover:bg-primary-500 hover:text-white w-32"
              >
                Submit
              </button>
            </form>
          </motion.div>
          {/* IMAGE */}
          {/* <motion.div
            className="relative mt-16 basis-2/5 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="before:absolute md:before:content-evolvetext w-full before:-bottom-20 before:-right-10 before:z-[-1]">
              <img
                className="w-full"
                src={ContactUsPageGraphic}
                alt="contact-us-page-graphic"
              />
            </div>
          </motion.div> */}
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
