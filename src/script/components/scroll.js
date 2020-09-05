import $ from "jquery";

const headerArea = document.querySelector(".header-area");

const onScroll = () => {
    const scroll = document.documentElement.scrollTop;

    if (scroll > 100) {
        headerArea.classList.remove('bg-transparent');
        headerArea.classList.add('animated', 'fadeInDown', 'bg-13');
    } else {
        headerArea.classList.remove('animated', 'fadeInDown', 'bg-13');
        headerArea.classList.add('bg-transparent');
    }
};

window.addEventListener("scroll", onScroll);


//sooth Jump Link
$(document).ready(function() {
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function() {
            window.location.hash = target;
        });
    });
});
