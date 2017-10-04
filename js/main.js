// Callback függvény fade után.
function fadeDone() {
    console.log(this);
}

// Eseménykezelő beállítása.
$("p").click(function(){
    $(this).hide();
    // $(this).fadeTo(5000, 1, fadeDone);
    $(this).slideDown(3500);
});

// Esemény kiváltása.
$("p").click();

// Kattintás megelőzése.
$("nav a.nav-link").click( function(ev) {
    ev.preventDefault();
    var link = $(this);
    $(document.body).animate({
        opacity: '0'
    }, 1000, function() {
        document.location = link.attr("href");
    });
});