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
      }
    }
  }
`;

const processPokemons = (pokemons: Partial<Pokemon>[]) => {
  return pokemons.map((pokemon) => <p key={pokemon?.id}>{pokemon?.name}</p>);
};

export default async function PokemonDetail() {
  const { loading, data, error } = await client.query({ query });

  if (loading) return <p>Loading...</p>;
  if (error || !data || !data.pokemons) return <p>Error</p>;

  return processPokemons(data.pokemons.edges);
}
