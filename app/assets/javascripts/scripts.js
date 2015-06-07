$(document).ready(function(){
	console.log("jQuery listo para arrancar!");

	//$("#stopTimer").hide();

	$("#startTimer").click(function(){

		var createTaskUrl = "/start";
		//var createTaskUrl = "/t";
		console.log(createTaskUrl);
		var data = {
			'task':{
				'description': $("#timerInput").val(),
				'project_id': 1	
			}
			
		}

		$.ajax({
			type: "POST",
			url: createTaskUrl,
			data: data,
			dataType: "JSON",
			success: function(data){
				console.log("Se envio");
				console.log(data);
			},
			error: function(jqXHR, textStatus, errorMessage){
				console.log("Hubo errores en el proceso: "+errorMessage);
			}

		});


	});

});