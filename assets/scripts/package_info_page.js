$(document).ready(function(){
    $('.package-slider').slick({
        autoplay: true,
        autoplaySpeed:2500,
        dots: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev">&#11164</button>',
        nextArrow: '<button type="button" class="slick-next">&#11166</button>',
    });

    // to open everything
    // $('.itinerary-content').each(function() {
    //     $(this).show(); // Open the content
    //     $(this).siblings('.toggle-icon').text(String.fromCodePoint(0x1F893)); // Set icon to open
    // });
});

function toggleContent(element) {
const content = $(element).find('.itinerary-content');
const icon = $(element).find('.toggle-icon');

content.slideToggle(300, function() {
if (content.is(':visible')) {
    icon.text(String.fromCodePoint(0x1F893));
} else {
    icon.text(String.fromCodePoint(0x1F892));
}
});
}