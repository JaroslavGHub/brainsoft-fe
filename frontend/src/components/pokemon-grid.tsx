import { PokemonGridCard } from "./pokemon-grid-card";
import { Pokemon } from "../../lib/graphql";

export default function PokemonGrid(props: { pokemons: Pokemon[] }) {
  return (
    <div className="grid grid-cols-4 gap-2 justify-center p-2">
      {props.pokemons.map(
        (pokemon) =>
          pokemon && <PokemonGridCard key={pokemon.id} pokemon={pokemon} />
      )}
    </div>
  );
}
