const prompt = require('prompt-sync')();


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
const customerChoice = prompt('Enter your choice: ');

switch(customerChoice) {
    case '1':
        console.log(`You choose: ${customerChoice}`);
        break;
    case '2':
        console.log(`You choose: ${customerChoice}`);
        break;
    case '3':
        console.log(`You choose: ${customerChoice}`);
        break;
    case '4':
        console.log(`You choose: ${customerChoice}`);
        break;
    case '5':
        console.log(`You choose: ${customerChoice}`);
        break;
    default:
        console.log('Invalid choice');
}