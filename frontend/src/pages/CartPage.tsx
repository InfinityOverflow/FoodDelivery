import { useDeleteMyCart, useGetMyCart } from "@/api/CartApi";
import { useEffect,useState } from "react";
import { useGetRestaurant } from "@/api/RestaurantApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MenuItems } from "@/types";
import CheckoutButton from "@/components/CheckoutButton";
import { useCreateCheckoutSession } from "@/api/OrderApi";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { Trash } from "lucide-react";
import { CartItem } from "./DetailPage";

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const {data,isLoading}=useGetMyCart();
    const {restaurant}=useGetRestaurant(data?.restaurantId);
    const {deleteMyCart}=useDeleteMyCart();
    // const {deleteItem,isLoading:isReducing}=useDeleteItem()
    const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();
  useEffect(()=>{
    if(data)
    setCartItems(data.cartItems);
    console.log(cartItems);
  },[isLoading,data]);

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem:MenuItems) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

//   const removeFromCart = async(cartItem: CartItem) => {
//     console.log(cartItem);
//     await deleteItem(cartItem);
//   };

  return(
    <>
    <div className="grid gap-5">
    {
        cartItems?.length>0?
        (cartItems.map((menuItem:MenuItems)=>{
            return (<Card>
            <CardHeader>
              <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <div className="flex">
            <CardContent className="flex-1 font-bold">
            ₹{(menuItem.price).toFixed(2)}
            </CardContent>
            <CardContent className="flex gap-4 font-bold">
              {menuItem.quantity}
            </CardContent>
            </div>
          </Card>)
        })):<p className="font-bold">Cart is Empty</p>
    }
    
    <div className="text-right">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={async() => {await deleteMyCart();
                setCartItems([])}}
              />
    <CheckoutButton
                disabled={cartItems?.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
    </div>
    </div>
    </>
  );
}

export default CartPage;