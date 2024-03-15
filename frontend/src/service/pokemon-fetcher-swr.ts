"use server"

import client from "../../lib/client";
import { gql } from "@apollo/client";
import useSWR from "swr";

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
    filter += `, filter: {`;
  }

  if (props.onlyFavorite) {
    filter += `isFavorite: true`;
  }

  if (props.type) {
    if (props.onlyFavorite) {
      filter += `, `;
    }
    filter += `type: "${props.type}"`;
  }

  if (props.onlyFavorite || props.type) {
    filter += `}`;
  }

  let search = "";
  if (props.name) {
    search += `, search: "${props.name}"`;
  }

  const queryString = `query {
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

  return gql`
    ${queryString}
  `;
};

export const usePokemonsSWR = (props?: {
  onlyFavorite: boolean;
  name?: string;
  type?: string;
}) => {
  const query = processParamsAndGenerateQuery({
    onlyFavorite: props?.onlyFavorite ?? false,
    name: props?.name,
    type: props?.type,
  });
  console.log(query);

  const { data, error } = useSWR(query, async () => {
    const { data } = await client.query({
      query,
    });
    return data.pokemons.edges;
  });

  return {
    pokemons: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePokemonSWR = (name: string) => {
  const { data, error } = useSWR(["getPokemonByName", name], async () => {
    const { data } = await client.query({
      query: QUERY_ONE,
      variables: { name },
    });
    return data.pokemon;
  });

  return {
    pokemon: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePokemonTypesSWR = () => {
  const { data, error } = useSWR("getPokemonTypes", async () => {
    const { data } = await client.query({
      query: QUERY_TYPES,
    });
    return data.pokemonTypes;
  });

  return {
    types: data,
    isLoading: !data && !error,
    isError: error,
  };
};
