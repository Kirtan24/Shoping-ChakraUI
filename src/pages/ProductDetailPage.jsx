import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  Grid,
  GridItem,
  Card,
  CardBody,
  Tabs,
  RatingGroup,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  ShoppingCart,
  ArrowLeft,
  Heart,
  Share2,
  Package,
  Truck,
  Star,
} from "lucide-react";
import { useState } from "react";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ProductCard } from "@/components/ProductCard";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { showSuccess } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <Box bg="bg.subtle" minH="100vh" py={12}>
        <Container maxW="md">
          <VStack gap={6} align="center">
            <Box color="fg.muted">
              <Package size={48} strokeWidth={1.5} />
            </Box>
            <Heading size="lg" color="fg">
              Product not found
            </Heading>
            <Button
              colorPalette="blue"
              leftIcon={<ArrowLeft size={18} />}
              onClick={() => navigate("/")}
            >
              Back to Products
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showSuccess(`Added ${quantity} × ${product.name} to cart`);
    setQuantity(1);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    showSuccess(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showSuccess("Link copied");
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Box bg="bg.subtle" minH="100vh" py={8}>
      <Container maxW="7xl">
        <Button
          variant="ghost"
          mb={6}
          leftIcon={<ArrowLeft size={18} />}
          onClick={() => navigate("/")}
          aria-label="Back to products"
        >
          Back to Products
        </Button>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} mb={12}>
          <GridItem>
            <VStack align="stretch" gap={4}>
              <Box
                bg="bg.muted"
                borderRadius="lg"
                overflow="hidden"
                aspectRatio={1}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="stretch" gap={6}>
              <VStack align="stretch" gap={2}>
                <Badge colorPalette="blue" w="fit-content">
                  {product.category}
                </Badge>
                <Heading size="2xl" color="fg">
                  {product.name}
                </Heading>
                <HStack gap={3} align="center">
                  <RatingGroup.Root
                    value={product.rating}
                    count={5}
                    size="md"
                    readOnly
                  >
                    <RatingGroup.Control />
                  </RatingGroup.Root>
                  <Text fontWeight="bold" fontSize="lg" color="fg">
                    {product.rating}
                  </Text>
                  <Text color="fg.muted" fontSize="sm">
                    (248 reviews)
                  </Text>
                </HStack>
              </VStack>

              <Box borderTopWidth="1px" borderColor="border.subtle" pt={4}>
                <Heading size="3xl" color="fg">
                  ${product.price.toFixed(2)}
                </Heading>
                <Text color="fg.muted" fontSize="sm">
                  Free shipping on orders over $100
                </Text>
              </Box>

              <Text fontSize="md" color="fg" lineHeight="tall">
                {product.description}
              </Text>

              <Box borderTopWidth="1px" borderColor="border.subtle" pt={4}>
                <Text fontWeight="bold" mb={3} color="fg">
                  Key Features
                </Text>
                <VStack align="stretch" gap={2} pl={4}>
                  <Text color="fg.muted">Premium quality materials</Text>
                  <Text color="fg.muted">Durable and long-lasting</Text>
                  <Text color="fg.muted">1 year warranty</Text>
                  <Text color="fg.muted">30-day money-back guarantee</Text>
                </VStack>
              </Box>

              <Box borderTopWidth="1px" borderColor="border.subtle" pt={4}>
                <VStack gap={3} align="stretch">
                  <HStack gap={2}>
                    <Text fontWeight="bold" color="fg">
                      Quantity:
                    </Text>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      min={1}
                      maxW="80px"
                      textAlign="center"
                    />
                  </HStack>
                  <Button
                    colorPalette="blue"
                    size="lg"
                    w="100%"
                    leftIcon={<ShoppingCart size={20} />}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <HStack gap={2} w="100%">
                  <Button
                    variant="outline"
                    size="lg"
                    flex={1}
                    leftIcon={
                      <Heart
                        size={20}
                        fill={isWishlisted ? "currentColor" : "none"}
                      />
                    }
                    onClick={handleWishlist}
                    colorPalette={isWishlisted ? "red" : "gray"}
                  >
                    {isWishlisted ? "In Wishlist" : "Wishlist"}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    flex={1}
                    leftIcon={<Share2 size={20} />}
                    onClick={handleShare}
                  >
                    Share
                  </Button>
                  </HStack>
                </VStack>
              </Box>

              <Box borderTopWidth="1px" borderColor="border.subtle" pt={4}>
                <HStack gap={2} wrap="wrap">
                  <Badge colorPalette="green">In Stock</Badge>
                  <Badge colorPalette="blue">Fast Delivery</Badge>
                </HStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>

        <Card.Root mb={12} bg="bg.panel" borderWidth="1px" borderColor="border.subtle">
          <CardBody>
            <Tabs.Root defaultValue="details">
              <Tabs.List mb={6} gap={1}>
                <Tabs.Trigger value="details">Details</Tabs.Trigger>
                <Tabs.Trigger value="reviews">
                  <HStack gap={1} as="span">
                    <Star size={14} />
                    <span>Reviews</span>
                  </HStack>
                </Tabs.Trigger>
                <Tabs.Trigger value="shipping">
                  <HStack gap={1} as="span">
                    <Truck size={14} />
                    <span>Shipping</span>
                  </HStack>
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="details">
                <VStack align="stretch" gap={4}>
                  <Heading size="md" color="fg">
                    Product Details
                  </Heading>
                  <Text color="fg.muted">
                    Premium {product.category.toLowerCase()} crafted with quality
                    materials. Each item undergoes quality control before shipping.
                  </Text>
                  <Text fontWeight="bold" color="fg">
                    Specifications
                  </Text>
                  <VStack align="stretch" gap={2} pl={4}>
                    <HStack justify="space-between">
                      <Text color="fg.muted">Material:</Text>
                      <Text color="fg">Premium</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="fg.muted">Warranty:</Text>
                      <Text color="fg">12 Months</Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text color="fg.muted">SKU:</Text>
                      <Text color="fg">SKU-{product.id}-2024</Text>
                    </HStack>
                  </VStack>
                </VStack>
              </Tabs.Content>
              <Tabs.Content value="reviews">
                <VStack align="stretch" gap={4}>
                  <Heading size="md" color="fg">
                    Customer Reviews
                  </Heading>
                  {[1, 2, 3].map((i) => (
                    <Box
                      key={i}
                      borderTopWidth="1px"
                      borderColor="border.subtle"
                      pt={4}
                    >
                      <HStack justify="space-between" mb={2}>
                        <Text fontWeight="bold" color="fg">
                          Customer {i}
                        </Text>
                        <RatingGroup.Root
                          value={5 - i}
                          count={5}
                          size="sm"
                          readOnly
                        >
                          <RatingGroup.Control />
                        </RatingGroup.Root>
                      </HStack>
                      <Text color="fg.muted" fontSize="sm" mb={2}>
                        Verified Purchase
                      </Text>
                      <Text color="fg.muted">
                        Great quality and value. Highly recommended.
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Tabs.Content>
              <Tabs.Content value="shipping">
                <VStack align="stretch" gap={4}>
                  <Heading size="md" color="fg">
                    Shipping
                  </Heading>
                  <Text color="fg.muted">
                    Standard: 3–5 business days. Free on orders over $100.
                  </Text>
                  <Text color="fg.muted">
                    Returns: 30-day money-back guarantee.
                  </Text>
                </VStack>
              </Tabs.Content>
            </Tabs.Root>
          </CardBody>
        </Card.Root>

        {relatedProducts.length > 0 && (
          <VStack align="stretch" gap={6}>
            <HStack gap={2}>
              <ShoppingCart size={24} />
              <Heading size="xl" color="fg">
                Related Products
              </Heading>
            </HStack>
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
              gap={6}
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </SimpleGrid>
          </VStack>
        )}
      </Container>
    </Box>
  );
}
