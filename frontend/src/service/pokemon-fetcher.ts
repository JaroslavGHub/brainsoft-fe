import client from "../../lib/client";
import { gql } from "@apollo/client";
import { Pokemon } from "../generated/graphql";

const query = gql`
  query {
    pokemons(query: { limit: 1000, offset: 0 }) {
      edges {
        name
        id
        number
        isFavorite
        image
      }
    }
  }
`;

const getPokemons = async (): Promise<Partial<Pokemon>[]> => {
  const { loading, data, error } = await client.query({ query });

  if (error) return [];
  if (loading || !data || !data.pokemons) return [];

  return data.pokemons.edges;
};

export const pokemonFetcher = async () => {
  return {
    pokemonList: await getPokemons(),
  };
};
