"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getPokemonByName } from "@/service/pokemon-fetcher";
import { CardDescription } from "@/components/card-description";
import { ToggleFavoriteHeart } from "@/components/toggle-favorite";
import { Pokemon } from "../../../lib/pokemon";
import { EvolutionCard } from "@/components/evolution-card";

export default function PokemonDetail({
  params,
}: {
  params: { name: string };
}) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const fetchPokemonData = useCallback(async () => {
    try {
      const data = await getPokemonByName({ name: params.name });
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  }, [params.name]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div
        key={pokemon.id}
        className="flex flex-col justify-between items-center border-solid border border-gray-300 rounded"
      >
        <div className="h-[450px] p-2 flex justify-center items-center">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={450}
            height={450}
            className="object-contain max-h-full max-w-full"
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full p-2 bg-slate-100 ">
            <CardDescription
              name={pokemon.name}
              types={pokemon.types}
              titleClass="text-2xl"
            />
            <ToggleFavoriteHeart
              pokemon={pokemon}
              handleTriggerRefresh={fetchPokemonData}
            />
          </div>
          <div className="flex flex-col w-full p-2 bg-slate-100">
            <div className="flex w-full justify-between items-center">
              <span className="flex w-full h-3 mr-3 bg-violet-400 rounded-lg"></span>
              <p className="flex min-w-[100px] text-nowrap text-lg font-bold text-left">
                CP: {pokemon.maxCP}
              </p>
            </div>
            <div className="flex w-full justify-between items-center">
              <span className="flex w-full h-3 mr-3 bg-green-400 rounded-lg"></span>
              <p className="flex min-w-[100px] text-nowrap text-lg font-bold text-left">
                HP: {pokemon.maxHP}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-evenly w-full">
          <div className="flex flex-col w-full border-s-orange-50 border border-solid p-5">
            <p className="text-center text-lg font-bold">Weight</p>
            <p className="text-center">
              {pokemon.weight.minimum} - {pokemon.weight.maximum}
            </p>
          </div>
          <div className="flex flex-col w-full border-s-orange-50 border border-solid p-5">
            <p className="text-center text-lg font-bold">Height</p>
            <p className="text-center">
              {pokemon.height.minimum} - {pokemon.height.maximum}
            </p>
          </div>
        </div>
      </div>

      {pokemon.evolutions.length > 0 && (
        <div className="flex flex-col justify-start w-full my-4">
          <p className="text-lg font-bold">Evolutions</p>
          <div className="flex flex-row gap-2">
            {pokemon.evolutions.map((evolutionPokemon) => (
              <EvolutionCard
                key={evolutionPokemon.id}
                pokemon={evolutionPokemon}
                handleTriggerRefresh={fetchPokemonData}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
