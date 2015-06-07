$(document).ready(function(){
	console.log("jQuery listo para arrancar!");

	$("#startTimer").click(function(){

		var createTaskUrl = "/projects/5/tasks/create";
		//var createTaskUrl = "/t";
		console.log(createTaskUrl);
		var data = {
			'task':{
				'description': $("#timerInput").val(),
			'project_id': 5	
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