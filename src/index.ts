import Block from "@core/block/block"
import ProofOfWork from "@core/block/workproof/proofofwork"
import WorkProof from "@core/block/workproof/woorkproof"
import Chain from "@core/chain/chain"
import CryptoModule from "@core/crypto/crypto.module"
import Ingchain from "@core/ingchain"
import Transaction from "@core/transaction/transacrtion"
import Unspent from "@core/transaction/unspant"
import DigitalSignature from "@core/wallet/digitalSignature"
import Wallet from "@core/wallet/wallet"

const chain = new Chain()

const crypto = new CryptoModule()
const proof = new ProofOfWork(crypto)
const workproof = new WorkProof(proof)
const transaction = new Transaction(crypto)

const block = new Block(crypto, workproof)
const unspent = new Unspent()


const digitalSignature = new DigitalSignature(crypto)
const accounts = new Wallet(digitalSignature)

const web7722 = new Ingchain(chain, block, transaction, unspent, accounts)

const sender = accounts.create()
const received = accounts.create()

const receipt = web7722.accounts.recipt(received.account, 30)

web7722.sendTransaction(receipt)

web7722.mineBlock(sender.account)

// 7 350

const balance1 = web7722.getBalance(sender.account)
const balance2 = web7722.getBalance(received.account)

console.log(balance1)
console.log(balance2)
