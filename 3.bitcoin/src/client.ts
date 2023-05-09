import P2PNetwork from "@serve/p2p";

const p2p = new P2PNetwork()
// 이미 서버에서 8555포트를 사용하고 있어서 8856포트로 지정해줌
p2p.listen(8556)

// 상대방의 서버 포트번호를 적어주어야한다.
p2p.connet(8555, "127.0.0.1")