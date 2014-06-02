$(document).ready(function(){
	var sizeContainer = parseInt($(".container").css("height").replace("px",""));
	var sizeBox = 0;

	var leftKey = 37;
	var upKey = 38;
	var rightKey = 39;
	var downKey = 40;

	var playerScore = 0;
	var enemyScore = 0;
	var star = 0;

	var numMoves = 100;
	var stopOppent = 0;

	var generateGrid = function(x,y){
		var grid = [];
		for(var i = 1; i <= y; i++){
			var row = [];
			for(var j = 1; j <= x; j++){		
				row.push([i,j]);
			}
			grid.push(row);
		}
		return grid;
	};

	var displayGrid = function(grid){
		for(var i = 0; i < grid.length; i++){
			for(var j = 0; j < grid[i].length; j++){		
				$(".container").append("<div id=" + grid[i][j][0] + "_" + grid[i][j][1] + " class='box'></div>");
			}
		}

		sizeBox = sizeContainer/grid.length;

		$(".box").css({
			"width": sizeBox,
			"height": sizeBox
		});
	};

	$("#playerScore").html(playerScore);
	$("#enemyScore").html(enemyScore);

	$("#movesLeft").html(numMoves);

	grid = generateGrid(15,15);
	displayGrid(grid);

	var currentPlayerPosition = [1,1];
	var currentEnemyPosition = [grid.length, grid.length];

	var changePosition = function(position, box, addOrSub){
		box.css("opacity", "0");
		$("#" + box.attr("id") + " img").remove();

		if(addOrSub === 1) currentPlayerPosition[position] += 1;
		else currentPlayerPosition[position] -= 1;

		box = $("#" + currentPlayerPosition[0] + "_" + currentPlayerPosition[1]);
		
		if($("#" + box.attr("id") + " img").attr("src") === "goldStar.png") stopOppent += 4;

		box.css("opacity", "1");
		box.html("<img src='avatar.png'/>");

		if(!(stopOppent > 0)){
			moveOppenent();
			moveOppenent();
		}
		else stopOppent--;
	};

	var moveOppenent = function(){
		var box = $("#" + currentEnemyPosition[0] + "_" + currentEnemyPosition[1]);

		var x = Math.floor((Math.random() * grid.length) + 1);
		var y = Math.floor((Math.random() * grid.length) + 1);

		currentEnemyPosition[0] = x;
		currentEnemyPosition[1] = y;

		box = $("#" + currentEnemyPosition[0] + "_" + currentEnemyPosition[1]);

		if($("#" + box.attr("id") + "img").attr("src") === "enemy.png") moveOppenent(box);

		box.css("opacity", "1");
		box.html("<img src='enemy.png'/>");
	};

	var getScore =  function(playerScore, enemyScore){

		for(var i = 0; i < grid.length; i++){
			for(var j = 0; j < grid[i].length; j++){		
				var box = $("#" + grid[i][j][0] + "_" + grid[i][j][1]);
				if(box.css("opacity") === "0") playerScore += 1;
				if($("#" + box.attr("id") + " img").attr("src") === "enemy.png") enemyScore += 1;
			}
		}
		$("#playerScore").html(playerScore);
		$("#enemyScore").html(enemyScore);
	};

	$(document).keydown(function(e){
		var box = $("#" + currentPlayerPosition[0] + "_" + currentPlayerPosition[1]);

		var x = Math.floor((Math.random() * grid.length) + 1);
		var y = Math.floor((Math.random() * grid.length) + 1);
		var randBox = $("#" + x + "_" + y);

		if(numMoves >= 0){
			switch(e.which){
			case leftKey: 
				if(currentPlayerPosition[1] > 1) changePosition(1, box, 0);
				break;
			case rightKey: 
				if(currentPlayerPosition[1] < grid[0].length) changePosition(1, box, 1);
				break;
			case upKey: 
				if(currentPlayerPosition[0] > 1) changePosition(0, box, 0);
				break;
			case downKey: 
				if(currentPlayerPosition[0] < grid.length) changePosition(0, box, 1);
				break;
			}
			if(numMoves % 5 === 0){
				$("#" + randBox.attr("id") + " img").remove();
				randBox.css("opacity", "1");
				randBox.html("<img src='goldStar.png'/>");
				console.log(star++);
			}
			$("img").css({
				"width": sizeBox,
				"height": sizeBox
			});
			$("#movesLeft").html(numMoves--);
		}

		getScore(playerScore, enemyScore);
	});

	$("#reset").click(function(){
		for(var i = 0; i < grid.length; i++){
			for(var j = 0; j < grid[i].length; j++){		
				var box = $("#" + grid[i][j][0] + "_" + grid[i][j][1]);
				box.css("opacity", 1);
				$("#" + box.attr("id") + " img").remove();
			}
		}

		currentPlayerPosition = [1,1];
		currentEnemyPosition = [grid.length, grid.length];

		playerScore = 0;
		enemyScore = 0;

		$("#playerScore").html(playerScore);
		$("#enemyScore").html(enemyScore);

		numMoves = 100;

		$("#movesLeft").html(numMoves);
	});
});