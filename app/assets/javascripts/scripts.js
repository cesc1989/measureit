$(document).ready(function(){

	//$("#stopTimer").hide();

	var taskId;
	var startTime;
	var stopTime;

	var timer;

	var keepTaskDescription;

	var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;

	$("#startTimer").click(function(){

        timer = setInterval(setTime, 1000);

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

		$.ajax({
			type: "POST",
			url: createTaskUrl,
			data: data,
			dataType: "JSON",
			success: function(data){
				console.log("Listo el pollo");
				//console.log("Información de la tarea:");
				//console.log(data);
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
				//console.log(data);
				drawTask(keepTaskDescription);
				getElapsedTime(data);
			},
			error: function(jqXHR, textStatus, errorMessage){
				console.log("Hubo errores en el proceso: "+errorMessage);
			}
		});

		stopTimer();

	});

	var getElapsedTime = function(data){
		var st, et, tt;
		for (key in data){
			st = data[key].start_time;
			et = data[key].end_time;
		}

		/*st = new Date(st).toString();
		et = new Date(et).toString();*/

		/*st = st.split("T").join(" ");
		st = st.split(".000Z").join("");

		et = et.split("T").join(" ");
		et = et.split(".000Z").join("");*/

		console.log(st+" "+et);

		tt = new Date(et.getTime() - st.getTime());
		console.log(tt);
	}

	function drawTask(data){
		$(".tasksList").prepend("<p>"+data+"</p>");
	}

	function getTaskId(data){
		for(var key in data){
			taskId = data[key].id;
			keepTaskDescription = data[key].description;
		}
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