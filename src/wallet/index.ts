import Wallet from "@wallet/app"

const app = Wallet()

app.listen(3000, () => {
    console.log(`wallet start`)
})