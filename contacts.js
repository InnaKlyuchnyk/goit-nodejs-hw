const fs = require("fs/promises");
const { v4 } = require("uuid");

const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  if (!contact) return null;
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [removeContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name: name, email: email, phone: phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
