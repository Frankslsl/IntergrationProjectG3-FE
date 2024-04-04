import AnchorLink from "react-anchor-link-smooth-scroll";
import { SelectedPage } from "@/components/enum/selectedPage";

type Props = {
  page: SelectedPage;
  href: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  setIsMenuToggled: (value: boolean) => void;
};

function Link({
  page,
  href,
  selectedPage,
  setSelectedPage,
  setIsMenuToggled,
}: Props) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    setSelectedPage(page);
    setIsMenuToggled(false);
  };
  return (
    <AnchorLink
      href={href}
      className={`transition duration-500 hover:text-primary-300 ${
        selectedPage === page ? "text-primary-300" : ""
      }`}
      onClick={handleClick}
    >
      {page}
    </AnchorLink>
  );
}

export default Link;
