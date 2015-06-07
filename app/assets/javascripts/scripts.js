$(document).ready(function(){

	//$("#stopTimer").hide();

	var taskId;
	var startTime;
	var stopTime;

	var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;

	$("#startTimer").click(function(){

        setInterval(setTime, 1000);

		var createTaskUrl = "/start";
		var taskDescription;

		if ($("#timerInput").val() == ""){
			taskDescription = "no description";
		}else{
			taskDescription = $("#timerInput").val();
		}

		var data = {
			'task':{
				'description': taskDescription,
				'project_id': 1	
			}	
		}

		startTime = getTime();

		//console.log(data);
		//console.log(fulltime);

		$.ajax({
			type: "POST",
			url: createTaskUrl,
			data: data,
			dataType: "JSON",
			success: function(data){
				console.log("Listo el pollo");
				console.log(data);
				getTaskId(data);
			},
			error: function(jqXHR, textStatus, errorMessage){
				console.log("Hubo errores en el proceso: "+errorMessage);
			}

		});

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

		console.log(saveData);

		$.ajax({
			type: "POST",
			url: taskTimeUrl,
			data: saveData,
			dataType: "JSON",
			success: function(data){
				console.log("Listo el pollo");
				console.log(data);
			},
			error: function(jqXHR, textStatus, errorMessage){
				console.log("Hubo errores en el proceso: "+errorMessage);
			}

		});

	});

	function getTaskId(data){
		for(var key in data){
			taskId = data[key].id;
			//console.log(data[key].id);
		}
		//console.log("Task id es: "+taskId);
	};

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

    function pad(val){
        var valString = val + "";
        
        if(valString.length < 2){
            return "0" + valString;
        }else{
            return valString;
        }
    }

});