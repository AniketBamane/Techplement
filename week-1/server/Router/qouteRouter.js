const express = require("express")
const secureMiddleware = require("../Middleware/secureMiddleware")
const controller = require("../Controller/qouteController")

const router = express.Router()

router.route("/getallquotes").get(controller.getAllQoutes)

router.route("/getallfavourites").get(secureMiddleware,controller.getAllFavourites)

router.route("/searchquote").get(controller.getSearchQuote)

router.route("/addquotetofavourites").post(secureMiddleware,controller.addQuoteToFavourites)

router.route("/removequotetofavourites/:userid").post(secureMiddleware,controller.removeQuoteFromFavourites)

module.exports = router