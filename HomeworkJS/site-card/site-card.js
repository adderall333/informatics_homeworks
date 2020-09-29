window.onload = function() {
    $("#bio").click(function() {
        $("#content").load("biography.html #content");
    });

    $("#photos").click(function() {
        $("#content").load("photos.html #content");
    });

    $("#contacts").click(function() {
        $("#content").load("contacts.html #content");
    });

    $("#cv").click(function() {
        $("#content").load("cv.html #content");
    });
}