package webapp

import (
	"net/http"
	"pusher/football-feed/internal/notifier"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func StartServer(notify *notifier.Notifier) {
	r := gin.Default()
	r.Use(cors.Default())

	r.POST("/match", func(c *gin.Context) {
		var json notifier.MatchMessage
		if err := c.BindJSON(&json); err == nil {
			notify.Notify(json)
			c.JSON(http.StatusCreated, json)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{})
		}
	})

	r.POST("/goal", func(c *gin.Context) {
		var json notifier.GoalMessage
		if err := c.BindJSON(&json); err == nil {
			notify.Notify(json)
			c.JSON(http.StatusCreated, json)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{})
		}
	})

	r.POST("/card", func(c *gin.Context) {
		var json notifier.CardMessage
		if err := c.BindJSON(&json); err == nil {
			notify.Notify(json)
			c.JSON(http.StatusCreated, json)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{})
		}
	})

	r.Run()
}
