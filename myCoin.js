const SHA256= require('crypto-js/sha256');

class block{
    constructor(index, timestamp,data,previousHash=''){
        this.index=index;
        this.nonce=0;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }   
    
    calculateHash(){
        return SHA256(this.nonce+this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }

    mineBlock(difficulty){
        let arr="00000000"; //expecting difficulty to be not more than 8

        // let arr="";
        // for(let i=1;i<=difficulty;i++)
        // {
        //     arr+='0';
        // }

        // while(this.hash.substring(0,difficulty)!= arr){
        // while(this.hash.substring(0,difficulty)!= Array(difficulty+1).join("0")){
        while(this.hash.substring(0,difficulty)!= arr.substring(0,difficulty)){
            this.nonce++;
            this.hash=this.calculateHash();
        }
        // console.log("Block mined: " + this.hash);
    }
}

class blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty=2;
    }

    createGenesisBlock(){
        return new block(0,"20/08/2020","Genesis BLock","0");
        // let temp=new block(0,"20/08/2020","Genesis BLock","0");
        // temp.mineBlock(this.difficulty);
        // return temp;
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        // newBlock.hash=newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid()
    {
        for(let i=1;i<this.chain.length;i++)
        {
            const curr_block=this.chain[i];
            const prev_block=this.chain[i-1];
            
            if(curr_block.hash!=curr_block.calculateHash())
            return false;

            if(curr_block.previousHash!=prev_block.hash)
            return false;
        }
        return true;
    }
}

let myCoin= new blockchain();
myCoin.addBlock(new block(1,"22/08/2020","some data 1"));
myCoin.addBlock(new block(2,"24/08/2020","some data 2"));
myCoin.addBlock(new block(3,"26/08/2020","some data 3"));


// myCoin.chain[2].data="ALTERED";
// myCoin.chain[2].hash=myCoin.chain[2].calculateHash();
// console.log("Is chain valid? " + myCoin.isChainValid());
console.log(JSON.stringify(myCoin,null,4));