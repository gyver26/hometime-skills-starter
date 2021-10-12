import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

function useMouseLocation(ref: React.RefObject<HTMLElement>) {
  const [location, setLocation] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (ref.current) {
      ref.current.onmousemove = (ev) => {
        const offsetLeft = ref?.current?.offsetLeft || 0;
        const offsetTop = ref?.current?.offsetTop || 0;
        const clientWidth = ref?.current?.clientWidth || 0;
        const clientHeight = ref?.current?.clientHeight || 0;
        const x = ev.pageX - offsetLeft;
        const y = ev.pageY - offsetTop;
        // Manual checking if inbound to prevent issue of the position
        // updating even outside of the element when cursor is
        // exiting at the bottom of the element.
        // This issue also exists on the demo app.
        if (
          ev.pageX >= offsetLeft &&
          ev.pageX <= offsetLeft + clientWidth &&
          ev.pageY >= offsetTop &&
          ev.pageY <= offsetTop + clientHeight
        ) {
          setLocation({ x, y });
        }
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
