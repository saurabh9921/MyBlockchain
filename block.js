const hexToBinary=require("hex-to-binary");
const {GENESIS_DATA}=require("./config");
const cryptoHash=require("./crypto-hash");
const MINE_RATE=1000;

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
        let {difficulty}=prevBlock;
        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();
            difficulty=Block.adjustDifficulty({originalBlock: prevBlock,timestamp,});
            hash=cryptoHash(timestamp,prevhash,data,nonce,difficulty)
        }while(hexToBinary(hash).substring(0,difficulty)!=="0".repeat(difficulty));

        return new this({
        timestamp,
        data,
        prevhash,
        difficulty,
        nonce,
        hash,
        }); 
    }

    static adjustDifficulty({originalBlock,timestamp}){
        const {difficulty}=originalBlock;
        if(difficulty<1) return 1;
        const difference=timestamp-originalBlock.timestamp;
        if(difference > MINE_RATE) return difficulty-1;
        
        return difficulty+1;
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