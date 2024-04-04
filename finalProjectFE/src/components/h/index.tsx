type Props = {
  children: React.ReactNode;
};

const H = ({ children }: Props) => {
  return (
    <div className="basis-3/5 font-montserrat text-3xl font-bold">
      {children}
    </div>
  );
};

export default H;
