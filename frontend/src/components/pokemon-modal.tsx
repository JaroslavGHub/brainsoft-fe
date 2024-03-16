import React, { useCallback, useEffect, useState } from "react";
import { Pokemon } from "../../lib/pokemon";
import { PokemonDetailCard } from "./pokemon-detail";
import { getPokemonByName } from "@/service/pokemon-fetcher";

export const PokemonModal = ({
  pokemon,
  handleShowModal,
}: {
  pokemon: Pokemon;
  handleShowModal: (value: boolean) => void;
}) => {
  const [fullPokemon, setPokemon] = useState<Pokemon | null>(null);
  const fetchPokemonData = useCallback(async () => {
    try {
      const data = await getPokemonByName({ name: pokemon.name });
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  }, [pokemon.name]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  if (!fullPokemon) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl
        ">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">{fullPokemon.name}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handleShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                <PokemonDetailCard
                  pokemon={fullPokemon}
                  fetchPokemonData={fetchPokemonData}
                />
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
