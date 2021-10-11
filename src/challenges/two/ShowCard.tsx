import {
  Box,
  Flex,
  Image,
  HStack,
  Tag,
  Heading,
  Text,
  Skeleton,
  SkeletonText
} from "@chakra-ui/react";
import React from "react";
import { Show } from ".";

export function ShowCardLoading() {
  return (
    <Flex
      w="full"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      shadow="sm"
      _hover={{
        cursor: "pointer",
        shadow: "lg"
      }}
    >
      <Skeleton width={28} height={157} />
      <Box p={4} flex={1}>
        <Skeleton>
          <Heading color="gray.600">Title</Heading>
        </Skeleton>
        <SkeletonText mt="2" noOfLines={3} />
      </Box>
    </Flex>
  );
}

type Props = {
  show: Show;
};

export default function ShowCard({ show: { show, score } }: Props) {
  // 💡 use this link below for placeholder images.
  // "https://via.placeholder.com/112x157.png?text=No+image"

  // 💡 A few hints:
  // genres use the Tag component
  // loading placeholders use the Skeleton component
  // both from @chakra-ui/react
  // use the docs: https://chakra-ui.com/docs/getting-started

  return (
    <Flex
      w="full"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      shadow="sm"
      _hover={{
        cursor: "pointer",
        shadow: "lg"
      }}
    >
      <Image
        width={28}
        src={show.image?.medium}
        fallbackSrc="https://via.placeholder.com/112x157.png?text=No+image"
        alt={show.name}
      />
      <Box p={4}>
        <HStack>
          {show.genres.map((genre, key) => (
            <Tag key={`genre-${key}`} rounded="full" size="sm">
              {genre}
            </Tag>
          ))}
        </HStack>
        <Heading size="sm" color="gray.600" mt={2}>
          {show.name}
        </Heading>
        <Text
          noOfLines={2}
          color="gray.500"
          isTruncated
          mt={2}
          fontSize="small"
          whiteSpace="normal"
          dangerouslySetInnerHTML={{ __html: show.summary }}
        />
      </Box>
    </Flex>
  );
}
