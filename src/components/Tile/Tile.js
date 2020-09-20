import React from 'react';
import { IoIosMan } from 'react-icons/io';
import { FaFlagCheckered } from 'react-icons/fa';
import { BiRun } from 'react-icons/bi';
import { GiBarrier } from 'react-icons/gi';

import { StyledTile } from './TileCSS';

export class Tile {
  constructor(i, j, cols, rows) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = false;
    this.obstacle = false;
    this.isStart = false;
    this.isEnd = false;

    this.show = color => {
      if (this.isStart || this.isEnd) {
        return (
          <StyledTile style={{ color: this.isStart ? "#0000ff" : "#05a605" }}>
            {this.isStart ? <IoIosMan /> :<FaFlagCheckered />}
          </StyledTile>
        );
      }

      if (this.obstacle) {
        return <StyledTile style={{ color: "#ff0000" }}><GiBarrier /></StyledTile>;
      }

      return <StyledTile style={{ color: color }}><BiRun /></StyledTile>;
    }

    this.addNeighbors = function(grid) {
      var i = this.i;
      var j = this.j;
      if (i < cols-1) {
        this.neighbors.push(grid[i+1][j]);
      }
      if (i > 0) {
        this.neighbors.push(grid[i-1][j]);
      }
      if (j < rows-1) {
        this.neighbors.push(grid[i][j+1]);
      }
      if (j > 0) {
        this.neighbors.push(grid[i][j-1]);
      }
    }
  }
}
