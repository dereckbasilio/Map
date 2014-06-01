$(document).ready(function(){
	var size = parseInt($(".container").css("height").replace("px",""));

	var leftKey = 37;
	var upKey = 38;
	var rightKey = 39;
	var downKey = 40;

	var xScore = 0;
	var oScore = 0;

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
		$(".box").css({
			"width": size/grid.length,
			"height": size/grid.length
		});
		$(".container").css("font-size", size/(grid.length*2));
	};

	var changePosition = function(position, box, addOrSub){
		box.css("opacity", "0");
		$("#" + box.attr("id") + " img").remove();

		if(addOrSub === 1) currentPosition[position] += 1;
		else currentPosition[position] -= 1;

		box = $("#" + currentPosition[0] + "_" + currentPosition[1]);
		
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
		$("#" + box.attr("id") + " img").remove();

		var x = Math.floor((Math.random() * 15) + 1);
		var y = Math.floor((Math.random() * 15) + 1);

		currentEnemyPosition[0] = x;
		currentEnemyPosition[1] = y;

		box = $("#" + currentEnemyPosition[0] + "_" + currentEnemyPosition[1]);

		if(box.css("background-color") === "rgb(0, 0, 255)") moveOppenent(box);

		box.html("O");
		box.css({
			"background-color": "blue",
			"opacity": "1"
		});
	};

	$(document).keydown(function(e){
		var box = $("#" + currentPosition[0] + "_" + currentPosition[1]);

		var x = Math.floor((Math.random() * 15) + 1);
		var y = Math.floor((Math.random() * 15) + 1);

		if(numMoves >= 0){
			switch(e.which){
			case leftKey: 
				if(currentPosition[1] > 1) changePosition(1, box, 0);
				break;
			case rightKey: 
				if(currentPosition[1] < grid[0].length) changePosition(1, box, 1);
				break;
			case upKey: 
				if(currentPosition[0] > 1) changePosition(0, box, 0);
				break;
			case downKey: 
				if(currentPosition[0] < grid.length) changePosition(0, box, 1);
				break;
			}
			if(numMoves % 5 === 0){
				$("#" + x + "_" + y).html("<img src='goldStar.png'/>");
			}
			$("img").css({
					"width": size/grid.length,
					"height": size/grid.length
				});
			$("#movesLeft").html(numMoves--);
		}

		getScore(xScore, oScore);
	});
	
	grid = generateGrid(15,15);
	displayGrid(grid);

	var currentPosition = [1,1];
	var currentEnemyPosition = [grid.length, grid.length];

	var getScore =  function(xScore, oScore){

		for(var i = 0; i < grid.length; i++){
			for(var j = 0; j < grid[i].length; j++){		
				var box = $("#" + grid[i][j][0] + "_" + grid[i][j][1]);
				if(box.css("opacity") === "0") xScore += 1;
				if(box.css("background-color") === "rgb(0, 0, 255)") oScore += 1;
			}
		}
		$("#xScore").html(xScore);
		$("#oScore").html(oScore);
	};
});