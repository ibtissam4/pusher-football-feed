package main

import (
	"pusher/football-feed/internal/notifier"
	"pusher/football-feed/internal/webapp"
)

func main() {
	notifier := notifier.New()

	webapp.StartServer(&notifier)
}
