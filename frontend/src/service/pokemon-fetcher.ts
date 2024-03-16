"use server";

import { client } from "../../lib/client";
import { Pokemon, Query } from "../../lib/pokemon";
import {
  GetPokemonQuery,
  GetPokemonsQuery,
  PokemonTypesQuery,
} from "../../lib/graphql";

export const getPokemonsAndTypes = async ({
  name,
  type,
  isFavorite,
}: {
  name?: string;
  type?: string;
  isFavorite?: boolean;
}): Promise<{
  pokemons: Pokemon[];
  types: string[];
}> => {
  let emptyPokemonAndTypes = {
    pokemons: [],
    types: [],
  };

  try {
    const response = await client.request<Query>(GetPokemonsQuery, {
      name,
      type,
      isFavorite,
    });

    if (!response) {
      return emptyPokemonAndTypes;
    }

    return {
      pokemons: response.pokemons.edges,
      types: response.pokemonTypes,
    };
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    throw error;
  }
};

export const getPokemonByName = async ({
  name,
}: {
  name: string;
}): Promise<Pokemon | null> => {
  try {
    const response = await client.request<Query>(GetPokemonQuery, {
      name,
    });

    if (!response || !response.pokemonByName) {
      return null;
    }

    return response.pokemonByName;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    throw error;
  }
};

export const getPokemonTypes = async (): Promise<Pokemon["types"]> => {
  try {
    const response = await client.request<Pokemon["types"]>(PokemonTypesQuery);

    if (!response) {
      return [];
    }

    return response;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    throw error;
  }
};
