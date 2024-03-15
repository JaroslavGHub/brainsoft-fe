"use server";

import client from "../../lib/client";
import { gql } from "@apollo/client";
import { Pokemon } from "../../lib/graphql";
import { revalidatePath } from "next/cache";

const FAVORITE_POKEMON = gql`
  mutation FavoritePokemon($id: ID!) {
    favoritePokemon(id: $id) {
      id
      name
      types
      isFavorite
      image
    }
  }
`;

const UNFAVORITE_POKEMON = gql`
  mutation UnfavoritePokemon($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
      name
      types
      isFavorite
      image
    }
  }
`;

export const setPokemonFavorite = async (props: {
  pokemonId: string;
}): Promise<Partial<Pokemon[]>> => {
  try {
    const { data, errors } = await client.mutate({
      mutation: FAVORITE_POKEMON,
      variables: { id: props.pokemonId },
    });

    if (errors) {
      console.error("Error Set Pokemon Favorite:", errors);
      return [];
    }

    if (!data || !data.favoritePokemon) {
      console.error("Invalid data format:", data);
      return [];
    }

    return [data.favoritePokemon];
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return [];
  }
};

export const unsetPokemonFavorite = async (props: {
  pokemonId: string;
}): Promise<Partial<Pokemon[]>> => {
  try {
    const { data, errors } = await client.mutate({
      mutation: UNFAVORITE_POKEMON,
      variables: { id: props.pokemonId },
    });

    if (errors) {
      console.error("Error Unset Pokemon Favorite:", errors);
      return [];
    }

    if (!data || !data.favoritePokemon) {
      console.error("Invalid data format:", data);
      return [];
    }

    return [data.favoritePokemon];
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return [];
  }
};

export const toggleFavorite = async (formData: FormData) => {
  const pokemonId = formData.get("id")?.toString() ?? "";
  const isFavorite = formData.get("isFavorite")?.toString() === "1";

  if (!isFavorite) {
    try {
      await setPokemonFavorite({ pokemonId });
    } catch (error) {
      console.error("Can not mark pokemon as not Favorite");
    }
  } else {
    try {
      await unsetPokemonFavorite({ pokemonId });
    } catch (error) {
      console.error("Can not mark pokemon as Favorite");
    }
  }

  revalidatePath("/");
};
