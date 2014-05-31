$(document).ready(function(){
	var size = parseInt($(".container").css("height").replace("px",""));

	var currentPosition = [1,1];

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

	grid = generateGrid(9,9);
	displayGrid(grid);

	$(document).keyup(function(e){
		switch(e.which){
			case leftKey: 
				if(currentPosition[1] > 1){
					$("#" + currentPosition[0] + "_" + currentPosition[1] ).html("");
					currentPosition[1] -= 1;
					$("#" + currentPosition[0] + "_" + currentPosition[1] ).html("X");
				}
				break;
			case rightKey: 
				if(currentPosition[1] < grid[0].length){
					$("#" + currentPosition[0] + "_" + currentPosition[1] ).html("");
					currentPosition[1] += 1;
					$("#" + currentPosition[0] + "_" + currentPosition[1] ).html("X");
				}
				break;
			case upKey: 
				if(currentPosition[0] > 1){
					$("#" + currentPosition[0] + "_" + currentPosition[1] ).html("");
					currentPosition[0] -= 1;
					$("#" + currentPosition[0] + "_" + currentPosition[1] ).html("X");
				}
				break;
			case downKey: 
				if(currentPosition[0] < grid.length){
					$("#" + currentPosition[0] + "_" + currentPosition[1] ).html("");
					currentPosition[0] += 1;
					$("#" + currentPosition[0] + "_" + currentPosition[1] ).html("X");
				}
				break;
		}
		console.log(currentPosition[0] + ":" + currentPosition[1]);
	});
});