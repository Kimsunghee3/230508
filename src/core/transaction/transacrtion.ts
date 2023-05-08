import { IBlock } from "@core/block/block.interface"
import { TransactionRow, TxIn, TxOut, UnspentTxOut } from "./transaction.interface"
import CryptoModule from "@core/crypto/crypto.module"
import { SignatureInput } from "elliptic"
import { Receipt } from "@core/wallet/wallet.interface"

class Transaction {
    private readonly REWARD = 50
    private readonly transactionPool = TransactionPool = []
    constructor(private readonly crypto: CryptoModule) {}

    getPool(){

    }

    create(receipt: Receipt, myUnspantTxOuts:UnspentTxOut) {
        if(!receipt.signature) throw new Error("서명이 존재하지 않습니다.")
        // txins
        const [txins, balance] = this.createInput(myUnspantTxOuts, receipt.amount, receipt.signature) 
        // txouts
        const txouts = this.createOutput(receipt.received, receipt.amount, receipt.sender.account, )
        // transaction 객체 생성
        const transaction:TransactionRow = {
            txIns,
            txOuts
        }
        transaction.hash = this.serilizeRow(transaction)
        this.transactionPool.push(transaction)
        return transaction
    }

    createOutput(account: string, amount: number, sender: string, balance:number): {
        const txout = new TxOut[] = []
        txouts.push({ account: received, amount })
        
        if(balance>0){
            txouts.push({account: Sender, amount: balance})
        }

        const outAmout = txouts.reduce((acc, txout:TxOut) => acc + txout.amount, 0)
        if(amount !== outAmout) throw new Error("금액 오류")
        return txouts
    }

    serializeTxOut(txOut: TxOut): string {
        const { account, amount } = txOut
        const text = [account, amount].join("")
        // console.log(this)
        return this.crypto.SHA256(text)
    }

    createTxIn(txOutIndex: number, txOutId?: string, signature?: SignatureInput): TxIn {
        const txIn = new TxIn()
        txIn.txOutIndex = txOutIndex
        txIn.txOutId = txOutId
        txIn.signature = signature
        return txIn
    }

    serializeTxIn(txIn: TxIn): string {
        const { txOutIndex } = txIn
        const text = [txOutIndex].join("")

        return this.crypto.SHA256(text)
    }

    serilizeTx<T>(data: T[], callback: (item: T) => string) {
        return data.reduce((acc: string, item: T) => acc + callback(item), "")
    }

    serilizeRow(row: TransactionRow) {
        const { txIns, txOuts } = row

        const text1 = this.serilizeTx<TxOut>(txOuts, (item) => this.serializeTxOut(item))
        const text2 = this.serilizeTx<TxIn>(txIns, (item) => this.serializeTxIn(item))

        return this.crypto.SHA256(text1 + text2)
    }

    createRow(txIns: TxIn[], TxOuts: TxOut[]) {
        const transactionRow = new TransactionRow()
        transactionRow.txIns = txIns
        transactionRow.txOuts = TxOuts
        transactionRow.hash = this.serilizeRow(transactionRow)
        return transactionRow
    }

    // Tx
    createCoinbase(account: string, latestBlockHeight: number) {
        const txin = this.createTxIn(latestBlockHeight + 1)
        const txout = this.createTxOut(account, this.REWARD)
        return this.createRow([txin], [txout])
    }

    sync(transactions:TransactionData){
        if(typeof transactions === "string") return

        transactions.forEach((transaction:Transaction)=>{
            // 만약에 내블럭 data속성안에 있는 transaction hash값이랑 
            // transactionPool이 있는 hash같이 같은 것이 존재한다면

            const index = this.transactionPool.findIndex((tx:TransactionRow) => {
                
            })
        })
    }
}

export default Transaction

