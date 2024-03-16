import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "../../lib/pokemon";
import { ToggleFavoriteHeart } from "./toggle-favorite";

export const EvolutionCard = ({
  pokemon,
  handleTriggerRefresh,
}: {
  pokemon: Pokemon;
  handleTriggerRefresh: () => void;
}) => {
  return (
    <div
      key={pokemon.id}
      className="flex flex-col justify-between items-center border-solid border border-gray-300 rounded"
    >
      <Link
        href={`${pokemon.name}`}
        className="h-[220px] p-2 flex justify-center items-center"
      >
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={150}
          height={150}
          className="object-contain max-h-full max-w-full"
        />
      </Link>

      <div className="flex flex-row w-full p-2 bg-slate-100 ">
        <div className="flex flex-col justify-center w-full text-left">
          <p className={`font-bold`}>{pokemon.name}</p>
        </div>
        <ToggleFavoriteHeart
          pokemon={pokemon}
          handleTriggerRefresh={handleTriggerRefresh}
        />
      </div>
    </div>
  );
};
