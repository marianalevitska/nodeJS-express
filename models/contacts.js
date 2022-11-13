const fs = require('fs/promises');
const path = require('path');
const objectId = require('bson-objectid');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateData = async (data) => {
  return fs.writeFile(contactsPath, JSON.stringify(data));
}

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const res =  contacts.find((contact) => JSON.stringify(contactId) === JSON.stringify(contact.id))
  return res;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => JSON.stringify(contactId) === JSON.stringify(contact.id));
  if (contactIndex === -1) null;
  const [result] = contacts.splice(contactIndex, 1);
  updateContact(contacts);
  return result;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: objectId(),
    ...body
  }
  contacts.push(newContact);
 
  updateData(contacts);
   return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => JSON.stringify(contactId) === JSON.stringify(contact.id));
  if (index===-1) null;
  contacts[index] = {
    ...body,
    id: contactId
  };
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
