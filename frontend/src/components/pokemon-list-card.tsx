import Image from "next/image";
import { Pokemon } from "../../lib/graphql";
import { FaHeart } from "react-icons/fa";
import { PokemonCardDescription } from "./card-description";
import Link from "next/link";
import { ToggleFavoriteHeart } from "./toggle-favorite";

export const PokemonListCard = (props: { pokemon: Pokemon }) => {
  return (
    <div
      key={props.pokemon?.id}
      className="flex flex-row items-center border-solid border border-gray-300 rounded"
    >
      <Link
        href={`${props.pokemon.name}`}
        className="h-[50px] p-2 flex justify-center items-center"
      >
        <Image
          src={props.pokemon.image ?? ""}
          alt={props.pokemon.name ?? ""}
          width={100}
          height={100}
          className="w-20 h-20 p-1"
        />
      </Link>

      <div className="flex flex-row flex-grow w-full h-20 p-2 bg-slate-100">
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
