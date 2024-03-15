"use server";

import client from "../../lib/client";
import { gql } from "@apollo/client";
import { Pokemon } from "../../lib/graphql";

const QUERY_TYPES = gql`
  query {
    pokemonTypes
  }
`;

const QUERY_ONE = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      types
      isFavorite
      image
    }
  }
`;

const processParamsAndGenerateQuery = (props: {
  onlyFavorite: boolean;
  name?: string;
  type?: string;
}) => {
  let filter = "";
  if (props.onlyFavorite || props.type) {
    filter += `, filter: `;
  }

  if (props.onlyFavorite) {
    filter += `{ isFavorite: true ${props.type ? "" : " }"}`;
  }

  if (props.type) {
    filter += `${props.onlyFavorite ? ", " : "{"} type: "${props.type}" }`;
  }

  let search = "";
  if (props.name) {
    search += `, search: "${props.name}"`;
  }

  const query = `query {
    pokemons(query: { limit: 1000, offset: 0 ${filter} ${search} }) {
      edges {
        id
        name
        types
        isFavorite
        image
      }
    }
  }`;

  console.log("QUERY");
  console.log(query);

  return gql`
    ${query}
  `;
};

export const getPokemons = async (props?: {
  onlyFavorite: boolean;
  name?: string;
  type?: string;
}): Promise<Pokemon[]> => {
  const query = processParamsAndGenerateQuery({
    onlyFavorite: props?.onlyFavorite ?? false,
    name: props?.name,
    type: props?.type,
  });

  try {
    const { data, error } = await client.query({ query });

    if (error) {
      console.error("Error fetching pokemons:", error);
      return [];
    }

    if (!data || !data.pokemons || !data.pokemons.edges) {
      console.error("Invalid data format:", data);
      return [];
    }

    return data.pokemons.edges;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return [];
  }
};

export const getPokemonByName = async ({
  name,
}: {
  name: string;
}): Promise<Pokemon | null> => {
  try {
    const { data, error } = await client.query({
      query: QUERY_ONE,
      variables: { name },
    });

    if (error) {
      console.error("Error fetching pokemon:", error);
      return null;
    }

    if (!data || !data.pokemon) {
      console.error("Invalid data format:", data);
      return null;
    }

    return data.pokemon;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return null;
  }
};

export const getPokemonTypes = async (): Promise<string[]> => {
  try {
    const { data, error } = await client.query({
      query: gql`
        query {
          pokemonTypes
        }
      `,
    });

    if (error) {
      console.error("Error fetching pokemon types:", error);
      return [];
    }

    if (!data || !data.pokemonTypes) {
      console.error("Invalid data format:", data);
      return [];
    }

    return data.pokemonTypes;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return [];
  }
};
