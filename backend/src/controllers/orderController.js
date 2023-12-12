import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    } else {
        const order = new Order({
            orderItems: orderItems.map((item) => ({
                ...item,
                product : item._id,
                _id     : undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).send(createdOrder);
    }
});

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).send(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (order) res.status(200).send(order);
    else {
        res.status(404);
        throw new Error("Order not found");
    }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id            : req.body.id,
            status        : req.body.status,
            update_time   : req.body.update_time,
            email_address : req.body.payer.email_address
        };

        const updatedOrder = await order.save();

        res.status(200).send(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send("update order to delivered");
});

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");

    res.status(200).send(orders);
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
};