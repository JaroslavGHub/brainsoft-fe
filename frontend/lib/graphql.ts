import { gql } from "graphql-request";

export const PokemonTypesQuery = gql`
  query {
    pokemonTypes
  }
`;

export const GetPokemonQuery = gql`
  query GetPokemon($name: String!) {
    pokemonByName(name: $name) {
      id
      name
      types
      isFavorite
      image
      maxCP
      maxHP
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
    }
  }
`;

export const FavoritePokemonMutation = gql`
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

export const UnfavoritePokemonMutation = gql`
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

export const GetPokemonsQuery = gql`
  query GetPokemons($name: String, $type: String, $isFavorite: Boolean) {
    pokemons(
      query: {
        limit: 1000
        offset: 0
        filter: { type: $type, isFavorite: $isFavorite }
        search: $name
      }
    ) {
      edges {
        id
        name
        types
        isFavorite
        image
      }
    }
    pokemonTypes
  }
`;
