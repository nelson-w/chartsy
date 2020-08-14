import React, { useState } from "react";
import { Input } from "semantic-ui-react";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: React.FC<Props> = ({ setSearch }) => {
  const [val, setVal] = useState("");

  return (
    <form
      onSubmit={(e) => {
        setSearch(val);
        e.preventDefault();
      }}
    >
      <Input
        fluid
        transparent
        placeholder="Search for an album"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          e.preventDefault();
        }}
      />
    </form>
  );
};
