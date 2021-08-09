$('#homeButton').click( function(event) { 
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $('#home').offset().top  
    }, 1400);
});

$('#nosotrosButton').click( function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $('#nosotros').offset().top
    }, 1400);
});

$('#footerButton').click( function(event) { 
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $('#footerContacto').offset().top  
    }, 1400);
});

