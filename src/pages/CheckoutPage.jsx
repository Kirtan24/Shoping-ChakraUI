import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Image,
  Field,
  Input,
  Separator,
  Card,
  CardBody,
  SimpleGrid,
} from "@chakra-ui/react";
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, resetCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    resetCart();
  };

  if (cart.length === 0 && !submitted) {
    return (
      <Box bg="bg.subtle" minH="100vh" py={12}>
        <Container maxW="md">
          <VStack gap={6} align="center">
            <Text color="fg.muted" fontSize="lg">
              Your cart is empty
            </Text>
            <Button colorPalette="blue" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  if (submitted) {
    return (
      <Box bg="bg.subtle" minH="100vh" py={12}>
        <Container maxW="md">
          <VStack gap={6} align="center" textAlign="center">
            <Box color="green.500">
              <CheckCircle size={64} strokeWidth={1.5} />
            </Box>
            <Heading size="xl" color="fg">
              Order placed!
            </Heading>
            <Text color="fg.muted">
              Thank you for your order. This is a demo — no real charge was
              made.
            </Text>
            <Button
              colorPalette="blue"
              size="lg"
              leftIcon={<ArrowLeft size={18} />}
              onClick={() => navigate("/")}
            >
              Back to Shop
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg="bg.subtle" minH="100vh" py={8}>
      <Container maxW="3xl">
        <Button
          variant="ghost"
          mb={6}
          leftIcon={<ArrowLeft size={18} />}
          onClick={() => navigate("/")}
        >
          Back
        </Button>

        <Heading
          size="xl"
          color="fg"
          mb={8}
          display="flex"
          alignItems="center"
          gap={2}
        >
          <CreditCard size={28} />
          Checkout
        </Heading>

        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
            <VStack align="stretch" gap={6}>
              <Card.Root
                bg="bg.panel"
                borderWidth="1px"
                borderColor="border.subtle"
              >
                <CardBody>
                  <Heading size="md" color="fg" mb={4}>
                    Shipping details
                  </Heading>
                  <VStack align="stretch" gap={4}>
                    <Field.Root>
                      <Field.Label>Full name</Field.Label>
                      <Input
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange("fullName")}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Email</Field.Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange("email")}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Address</Field.Label>
                      <Input
                        placeholder="123 Main St"
                        value={formData.address}
                        onChange={handleChange("address")}
                      />
                    </Field.Root>
                    <HStack gap={4} align="stretch">
                      <Field.Root flex={1}>
                        <Field.Label>City</Field.Label>
                        <Input
                          placeholder="City"
                          value={formData.city}
                          onChange={handleChange("city")}
                        />
                      </Field.Root>
                      <Field.Root maxW="120px">
                        <Field.Label>ZIP</Field.Label>
                        <Input
                          placeholder="ZIP"
                          value={formData.zip}
                          onChange={handleChange("zip")}
                        />
                      </Field.Root>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card.Root>

              <Card.Root
                bg="bg.panel"
                borderWidth="1px"
                borderColor="border.subtle"
              >
                <CardBody>
                  <Heading size="md" color="fg" mb={4}>
                    Payment
                  </Heading>
                  <VStack align="stretch" gap={4}>
                    <Field.Root>
                      <Field.Label>Card number</Field.Label>
                      <Input
                        placeholder="4242 4242 4242 4242"
                        value={formData.cardNumber}
                        onChange={handleChange("cardNumber")}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Name on card</Field.Label>
                      <Input
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleChange("cardName")}
                      />
                    </Field.Root>
                    <HStack gap={4} align="stretch">
                      <Field.Root flex={1}>
                        <Field.Label>Expiry</Field.Label>
                        <Input
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleChange("expiry")}
                        />
                      </Field.Root>
                      <Field.Root maxW="100px">
                        <Field.Label>CVV</Field.Label>
                        <Input
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleChange("cvv")}
                        />
                      </Field.Root>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card.Root>
            </VStack>

            <Box>
              <Card.Root
                bg="bg.panel"
                borderWidth="1px"
                borderColor="border.subtle"
                position="sticky"
                top={16}
              >
                <CardBody>
                  <Heading size="md" color="fg" mb={4}>
                    Order summary
                  </Heading>
                  <VStack align="stretch" gap={3} mb={4}>
                    {cart.map((item) => (
                      <HStack key={item.id} gap={3} justify="space-between">
                        <HStack gap={2} minW={0} flex={1}>
                          <Box
                            w="10"
                            h="10"
                            flexShrink={0}
                            borderRadius="md"
                            overflow="hidden"
                            bg="bg.muted"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              objectFit="cover"
                              w="100%"
                              h="100%"
                            />
                          </Box>
                          <Text fontSize="sm" noOfLines={1} color="fg">
                            {item.name}
                          </Text>
                        </HStack>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="fg"
                          whiteSpace="nowrap"
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                  <Separator />
                  <HStack justify="space-between" mt={4} mb={6}>
                    <Text fontWeight="bold" color="fg">
                      Total
                    </Text>
                    <Text fontWeight="bold" fontSize="lg" color="fg">
                      ${cartTotal.toFixed(2)}
                    </Text>
                  </HStack>
                  <Button
                    type="submit"
                    colorPalette="blue"
                    size="lg"
                    w="100%"
                    leftIcon={<CheckCircle size={20} />}
                  >
                    Place order
                  </Button>
                </CardBody>
              </Card.Root>
            </Box>
          </SimpleGrid>
        </form>
      </Container>
    </Box>
  );
}
