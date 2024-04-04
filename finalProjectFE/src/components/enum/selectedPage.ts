export enum SelectedPage {
  home = "Home",
  benefits = "Benefits",
  ourClasses = "Our Classes",
  contactUs = "Contact Us",
}

export type BenefitType = {
  icon: JSX.Element;
  title: string;
  text: string;
};

export type ClassesType = {
  name: string;
  description?: string;
  image: string;
};
