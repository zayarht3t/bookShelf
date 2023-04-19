const User = require("../models/User");
const { createError } = require("../utils/error");
const Book = require("../models/Book");

exports.fetch = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return next(createError(404,"No user found"));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


exports.addFavourite = async (req,res,next) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) return next(createError(404,"No user found"));

        if(!user.favourites.includes(req.params.id)){
            await user.updateOne({$push: {
                    "favourites": req.params.id
                }});
        
        
        res.status(200).json("put successfully")
        }else{
            await user.updateOne({$pull: {
                "favourites": req.params.id
            }});
            res.status(200).json("pop successfully")
        }
        
        
    } catch (error) {
        next(error);
    }
    
}

// exports.popFromFavourites = async (req,res,next) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if(!user) return next(createError(404,"No user found"));

//         await user.updateOne({$pull: {
//         "favourites": req.params.id
//     }});
//         res.status(200).json("update successfully")
//     } catch (error) {
//         next(error);
//     }
    
// }

exports.getFavoriteBooks = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id);

        const books = await Promise.all( user.favourites.map(async(id)=>{
            let book =await Book.findById(id);
            return book;
        }))
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
    

}