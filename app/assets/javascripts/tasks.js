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

	/*** CREAR TAREA MANUALMENTE ***/

	var dateStartString = "2015-06-09 ";
	var sdh, sdm, sds, edh, edm, eds;
	var dateEndString = "2015-06-10 ";
	var manualTaskId, manualTaskName;
	var taskId, keepTaskDescription;

	$("#manualTask").click(function(){

		if ($("#taskName").val() == ""){
			manualTaskName = "no description manual";
		}else{
			manualTaskName = $("#taskName").val();
		}

		var taskData = {
			'task':{
				'description': manualTaskName,
				'project_id': 18
			}
		}

		$.ajax({
			type: "POST",
			url: "/start",
			data: taskData,
			async: false,
			dataType: "JSON",
			success: function(data){
				console.log("Tarea manual creada");
				//console.log(data);
				getTaskId(data);
			},
			error: function(jqXHR, textStatus, errorMessage){
				console.log("Hubo errores en el proceso: "+errorMessage);
			}
		});

		console.log(taskId);

		// cadena de tiempo inicial
		sdh = $("#startDateHrs").val();
		sdm = $("#startDateMits").val();
		sds = $("#startDateSecs").val();

		it = sdh+":"+sdm+":"+sds;
		dateStartString += it;
		console.log(dateStartString);

		// cadena de tiempo final
		edh = $("#endDateHrs").val();
		edm = $("#endDateMits").val();
		eds = $("#endDateSecs").val();

		et = edh+":"+edm+":"+eds;
		dateEndString += et;
		console.log(dateEndString);

		// Vamos a crear la task_times
		var timeData = {
			'task_time':{
				'start_time': it,
				'end_time': et,
				'task_id': taskId
			}
		}

		$.ajax({
			type: "POST",
			url: "/stop",
			data: timeData,
			dataType: "JSON",
			success: function(data){
				console.log("Stop el pollo");
				//console.log(data);
				drawTask(keepTaskDescription);
				getElapsedTime(data);
			},
			error: function(jqXHR, textStatus, errorMessage){
				console.log("Hubo errores en el proceso: "+errorMessage);
			}
		});

	});

	function getTaskId(data){
		for(var key in data){
			taskId = data[key].id;
			keepTaskDescription = data[key].description;
		}
	}

	function drawTask(td){
		$("#tasksList").prepend("<p>"+td+" - <span id=h-"+taskId+"><i></i></span></p>");
	}

	function getElapsedTime(data){
		var st, et, tt, ti;
		for (key in data){
			st = data[key].start_time;
			et = data[key].end_time;
			ti = data[key].task_id;
		}

		et = moment(et).format("YYYY-MM-DD HH:mm:ss");
		st = moment(st).format("YYYY-MM-DD HH:mm:ss");
		tt = moment(et).diff(st);
		tt = moment(tt).format("mm:ss");

		$("#h-"+ti+" i").html("<i>"+tt+"</i>");
	}

});