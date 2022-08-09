const fs = require("fs");
const shortId = require("short-uuid");
const fsPromises = fs.promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

// функція для використання в кожній функції без показу в консолі щоразу всього списку контактів
async function readListOfContacts() {
  const list = await fsPromises.readFile(`${contactsPath}`, "utf-8");
  return JSON.parse(list);
}

async function writeContactsToFile(array) {
  return await fsPromises.writeFile(
    `${contactsPath}`,
    `${JSON.stringify(array)}`,
    "utf-8"
  );
}

async function getContactsList() {
  try {
    const list = await readListOfContacts();
    console.table(list);
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const list = await readListOfContacts();

    const defineContact = list.find(
      (contact) => contact.id === contactId.toString()
    );

    if (!defineContact) {
      throw new Error("There is no any contact with such id in database");
    }

    console.log(defineContact);
  } catch (error) {
    console.error(`${error.message}`);
  }
}

async function removeContactById(contactId) {
  try {
    const list = await readListOfContacts();
    const defineContact = list.find(
      (contact) => contact.id === contactId.toString()
    );

    if (!defineContact) {
      throw new Error(
        "There is no any contact with such id in database. Please enter correct id"
      );
    }

    const newListCreated = list.filter(
      (contact) => contact.id !== contactId.toString()
    );

    await writeContactsToFile(newListCreated);

    const newListArr = await readListOfContacts();
    console.table(newListArr);
  } catch (error) {
    console.error(`\x1B[31m${error.message}`);
  }
}

async function addContact(name, email, phone) {
  try {
    if (!name || !email || !phone) {
      throw new Error("Name, email and phone are required");
    }
    const list = await readListOfContacts();
    const id = shortId.generate();

    const newContact = { id, name, email, phone };
    const newListCreated = [...list, newContact];

    await writeContactsToFile(newListCreated);

    const newListArr = await readListOfContacts();
    console.table(newListArr);
  } catch (error) {
    console.error(`\x1B[31m${error.message}`);
  }
}

module.exports = {
  getContactsList,
  getContactById,
  removeContactById,
  addContact,
};
