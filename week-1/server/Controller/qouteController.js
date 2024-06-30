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
    const {id,username} = req.user
    if(limit || page){
      const skip = (page - 1) * limit
       favourites = await favouriteModel.find({user:id}).limit(limit).skip(skip).populate(["user","quote"])
      res.status(200).json(favourites)
    }else{
       favourites = await favouriteModel.find({user:id}).populate(["user","quote"])
      res.status(200).json(favourites)
    }
  }catch(e){
    res.status(500).json({message:e.message})
  }
}


// adding quote to favorites
const   addQuoteToFavourites = async (req, res) => {
  try{
    const {quote} = req.body
    const {id} = req.user
    const existedQuote = await favouriteModel.find({user:id, quote: quote})
    if(existedQuote.length > 0){
      return res.status(400).json({message:"quote already exists in your favorites"})
    }
    const addedQoute = new favouriteModel({
      quote,
      user:id,
    })
    await addedQoute.save()
    res.status(200).json({addedQoute})
  }catch(e){
    res.status(500).json({message:e.message})
  }
}

const removeQuoteFromFavourites = async(req,res)=>{
  try{
    const {userid} = req.params
    const {id} = req.user
    await favouriteModel.findOneAndDelete({user:id,quote:userid})
    res.status(200).json({message:"quote removed from favorites"})
  }catch(e){
    res.status(500).json({message:e.message})
  }
}

const getSearchQuote =async(req,res)=>{
  try{
    const {search} = req.query
    const quotes = await quoteModel.find({author: {$regex: search, $options: 'i'}})
    res.status(200).json(quotes)
  }catch(e){
    res.status(500).json({message:e.message})
  }
}


module.exports ={
  getAllQoutes,
  addQuoteToFavourites,
  getAllFavourites,
  getSearchQuote,
  removeQuoteFromFavourites,
 
};