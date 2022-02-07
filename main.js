const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [];
  }
  createGenesisBlock() {
    return new Block(0, "01/01/2021", "Genesis block", "0");
  }
  getLastestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock) {
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let pelhamCoin = new Blockchain();
pelhamCoin.addBlock(new Block(1, "02/19/2021", { amount: 4 }));
pelhamCoin.addBlock(new Block(2, "03/17/2021", { amount: 20 }));

pelhamCoin.addBlock(new Block(2, "03/22/2021", { amount: 200 }));
console.log(JSON.stringify(pelhamCoin, null, 4));
