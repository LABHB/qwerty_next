import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  useDisclosure
} from "@chakra-ui/react";
import { memo, useCallback } from "react";
import { MenuIconButton } from "../components/atoms/button/MenuIconButton";
import { MenuDrawer } from "../components/molecules/MenuDrawer";

export const Header = memo(function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as="nav"
        bg="#9aaed9"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClose}
          href="/home" //仮リンク先
        >
          <Heading  as="h1" fontSize={{ base: "md", md: "lg" }}>
            Qwertyのロゴ
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            <Link href="/home" onClick={onClose}>SERVICE</Link>
            {/* 仮リンク先 */}
          </Box>
          <Link href="/home" onClick={onClose}>ACCOUNTINFO</Link>
            {/* 仮リンク先 */}
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
});
