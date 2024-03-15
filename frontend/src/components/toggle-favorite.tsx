import { FaHeart } from "react-icons/fa";
import { toggleFavorite } from "@/service/favorite-toggle";

export const ToggleFavoriteHeart = (props: {
  id: string;
  isFavorite: boolean;
}): React.ReactNode => {
  const handleToggleFavorite = async (formData: FormData) => {
    toggleFavorite(formData);
  };

  return (
    <form
      className="flex flex-col justify-center"
      action={handleToggleFavorite}
    >
      <input type="text" name="id" hidden defaultValue={props.id} />
      <input
        type="text"
        name="isFavorite"
        hidden
        defaultValue={props.isFavorite ? 1 : 0}
      />
      <button
        type="submit"
        className="flex flex-col justify-center items-end w-1/4 text-left"
      >
        <FaHeart color={props.isFavorite ? "red" : "black"} />
      </button>
    </form>
  );
};
