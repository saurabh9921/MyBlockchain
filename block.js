const {GENESIS_DATA}=require("./config");
const cryptoHash=require("./crypto-hash");

class Block{
    constructor({timestamp,prevhash,hash,data,nonce,difficulty}){
        this.timestamp=timestamp;
        this.prevhash=prevhash;
        this.hash=hash;
        this.data=data; 
        this.nonce=nonce;
        this.difficulty=difficulty;

    }
    static genesis(){
        return new this(GENESIS_DATA);
    }
    static minBlock({prevBlock,data}){
       let hash,timestamp;
        const prevhash=prevBlock.hash;
        const {difficulty}=prevBlock;
        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();
            hash=cryptoHash(timestamp,prevhash,data,nonce,difficulty)
        }while(hash.substring(0,difficulty)!='0'.repeat(difficulty));

        return new this({
        timestamp,
        data,
        prevhash,
        difficulty,
        nonce,
        hash,
        });

    }
}
 const block1 =new Block({
     timestamp:"02/09/22",
     prevhash:"0jjbg",
     data:"hello w",
     hash:"0xsaf",});
     
 //console.log(block1);
//  const genesisBlock=Block.genesis();
//  console.log(genesisBlock);

//  const result=Block.minBlock({prevBlock:block1,data:"block2"});
//  console.log(result);

module.exports=Block;