// =============================================================================

    // APP JS
    // Property of Norex
    // Authored by Justin Bellefontaine

// =============================================================================

(function($) {

    $(document).ready(function() {

        // User Agent Data Attributes ==========================================
        var ua = navigator.userAgent;
        ua = ua.toString();
        $('body').attr('id', ua);

        // BuggyFill Initialization ============================================
        window.viewportUnitsBuggyfill.init({
            hacks: window.viewportUnitsBuggyfill.hacks
        });

        // Disabled Button Clicks ==============================================
        $('.disabled').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

        // Smooth Scrolling ====================================================
        $('a[href*="#"]:not([href="#"])').on('click',function() {

           if(!$(this).parent().hasClass('accordion-navigation')) {

               if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {

                 var target = $(this.hash);

                 target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

                 if (target.length) {
                   $('html,body').animate({
                     scrollTop: target.offset().top - $('.search-cta').outerHeight()
                   }, 650); // Duration
                   return false;
                 }

               }

           }

        });

        // Data Link Handler ===================================================
        $('[data-link-handler]').on('click',function(e){
            if($('[data-link-target="'+$(this).attr('data-link-handler')+'"]').hasClass('active')) {
                $('[data-link-target="'+$(this).attr('data-link-handler')+'"]').removeClass('active');
            }
            else {
                $('[data-link-target="'+$(this).attr('data-link-handler')+'"]').addClass('active');
            }
            e.preventDefault();
        });

        // Slick =================================================================
        if($('body').hasClass('home')) {
            $('.hero').slick({
                // setting-name: setting-value
                prevArrow: '<button type="button" class="slick-prev ion-android-arrow-back"></button>',
                nextArrow: '<button type="button" class="slick-next ion-android-arrow-forward"></button>',
                cssEase: 'ease',
                fade: true,
                adaptiveHeight: true
            });
        }

    });

})(jQuery);
