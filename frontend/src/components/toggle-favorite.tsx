import { FaHeart } from "react-icons/fa";
import { toggleFavorite } from "@/service/favorite-toggle";
import { Pokemon } from "../../lib/pokemon";

export const ToggleFavoriteHeart = ({
  pokemon,
  handleTriggerRefresh,
}: {
  pokemon: Pokemon;
  handleTriggerRefresh: () => void;
}): React.ReactNode => {
  const { id, isFavorite } = pokemon;
  const handleToggleFavorite = async () => {
    console.log("formData");
    console.log(pokemon);
    toggleFavorite({ pokemon });
    handleTriggerRefresh();
  };

  return (
    <div
      className="flex flex-col justify-center"
      onClick={handleToggleFavorite}
    >
      <input type="text" name="id" hidden defaultValue={id} />
      <input
        type="text"
        name="isFavorite"
        hidden
        defaultValue={isFavorite ? 1 : 0}
      />
      <button
        type="submit"
        className="flex flex-col justify-center items-end w-1/4 text-left"
      >
        <FaHeart color={isFavorite ? "red" : "black"} />
      </button>
    </div>
  );
};
