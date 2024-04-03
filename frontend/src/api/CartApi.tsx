import { MenuItems } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
type addToMyCartProps = {
  restaurantId: string|undefined;
  cartItems: MenuItems[];
};
export const useAddToMyCart=()=>{
    const { getAccessTokenSilently } = useAuth0();
    
    const addToMyCartRequest=async(addToMyCartPrams:addToMyCartProps)=>{
        const restaurantId=addToMyCartPrams.restaurantId;
        const cartItems=addToMyCartPrams.cartItems;
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(
            `${API_BASE_URL}/api/my/cart`,
            {
                method: "PUT",
                headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                },
                body: JSON.stringify({cartItems,restaurantId}),
            }
        );
        console.log(JSON.stringify({cartItems,restaurantId}));
        if (!response.ok) {
            throw new Error("Unable to add to Cart");
        }
        if(response.ok)
        {
          {
            toast.success("Added to Cart");
            reset();
          }
        }
        return response.json();
    };

    const {
        mutateAsync: updateMyCart,
        isLoading,
        error,
        reset,
      } = useMutation(addToMyCartRequest);
    
      if (error) {
        toast.error(error.toString());
        reset();
      }
      
    
      return {
        updateMyCart,
        isLoading,
      };
}

export const useGetMyCart = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const getMyCartRequest = async (): Promise<{restaurantId:string,
    cartItems:MenuItems[]}> => {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${API_BASE_URL}/api/my/cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to get cart");
      }
  
      return response.json();
    };
  
    const { data, isLoading } = useQuery(
      "fetchMyCart",
      getMyCartRequest,
      {
        refetchInterval: 5000,
      }
    );
  
    return { data, isLoading };
};

export const useDeleteMyCart= ()=>{
    const { getAccessTokenSilently } = useAuth0();
    const deleteMyCartRequest=async()=>{
        const accessToken = await getAccessTokenSilently();
  
        const response = await fetch(`${API_BASE_URL}/api/my/cart`, {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
            throw new Error("Failed to delete cart");
          }
      
          return response.json();
    }
    const {
        mutateAsync: deleteMyCart,
        isLoading,
        error,
        reset,
      } = useMutation(deleteMyCartRequest);
    
      if (error) {
        toast.error(error.toString());
        reset();
      }
    
      return {
        deleteMyCart,
        isLoading,
      };
};
export const useDeleteItem= ()=>{
  const { getAccessTokenSilently } = useAuth0();
  const deleteItemRequest=async(menuItem:MenuItems)=>{
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/my/cart/${menuItem._id}`, {
          method: "DELETE",
          headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });

      if (!response.ok) {
          throw new Error("Failed to delete Item");
      }
      toast.success("Removed Successfully");
      reset();
        return response.json();
  }
  const {
      mutateAsync: deleteItem,
      isLoading,
      error,
      reset,
    } = useMutation(deleteItemRequest);
  
    if (error) {
      toast.error(error.toString());
      reset();
    }
  
    return {
      deleteItem,
      isLoading,
    };
};