const { Contact } = require('../../models/contact');


const createContact=async (req, res, next) => {
   const contact = await Contact.create(req.body);
   res.status(201).json(contact);

}

module.exports = createContact;