"use client";

import { useCallback, useEffect, useState } from "react";
import { getPokemonByName } from "@/service/pokemon-fetcher";
import { Pokemon } from "../../../lib/pokemon";
import { PokemonDetailCard } from "@/components/pokemon-detail";

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
    <PokemonDetailCard pokemon={pokemon} fetchPokemonData={fetchPokemonData} />
  );
}
