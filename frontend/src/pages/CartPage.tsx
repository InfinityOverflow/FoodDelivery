import { useDeleteMyCart, useGetMyCart } from "@/api/CartApi";
import { useEffect,useState } from "react";
import { useGetRestaurant } from "@/api/RestaurantApi";
import { CartItem } from "./DetailPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MenuItems } from "@/types";
import CheckoutButton from "@/components/CheckoutButton";
import { useCreateCheckoutSession } from "@/api/OrderApi";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { Separator } from "@radix-ui/react-separator";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const {data,isLoading}=useGetMyCart();
    const {restaurant,isLoading:isLoadingRestaurant}=useGetRestaurant(data?.restaurantId);
    const {deleteMyCart,isLoading:isDeleting}=useDeleteMyCart();
    const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();
  useEffect(()=>{
    setCartItems(data?.cartItems);
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
    await deleteMyCart();
    window.location.href = data.url;
  };

  return(
    <>
    <div className="grid gap-5">
    {
        cartItems?.length>0?
        (cartItems.map((menuItem:MenuItems)=>{
            return (<Card className="cursor-pointer" >
            <CardHeader>
              <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
            ₹{(menuItem.price).toFixed(2)}
            </CardContent>
          </Card>)
        })):<p className="bold">Cart is Empty</p>
    }
    
    <div className="text-right">
        
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