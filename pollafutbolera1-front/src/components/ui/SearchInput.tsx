import React from "react";
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Buscar",
  onChange,
}) => {
  return (
    <div className="flex items-center w-[350px] bg-[#F5F6FA] px-5 py-2.5 rounded-[18.7px] border-[0.3px] border-solid border-[#D5D5D5] max-md:w-full">
      <SearchIcon className="h-4 w-4 text-gray-500" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="text-sm text-[#202224] w-full ml-2.5 border-[none] bg-transparent outline-none"
      />
    </div>
  );
};
