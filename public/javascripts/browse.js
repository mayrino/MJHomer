$(function() {
    var content = window.getComputedStyle(document.body, ":after").getPropertyValue("content");
    var $carousel = $('#product-container');

    if ($carousel && /smallScreen/.test(content)) {

        $carousel.removeClass('product-carousel').addClass('carousel');
        $carousel.attr('data-ride', 'carousel');

        $('ul.scrollContainer').removeClass('scrollContainer').addClass('carousel-inner');

        $('li.product-panel').each(function() {
            $(this).removeClass(['product-panel', 'prev', 'next'].join(' ')).addClass('item');
        });
    }
});