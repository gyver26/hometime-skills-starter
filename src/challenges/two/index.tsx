import { Box, Input, Flex, Text, VStack } from "@chakra-ui/react";
import { useDebounce } from "use-debounce";
import React, { useEffect, useState } from "react";
import ShowCardList from "./ShowCardList";

// putting this here as a guide for what the API returns
// and what you need from it.
export interface Show {
  score: number;
  show: {
    id: number;
    name: string;
    type: string;
    genres: string[];
    image?: {
      medium: string;
    };
    summary: string;
  };
}

async function fetchShows(query: string) {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );
    const newShows = await response.json();
    return newShows;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default function Two() {
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 500);
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // I've debounced the input for you just
  // use 'searchValue' to trigger a request to the search API
  // https://api.tvmaze.com/search/shows?q=:searchValue

  useEffect(() => {
    const getShows = async (searchValue: string) => {
      setIsLoading(true);
      const newShows = await fetchShows(searchValue);
      setShows(newShows);
      setIsLoading(false);
    };
    getShows(searchValue);
  }, [searchValue]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <Box>
      <Input
        type="text"
        placeholder="Search for a TV show"
        onChange={handleSearch}
      />
      <ShowCardList
        shows={shows}
        isLoading={isLoading}
        searchValue={searchValue}
      />
    </Box>
  );
}
