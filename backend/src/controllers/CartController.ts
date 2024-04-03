import { Request, Response } from "express";
import User from "../models/user";
import Restaurant, { MenuItemType } from "../models/restaurant";

const getCartDetails=async(req:Request,res:Response)=>{
    try {
        const currentUser = await User.findOne({ _id: req.userId });
        if (!currentUser)
        return res.status(404).json({ message: "User not found" });
        const result={
          cartItems:currentUser.carts,
          restaurantId:currentUser.restaurantId
        }
        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

const updateCart = async (req: Request, res: Response) => {
    try {
      const { cartItems,restaurantId } = req.body;
      const user = await User.findById(req.userId);
      const restaurant=await Restaurant.findById(restaurantId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if(!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
      if(user.restaurantId && restaurantId !== user.restaurantId)
      return res.status(500).json({message: `Restaurant diff user has ${user.restaurantId}`});
      else if(user.restaurantId===undefined)
      user.restaurantId=restaurantId;
      const newCartItems = cartItems.filter((item:MenuItemType) =>
        restaurant.menuItems.some((menuItem) => item._id.toString() === menuItem._id.toString()));

      console.log(newCartItems);
      const updatedCartItems = [...user.carts, ...newCartItems];
      user.carts=updatedCartItems;
      await user.save();
  
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating cart" });
    }
  };
const deleteCart=async(req:Request,res:Response)=>{
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.restaurantId='';
    user.carts=[];
    await user.save();
    res.status(200).json({message: "Cart Empty"})
}
export default {
    getCartDetails,
    updateCart,
    deleteCart,
}