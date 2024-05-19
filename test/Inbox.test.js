const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hi there!';

beforeEach( async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()
        

    // use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({ 
            data: evm.bytecode.object, 
            arguments: [INITIAL_MESSAGE] 
        })
        .send({ from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
    
    it('has a default message',  async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('Bye!').send({ from: accounts[0] })
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Bye!');
    });
})

// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// });

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     })
// });
