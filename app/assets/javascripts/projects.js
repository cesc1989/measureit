$(document).ready(function(){

	var name, data;
	var create = false;
	
	$("#createProjectButton").click(function(){

		if ($("#projectInput").val() == ""){
			$(".error").html("<p>Ingresa el nombre del proyecto</p>");
			create = false;
		}else{
			name = $("#projectInput").val();
			create = true;
			$(".error").html("");
		}

		if (create){
			
			data = {
				'project':{
					'name': name
				}	
			}

			$.ajax({
				type: "POST",
				url: '/newp',
				data: data,
				dataType: "JSON",
				success: function(data){
					console.log("Proyecto creado");
					console.log(data);
					$("#projectInput").val("");
				},
				error: function(jqXHR, textStatus, errorMessage){
					console.log("Hubo errores en el proceso: "+errorMessage);
				}
			});
		}

	
	});

});