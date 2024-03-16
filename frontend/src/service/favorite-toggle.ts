"use server";

import { Mutation, Pokemon } from "../../lib/pokemon";
import { client } from "../../lib/client";
import {
  FavoritePokemonMutation,
  UnfavoritePokemonMutation,
} from "../../lib/graphql";

export const setPokemonFavorite = async ({
  pokemonId,
}: {
  pokemonId: string;
}): Promise<Pokemon | null> => {
  try {
    const response = await client.request<Mutation>(FavoritePokemonMutation, {
      id: pokemonId,
    });

    if (!response || !response.favoritePokemon) {
      console.error("Error Set Pokemon Favorite");
      return null;
    }

    return response.favoritePokemon;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    throw error;
  }
};
export const unsetPokemonFavorite = async ({
  pokemonId,
}: {
  pokemonId: string;
}): Promise<Pokemon | null> => {
  try {
    const response = await client.request<Mutation>(UnfavoritePokemonMutation, {
      id: pokemonId,
    });

    if (!response || !response.unFavoritePokemon) {
      console.error("Error Set Pokemon UnFavorite");
      return null;
    }

    return response.unFavoritePokemon;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    throw error;
  }
};

export const toggleFavorite = async ({ pokemon }: { pokemon: Pokemon }) => {
  if (!pokemon.isFavorite) {
    try {
      await setPokemonFavorite({ pokemonId: pokemon.id });
    } catch (error) {
      console.error("Can not mark pokemon as not Favorite");
    }
  } else {
    try {
      await unsetPokemonFavorite({ pokemonId: pokemon.id });
    } catch (error) {
      console.error("Can not mark pokemon as Favorite");
      throw error;
    }
  }
};
