"use client";

import { getPokemonByName } from "@/service/pokemon-fetcher";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PokemonDetail() {
  // const router = useRouter();
  // const { name } = router.query;

  // useEffect(() => {
  //   console.log(name);
  // }, [name]);

  // const fetchPokemonsData = useCallback(async () => {
  //   try {
  //     const data = await getPokemons({ onlyFavorite, name, type });
  //     const types = await getPokemonTypes();
  //     setPokemons(data);
  //     setTypes(types);
  //   } catch (error) {
  //     console.error("Error fetching pokemons:", error);
  //   }
  // }, [onlyFavorite, name, type]);

  // useEffect(() => {
  //   fetchPokemonsData();
  // }, [fetchPokemonsData, onlyFavorite, name, type]);

  // const pokemon = getPokemonByName({ name: "Ivysaur" });
  // console.log(pokemon);

  return <p>Pokemon</p>;
}
