/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Links = [
  { name: "Home", path: "/" },
  { name: "signUp", path: "/signUp" },
  { name: "login", path: "/login" },
];

const NavLink = ({ children, to, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <RouterLink to={to} onClick={onClick}>
      <Box
        px={2}
        py={1}
        rounded={"md"}
        textDecoration={isActive ? "underline" : "none"}
        _hover={{
          textDecoration: "underline",
          bg: useColorModeValue("blue.400", "blue.700"),
          color: "white",
        }}
      >
        {children}
      </Box>
    </RouterLink>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <Box
        bg={'blue.400'}
        px={4}
        position="sticky"
        top="0"
        zIndex="10"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Text fontSize={"larger"} fontWeight={"bold"} color={"black"} >Ecowiser</Text>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  // onClick={link.name === "Product" ? handleProductsClick : null}
                >
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} to={link.path}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
