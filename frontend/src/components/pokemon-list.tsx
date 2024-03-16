import { Pokemon } from "../../lib/pokemon";
import { PokemonGridCard, PokemonListCard } from "./pokemon-card";

export const PokemonList = ({
  pokemons,
  handleTriggerRefresh,
}: {
  pokemons: Pokemon[];
  handleTriggerRefresh: () => void;
}) => {
  return (
    <div className="flex flex-col gap-2 justify-center p-2">
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
};

export const PokemonGrid = ({
  pokemons,
  handleTriggerRefresh,
}: {
  pokemons: Pokemon[];
  handleTriggerRefresh: () => void;
}) => {
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
};
