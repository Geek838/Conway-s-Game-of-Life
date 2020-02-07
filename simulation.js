function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let index = 0; index < arr.length; index++) {
    arr[index] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
  createCanvas(400, 700);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);
  for (let index = 0; index < cols; index++) {
    for (let i = 0; i < rows; i++) {
      grid[index][i] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

  for (let index = 0; index < cols; index++) {
    for (let i = 0; i < rows; i++) {
      let x = index * resolution;
      let y = i * resolution;
      if (grid[index][i] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  let next = make2DArray(cols, rows);
  //next generation based on Grid

  for (let index = 0; index < cols; index++) {
    for (let i = 0; i < rows; i++) {
      let state = grid[index][i];
      //count live cells
      let sum = 0;
      let liveCells = countLiveCells(grid, index, i);
      // state of the neighbor cells (implementing Conwoys Logic)
      if (state == 0 && liveCells == 3) {
        next[index][i] = 1;
      } else if (state == 1 && (liveCells < 2 || liveCells > 3)) {
        next[index][i] = 0;
      } else {
        next[index][i] = state;
      }
    }
  }
  grid = next;
}

function countLiveCells(grid, x, y) {
  let sum = 0;
  for (let index = -1; index < 2; index++) {
    for (let i = -1; i < 2; i++) {
      let col = (x + index + cols) % cols;
      let row = (y + i + rows) % rows;
      sum += grid[col][row];
    }
  }

  sum -= grid[x][y];
  return sum;
}
