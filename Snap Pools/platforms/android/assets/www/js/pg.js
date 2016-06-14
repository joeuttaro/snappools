// =============================================================================

    // PHONEGAP JS
    // Authored by Joe Uttaro

// =============================================================================

(function($) {

    $(document).ready(function() {

        var url ='';

        if($('body').hasClass('home')){
            url = 'http://snappools.com?api';
        }

        if($('body').hasClass('single-pools')){
            url = 'http://snappools.com/' + getParameterByName('pool') + '?api';
        }

        $.get(url, function(data){
            var html = '';
            if($('body').hasClass('home')){
                for(key in data.active_pools){
                    html = '<dd class="box lg-1of3 med-2of4 single-pool-wrapper ' + data.active_pools[key].status + '">';
                    html += '<div class="single-pool-outer">';
                    html += '<a href="pool.html?pool=' + data.active_pools[key].post_name + '" class="single-pool ' + data.active_pools[key].status + '" style="background-image:url(' + data.active_pools[key].images[0].block_image.url + ');">';
                    html += '<div class="pool-details">';
                    html += '<h3>' + data.active_pools[key].post_title + '</h3>';
                    html += '<h6 class="highlight">';
                    if(data.active_pools[key].status == 'active'){
                        html += 'Active';
                    }else if(data.active_pools[key].status == 'registration_open'){
                        html += 'Registration Open';
                    }else if(data.active_pools[key].status == 'registration_full'){
                        html += 'Pool Full';
                    }
                    html += '</h6>';
                    html += '<h6>';
                    if(data.active_pools[key].status != 'active'){
                        html += 'Starts ' + data.active_pools[key].options[0].readable_date;
                    }else{
                        html += data.active_pools[key].options[0].program_airs;
                    }
                    html += '</h6>';
                    html += '</div>';
                    html += '</a>';
                    html += '</div>';
                    html += '</dd>'
                    $('.pool-grid').append(html);
                }

                for(key in data.archived_pools){
                    html = '<dd class="box lg-1of3 med-2of4 single-pool-wrapper archived">';
                    html += '<div class="single-pool-outer">';
                    html += '<a href="pool.html?pool=' + data.archived_pools[key].post_name + '" class="single-pool archived" style="background-image:url(' + data.archived_pools[key].images[0].block_image.url + ');">';
                    html += '<div class="pool-details">';
                    html += '<h3>' + data.archived_pools[key].post_title + '</h3>';
                    html += '<div class="pool-status">';
                    html += '<h6 class="highlight">Winner</h6>';
                    html += '<h6>' + data.archived_pools[key].winning_entries[0].pool_entrant[0].name + '</h6>';
                    html += '</div>'
                    html += '</div>';
                    html += '</a>';
                    html += '</div>';
                    html += '</dd>'
                    $('.pool-grid').append(html);
                }
            }

            if($('body').hasClass('single-pools')){
                console.log(data);
                $('.title-section').css('background-image', 'url(' + data.images[0].header_image.url + ')');
                $('.title-content h1').html(data.title);
                for(key in data.entries){
                    html = '<dd class="box lg-1of4 med-1of3 single-entrant-wrapper">';
                    html += '<div class="single-entrant" style="background-image:url(' + data.entries[key].tv_contestant[0].photo.url + ');" data-eliminated="' + data.entries[key].options[0].eliminated + '">';
                    html += '<div class="entrant-details">';
                    html += '<h5>' + data.entries[key].tv_contestant[0].name + '</h5>';
                    html += '<h6>' + data.entries[key].pool_entrant[0].name + '</h6>';
                    html += '</div>';
                    html += '</div>';
                    html += '</dd>';
                    $('.entries.all').append(html);
                }

                for(key in data.winning_entries){
                    html = '<dd class="box lg-1of4 med-1of3 single-entrant-wrapper">';
                    html += '<div class="single-entrant winner" style="background-image:url(' + data.winning_entries[key].tv_contestant[0].photo.url + ');">';
                    html += '<div class="entrant-details">';
                    html += '<h5>' + data.winning_entries[key].pool_entrant[0].name + '</h5>';
                    html += '<h6>' + data.winning_entries[key].place + ': $' + data.winning_entries[key].options[0].payout + '</h6>';
                    html += '</div>';
                    html += '</div>';
                    html += '</dd>';
                    $('.entries.winners').append(html);
                }

                // <dd class="box lg-1of4 med-1of3 small-1of2 single-entrant-wrapper">
//                     <div class="single-entrant winner" style="background-image:url('http://snappools.com/wp-content/uploads/2016/06/CiOJMlVU4AMMZoW-e1465404051141.jpg');">
//                         <div class="entrant-details">
//                             <h5>Laura Sponagle</h5>
//                             <h6>1st: $100</h6>
//                         </div>
//                         <!-- Nick & Philippe Paquette -->
//                         <!--  -->
//                     </div>
//                 </dd>

                $('.left-col').html(data.description);

                if(data.pool_options[0].accepting_payments == 'Yes'){
                    if (data.pool_options[0].pool_full == 'No'){
                        $('.right-col').prepend('<a href="mailto:' + data.pool_options[0].admin_email + '" class="button">Request Entry</a>');
                    }else{
                        $('.right-col').prepend('<h6 class="gray">Sorry, pool\'s full.</h6>');
                    }
                    $('.right-col').prepend('<h1>$' + data.pool_options[0].entry_fee + ' Entry</h1>');
                }
                html = '';
                for(key in data.prizing){
                    html += '<dd>';
                    html += '<h4 class="single-prize"><span>' + data.prizing[key].label + ': </span> $' + data.prizing[key].prize + '</h4>';
                    html += '</dd>';
                }
                $('.prizing').html(html);

                $('.right-col').append('<h6>Questions? <a href="mailto:' + data.pool_options[0].admin_email + '">' + data.pool_options[0].admin_email + '</a></h6>');

            }
        }, 'json');

    });

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

})(jQuery);
