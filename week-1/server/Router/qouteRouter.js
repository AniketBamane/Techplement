const express = require("express")
const controller = require("../Controller/qouteController")

const router = express.Router()

router.route("/getallquotes").get(controller.getAllQoutes)

router.route("/getallfavourites").get(controller.getAllFavourites)

router.route("/addquotetofavourites").post(controller.addQuoteToFavourites)

module.exports = router