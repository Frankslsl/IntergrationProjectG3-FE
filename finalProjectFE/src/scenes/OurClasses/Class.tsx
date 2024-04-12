type Props = {
  name: string;
  description?: string;
  image: string;
  isLoading: boolean;
};

const overlayStyle = `p-5 absolute z-20 flex h-[350px]
 w-[350px] flex-col justify-center
 whitespace-normal bg-primary-500 text-center text-white
 opacity-0 transition duration-500 hover:opacity-90 gap-2`;

const Class = ({ name, description, image, isLoading }: Props) => {
  const base64ImageString = `data:image/jpeg;base64, ${image}`;
  return (
    <li className="relative mx-5 inline-block h-[350px] w-[350px]">
      {isLoading ? (
        "data is Loading"
      ) : (
        <>
          <div className={overlayStyle}>
            <p>{name}</p>
            <p>{description}</p>
          </div>
          <img
            className="h-[350px] w-[350px]"
            alt={`${name}`}
            src={base64ImageString}
          />
        </>
      )}
    </li>
  );
};

export default Class;
