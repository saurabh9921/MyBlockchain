const {GENESIS_DATA}=require("./config");
const cryptoHash=require("./crypto-hash");

class Block{
    constructor({timestamp,prevhash,hash,data}){
        this.timestamp=timestamp;
        this.prevhash=prevhash;
        this.hash=hash;
        this.data=data; 
        

    }
    static genesis(){
        return new this(GENESIS_DATA);
    }
    static minBlock({prevBlock,data}){
        const timestamp=Date.now();
        const prevhash=prevBlock.hash;

        return new this({
        timestamp,
        data,
        prevhash,
        hash:cryptoHash(timestamp,prevhash,data,),
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