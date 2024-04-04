import Logo from "@/assets/Logo.png";
const Footer = () => {
  return (
    <footer className="w-full bg-primary-100 py-16">
      <div className="md:flex justify-center items-center md:gap-8 gap-2 w-5/6 mx-auto">
        <div className="basis-1/2 md:mt-0 mt-16">
          <img alt="logo" src={Logo} className="w-[50px]"></img>
          <p className="my-5">
            Lorem vitae ut augue auctor faucibus eget eget ut libero. Elementum
            purus et arcu massa dictum condimentum. Augue scelerisque iaculis
            orci ut habitant laoreet. Iaculis tristique.
          </p>
          <p>© Programming Academy All Rights Reserved.</p>
        </div>
        <div className=" basis-1/4 mt-16 md:mt-0 ">
          <h4 className=" font-bold">Links</h4>
          <p className="my-5">Massa orci senectus</p>
          <p className="my-5">Et gravida id et etiam</p>
          <p>Ullamcorper vivamus</p>
        </div>
        <div className="basis-1/4 mt-16 md:mt-0">
          <h4 className="font-bold">Contact Us</h4>
          <p className="my-5">Tempus metus mattis risus volutpat egestas.</p>
          <p>(333)425-6825</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
