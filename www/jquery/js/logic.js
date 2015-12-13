$(function(){
	logic = {
		module: 1,
		currentQuestion : 0,
		selectedOption: {},
		data:{},
		cargarPreguntas:function(){
			var url = "http://www.danielgranados.net/ruta/test.json";
			$("#preguntas").html("Cargando..");
			$.get(url,function(data){
				logic.data = data;
				logic.crearPregunta();
			});
		},
		crearPregunta:function(){
			$("#preguntas").empty();
			var data = logic.data
			console.log(data);
				for(i in data.ruta){
					if(data.ruta[i].modulo == logic.module){
						var preguntas = data.ruta[i].preguntas
						if (preguntas[logic.currentQuestion] != undefined) {
							logic.appendQuestion(preguntas[logic.currentQuestion])
						}else{
							alert("Compartir, Terminaste el moulo!!!")
						}
					}
				}
		},
		cargarPregunta:function(){
			if(logic.data.ruta == undefined)
				logic.cargarPreguntas();
			else
				logic.crearPregunta();
			
		},
		appendQuestion:function(pregunta){

			var t = document.querySelector('#page');
			t.querySelector('#pregunta').textContent = pregunta.pregunta;

			var options = pregunta.opciones

			t.querySelector('.options').textContent = "";
			for(i in options){
				logic.appendOption(options[i], t)
			}

			//var clone = document.importNode(t.content, true);
			//$("#preguntas").empty();
			//$("#preguntas").append(clone);
			//$("#preguntas").slideDown();
			$('.options').listview('refresh');
		},
		appendOption:function(option, questionHtmlE){
			var t = document.querySelector('#tmp_option');
			t.content.querySelector('a').textContent = option.texto;
			t.content.querySelector('a').setAttribute("data-feedback", option.feedback);
			t.content.querySelector('a').setAttribute("data-option", option.opcion);
			t.content.querySelector('a').setAttribute("data-correcta", option.correcta);
			questionHtmlE.querySelector('.options').appendChild(document.importNode(t.content, true))
		},
		response:function(optionHtmlE){

			console.log($(optionHtmlE).data())
			logic.selectedOption = $(optionHtmlE).data()

			/*$("#preguntas").slideUp(function(){
				$("#feedback").slideDown();
			});*/
			$.mobile.changePage( "#page2", { transition: "slideup", changeHash: false });
			$("#page2 .content p").html(logic.selectedOption.feedback)
			if(logic.selectedOption.correcta){
				$("#page2 .content a").html("Siguiente");
				$("#page2 .content a").unbind( "click" );
				var data = logic.data
			
				$("#page2 .content a").click(function(){
					logic.currentQuestion +=1;
					//$("#feedback").slideUp();
					logic.cargarPregunta();
						
					$.mobile.changePage( "#page", { transition: "slide", changeHash: false });
				});

			}else{
				$("#page2 .content a").html("Regresar");
				$("#page2 .content a").unbind( "click" );
				$("#page2 .content a").click(function(){
					$.mobile.changePage( "#page", { transition: "flip", changeHash: false });
					/*$("#feedback").slideUp(function(){
						$("#preguntas").slideDown();
					});*/
				});
			
			}
		}
	}

	logic.cargarPregunta();
})

