var abi = [ { anonymous: false,
  inputs: [ [Object], [Object] ],
  name: 'Award',
  type: 'event',
  constant: undefined,
  payable: undefined,
  signature:
   '0x473edf73b107bf5d270ea55a7ea4ce98a1b5618dd196e00d5a48e101299b26d4' },
{ anonymous: false,
  inputs: [ [Object], [Object] ],
  name: 'Deposit',
  type: 'event',
  constant: undefined,
  payable: undefined,
  signature:
   '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c' },
{ payable: true,
  stateMutability: 'payable',
  type: 'fallback',
  constant: undefined },
{ constant: false,
  inputs: [],
  name: 'withdraw',
  outputs: [],
  payable: true,
  stateMutability: 'payable',
  type: 'function',
  signature: '0x3ccfd60b' },
{ constant: true,
  inputs: [],
  name: 'whoami',
  outputs: [ [Object] ],
  payable: false,
  stateMutability: 'view',
  type: 'function',
  signature: '0xb3b36bb3' },
{ constant: true,
  inputs: [],
  name: 'getBalance',
  outputs: [ [Object] ],
  payable: false,
  stateMutability: 'view',
  type: 'function',
  signature: '0x12065fe0' } ];

var CommunityChest = web3.eth.contract(abi);
var communityChest = CommunityChest.at('0x3e1FDDBA800b382CC164c4dD28bCE3ac0Bd25447');

var event = communityChest.Award();


event.watch(function(error, result){
  
  if (!error)
      console.log(result);
});

var event = clientReceipt.Deposit(function(error, result) {
  if (!error)
      console.log(result);
});