$(document).ready(function() {
    $('.category-item').click(function() {
        var category = $(this).attr('id');

        if(category == 'tudo') {
            $('.produto').addClass('hide');
            setTimeout(function() {
                $('.produto').removeClass('hide');
            }, 300);
        } else {
            $('.produto').addClass('hide');
            setTimeout(function() {
                $('.' + category).removeClass('hide');
            }, 300);
        }
    });
});