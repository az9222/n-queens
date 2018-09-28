/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// Given an n x n chessboard, how would you place n rooks such that none of them are attacking each other?

window.findNRooksSolution = function(n) {
  //create an instance of a board
  var solution = new Board ({n: n});
  //create number of rooks
  var numRooks = n;
  //create a nested for loop, the first iteration going through the arrays
  for (var row = 0; row < n; row++) {
    //the second iteration will go through each column (element)
    for (var col = 0; col < n; col++) {
      //put rook first
      solution.togglePiece(row, col);
      //if the element doesnt have any conflicts and numRooks > 0, it will now equal to 1 and then -1 from rook
      if (!solution.hasAnyRooksConflicts() && numRooks > 0) {
        numRooks--;
      } else {
        //toggle off
        solution.togglePiece(row, col);
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  let solution = new Board({n: n});
  const helper = function(row) {
    if (row === n) {
      solutionCount += 1;
      return;
    }
    for (let col = 0; col < n; col += 1) {
      solution.togglePiece(row, col);
      if (!solution.hasAnyRooksConflicts()) {
        helper(row + 1);
      }
    solution.togglePiece(row, col);
    }
  };
  helper(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // let numQueens = n; 
  var solution = new Board ({n: n});
  
  var helper = function(row) {
    // when row and n are same, we return 
    // base case 
    if (row === n) {
      return;
      // return;
    } 
    for (let col = 0; col < n; col += 1) {
      solution.togglePiece(row, col);
      if (!solution.hasAnyQueensConflicts()) {
        helper(row + 1);
      } 
      solution.togglePiece(row, col);
    }
    
  };
  helper(0);

  // if numQueens is 0 we return otherwise we will keep iterate the board
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution.rows()));
  return solution.rows();
};

  /* base
  if res === n arr.slice();
  
  
  
  
  if there is a conflict we return 
    
  else we recurse the board 
  
    during recursion, we are going to toggle and check each possibilities 
  
  if (there is no conflict and number of queens reaches 0, we return back the board )  
  
  
  helper(board, row - 1, n) 
} 
  
  
  the solution when n is 4
  0 1 0 0 
  0 0 0 1
  1 0 0 0
  0 0 1 0  
  
  */
  
  
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  let solution = new Board({n: n});
  const helper = function(row) {
    if (row === n) {
      solutionCount += 1;
      return;
    }
    for (let col = 0; col < n; col += 1) {
      solution.togglePiece(row, col);
      if (!solution.hasAnyQueensConflicts()) {
        helper(row + 1);
      }
    solution.togglePiece(row, col);
    }
  };
  helper(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
