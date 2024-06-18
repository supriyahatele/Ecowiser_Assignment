import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Button,
  Avatar
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Links = [
  { name: "Home", path: "/" },
  { name: "Sign Up", path: "/signUp" },
  { name: "DashBoard", path: "/dashBoard" },
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
  const { auth, handleLogout } = useContext(AuthContext);

  const getUserInitials = (name) => {
    const initials = name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
    return initials;
  };

  return (
    <Box
      bg={"black"}
      px={4}
      position="sticky"
      top="0"
      zIndex="10"
      bottom='0'
      color={"white"}
      // border={'2px solid red'}
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
            <Text fontSize={"larger"} fontWeight={"bold"} color={"white"}>
              Ecowiser
            </Text>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <HStack spacing={4} alignItems={"center"} display={{ base: "none", md: "flex" }}>
          {auth.isLoggedIn && (
            <>
              <Avatar name={auth.username} size={"sm"} bgColor={'pink'} />
              <Text fontSize={"sm"} color={"white"}>
                Welcome, {auth.username}
              </Text>
            </>
          )}
          <Box>
            {auth.isLoggedIn ? (
              <Button
                size={"sm"}
                bg={"crimson"}
                color={"white"}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                size={"sm"}
                bg={"crimson"}
                color={"white"}
                as={RouterLink}
                to="/login"
              >
                Login
              </Button>
            )}
          </Box>
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
            {auth.isLoggedIn && (
              <>
                <HStack spacing={4} alignItems={"center"}>
                  <Avatar name={auth.username} size={"sm"} bgColor={'pink'} />
                  <Text fontSize={"sm"} color={"white"}>
                    Welcome, {auth.username}
                  </Text>
                </HStack>
                <Button
                  w='100px'
                  // size={"sm"}
                  bg={"crimson"}
                  color={"white"}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
            {!auth.isLoggedIn && (
              <Button
              w='100px'
                size={"sm"}
                bg={"crimson"}
                color={"white"}
                as={RouterLink}
                to="/login"
              >
                Login
              </Button>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}