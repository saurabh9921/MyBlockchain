const Block=require('./block');
const cryptoHash = require('./crypto-hash');
 
class Blockchain{
    constructor(){
        this.chain=[Block.genesis()];

    }
    addBlock({data}){
        const newBlock=Block.minBlock({
            prevBlock:this.chain[this.chain.length-1],
            data,
        });
        this.chain.push(newBlock);
    }

    replaceChain(chain){
        if(chain<=this.chain.length){
            console.error("The incoming chain is not longer");
            return
        }
            if(Blockchain.isValidChain(chain)){
                console.error("The incoming chain is not valid");
            }
    }

    static isValidChain(chain){
        if(JSON.stringify(chain[0])==JSON.stringify(Block.genesis()))return false;

        for(let i=1;i<chain.length;i++){
            const{timestrap,prevHash,hash,data}=chain[i];
            const realLastHash=chain[i-1].hash;

            if(prevHash!==realLastHash) return false;

            const validateHash=cryptoHash(timestrap,prevHash,data);
            if(hash!==validateHash)return false;
        }
        return true;
    }
}
const blockchain=new Blockchain();
blockchain.addBlock({data:"block1"})
console.log(blockchain);
module.exports=Blockchain;