import { Pokemon } from "../../lib/pokemon";

export const CardDescription = ({
  name,
  types,
  titleClass,
}: {
  name: Pokemon["name"];
  types: Pokemon["types"];
  titleClass?: string;
}) => {
  return (
    <div className="flex flex-col justify-center w-full text-left">
      <p className={`font-bold ${titleClass}`}>{name}</p>
      <div className="flex flex-row justify-start text-left">
        {types.map((type, index) => (
          <div key={type}>
            <p className="font-normal">
              {type}
              {index !== types.length - 1 && ",\u00A0"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
