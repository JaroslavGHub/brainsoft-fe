"use client";

import { Pokemon } from "../../lib/graphql";
import { useCallback, useEffect, useState } from "react";
import PokemonGrid from "./pokemon-grid";
import PokemonList from "./pokemon-list";
import { Header } from "./header";
import { getPokemonTypes, getPokemons } from "@/service/pokemon-fetcher";

export type LayoutType = "LIST" | "GRID";
export type ViewFilter = "ALL" | "FAVORITE";

export default function Pokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const [layout, setLayout] = useState<LayoutType>("GRID");
  const [onlyFavorite, setOnlyFavorite] = useState(false);
  const [name, setName] = useState<string>();
  const [type, setType] = useState<string>();

  const fetchPokemonsData = useCallback(async () => {
    try {
      const data = await getPokemons({ onlyFavorite, name, type });
      const types = await getPokemonTypes();
      setPokemons(data);
      setTypes(types);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  }, [onlyFavorite, name, type]);

  useEffect(() => {
    fetchPokemonsData();
  }, [fetchPokemonsData, onlyFavorite, name, type]);

  const handleLayoutChange = (type: LayoutType) => {
    setLayout(type);
  };

  const handleAllFavorite = (type: ViewFilter) => {
    setOnlyFavorite(type === "FAVORITE");
  };

  const handleSearchChange = (name: string) => {
    setName(name);
  };

  const handleTypeChange = (type: string) => {
    if (type === "") {
      setType(undefined);
    } else {
      setType(type);
    }
  };

  return (
    <>
      <Header
        types={types}
        showAll={!onlyFavorite}
        handleLayoutChange={handleLayoutChange}
        handleAllFavorite={handleAllFavorite}
        handleSearchChange={handleSearchChange}
        handleTypeChange={handleTypeChange}
      />
      {layout === "GRID" ? (
        <PokemonGrid pokemons={pokemons} />
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </>
  );
}
