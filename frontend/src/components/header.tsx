import { FaList, FaTh } from "react-icons/fa";
import { LayoutType, ViewFilter } from "./pokemons";
import { useCallback, useRef, useState } from "react";

export const Header = ({
  showAll,
  types,
  handleAllFavorite,
  handleLayoutChange,
  handleSearchChange,
  handleTypeChange,
}: {
  showAll: boolean;
  types: string[];
  handleAllFavorite: (value: ViewFilter) => void;
  handleLayoutChange: (type: LayoutType) => void;
  handleSearchChange: (value: string) => void;
  handleTypeChange: (value: string) => void;
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const typingTimer = useRef<NodeJS.Timeout | null>(null);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchValue(value);
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
      }
      typingTimer.current = setTimeout(() => {
        handleSearchChange(searchValue);
      }, 500);
    },
    [handleSearchChange, searchValue]
  );

  return (
    <div className="flex flex-col gap-2 p-2 sticky top-0 z-100 w-full h-[100px] bg-gray-50">
      <div className="flex flex-row w-full h-1/2 gap-2">
        <button
          type="submit"
          className={`flex-1 border-solid border-2 border-green-500  ${
            showAll ? "bg-green-500 text-white" : "bg-white text-green-500"
          }`}
          onClick={() => handleAllFavorite("ALL")}
        >
          All
        </button>
        <button
          type="submit"
          className={`flex-1 border-solid border-2 border-green-500 ${
            !showAll ? "bg-green-500 text-white" : "bg-white text-green-500"
          }`}
          onClick={() => handleAllFavorite("FAVORITE")}
        >
          Favorite
        </button>
      </div>
      <div className="flex flex-row gap-2 w-full h-1/2">
        <input
          type="text"
          placeholder="Type something..."
          className="w-full px-2"
          onChange={handleChange}
        />
        <select
          className="w-2/5 p-1"
          onChange={(event) => handleTypeChange(event.target.value)}
        >
          <option key={"all"} value={""}>
            All
          </option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="flex justify-evenly">
          <FaList
            className="text-green-500 w-10 h-10 p-1 cursor-pointer"
            onClick={() => handleLayoutChange("LIST")}
          />
          <FaTh
            className="text-green-500 w-10 h-10 p-1 cursor-pointer"
            onClick={() => handleLayoutChange("GRID")}
          />
        </div>
      </div>
    </div>
  );
};
