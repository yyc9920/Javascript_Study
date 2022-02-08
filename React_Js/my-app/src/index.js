import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const squares_size = 10;

function Square(props) {
  return (
    <button id={props.id} className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, key) {
    return (
      <Square
        key={key}
        id={key}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // TODO: modify hard coded squares
    let squares = [];
    let boardRows = [];
    for (let i = 0; i < squares_size; i++) {
      for (let j = 0; j < squares_size; j++) {
        const key = `square${i}_${j}`;
        squares.push(
          this.renderSquare(j + squares_size*i, key)
        );
      }
      const key = `row${i}`;
      boardRows.push(<div key={key} className="board-row">{squares}</div>);
      squares = [];
    }

    return (
      <div>
        {boardRows}
      </div>
    );
  }
}

class Game extends React.Component {
  // TODO: modify hard coded squares
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(squares_size**2).fill(null),
      }],
      stepNumber: 0,
      location: [],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const location = this.state.location.slice(0, this.state.stepNumber);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      location: location.concat(i),
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const location = this.state.location;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} ${step.squares[location[move - 1]]}
          (${parseInt(location[move - 1]/squares_size) + 1},
           ${location[move - 1]%squares_size + 1})` :
        'Go to game start';
      if (move === this.state.stepNumber) {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}><b>{desc}</b></button>
          </li>
        );
      } else {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      }
    });
    let status;

    if (winner) {
      if (winner === "draw") {
        status = 'Draw!!!';
      } else {
        status = 'Winner: ' + winner;
      }
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  // TODO: modify hard coded squares
  const winLength = 5;
  let lines = [];
  let vertical= [];
  let horizontal= [];
  let diagonal_R= [];
  let diagonal_L= [];
  
  for (let i = 0; i < squares_size; i++) {
    for (let j = 0; j < squares_size; j++) {
      for (let k = 0; k < winLength; k++){
        if (i + k < squares_size) {
          vertical.push(i + j*squares_size + k);
          if (j + k < squares_size) {
            diagonal_R.push(i + j*squares_size + k*(squares_size + 1));
          }
        }
        if (j + k < squares_size) {
          horizontal.push(i + j*squares_size + k*squares_size);
          if (i + k >= (winLength - 1)) {
            diagonal_L.push(i + j*squares_size + k*(squares_size - 1));
          }
        }
      }

      let pushLine = (line) => {
        if (line.length === winLength) {
          lines.push(line);
        }
      }

      pushLine(vertical);
      pushLine(horizontal);
      pushLine(diagonal_R);
      pushLine(diagonal_L);
      vertical = [];
      horizontal = [];
      diagonal_R = [];
      diagonal_L = [];
    }
  }; 

  for (let i = 0; i < lines.length; i++) {
    let answer = lines[i];
    let cnt = 0;

    for (let i = 0; i < answer.length; i++) {
      if (squares[answer[0]] && squares[answer[0]] === squares[answer[i]]) {
        cnt++;
      }
    }
    
    if (cnt === winLength) {
      for (let x = 0; x < winLength; x++) {
        let r = parseInt(answer[x] / squares_size);
        let c = answer[x] % squares_size;
        let boldSquare = document.getElementById(`square${r}_${c}`);
        boldSquare.style.backgroundColor = "green";
      }
      return squares[answer[0]];
    }
  }

  console.log(squares.filter(n => n).length, squares_size*squares_size);
  if (squares.filter(n => n).length === squares_size*squares_size) {
    return "draw";
  }

  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
