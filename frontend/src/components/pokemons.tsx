"use client";

import { useCallback, useEffect, useState } from "react";
import PokemonGrid from "./pokemon-grid";
import PokemonList from "./pokemon-list";
import { Header } from "./header";
import { getPokemonsAndTypes } from "@/service/pokemon-fetcher";
import { Pokemon, Query } from "../../lib/pokemon";
import Loading from "@/app/loading";
import useSWR from "swr";
import { client } from "../../lib/client";
import { GetPokemonQuery } from "../../lib/graphql";
import { Variables } from "graphql-request";

export type LayoutType = "LIST" | "GRID";
export type ViewFilter = "ALL" | "FAVORITE";

export default function App() {
  const [fetchError, setFetchError] = useState<any>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>();
  const [types, setTypes] = useState<string[]>();

  const [layout, setLayout] = useState<LayoutType>("GRID");
  const [isFavorite, setIsFavorite] = useState(false);
  const [name, setName] = useState<string>();
  const [type, setType] = useState<string>();

  const fetchPokemonsData = useCallback(async () => {
    try {
      const data = await getPokemonsAndTypes({ isFavorite, name, type });
      setPokemons(data.pokemons);
      setTypes(data.types);
    } catch (error) {
      console.error("Error fetching pokemons and types:", error);
      setFetchError(error);
    }
  }, [isFavorite, name, type]);

  useEffect(() => {
    fetchPokemonsData();
  }, [fetchPokemonsData, isFavorite, name, type]);

  const handleLayoutChange = (type: LayoutType) => {
    setLayout(type);
  };

  const handleAllFavorite = (type: ViewFilter) => {
    setIsFavorite(type === "FAVORITE");
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

  if (fetchError !== null) {
    return (
      <p className="text-center">
        Can not access data, please make sure the BE is running.
      </p>
    );
  }

  if (!pokemons || !types) {
    return <Loading />;
  }

  return (
    <>
      <Header
        types={types}
        showAll={!isFavorite}
        handleLayoutChange={handleLayoutChange}
        handleAllFavorite={handleAllFavorite}
        handleSearchChange={handleSearchChange}
        handleTypeChange={handleTypeChange}
      />
      {layout === "GRID" ? (
        <PokemonGrid
          pokemons={pokemons}
          handleTriggerRefresh={fetchPokemonsData}
        />
      ) : (
        <PokemonList
          pokemons={pokemons}
          handleTriggerRefresh={fetchPokemonsData}
        />
      )}
    </>
  );
}
