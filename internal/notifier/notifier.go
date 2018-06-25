package notifier

import (
	"github.com/pusher/pusher-http-go"
)

type Message interface{}

type MatchMessage struct {
	Event     string `json:event`
	HomeTeam  string `json:homeTeam`
	AwayTeam  string `json:awayTeam`
	HomeScore uint16 `json:homeScore`
	AwayScore uint16 `json_awayScore`
}

type GoalMessage struct {
	Player    string `json:player`
	ForTeam   string `json:forTeam`
	HomeTeam  string `json:homeTeam`
	AwayTeam  string `json:awayTeam`
	HomeScore uint16 `json:homeScore`
	AwayScore uint16 `json_awayScore`
	OwnGoal   bool   `json:ownGoal`
}

type CardMessage struct {
	Team   string `json:team`
	Player string `json:player`
	Card   string `json:card`
}

type Notifier struct {
	notifyChannel chan<- Message
}

func notifier(notifyChannel <-chan Message) {
	client := pusher.Client{
		AppId:   "PUSHER_APP_ID",
		Key:     "PUSHER_KEY",
		Secret:  "PUSHER_SECRET",
		Cluster: "PUSHER_CLUSTER",
		Secure:  true,
	}
	for {
		message := <-notifyChannel

		switch payload := message.(type) {
		case GoalMessage:
			client.Trigger("match", "goal", payload)
		case CardMessage:
			client.Trigger("match", "card", payload)
		case MatchMessage:
			client.Trigger("match", "match", payload)
		}
	}
}

func New() Notifier {
	notifyChannel := make(chan Message)
	go notifier(notifyChannel)

	return Notifier{notifyChannel}
}

func (notifier *Notifier) Notify(msg Message) {
	notifier.notifyChannel <- msg
}
