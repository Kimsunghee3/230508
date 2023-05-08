import Ingchain from "@core/ingchain"
import express from "express"

// app.ts를 불러오면 빈 함수가 호출된다.
export default (blockchain: Ingchain) => {
    // console.log(web3)
    // get localhost:8545
    // 8545포트에 요청을 보냈을 때 hello ingchain이라는 응답을 주고싶다.
    const app = express()
    app.use(express.json())

    app.get("/", (req, res) => {
        res.send("hello chopChain")
    })

    // 계정
    app.put("/accounts",(req,res) => {
        const account = blockchain.accounts.create()
        res.json({ ...account })
    })

    app.get("/accounts", (req,res) => {
        const accounts = blockchain.accounts.getAccounts()
        res.json(accounts)
    })

    // 채굴
    app.get("/mineBlock", (req,res) => {
        const {account} = req.query
        const newBlock = blockchain.mineBlock(account)

        res.json(newBlock)
    })
    app.get("/getBalance", (req,res) => {
        // getBalance method call
        const { account } = req.body
        const balance = blockchain.getBalance(account)

        res.json({
            balance,
        })
    })

    app.post("/transaction", (req,res) => {
        const { receipt } = req.body

        const transaction = blockchain.sendTransaction(receipt)
        res.json({
            transaction,
        })
    })
    return app
}


