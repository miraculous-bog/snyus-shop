    function viewDiv(){
        document.getElementById("cart").style.display = "block";
        document.getElementById("onetouch1").style.display = "none";
    };
    function copytext(el) {
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(el).text()).select();
    document.execCommand("copy");
    $tmp.remove();
}

 $(document).ready(function(){
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

function toggleB() {
    var blur = document.getElementById('blur');
    blur.classList.add('activeb');
    var popup = document.getElementById('popupBasket');
    popup.classList.toggle('activeb');
    // var hid1 = document.querySelector('header');
    // var hid2 = document.querySelector('nav');
    // hid1.classList.toggle('hidsel');
    // hid2.classList.toggle('hidsel');
    var hid3 = document.querySelector('.container');
    hid3.classList.toggle('hidsel');
}
