import React from 'react'
import './css/Scoreboard.css'

class Scoreboard extends React.Component {
  state={
    scores: []
  }

  compare(a, b){
    if (a < b) {
      return 1
    }else if (b < a) {
      return -1
    }else{
      return 0
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/scoreboards/?limit=10')
    .then(res => res.json())
    .then(scoreData => {let sortScores = scoreData.sort(this.compare)
                        this.setState({scores: sortScores.reverse()})
                      })
                    }
  

  render(){
    return(
      <div id="scoreboard" className="ui card">
        <h2>Scoreboard</h2>
        <ol>
        {this.state.scores.map(score=><li><span id="user">{score.username}</span> - <span id="score">{score.score}</span></li>)}
        </ol>
      </div>
    )
  }
}

export default Scoreboard
