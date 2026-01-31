import {
  Box,
  SimpleGrid,
  Heading,
  Container,
  Text,
  Alert,
} from "@chakra-ui/react";
import { ShoppingBag, Info } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { products } from "@/data/products";

export function ProductGrid() {
  return (
    <Box as="main" py={8} bg="bg.subtle" minH="calc(100vh - 72px)">
      <Container maxW="7xl" px={{ base: 4, md: 6 }}>
        <Box mb={8} display="flex" alignItems="center" gap={3}>
          <ShoppingBag size={28} />
          <Box>
            <Heading size="xl" color="fg" mb={1}>
              Product Showcase
            </Heading>
            <Text color="fg.muted" fontSize="md">
              Browse and add items to your cart.
            </Text>
          </Box>
        </Box>

        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          gap={6}
          minChildWidth="280px"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
