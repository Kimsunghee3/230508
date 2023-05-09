import net, { Socket } from "net"

class P2PNetwork {
    // 서버 측으로 대기모드를 만들 때
    listen(port: number){
        const server = net.createServer((socket: Socket) => {
            console.log(socket.remotePort)
            console.log("connection")

            socket.write("hello?")
        })
        console.log(`start`)
        server.listen(port)
    }

    // 대기하는 서버에게 요청을 날리는 메서드
    // client
    connet(port: number, host: string){
        const socket = new net.Socket()
        socket.connect(port, host, () => {
            console.log(socket.remotePort)
            console.log("connect")

            // message: 이벤트명
            socket.on("data", (data: Buffer) => {
                console.log(data)
                console.log(data.toString("utf8"))
            })
        })
    }
}

export default P2PNetwork 