import { PokemonGridCard } from "./pokemon-grid-card";
import { Pokemon } from "../../lib/pokemon";

export default function PokemonGrid({
  pokemons,
  handleTriggerRefresh,
}: {
  pokemons: Pokemon[];
  handleTriggerRefresh: () => void;
}) {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 justify-center p-2">
      {pokemons.map(
        (pokemon) =>
          pokemon && (
            <PokemonGridCard
              key={pokemon.id}
              pokemon={pokemon}
              handleTriggerRefresh={handleTriggerRefresh}
            />
          )
      )}
    </div>
  );
}
