const express = require("express");
const app = express();
require("dotenv").config()
const {HOST, PORT} = process.env;
const {sendOrder} = require("./telegram-bot");
const fs = require("fs")
const goods = JSON.parse(fs.readFileSync("public/goods.json", {encoding: "utf-8"}))

app.use(express.json());
app.use(express.static("public"));

app.post("/api/order", (req, res) => {
    const {order, email, name, phone} = req.body
    const message = Object.keys(order).map(orderId => `${goods[orderId].name}: ${order[orderId]} x ${goods[orderId].cost} грн = ${order[orderId] * goods[orderId].cost} грн`)
    message.push(`Всего: ${Object.keys(order).map(orderId => order[orderId] * goods[orderId].cost).reduce((a, b) => a + b, 0)} грн`)
    message.push(`Имя: ${name}`, `Телефон: ${phone}`, `Почта: ${email}`)
    sendOrder(message.join("\n"))
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})