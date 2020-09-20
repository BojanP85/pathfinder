import React from 'react';

import { Tile } from '../Tile/Tile';
import { Wrapper, StyledTable, Button } from './AppCSS';

class App extends React.Component {
  state = {
    level: 1,
    isRunning: false,
    hasSolution: false,
    gameover: false
  };

  componentDidMount() {
    this.setupTable();
  }

  cols = 10;
  rows = 10;
  grid = new Array(this.cols);
  openSet = [];
  closedSet = [];
  path = [];

  /* Removing element from an array. We call this function when we remove element from the 'openSet' array. */
  removeFromArray = (arr, el) => {
  	for (var i = arr.length-1; i >= 0; i--) {
  		if (arr[i] === el) {
  			arr.splice(i, 1);
  		}
  	}
  }

  /* Measuring the distance between two points */
  measureDistance = (a, b) => {
  	var distance = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
  	return distance;
  }

  /* Setting the game table */
  setupTable = () => {
    this.setState(prevState => {
      return { level: prevState.level+1, hasSolution: false };
    });

  	for (let i = 0; i < this.cols; i++) {
  		this.grid[i] = new Array(this.rows);
  	}

    /* Configuring the table tiles */
  	for (let i = 0; i < this.cols; i++) {
  		for (let j = 0; j < this.rows; j++) {
  			this.grid[i][j] = new Tile(i, j, this.cols, this.rows);
  		}
  	}

    /* Adding the neighbor tiles of each particular tile */
  	for (let i = 0; i < this.cols; i++) {
  		for (let j = 0; j < this.rows; j++) {
  			this.grid[i][j].addNeighbors(this.grid);
  		}
  	}

  	this.start = this.grid[0][4];
  	this.end = this.grid[9][4];
    this.start.isStart = true;
    this.end.isEnd = true;

  	this.openSet.push(this.start);

    /* Adding the obstacles */
  	let arrayOfObstacles = [];
  	let k = 0;
  	while (k < this.state.level-1) {
  		let randomRow = this.grid[Math.floor(Math.random() * this.grid.length)];
  		let randomTile = randomRow[Math.floor(Math.random() * randomRow.length)];

      if (arrayOfObstacles.includes(randomTile)) {
  			continue;
      }
      arrayOfObstacles.push(randomTile);

  		if (randomTile === this.start || randomTile === this.end) {
  			continue;
  		} else {
  			randomTile.obstacle = true;
  			k++;
  		}
  	}
  }

  /* Drawing the game */
  draw = () => {
    if (this.state.isRunning) {
      /* Managing the 'openSet' and 'closedSet' arrays */
      if (this.openSet.length > 0) {
    		let closerTile = 0;
    		for (let i = 0; i < this.openSet.length; i++) {
    			if (this.openSet[i].f < this.openSet[closerTile].f) {
  				  closerTile = i;
    			}
    		}
    		var currentTile = this.openSet[closerTile];

    		if (currentTile === this.end) {
          this.setState({ isRunning: false, hasSolution: true });
    			return;
    		}

    		this.removeFromArray(this.openSet, currentTile);
    		this.closedSet.push(currentTile);

        /* Examining the neighbor tiles and choosing the one which is closest to the end */
    		let neighbors = currentTile.neighbors;
    		for (let i = 0; i < neighbors.length; i++) {
    			let neighbor = neighbors[i];
    			if (!this.closedSet.includes(neighbor) && !neighbor.obstacle) {
    				let tempG = currentTile.g + 1;
    				if (this.openSet.includes(neighbor)) {
    					if (tempG < neighbor.g) {
    						neighbor.g = tempG;
    					}
    				} else {
    					neighbor.g = tempG;
    					this.openSet.push(neighbor);
    				}

    				neighbor.h = this.measureDistance(neighbor, this.end);
    				neighbor.f = neighbor.g + neighbor.h;
    				neighbor.previous = currentTile;
    			}
    		}
    	} else {
    		this.setState({ gameover: true });
        return;
    	}

      /* Managing the 'path' array */
      this.path = [];
    	let temp = currentTile;
    	this.path.push(temp);
    	while (temp.previous) {
    		this.path.push(temp.previous);
    		temp = temp.previous;
    	}
    }

    window.requestAnimationFrame(this.draw);
  }

  /* Handling 'Run' button click */
  runHandler = () => {
    if (this.state.gameover) {
      window.location.reload(false);
    }

    this.setState({ isRunning: true });
    this.draw();
  };

  /* Handling 'Next level' button click */
  nextLevelHandler = () => {
    this.setState({ isRunning: false });
    this.setupTable();
  }

  render() {
    var rows = this.grid.map((item, i) => {
      var entry = item.map((element, j) => {
        if (this.path.includes(element)) {
          return (
            <td key={j}>
              {element.show("#0000ff")}
            </td>
          );
        }
        return (
          <td key={j}>
            {element.show("#fff")}
          </td>
        );
      });
      return <tr key={i}>{entry}</tr>;
    });

    return (
      <Wrapper>
        <h1>Level {this.state.level === 1 ? this.state.level : this.state.level-1}</h1>
        {this.state.gameover ? <p>- game over -</p> : ''}
        <div>
          <Button
            onClick={this.runHandler}
            disabled={this.state.gameover ? false : this.state.isRunning ? true : false}
          >
            {this.state.gameover? 'Start again' : this.state.isRunning ? <span>Running...</span> : 'Run'}
          </Button>
          <Button
            onClick={this.nextLevelHandler}
            disabled={this.state.hasSolution ? false : true}
          >
            Next level
          </Button>
        </div>
        <StyledTable>
          <tbody>
            {rows}
          </tbody>
        </StyledTable>
      </Wrapper>
    );
  }
}

export default App;
