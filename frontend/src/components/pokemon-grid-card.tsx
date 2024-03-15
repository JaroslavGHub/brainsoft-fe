import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "../../lib/graphql";
import { PokemonCardDescription } from "./card-description";
import { ToggleFavoriteHeart } from "./toggle-favorite";

export const PokemonGridCard = (props: { pokemon: Pokemon }) => {
  return (
    <div
      key={props.pokemon?.id}
      className="flex flex-col justify-between items-center border-solid border border-gray-300 rounded"
    >
      <Link
        href={`${props.pokemon.name}`}
        className="h-[220px] p-2 flex justify-center items-center"
      >
        <Image
          src={props.pokemon.image ?? ""}
          alt={props.pokemon.name ?? ""}
          width={150}
          height={150}
          className="object-contain max-h-full max-w-full"
        />
      </Link>

      <div className="flex flex-row w-full p-2 bg-slate-100 ">
        <PokemonCardDescription
          name={props.pokemon.name}
          types={props.pokemon.types}
        />
        <ToggleFavoriteHeart
          id={props.pokemon.id}
          isFavorite={props.pokemon.isFavorite}
        />
      </div>
    </div>
  );
};
