import { Pokemon } from "../../lib/graphql";

export const PokemonCardDescription = (props: {
  name: Pokemon["name"];
  types: Pokemon["types"];
}) => {
  return (
    <div className="flex flex-col justify-center w-full text-left">
      <p className="font-bold">{props.name}</p>
      <div className="flex flex-row justify-start text-left">
        {props.types.map((type, index) => (
          <div key={type}>
            <p className="font-normal">
              {type}
              {index !== props.types.length - 1 && ",\u00A0"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
