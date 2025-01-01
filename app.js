const prompt = require("prompt-sync")();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Todo = mongoose.model("Todo", todoSchema, "customers");

// Initializations
dotenv.config();

// DB connection
const connect = async () => {
  // Connect to MongoDB using .env URI
  await mongoose.connect(process.env.MONGODB_URI);

  // Function to run queries before disconnecting from DB
  await menu();

  // Disconnecting from DB after running queries
  await mongoose.disconnect();
};

connect();

async function menu(params) {
  // Welcome message
  console.log(`
Welcome to the CRM

What would you like to do?


1. Create a customer
2. View all customers
3. Update a customer
4. Delete a customer
5. Quit
    `);
  // Take user input
  const customerChoice = prompt("Enter your choice: ");

  switch (customerChoice) {
    case "1":
      // Create a customer
      await createCustomer();
      await menu();
    case "2":
      // View all customers
      await viewCustomers();
      await menu();
    case "3":
      // Update a customer
      await updateCustomer();
      await menu();
    case "4":
      // Delete a customer
      await deleteCustomer();
      await menu();
    case "5":
      // Quit
      await quit();
      break;
    default:
      console.log("Invalid choice");
  }
}

// Functions
async function createCustomer() {
  // Get user input
  const name = prompt("Enter customer name: ");
  const age = prompt("Enter customer age: ");

  // Cteate new customer
  await Todo.create({ name: name, age: age });
}

async function viewCustomers() {
  // Get all customers
  const customers = await Todo.find();

  console.log("List of customer:");

  for (let i = 0; i < customers.length; ++i) {
    console.log(`
${i + 1}.
ID: ${customers[i].id}
Name: ${customers[i].name}
Age: ${customers[i].age}
`);
  }
}

async function updateCustomer() {
  // Get customer by ID
  const id = prompt("Enter customer ID: ");

  if (id.length != 24) {
    console.log("Invalid ID");
  } else {
    try {
      // Get new customer details
      const customer = await Todo.findById(id);

      console.log(`
Name: ${customer.name}
Age: ${customer.age}
`);
      // Enter new customer info
      const name = prompt("Enter new customer name: ");
      const age = prompt("Enter new customer age: ");

      // Find customer by ID, update info, and then display the new update
      await Todo.findByIdAndUpdate(id, { name: name, age: age }, { new: true });
    } catch (e) {
      console.log("Customer not found");
    }
  }
}

async function deleteCustomer() {
  // Get customer by ID
  const id = prompt("Enter customer ID: ");

  if (id.length != 24) {
    console.log("Invalid ID");
  } else {
    try {
      // Get new customer details
      const customer = await Todo.findById(id);

      console.log(`
Name: ${customer.name}
Age: ${customer.age}
`);
      // Enter new customer info
      const choice = prompt(
        `Are you sure you want to delete ${customer.name}? (y/n) `
      );

      if (choice === "y" || choice === "Y") {
        await Todo.findByIdAndDelete(id);
        console.log(`Customer (${customer.name}) deleted`);
      } else if (choice === "n" || choice === "N") {
        console.log("Delete Cancelled");
      } else {
        console.log("Invalid input");
      }
    } catch (e) {
      console.log("Customer not found");
    }
  }
}

async function quit() {
  console.log("Goodbye!");
  process.exit();
}
