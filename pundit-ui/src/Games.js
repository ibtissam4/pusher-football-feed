import React from 'react';
import { Container, Segment, Button } from 'semantic-ui-react';
import uuid from 'uuid/v4';
import StartedGame from './StartedGame';
import UnstartedGame from './UnstartedGame';

export default class Games extends React.Component {
    state = {
        games: []
    }

    newGameHandler = this.newGame.bind(this)
    updateTeamHandler = this.updateTeam.bind(this)
    updatePlayerHandler = this.updatePlayer.bind(this)
    startGameHandler = this.startGame.bind(this)
    cancelGameHandler = this.cancelGame.bind(this)
    goalHandler = this.goalScored.bind(this)
    cardHandler = this.cardGiven.bind(this)
    gameEventHandler = this.gameEvent.bind(this)

    render() {
        const renderedGames = this.state.games
            .map((game, index) => {
                if (game.state !== 'unstarted') {
                    return <StartedGame game={game}
                        key={game.id}
                        onGoal={(team, player, goalFor) => this.goalHandler(game.id, team, player, goalFor)}
                        onCard={(team, player, card) => this.cardHandler(game.id, team, player, card)}
                        onGameEvent={(event) => this.gameEventHandler(game.id, event)} />;
                } else {
                    return <UnstartedGame game={game}
                        key={game.id}
                        onTeamUpdated={(team, value) => this.updateTeamHandler(game.id, team, value)}
                        onPlayerUpdated={(team, player, value) => this.updatePlayerHandler(game.id, team, player, value)}
                        onCancel={() => this.cancelGameHandler(game.id)}
                        onStart={() => this.startGameHandler(game.id)} />;
                }
            });

        return (
            <Container>
                <Segment.Group>
                    {renderedGames}
                </Segment.Group>
                <Button onClick={this.newGameHandler}>New Match</Button>
            </Container>
        )
    }

    goalScored(gameId, team, player, goalFor) {
        const { games } = this.state;
        const newGames = games.map((game) => {
            if (game.id === gameId) {
                game[goalFor].score++;
            }
            return game;
        });
        this.setState({
            games: newGames
        });
    }

    cardGiven(gameId, team, player, card) {
        const { games } = this.state;
        const newGames = games.map((game) => {
            if (game.id === gameId) {
                game[team].cards[player] = card;
            }
            return game;
        });
        this.setState({
            games: newGames
        });
    }

    gameEvent(gameId, event) {
        const { games } = this.state;
        const newGames = games.map((game) => {
            if (game.id === gameId) {
                game.state = event;
            }
            return game;
        });
        this.setState({
            games: newGames
        });
    }

    newGame() {
        const { games } = this.state;
        const newGames = [
            ...games,
            {
                id: uuid(),
                state: 'unstarted',
                home: {
                    team: '',
                    score: 0,
                    players: {},
                    cards: {}
                },
                away: {
                    team: '',
                    score: 0,
                    players: {},
                    cards: {}
                }
            }
        ];
        this.setState({
            games: newGames
        });
    }

    updateTeam(id, team, value) {
        const { games } = this.state;
        const newGames = games.map((game) => {
            if (game.id === id) {
                game[team].team = value;
            }
            return game;
        });
        this.setState({
            games: newGames
        });
    }

    updatePlayer(id, team, player, value) {
        const { games } = this.state;
        const newGames = games.map((game) => {
            if (game.id === id) {
                game[team].players[player] = value;
            }
            return game;
        });
        this.setState({
            games: newGames
        });
    }

    startGame(id) {
        const { games } = this.state;
        const newGames = games.map((game) => {
            if (game.id === id) {
                game.state = 'first half';
            }
            return game;
        });
        this.setState({
            games: newGames
        });
    }

    cancelGame(id) {
        const { games } = this.state;
        const newGames = games.filter((game) => game.id !== id);
        this.setState({
            games: newGames
        });
    }
}
