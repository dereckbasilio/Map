$(document).ready(function(){
	var sizeContainer = parseInt($(".container").css("height").replace("px",""));
	var sizeBox = 0;

	var playerOwned = 0;
	var enemyOwned = 0;

	var snailValue = 3;
	var clockValue = 3;
	var doubleValue = 1;

	var snailsCollected = 0;
	var clocksCollected = 0;
	var doublesCollected = 0;

	var numMoves = 50;
	var stopOppent = 0;

	var generateGrid = function(size){
		var grid = [];
		for(var i = 1; i <= size; i++){
			var row = [];
			for(var j = 1; j <= size; j++){		
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

	grid = generateGrid(5);
	displayGrid(grid);

	spacesAvailable = grid.length * grid.length;

	var currentPlayerPosition = [1,1];
	var currentEnemyPosition = [grid.length, grid.length];

	$("#playerOwned").html(playerOwned);
	$("#enemyOwned").html(enemyOwned);

	$("#movesLeft").html(numMoves);

	$("#spacesAvailable").html(spacesAvailable);

	var movePlayer = function(position, addOrSub){
		var box = $("#" + currentPlayerPosition[0] + "_" + currentPlayerPosition[1]);

		var boxImg = $("#" + box.attr("id") + " img");

		box.css("opacity", "0");
		boxImg.remove();

		if(addOrSub === 1) currentPlayerPosition[position] += 1;
		else currentPlayerPosition[position] -= 1;

		box = $("#" + currentPlayerPosition[0] + "_" + currentPlayerPosition[1]);
		boxImg = $("#" + box.attr("id") + " img");

		if(!(stopOppent > 0)){
			moveOppenent();
			moveOppenent();
		}
		else stopOppent--;

		if(numMoves % 5 === 0) placeCollectable();

		runCollectablePower(boxImg);

		box.css("opacity", "1");
		box.html("<img src='avatar.png'/>");

		$("img").css({
			"width": sizeBox,
			"height": sizeBox
		});

		$("#movesLeft").html(--numMoves);

		getSpaces();
	};

	var moveOppenent = function(){
		var x = Math.floor((Math.random() * grid.length) + 1);
		var y = Math.floor((Math.random() * grid.length) + 1);

		currentEnemyPosition[0] = x;
		currentEnemyPosition[1] = y;

		var box = $("#" + currentEnemyPosition[0] + "_" + currentEnemyPosition[1]);

		box.css("opacity", "1");
		box.html("<img src='enemy.png'/>");
	};

	var placeCollectable = function(){
		var collectables = ["snail.png", "clock.png", "double.png"];

		var x = Math.floor((Math.random() * grid.length) + 1);
		var y = Math.floor((Math.random() * grid.length) + 1);
		var randBox = $("#" + x + "_" + y);

		var randRange = Math.floor((Math.random() * 100) + 1);
		var collectable = 0;

		if(randRange >= 1 && randRange <= 50) collectable = 0;
		else if(randRange >= 51 && randRange <= 90) collectable = 1;
		else if(randRange >= 91 && randRange <= 100) collectable = 2;

		$("#" + randBox.attr("id") + " img").remove();
		randBox.css("opacity", "1");
		randBox.html("<img src='" + collectables[collectable] + "'/>");
	};

	var runCollectablePower= function(boxImg){
		if(boxImg.attr("src") === "snail.png"){
			stopOppent += snailValue * doubleValue;
			snailsCollected += 1;
		}
		else if(boxImg.attr("src") === "clock.png"){
			numMoves += clockValue * doubleValue;
			clocksCollected += 1;
		}
		else if(boxImg.attr("src") === "double.png"){
			doublesCollected += 1;
			if(doublesCollected === 1) doubleValue = 2;
			else if(doublesCollected % 4 === 0) doubleValue *= 2;
		}
	};

	var getSpaces =  function(){
		var spacesAvailable = grid.length * grid.length;
		playerOwned = 0;
		enemyOwned = 0;

		for(var i = 0; i < grid.length; i++){
			for(var j = 0; j < grid[i].length; j++){		
				var box = $("#" + grid[i][j][0] + "_" + grid[i][j][1]);
				if(box.css("opacity") === "0" || $("#" + box.attr("id") + " img").attr("src") === "avatar.png"){
					playerOwned += 1;
					spacesAvailable -= 1;
				}
				if($("#" + box.attr("id") + " img").attr("src") === "enemy.png"){
					enemyOwned += 1;
					spacesAvailable -= 1;
				}
			}
		}
		$("#playerOwned").html(playerOwned);
		$("#enemyOwned").html(enemyOwned);
		$("#spacesAvailable").html(spacesAvailable);
	};

	var getFinalScore = function(){
		var spacesScore = playerOwned * 10;
		var snailBonus = snailsCollected * 3;
		var clockBonus = clocksCollected * 3;
		var doubleBonus = doublesCollected * 3;

		var finalScore = 0;

		var winBonus = 1;
		if(playerOwned > enemyOwned) winBonus = 2;

		finalScore = (spacesScore + snailBonus + clockBonus + doubleBonus) * winBonus;

		$(".box").remove();

		$(".container").html(
			"<div class='center' id='score'><h1>Spaces Owned " + playerOwned + " X 10: " + spacesScore + "</h1>" +
			"<h1>Snails Collected " + snailsCollected + " X 3: " + snailBonus + "</h1>" +
			"<h1>Clocks Collected " + clocksCollected + " X 3: " + clockBonus + "</h1>" +
			"<h1>Boosts Collected " + doublesCollected + " X 3: " + doubleBonus + "</h1>" +
			"<h1>Win Bonus: X " + winBonus + "</h1>" +
			"<h1>Total Score: " + finalScore + "</h1></div>"

		);
	};

	var changeLevel = function(NumMoves, gridSize, SnailValue, ClockValue){
		$("#score").remove();
		$(".box").remove();

		numMoves = NumMoves;
		playerOwned = 0;
		enemyOwned = 0;
		grid = generateGrid(gridSize);
		spacesAvailable = grid.length * grid.length;
		snailValue = SnailValue;
		clockValue = ClockValue;
		currentPlayerPosition = [1,1];
		currentEnemyPosition = [grid.length, grid.length];

		$("#movesLeft").html(numMoves);
		$("#playerOwned").html(playerOwned);
		$("#enemyOwned").html(enemyOwned);
		$("#spacesAvailable").html(spacesAvailable);
		displayGrid(grid);
	};

	$(document).keydown(function(e){
		var leftKey = 37;
		var upKey = 38;
		var rightKey = 39;
		var downKey = 40;
		
		if(numMoves > 0){
			switch(e.which){
			case leftKey: 
				if(currentPlayerPosition[1] > 1) movePlayer(1, 0);
				break;
			case rightKey: 
				if(currentPlayerPosition[1] < grid[0].length) movePlayer(1, 1);
				break;
			case upKey: 
				if(currentPlayerPosition[0] > 1) movePlayer(0, 0);
				break;
			case downKey: 
				if(currentPlayerPosition[0] < grid.length) movePlayer(0, 1);
				break;
			}
		}
		else getFinalScore();
	});

	$("#easy").click(function(){
		changeLevel(50, 5, 3, 3);
	});

	$("#normal").click(function(){
		changeLevel(75, 15, 4, 5);
	});

	$("#hard").click(function(){
		changeLevel(100, 25, 5, 8);
	});
});