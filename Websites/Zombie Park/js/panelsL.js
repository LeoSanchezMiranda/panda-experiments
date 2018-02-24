$(function () {
    
    var active_panel = ""

    $('#hunt-menu li a').click(function (e) {
        var link_m = $(this).attr('href');
        if (link_m == "#header_container") {
            link_m = "#h_areas";
        }//HERE I ADDED THE REFERENCE TO THE RIGHT DIV, FOR NON JS PORPUSES I PLACED THE LINK TO THE HEADER SO THE PAGE WOULD SCROLL ALL THE WAY TO THE TOP :D
        if (active_panel != link_m) {
            $(active_panel).fadeOut('slow');
            $(link_m).fadeIn('slow');
        }
        e.preventDefault();
        active_panel = link_m;
    });

    $('#h_areas_btn a').click();

});