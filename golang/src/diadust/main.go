package main

import (
	"log"
	"net/http"
	"time"
	"github.com/gorilla/websocket"
)

const (
	address = "127.0.0.1:13000"

	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Maximum message size allowed from peer.
	maxMessageSize = 8 * 1024
)

func internalError(ws *websocket.Conn, msg string, err error) {
	log.Println(msg, err)
	ws.WriteMessage(websocket.TextMessage, []byte("Internal server error."))
}

var upgrader = websocket.Upgrader{}

func serveWs(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade:", err)
		return
	}
	ws.SetReadLimit(maxMessageSize)
	ws.SetWriteDeadline(time.Now().Add(writeWait))

	defer log.Println("serveWs exiting ...")
	defer ws.Close()

	for {
		msgtype, message, err := ws.ReadMessage()
		if err != nil {
			internalError(ws, "serveWs:", err)
			break
		}

		switch msgtype {
		case websocket.TextMessage:
			log.Printf("msgtype: text, message: %v\n", string(message[:]))
		default:
			log.Printf("serveWs: ReadMessage: invalid type: %d", msgtype)
		}
	}
}

func main() {
	http.HandleFunc("/ws", serveWs)
	log.Printf("Start listening on: %s\n", address)
	log.Fatal(http.ListenAndServe(address, nil))
}