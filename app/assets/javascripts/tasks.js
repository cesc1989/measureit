$(document).ready(function(){

	var taskUrl = "/t";

	$.ajax({
		type: "GET",
		url: taskUrl,
		dataType: "JSON",
		success: function(data){
			console.log("Todas las actividades");
			//console.log(data);
			drawTasks(data);
		},
		error: function(jqXHR, textStatus, errorMessage){
			console.log("Hubo errores en el proceso: "+errorMessage);
		}
	});


	function drawTasks(data){
		var taskDescription, taskId, taskTimes;
		var html = "";

		for (var key in data){
			taskDescription = data[key].description;
			taskTimes = data[key].timediff;
			taskId = data[key].id;

			taskTimes = moment(taskTimes).format("mm:ss");

			html += "<p>"+taskDescription;
			html +=" - <span id=h-"+taskId+"><i>"+taskTimes+"</i></span>";
			html += "</p>"
		}

		$("#tasksList").html(html);
	}


});