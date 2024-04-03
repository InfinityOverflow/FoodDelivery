import express,{Request,Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import myUserRoute  from "./routes/MyUserRoute";
import restaurantRoute from "./routes/RestaurantRoutes"
import orderRoute from "./routes/OrderRoute";
import cartRoute from "./routes/CartRoute"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log('connected to DB!!!');
});

const app =express();

app.use(cors())

app.get("/test" , async (req: Request,res: Response)=>{
    res.json({message: "Hello !!"});
});

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());
app.use("/api/my/user",myUserRoute);
app.use("/api/restaurant",restaurantRoute);
app.use("/api/order", orderRoute);
app.use("/api/my/cart",cartRoute);

app.listen(7000,()=>{
    console.log("server started");
})