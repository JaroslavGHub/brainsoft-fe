import Image from "next/image";
import { Pokemon } from "../generated/graphql";
import { pokemonFetcher } from "@/service/pokemon-fetcher";
import { FaHeart } from "react-icons/fa";

const processPokemons = (pokemons: Partial<Pokemon>[]) => {
  return pokemons.map((pokemon) => (
    <div
      key={pokemon?.id}
      className="flex flex-col items-center border-solid border border-gray-300 rounded"
    >
      <Image
        src={pokemon.image ?? ""}
        alt={pokemon.name ?? ""}
        width={200}
        height={200}
        className="w-60 h-60"
      />
      <div className="flex flex-row w-full">
        {/* First Column */}
        <div className="flex flex-col justify-start p-2 bg-slate-100 w-full text-left">
          <p className="font-bold">{pokemon.name}</p>
          <p className="font-normal">{pokemon.name}</p>
        </div>
        {/* Second Column */}
        <div className="flex flex-col justify-center items-end p-2 bg-slate-100 w-1/4 text-left">
          <FaHeart color="red" />
        </div>
      </div>
    </div>
  ));
};

export default async function PokemonList() {
  const { pokemonList } = await pokemonFetcher();
  return (
    <div className="grid grid-cols-4 gap-2 justify-center p-2">
      {processPokemons(pokemonList)}
    </div>
  );
}
