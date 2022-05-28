$(document).ready(function() {
	$('.header_burger').click(function(event){
		$('.header_burger,.header_menu').toggleClass('activem');
		$('.down').toggleClass('activemc');
		$('body').toggleClass('lockm');
	});
});


$(document).ready(function() {
	$('.click-hide-a').click(function(event){
		$('.header_burger,.header_menu').toggleClass('activem');
		$('.down').toggleClass('activemc');
		$('body').toggleClass('lockm');
	});
});