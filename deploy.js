const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile');

const MNEMONIC_PHRASE = 'lucky liquid champion clip bind cry topple cube luggage picnic kitten globe';
const INFURA_URL = 'https://sepolia.infura.io/v3/3cea196807d648f1a348cbe687fcff6d';

const provider = new HDWalletProvider(
    MNEMONIC_PHRASE,
    INFURA_URL    
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!']})
    .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();