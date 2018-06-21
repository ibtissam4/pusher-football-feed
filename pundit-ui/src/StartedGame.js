import React from 'react';
import { Segment, Grid, Header, Button, Label, Dropdown, Menu } from 'semantic-ui-react';

const gameState = {
    'first half': 'First Half',
    'second half': 'Second Half',
    'finished': 'Full Time',
    'extra time': 'Extra Time'
};

export default function StartedGame({ game, onGoal, onCard, onGameEvent }) {
    const homePlayers = [];
    const awayPlayers = [];

    for (let i = 1; i <= 11; ++i) {
        const playerId = `player_${i}`;

        let homeLabel;
        if (game.home.cards[playerId]) {
            homeLabel=<Label color={game.home.cards[playerId]} ribbon>{game.home.players[playerId]}</Label>;
        } else {
            homeLabel = game.home.players[playerId];
        }

        let awayLabel;
        if (game.away.cards[playerId]) {
            awayLabel=<Label color={game.away.cards[playerId]} ribbon>{game.away.players[playerId]}</Label>;
        } else {
            awayLabel = game.away.players[playerId];
        }

        homePlayers.push(
            <Dropdown text={homeLabel}
                pointing="left"
                className="link item"
                key={`home.players.${playerId}}`}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onGoal('home', playerId, 'home')}>Goal</Dropdown.Item>
                    <Dropdown.Item onClick={() => onGoal('home', playerId, 'away')}>Own Goal</Dropdown.Item>
                    <Dropdown.Item onClick={() => onCard('home', playerId, 'yellow')}>Yellow Card</Dropdown.Item>
                    <Dropdown.Item onClick={() => onCard('home', playerId, 'red')}>Red Card</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
        awayPlayers.push(
            <Dropdown text={awayLabel}
                pointing="left"
                className="link item"
                key={`away.players.${playerId}}`}>
                <Dropdown.Menu>
                <Dropdown.Item onClick={() => onGoal('away', playerId, 'away')}>Goal</Dropdown.Item>
                <Dropdown.Item onClick={() => onGoal('away', playerId, 'home')}>Own Goal</Dropdown.Item>
                <Dropdown.Item onClick={() => onCard('away', playerId, 'yellow')}>Yellow Card</Dropdown.Item>
                <Dropdown.Item onClick={() => onCard('away', playerId, 'red')}>Red Card</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        );
    }

    return (
        <Segment>
            <Grid>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Header as='h2' textAlign='center'>Match</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column textAlign="right">
                        <Label>
                            {game.home.team}
                            <Label.Detail>{game.home.score}</Label.Detail>
                        </Label>
                    </Grid.Column>
                    <Grid.Column>
                        <Label>
                            {game.away.team}
                            <Label.Detail>{game.away.score}</Label.Detail>
                        </Label>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column textAlign='center'>
                        {gameState[game.state]}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Header as='h2' textAlign='center'>Players</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Menu vertical borderless secondary style={{width: "100%"}}>{homePlayers}</Menu>
                    </Grid.Column>
                    <Grid.Column>
                        <Menu vertical borderless secondary style={{width: "100%"}}>{awayPlayers}</Menu>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column textAlign="right">
                        <Button.Group>
                            <Button primary onClick={() => onGameEvent('finished')}>Finish Game</Button>
                            <Button onClick={() => onGameEvent('second half')}>Half Time</Button>
                            <Button onClick={() => onGameEvent('extra time')}>Extra Time</Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
}
