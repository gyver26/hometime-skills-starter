import React from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Show } from ".";
import ShowCard, { ShowCardLoading } from "./ShowCard";

type Props = {
  shows: Show[];
  isLoading: boolean;
  searchValue: string;
  loadingCards?: number;
};

export default function ShowCardList({
  shows,
  isLoading,
  searchValue,
  loadingCards = 2
}: Props) {
  if (searchValue.length === 0) {
    return (
      <Text color="gray.500" p={6} textAlign="center">
        Nothing here. Try searching for a TV show above!
      </Text>
    );
  }

  if (isLoading) {
    return (
      <VStack spacing={4} mt={6}>
        {Array.from(Array(loadingCards).keys()).map((key) => (
          <ShowCardLoading key={key} />
        ))}
      </VStack>
    );
  }

  if (shows.length === 0) {
    return (
      <Text color="gray.500" p={6} textAlign="center">
        No results for "{searchValue}"
      </Text>
    );
  }

  return (
    <VStack spacing={4} mt={6}>
      {shows.map((show, key) => (
        <ShowCard key={`show-${key}`} show={show} />
      ))}
    </VStack>
  );
}
