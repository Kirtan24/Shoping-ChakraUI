import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  HStack,
  Badge,
  Image,
  VStack,
  RatingGroup,
  Tooltip,
} from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <Card.Root
      size="lg"
      variant="elevated"
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border.subtle"
      overflow="hidden"
      cursor="pointer"
      _hover={{ shadow: "lg", borderColor: "border.emphasized" }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <Box position="relative" bg="bg.subtle" aspectRatio={1}>
        <Image
          src={product.image}
          alt={product.name}
          objectFit="cover"
          w="100%"
          h="100%"
        />
        <Badge
          position="absolute"
          top={2}
          left={2}
          colorPalette="gray"
          bg="blackAlpha.600"
          color="white"
        >
          {product.category}
        </Badge>
      </Box>

      <CardBody gap={3}>
        <VStack align="stretch" gap={1}>
          <Heading size="sm" noOfLines={2} color="fg">
            {product.name}
          </Heading>
          <HStack gap={1}>
            <RatingGroup.Root
              value={product.rating}
              count={5}
              size="sm"
              readOnly
            >
              <RatingGroup.Control />
            </RatingGroup.Root>
            <Text fontSize="xs" color="fg.muted">
              {product.rating}
            </Text>
          </HStack>
        </VStack>

        <Text fontSize="sm" color="fg.muted" noOfLines={2}>
          {product.description}
        </Text>

        <HStack justify="space-between" align="center" mt={2}>
          <Text fontWeight="bold" fontSize="xl" color="fg">
            ${product.price.toFixed(2)}
          </Text>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button
                colorPalette="blue"
                size="sm"
                leftIcon={<ShoppingCart size={16} />}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Add to Cart
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Positioner>
              <Tooltip.Content>Add to cart</Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip.Root>
        </HStack>
      </CardBody>
    </Card.Root>
  );
}
