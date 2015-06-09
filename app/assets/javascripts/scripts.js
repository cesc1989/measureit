$(document).ready(function(){

	$("#stopTimer").hide();

	var taskId;
	var startTime;
	var stopTime;

	var timer;

	var keepTaskDescription;

	var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;

    var createTaskUrl = "/start";
	var taskDescription, projectForTask;

	$("#startTimer").click(function(){

        timer = setInterval(setTime, 1000);

		if ($("#timerInput").val() == ""){
			taskDescription = "no description";
		}else{
			taskDescription = $("#timerInput").val();
		}

		if ($("select option:selected").val() == "no"){
			createNoProject("no_project");
		}else{
			projectForTask = $("select option:selected").val();
		}

		console.log(projectForTask);

		var data = {
			'task':{
				'description': taskDescription,
				'project_id': 	projectForTask
			}	
		}

		startTime = getTime();

		$.ajax({
			type: "POST",
			url: createTaskUrl,
			data: data,
			dataType: "JSON",
			success: function(data){
				console.log("Start el pollo");
				//console.log(data);
				getTaskId(data);
			},
			error: function(jqXHR, textStatus, errorMessage){
				console.log("Hubo errores en el proceso: "+errorMessage);
			}
		});

		$(this).hide();
		$("#stopTimer").show();

	});

	$("#stopTimer").click(function(){
		var taskTimeUrl = "/stop";

		stopTime = getTime();

		var saveData = {
			'task_time':{
				'start_time': startTime,
				'end_time': stopTime,
				'task_id': taskId
			}
		}

		$.ajax({
			type: "POST",
			url: taskTimeUrl,
			data: saveData,
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

		stopTimer();
		$(this).hide();
		$("#startTimer").show();

	});

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

	function drawTask(td){
		$("#tasksList").prepend("<p>"+td+" - <span id=h-"+taskId+"><i></i></span></p>");
	}

	function getTaskId(data){
		for(var key in data){
			taskId = data[key].id;
			keepTaskDescription = data[key].description;
		}
	}

	function createNoProject(name){
		var noProject = {
			'project':{
				'name': name
			}
		}

		$.ajax({
			type: "POST",
			url: '/newp',
			data: noProject,
			async: false,
			dataType: "JSON",
			success: function(data){
				console.log("no_project creado");
				getProjectId(data);
			},
			error: function(jqXHR, textStatus, errorMessage){
				console.log("Hubo errores en el proceso: "+errorMessage);
			}
		});
	}

	function getProjectId(data){
		for (var key in data){
			projectForTask = data[key].id;
			//console.info(projectForTask);
		}

		//return projectForTask
	}

	var getTime = function(){
		var currentDate = new Date();
		var day = currentDate.getDate();
		var month = (currentDate.getMonth()+1);
		var year = currentDate.getFullYear();
		var hours = currentDate.getHours();
		var minutes = currentDate.getMinutes();
		var seconds = currentDate.getSeconds();

		var time = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;

		return time;
	};

	function setTime(){
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds%60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
    }

    function stopTimer(){
    	clearInterval(timer);
    	secondsLabel.innerHTML = "00";
    	minutesLabel.innerHTML = "00";
    	$("#timerInput").val("");
    }

    function pad(val){
        var valString = val + "";
        
        if(valString.length < 2){
            return "0" + valString;
        }else{
            return valString;
        }
    }

});