const Docs = require('../models/docs.js')

module.exports.docs_post = async (req,res) => {

   const {title,authors} = req.body ;
   const doc = new Docs({title ,authors}) ;

   try {
    const result = await doc.save() ;
    res.status(200).json(result)
   } catch (error) {
    res.status(400).json(error)
   }
}


module.exports.authors_patch =  async (req, res) => {



    const docId = req.params.id;
    const {user , permission } = req.body;
    const userMail = user.email ;
    
    if (!userMail || !permission) {
      return res.status(400).json('Invalid author object');
    }
    
    const newAuthor = {userMail , role : permission} ;
    // res.json(newAuthor) ;
    
    try {
     
      // Validate newAuthor object
      // Add the new author to the authors array
      const updatedDocument = await Docs.findByIdAndUpdate(
        {_id : docId},
        { $push: { authors: newAuthor } },
        { new: true }
      );
  
      if (!updatedDocument) {
        return res.status(404).json('Document not found');
      }
  
      res.status(200).json(updatedDocument);
    } catch (error) {
      res.status(500).json({error,newAuthor});
    }
  };
module.exports.authors_remove =  async (req, res) => {



    const docId = req.params.id;
    const {userMail} = req.body;
    // const userMail = user.email ;
    
    if (!userMail) {
      return res.status(400).json('Invalid author object');
    }
    
    // const newAuthor = {userMail , role : permission} ;
    // res.json(newAuthor) ;
    
    try {
     
      // Validate newAuthor object
      // Add the new author to the authors array
      const updatedDocument = await Docs.findByIdAndUpdate(
        {_id : docId},
        { $pull : { authors: { userMail } } },
        { new: true }
      );
  
      if (!updatedDocument) {
        return res.status(404).json('Document not found');
      }
  
      res.status(200).json(updatedDocument);
    } catch (error) {
      res.status(500).json({error,newAuthor});
    }
  };

  module.exports.docs_delete = async (req,res) => {

    const id = req.params.id;
    try {
        const result = await Docs.findByIdAndDelete(id) ;
        res.status(200).json(result) ;
    } catch (error) {
        res.status(400).json({error : "failed to delete"}) ;
    }
  }


module.exports.docsid_get = async (req,res) => {
    const id = req.params.id ;
    try {
        const docs = await Docs.findById(id) ;
        res.json(docs) ;
    } catch (error) {
        res.json(error) ;
    }
}


module.exports.userdocs_get = async (req,res) => {
    const id = req.params.id ;
    const userMail = id ;
    console.log(id) ;
    try {
      const docs = await Docs.find({ 'authors.userMail': userMail });
      res.status(200).json(docs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
}


//   module.exports.content_patch =  async (req, res) => {



//     const docId = req.params.id;
//     const {title , body } = req.body;
//     // const userMail = user.email ;
    
//     // if (!userMail || !permission) {
//     //   return res.status(400).json('Invalid author object');
//     // }
    
//     const doc = {title , body} ;
//     // res.json(newAuthor) ;
    
//     try {
     
//       // Validate newAuthor object
//       // Add the new author to the authors array
//       const updatedDocument = await Docs.findByIdAndUpdate(
//         {_id : docId},
//         doc,
//         { new: true }
//       );
  
//       if (!updatedDocument) {
//         return res.status(404).json('Document not found');
//       }
  
//       res.status(200).json(updatedDocument);
//     } catch (error) {
//       res.status(500).json({error,newAuthor});
//     }
//   };

