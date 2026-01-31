import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Badge,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  const { cartCount } = useCart();
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      bg="bg.panel"
      borderBottomWidth="1px"
      borderColor="border.subtle"
      shadow="sm"
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={3}
        align="center"
        justify="space-between"
        gap={4}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Heading size="lg" fontWeight="bold" color="fg" _hover={{ opacity: 0.9 }}>
            ShopUI
          </Heading>
        </Link>

        <HStack gap={2} flexShrink={0}>
          <ColorModeButton />
          <Button
            position="relative"
            variant="outline"
            size="sm"
            onClick={onOpen}
            aria-label="Open cart"
            leftIcon={<ShoppingCart size={18} />}
          >
            Cart
            {cartCount > 0 && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                colorPalette="blue"
                borderRadius="full"
                px={1.5}
                minW="5"
                textAlign="center"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
        </HStack>
      </Flex>

      <CartDrawer open={open} onClose={onClose} />
    </Box>
  );
}
