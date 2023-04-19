const Book = require('../models/Book');
const { createError } = require('../utils/error');

exports.createBook=async(req,res,next)=>{
    
    try {   
            const newBook = await Book.create(req.body);
            res.status(200).json(newBook);
    } catch (error) {
        next(error);
    }
}



exports.delete = async(req, res, next)=>{
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json("delete successfully");
    } catch (error) {
        next(error);
    }
}

exports.update = async (req,res,next)=>{
    try {
        const updateBook =await Book.findByIdAndUpdate(req.params.id,{$push: req.body},{$new: true});
        if(!updateBook) return next(createError(404,"no book found"));
        res.status(200).json(updateBook);

    } catch (error) {
        next(error);
    }
}

//find
exports.fetchAll = async(req, res, next)=>{
   
    try {
         const books = await Book.find();
         if(!books) return next(createError(404,"No books found"));
         res.status(200).json(books);
    } catch (error) {
        next(error);
    }
}

exports.fetchById = async(req, res, next)=>{
   
    try {
         const book = await Book.findById(req.params.id);
         if(!book) return next(createError(404,"No books found"));
         res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

exports.fetchByCategory = async(req, res, next)=>{
   
    try {
         const books = await Book.find(req.query);
         if(!books) return next(createError(404,"No books found"));
         res.status(200).json(books);
    } catch (error) {
        next(error);
    }
}

exports.fetchByDates = async(req, res, next)=>{
    try {
        const books = await Book.find().sort({createdAt: -1});
         if(!books) return next(createError(404,"No books found"));
         res.status(200).json(books);
    } catch (error) {
        next(error);
    }
}

exports.fetchByAuthor = async(req,res,next)=>{
    try {
        console.log(req.query.author);
        const books = await Book.find({author: req.query.author});
        if(!books) return next(createError(404,"No books found"));
        res.status(200).json(books);
    } catch (error) {
        next(error)
    }
}

exports.fetchByName = async(req,res,next)=>{
    try {
        const pages = req.query.page || 1;
        const itemPerPage = 6;
        const books = await Book.find(
            {
                $or: [
                    {name: {$regex:req.query.name}}
                ]
            }
        ).skip((pages-1)*itemPerPage)
        if(!books) return next(createError(404,"No books found"));
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
}

exports.fetchPages = async(req, res, next)=>{
   
    try {
        const pages = req.query.page || 1;
        const itemPerPage = 6;
         const books = await Book.find().skip((pages - 1)*itemPerPage).limit(itemPerPage);
         res.status(200).json(books);
    } catch (error) {
        next(error);
    }
}

//update download
exports.updateDownload = async (req,res,next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id,{
            $inc: {"NumberOfDownloads": 1}
        })
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
}

exports.fetchPopular = async (req,res,next) => {
    try {
        const pages = req.query.page || 1;
        const itemPerPage = 6;
        const books = await Book.find().skip((pages - 1)*itemPerPage).sort({"NumberOfDownloads": -1}).limit(itemPerPage);
        const count = await Book.find().countDocuments();
        res.status(200).json({books: books, count: count});
    } catch (error) {
        next(error);
    }
}

exports.count = async (req,res,next) => {
    try {
        const categories = ['Technology','Politic','story','poem']
        const list = await Promise.all(categories.map(c=>{
            return Book.countDocuments({"category": c})
        }))
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}

