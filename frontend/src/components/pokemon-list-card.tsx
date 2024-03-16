import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "../../lib/pokemon";
import { CardDescription } from "./card-description";
import { ToggleFavoriteHeart } from "./toggle-favorite";

export const PokemonListCard = ({
  pokemon,
  handleTriggerRefresh,
}: {
  pokemon: Pokemon;
  handleTriggerRefresh: () => void;
}) => {
  return (
    <div
      key={pokemon.id}
      className="flex flex-row items-center border-solid border border-gray-300 rounded"
    >
      <Link
        href={`${pokemon.name}`}
        className="h-[50px] p-2 flex justify-center items-center"
      >
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={100}
          height={100}
          className="w-20 h-20 p-1"
        />
      </Link>

      <div className="flex flex-row flex-grow w-full h-20 p-2 bg-slate-100">
        <CardDescription name={pokemon.name} types={pokemon.types} />
        <ToggleFavoriteHeart
          pokemon={pokemon}
          handleTriggerRefresh={handleTriggerRefresh}
        />
      </div>
    </div>
  );
};
