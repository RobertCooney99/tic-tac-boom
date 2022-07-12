# Tic-Tac-Boom

Tic-Tac-Boom is a web-based game created using Node, React and Express. It was created as an
extension to React's official [introduction tutorial](https://reactjs.org/tutorial/tutorial.html),
showing how to create a basic Tic-Tac-Toe game.

## Functionality

The current version is a local 2-player game of Tic-Tac-Boom, in which players take turns in placing
their respective symbols onto the board, however, at random, upon clicks bombs can detonate
across the board. This will either be a small bomb (wiping out the clicked cell and surrounding
cells), or a big bomb (wiping out the entire board).

## Future Updates

In future versions of this application, players will be able to play a 2-player non-local game.
This will be implemented using **Socket.io**.

There will also be the option for a player to play locally against a bot, with varying levels
of "difficulty".

Also, there will be a number of different game modes to choose from with additional features,
such as a timed game mode, increased bombs, and power-ups.