class Square {
    constructor(){
       this.Value = null;
       this.crossLine = null;
       this.isHighlighted = false;
	}
}

class Game {
   constructor(){
       this.inProgress = true;
       this.winner = null; //'O' or 'X';
       this.currentTurn = Game.O; //'O' or 'X';
       this.movesMade = 0;
       this.counter = 1;
       this.squares = new Array(9).fill().map(s=> new Square());
       
   }
   
 resetGame(){

 
 if(this.counter >= 3){
	  return;
  } 
   this.counter += 1;
       this.inProgress = true;
       this.winner = null; //'O' or 'X';
       this.currentTurn = Game.O; //'O' or 'X';
       this.movesMade = 0;
       this.squares = new Array(9).fill().map(s=> new Square());      
       
  }
   
changePlayer(){
var e = document.getElementById("select");
this.currentTurn = e.options[e.selectedIndex].value;
  }
  
makeMove(i){
  if(this.inProgress && !this.squares[i].value){
    this.squares[i].value = this.currentTurn;
    this.movesMade++;
    this.checkForWinner();
    this.currentTurn = (this.currentTurn === Game.O) ? Game.X : Game.O;
  }
}

checkForWinner(){
    const winningCombinations = [
		[0,1,2,"straight-line"],
		[3,4,5,"straight-line"],
		[6,7,8,"straight-line"],
		[0,3,6,"vertical-line"], //a=0, b=3, c=6, d="#vertical-line"
		[1,4,7,"vertical-line"],
		[2,5,8,"vertical-line"],
		[0,4,8,"diagonal-line-to-the-left"],
		[2,4,6,"diagonal-line-to-the-right"]
	];


	 winningCombinations.forEach((wc)=>{
		const [a,b,c,d]=wc;
		const sqA = this.squares[a];
		const sqB = this.squares[b];
		const sqC = this.squares[c];
    
		if(sqA.value && sqA.value === sqB.value && sqA.value === sqC.value){
		  this.inProgress = false;
		  this.winner = sqA.value; //'O' or 'X'
		sqA.isHighlighted = sqB.isHighlighted = sqC.isHighlighted = true;
    sqA.crossLine = sqB.crossLine = sqC.crossLine = d;
		}
	});
	//check for tie
	if(this.movesMade === this.squares.length){
	  this.inProgress = false;// inProgress = false and winner = null
	}
}
}

Game.O ='O';
Game.X ='X';
let activeGame = new Game();
let gameVue = new Vue({
  el: '#game-view',
  data: activeGame,
         counter: 0,
          
  computed: {
    infoMessage: function(){
    if(this.counter > 3){
        return 'ne moze vise';
      }
      if(this.inProgress){
        return 'It is ' + this.currentTurn + ' turn!';
      }
      if(this.winner){
        return this.winner + ' wins!';
      }
      if(!this.winner && !this.inProgress){
        return 'It was a draw!';
      }
      
    }
  }
});
