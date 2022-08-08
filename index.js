const argv = require("yargs").argv;
const contactsFns = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsFns.getContactsList();
      break;

    case "get":
      contactsFns.getContactById(id);
      break;

    case "add":
      contactsFns.addContact(name, email, phone);
      break;

    case "remove":
      contactsFns.removeContactById(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
