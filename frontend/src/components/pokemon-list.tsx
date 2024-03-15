import { Pokemon } from "../../lib/graphql";
import { PokemonListCard } from "./pokemon-list-card";

export default function PokemonList(props: { pokemons: Pokemon[] }) {
  return (
    <div className="flex flex-col gap-2 p-2">
      {props.pokemons.map(
        (pokemon) =>
          pokemon && <PokemonListCard key={pokemon.id} pokemon={pokemon} />
      )}
    </div>
  );
}
