import { useNavigate } from "react-router-dom";
import {
  Drawer,
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  NumberInput,
  Separator,
  IconButton,
} from "@chakra-ui/react";
import { ShoppingCart, Trash2, CreditCard, Store, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
      placement="end"
      size="md"
    >
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content
          bg="bg.panel"
          borderLeftWidth="1px"
          borderColor="border.subtle"
        >
          <Drawer.Header borderBottomWidth="1px" borderColor="border.subtle">
            <Flex align="center" justify="space-between">
              <HStack gap={2}>
                <ShoppingCart size={22} />
                <Text fontSize="xl" fontWeight="bold" color="fg">
                  Your Cart
                </Text>
              </HStack>

              <Drawer.CloseTrigger asChild>
                <IconButton aria-label="Close cart" variant="ghost" size="sm">
                  <X size={20} />
                </IconButton>
              </Drawer.CloseTrigger>
            </Flex>
          </Drawer.Header>

          <Drawer.Body overflowY="auto" py={4}>
            {cart.length === 0 ? (
              <VStack py={8} gap={3}>
                <Box color="fg.muted">
                  <ShoppingCart size={48} strokeWidth={1.5} />
                </Box>
                <Text color="fg.muted" fontSize="lg">
                  Your cart is empty
                </Text>
                <Button
                  colorPalette="blue"
                  leftIcon={<Store size={18} />}
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </VStack>
            ) : (
              <VStack align="stretch" gap={4}>
                {cart.map((item) => (
                  <Box
                    key={item.id}
                    p={3}
                    bg="bg.subtle"
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor="border.subtle"
                  >
                    <HStack gap={3} align="flex-start">
                      <Box
                        w="16"
                        h="16"
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
                      <VStack align="stretch" flex={1} gap={1} minW={0}>
                        <Text fontWeight="medium" noOfLines={1} color="fg">
                          {item.name}
                        </Text>
                        <Text fontSize="sm" color="fg.muted">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </Text>
                        <HStack gap={2} mt={1}>
                          <NumberInput.Root
                            size="sm"
                            maxW="24"
                            value={item.quantity}
                            onValueChange={(e) =>
                              updateQuantity(item.id, e.valueAsNumber || 1)
                            }
                            min={1}
                            max={99}
                          >
                            <NumberInput.Input />
                            <NumberInput.Control>
                              <NumberInput.IncrementTrigger />
                              <NumberInput.DecrementTrigger />
                            </NumberInput.Control>
                          </NumberInput.Root>
                          <Button
                            size="sm"
                            variant="ghost"
                            colorPalette="red"
                            leftIcon={<Trash2 size={14} />}
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </Drawer.Body>

          {cart.length > 0 && (
            <>
              <Separator />
              <Drawer.Footer gap={3}>
                <Flex justify="space-between" align="center" w="100%">
                  <Text fontWeight="bold" fontSize="lg" color="fg">
                    Total: ${cartTotal.toFixed(2)}
                  </Text>
                  <Button
                    colorPalette="blue"
                    leftIcon={<CreditCard size={18} />}
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </Flex>
              </Drawer.Footer>
            </>
          )}
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
