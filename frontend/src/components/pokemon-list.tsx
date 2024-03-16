import { Pokemon } from "../../lib/pokemon";
import { PokemonListCard } from "./pokemon-list-card";

export default function PokemonList({
  pokemons,
  handleTriggerRefresh,
}: {
  pokemons: Pokemon[];
  handleTriggerRefresh: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 p-2">
      {pokemons.map(
        (pokemon) =>
          pokemon && (
            <PokemonListCard
              key={pokemon.id}
              pokemon={pokemon}
              handleTriggerRefresh={handleTriggerRefresh}
            />
          )
      )}
    </div>
  );
}
