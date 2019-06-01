import React, { Component } from 'react'

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spaces: ['', '', '', '', '', '', '', '', ''],
      player1: [],
      player2: [],
      currentPlayer: '',
      player1Icon: '',
      player2Icon: '',
      currentPlayerIcon: '',
      message: '',
      squareNumArr: []
    }
  }
  userClick(e){
    let { currentPlayer, spaces, player1, player2, player1Icon, player2Icon, currentPlayerIcon } = this.state
    let squareNum = parseInt(e.target.id)
    if (currentPlayer === 'Player 1' && !player2.includes(squareNum) && !player1.includes(squareNum) && spaces[squareNum] !== player2Icon && player1Icon){
      player1.push(squareNum)
      currentPlayerIcon = player1Icon
      spaces[squareNum] = currentPlayerIcon
      currentPlayer = 'Player 2'
    } else if (currentPlayer === 'Player 2' && !player1.includes(squareNum) && !player2.includes(squareNum) && spaces[squareNum] !== player1Icon && player2Icon){
      player2.push(squareNum)
      currentPlayerIcon = player2Icon
      spaces[squareNum] = currentPlayerIcon
      currentPlayer = 'Player 1'
    }
    this.setState({
      currentPlayer: currentPlayer,
      spaces: spaces,
      player1: player1,
      player2: player2,
      currentPlayerIcon: currentPlayerIcon,
      player1Icon: player1Icon,
      player2Icon: player2Icon,
    })

    console.log(currentPlayer, player1, player2)

}
  gameOver(e){
    let { player1, player2, message, squareNumArr } = this.state
    let winningNums = [[0, 4, 8],[0, 1, 2],[0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]]
    let gameEnd = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    let squareNum = parseInt(e.target.id)
      squareNumArr.push(squareNum)
      console.log(squareNumArr)
    if(gameEnd.every(elem => squareNumArr.indexOf(elem) > -1)){
      console.log('Game Over')
      message = 'Draw!'
      this.resetGame()
    }
    for (let i = 0; i < winningNums.length; i++){
      let winningCombo = winningNums[i]
      if (winningCombo.every(elem => player1.indexOf(elem) > -1)){
        message = 'Player 1 wins!'
        this.resetGame()
      } else if (winningCombo.every(elem => player2.indexOf(elem) > -1)){
        message = 'Player 2 wins!'
        this.resetGame()
      }
    }
    this.setState({
      player1: player1,
      player2: player2,
      message: message,
      squareNumArr: squareNumArr,
    })
  }
  mainFunction(e){
    this.userClick(e)
    this.gameOver(e)
  }
  resetGame(){
    this.setState({
      spaces: ['', '', '', '', '', '', '', '', ''],
      player1: [],
      player2: [],
      currentPlayer: 'Player 1',
      player1Icon: 'X',
      player2Icon: 'O',
      currentPlayerIcon: '',
      message: '',
      squareNumArr: []
    })
  }
  componentDidMount() {
    this.setState({
      currentPlayer: 'Player 1',
      player1Icon: 'X',
      player2Icon: 'O'
    })
  }

  render() {
    let { message, currentPlayer } = this.state
    console.log(this.state);
    let squares = this.state.spaces.map((value, index) => {
      return(
        <div className='tiles' key={index} id={index}  onClick={this.mainFunction.bind(this)}>{value}</div>
      )
    })

    return(
      <div>
        <div style={{textAlign: 'center', fontSize: '20px', fontStyle: 'italic', padding: 'auto'}}>
          <h1>{message}</h1>
        </div>
        <h1 style={{textAlign: 'center', fontSize: '40px', fontStyle: 'italic', padding: 'auto'}}>Turn: {currentPlayer}</h1>
        <div style={{textAlign: 'center'}}>
          <button onClick={this.resetGame.bind(this)} style={{fontSize: '20px', borderRadius: '8px', border: 'solid'}}>New Game</button>
        </div>

        <div className='grid-template'>{squares}</div>
      </div>
    )
  }
}
