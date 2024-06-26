const favouriteModel = require("../Model/favouriteModel")
const quoteModel = require("../Model/quoteModel")

const getAllQoutes = async(req,res,next)=>{
  let quotes = []
  try{
    const {limit,page} = req.query
    if(limit || page){
      const skip = (page - 1) * limit
      quotes = await quoteModel.find().limit(limit).skip(skip)
    }else{
     quotes = await quoteModel.find()
    }
    res.status(200).json(quotes)
  }catch(e){
    res.status(500).json({message:e.message})
  }
}


const getAllFavourites = async (req, res) => {
  let favourites = []
  try{
    const {limit,page} = req.query
    if(limit || page){
      const skip = (page - 1) * limit
       favourites = await favouriteModel.find().limit(limit).skip(skip).populate(["user","quote"])
      res.status(200).json(favourites)
    }else{
       favourites = await favouriteModel.find().populate(["user","quote"])
      res.status(200).json(favourites)
    }
  }catch(e){
    res.status(500).json({message:e.message})
  }
}


// adding quote to favorites
const   addQuoteToFavourites = async (req, res) => {
  try{
    const {quote,user} = req.body
    const addedQoute = new favouriteModel({
      quote,
      user,
    })
    await addedQoute.save()
    res.status(200).json({addedQoute})
  }catch(e){
    res.status(500).json({message:e.message})
  }
}




module.exports ={
  getAllQoutes,
  addQuoteToFavourites,
  getAllFavourites
};