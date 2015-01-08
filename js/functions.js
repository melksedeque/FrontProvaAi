var contador = 0;

$(function(){
	$("#botaoLogin a").click(function(){
		$("#formularioLogin").slideToggle();
	});

	$(".header-logado").click(function(){
		$("#menu-usuario").slideToggle();
	});

	$(".local a").click(function(){
		$("#modal-local").modal('toggle');
		$.ajax({
			type: "GET",
			url: "ajax/mapa.html",
			data: {
				"referencia": $(this).data('loja')
			},
			beforeSend: function(){
				$("#modal-local .conteudo-mapa").html('<div class="carregando"><p><i class="fa fa-spin fa-spinner"></i></p><p class="text-center">Carregando</p></div>');
			},
			success: function(data) {
				$("#modal-local .conteudo-mapa").html(data);
			}
		});
		return false;
	});

	$(".recovery-send").click(function(){
		$(".recovery-1").slideUp();
		$(".recovery-2").slideDown();
	});

	$(".editar-descricao-loja").click(function(){
		$(".store-info-basico input, .store-info-basico textarea").removeAttr('disabled');
		$(this).addClass('hidden');
		$(".salvar-descricao-loja").removeClass('hidden');
	});

	$(".salvar-descricao-loja").click(function(){
		$(".store-info-basico input, .store-info-basico textarea").attr('disabled', 'disabled');
		$(this).addClass('hidden');
		$(".editar-descricao-loja").removeClass('hidden');
	});

	$("#form-peca input, #form-peca textarea").keyup(function(){
		var valor = $(this).val();
		$(".complete-" + $(this).attr('id')).html(valor);
	});

	$(".lista-lojas a").click(function(){
		$(".lista-lojas a").removeClass('active');
		$(this).addClass('active');
		$(".formularios-lojas .tab").addClass('disabled');
		$( $(this).attr('href') ).removeClass('disabled');
		return false;
	});

	// carrega produtos automaticamente
	$(window).scroll(function(){
		var alturaPagina = $("body").height();
		var alturaScroll = $(window).scrollTop();

		if((alturaScroll + $(window).height()) > (alturaPagina - 400)) {
			// Remover contador posteriormente...
			if(contador < 4) {
				$.ajax({
					type: "GET",
					url: "ajax/produtos.html",
					success: function(data) {
						$(".produtos-lista").append(data);
						contador++;
					}
				});
			}
		}
	});

	$(".busca input[type='text']").bind('focusin', function(){
		$(".menu-tags").fadeIn();
	});

	$(".busca input[type='text']").bind('focusout', function(){
		$(".menu-tags").fadeOut();
	});

	$("#searchBar").tagsinput();

	$('.validar').validate({
		errorElement: 'span'
	});

	$("#btn-genero").click(function(){
		if($(this).val() == "M") {
			$(this).val("F").html("F");
		}
		else {
			$(this).val("M").html("M");
		}
	});
});