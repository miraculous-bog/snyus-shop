const {Telegraf} = require('telegraf')
const fs = require("fs")
require("dotenv").config()
const usersFile = "users.txt"
const users = fs.existsSync(usersFile) ? fs.readFileSync(usersFile, {encoding: "utf-8"}).split("\n") : []
const {BOT_TOKEN, BOT_LOGIN_TOKEN} = process.env

const bot = new Telegraf(BOT_TOKEN)
bot.start((ctx) => {
    ctx.reply('Welcome')
})
bot.command("login", (ctx) => {
    const token = ctx.update.message.text.split("/login ")[1]
    const userId = ctx.message.chat.id
    if (users.includes(userId)) return ctx.reply("You are already authorized")
    if (token === BOT_LOGIN_TOKEN) {
        users.push(userId)
        saveUsers()
        ctx.reply("Authorized")
    } else {
        ctx.reply("Not authorized: incorrect token")
    }
})

const sendOrder = (message) => {
    users.forEach(id => bot.telegram.sendMessage(id, message))
}

const saveUsers = () => {
    fs.writeFile(usersFile, users.join("\n"), (err) => {if (err) console.log(err)})
}
bot.launch()
module.exports = {
    sendOrder,
}