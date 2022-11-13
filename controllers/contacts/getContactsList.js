const { Contact } = require('../../models/contact');

const getContactsList = async (req,res,next) => {
    const contacts = await Contact.find({}, "-createdAt -updatedAt");
    res.status(200).json(contacts);
}

module.exports = getContactsList;
