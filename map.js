$(document).ready(function(){
	var size = parseInt($(".container").css("height").replace("px",""));

	var leftKey = 37;
	var upKey = 38;
	var rightKey = 39;
	var downKey = 40;

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
		$(".box").css("width", size/grid.length);
		$(".box").css("height", size/grid.length);
		$(".container").css("font-size", size/(grid.length*2));
	};

	var changePosition = function(position, box, addOrSub){
		box.html("");

		if(addOrSub === 1) currentPosition[position] += 1;
		else currentPosition[position] -= 1;

		box = $("#" + currentPosition[0] + "_" + currentPosition[1]);
		box.html("X");
		box.css("background-color", "green");
	};

	var moveOppenent = function(position, box, addOrSub){
		box.html("");

		if(addOrSub === 1) currentEnemyPosition[position] += 1;
		else currentEnemyPosition[position] -= 1;

		box = $("#" + currentEnemyPosition[0] + "_" + currentEnemyPosition[1]);
		box.html("O");
		box.css("background-color", "blue");
	};

	$(document).keydown(function(e){
		var box = $("#" + currentPosition[0] + "_" + currentPosition[1]);
		
		var pos = Math.floor(Math.random() * 2);
		var addOrSub = Math.floor(Math.random() * 2);
		moveOppenent(pos, box, addOrSub);
		
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
		
		pos = Math.floor(Math.random() * 2);
		addOrSub = Math.floor(Math.random() * 2);
		moveOppenent(pos, box, addOrSub);
	});
	
	grid = generateGrid(15,15);
	displayGrid(grid);

	var currentPosition = [1,1];
	var currentEnemyPosition = [grid.length, grid.length];
});