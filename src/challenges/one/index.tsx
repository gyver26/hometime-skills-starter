import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

function useMouseLocation(ref: React.RefObject<HTMLElement>) {
  const [location, setLocation] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (ref.current) {
      ref.current.onmousemove = (ev) => {
        const x = ev.pageX - (ref?.current?.offsetLeft || 0);
        const y = ev.pageY - (ref?.current?.offsetTop || 0);
        setLocation({ x, y });
      };
    }
  }, [ref]);

  return location;
}

export default function One() {
  const ref = useRef<HTMLDivElement | null>(null);

  // ❗ This our target API
  const { x, y } = useMouseLocation(ref);

  return (
    <>
      <Box
        ref={ref}
        h="350px"
        w="full"
        bg="red.200"
        rounded="xl"
        position="relative"
        mt={6}
        _hover={{
          shadow: "lg"
        }}
      >
        <Text
          position="absolute"
          left={`${(x + 5).toString()}px`}
          top={`${(y + 10).toString()}px`}
          p={2}
          background="gray.600"
          rounded="md"
          color="gray.100"
          fontSize="sm"
          fontWeight="bold"
        >
          x: {x}, y: {y}
        </Text>
      </Box>
    </>
  );
}
