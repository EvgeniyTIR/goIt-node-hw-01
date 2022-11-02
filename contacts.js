const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
	const rContacts = await fs.readFile(contactsPath);
	const parsedDb = JSON.parse(rContacts);
	console.table(parsedDb);
}

async function getContactsById(contactId) {
	const rContacts = await fs.readFile(contactsPath);
	const parsedDb = JSON.parse(rContacts);
	const findId = parsedDb.find((contact) => contact.id === contactId);
	console.table(findId);
	return findId;
}

async function removeContact(contactId) {
	const rContacts = await fs.readFile(contactsPath);
	const parsedDb = JSON.parse(rContacts);
	const newList = parsedDb.filter((item) => item.id !== contactId);
	await fs.writeFile(contactsPath, JSON.stringify(newList));
	await listContacts();
}

async function addContact(name, email, phone) {
	const rContacts = await fs.readFile(contactsPath);
	const parsedDb = JSON.parse(rContacts);
	const lastId = Number(parsedDb[parsedDb.length - 1].id);
	const id = String(lastId + 1);
	parsedDb.push({ id, name, email, phone });
	console.table(parsedDb);
	const newData = JSON.stringify(parsedDb);
	fs.writeFile(contactsPath, newData);
}

module.exports = { listContacts, getContactsById, removeContact, addContact };
