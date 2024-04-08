
import { SelectedPage } from "@/components/enum/selectedPage";
import { useNavigate, useLocation } from 'react-router-dom';


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

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    setSelectedPage(page);
    setIsMenuToggled(false);
    if(location.pathname !== '/home') {
      navigate(`/home`);
    } else {
      // stimulate the anchor element
      const anchorTarget = document.querySelector(href);
      if(anchorTarget) {
        anchorTarget.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <a
      href={location.pathname !== '/' ? `/#${href}` : href}
      className={`transition duration-500 hover:text-primary-300 ${
        selectedPage === page ? 'text-primary-300' : ''
      }`}
      onClick={handleClick}
    >
      {page}
    </a>
  );
}

export default Link;
