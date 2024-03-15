import { FaList, FaTh } from "react-icons/fa";
import { LayoutType, ViewFilter } from "./pokemons";

export const Header = (props: {
  showAll: boolean;
  types: string[];
  handleAllFavorite: (value: ViewFilter) => void;
  handleLayoutChange: (type: LayoutType) => void;
  handleSearchChange: (value: string) => void;
  handleTypeChange: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 p-2 sticky top-0 z-100 w-full h-[100px] bg-gray-50">
      <div className="flex flex-row w-full h-1/2 gap-2">
        <button
          type="submit"
          className={`flex-1 border-solid border-2 border-green-500  ${
            props.showAll
              ? "bg-green-500 text-white"
              : "bg-white text-green-500"
          }`}
          onClick={() => props.handleAllFavorite("ALL")}
        >
          All
        </button>
        <button
          type="submit"
          className={`flex-1 border-solid border-2 border-green-500 ${
            !props.showAll
              ? "bg-green-500 text-white"
              : "bg-white text-green-500"
          }`}
          onClick={() => props.handleAllFavorite("FAVORITE")}
        >
          Favorite
        </button>
      </div>
      <div className="flex flex-row gap-2 w-full h-1/2">
        <input
          type="text"
          placeholder="Type something..."
          className="w-3/5 px-2"
          onChange={(event) => props.handleSearchChange(event.target.value)}
        />
        <select
          className="w-1/5"
          onChange={(event) => props.handleTypeChange(event.target.value)}
        >
          <option key={"all"} value={""}>
            All
          </option>
          {props.types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="flex justify-evenly w-1/5">
          <FaList
            className="text-green-500 w-10 h-10 cursor-pointer"
            onClick={() => props.handleLayoutChange("LIST")}
          />
          <FaTh
            className="text-green-500 w-10 h-10 cursor-pointer"
            onClick={() => props.handleLayoutChange("GRID")}
          />
        </div>
      </div>
    </div>
  );
};
