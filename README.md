# Create a realtime football results feed with Pusher and Go

This is an example of using Pusher Channels to create a real-time feed of events in React and Go.

This repository is discussed at [Create a realtime football results feed with Pusher and Go](https://pusher.com/tutorials/football-feed-go-react).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

In order to run this project, ensure that the following software is all installed correctly:

* [Go](https://golang.org/)
* [Dep](https://golang.github.io/dep/)
* [Node.js](https://nodejs.org/en/)
* [Create React App](https://github.com/facebook/create-react-app)

Also ensure that this project is checked out in an appropriate place under the $GOPATH.

## Running the examples

Before the example can be run, [Pusher Credentials](https://dashboard.pusher.com/) will need to be obtained by registering a new Application, and populating the credentials into `internal/notifier/notifier.go` and `feed-ui/index.html`. 

### Running the Backend Service

Ensure that Go and Dep are installed and set up on your machine. Download the necessary dependencies by executing `dep ensure`, and then run the backend by running `go run football-feed.go`.

### Running the Pundit UI

Ensure that Node.js is installed on your machine. From the `pundit-ui` directory execute `npm install` to download the depdendencies and then `npm start` to run the application.

### Opening the Feed UI

Simply open the `index.html` file from the `feed-ui` directory.

## Built With

* [Pusher](https://pusher.com/) - APIs to enable devs building realtime features
* [Go](https://golang.org/) - Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.
* [Create React App](https://github.com/facebook/create-react-app) - Create React apps with no build configuration.
* [Semantic UI](https://react.semantic-ui.com/introduction) - User Interface is the language of the web
* [Bootstrap](https://getbootstrap.com/docs/3.3/) - Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.
* [Bootstrap Notify](http://bootstrap-notify.remabledesigns.com/) - This plugin helps to turn standard bootstrap alerts into "growl" like notifications.


