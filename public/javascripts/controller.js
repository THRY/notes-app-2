import { default as data } from './model.js';

let controller = (function() {
    // Add body classes depending on view
    let path = window.location.pathname;
    $('body').addClass(path.split("/")[1]); 
    
    // Style switcher
    $('.style-switcher .choice').click(function() {
        $('.style-switcher .choice').toggleClass('active');
    })

    // Save entry
    $('.note-editor .first.save').click(function() {
        var entry = {}
        entry.title = $('.note-editor #title').val(); 
        entry.description = $('.note-editor #description').val(); 
        console.log(entry);

        function success(data, status) {
            window.location.pathname = "/";
        }

        $.ajax({
            type: "POST",
            url: "/notes",
            data: entry,
            succes: success()
        });
    });

    $('.back').click(function() {
        window.history.back();
    })

    $( "#datepicker" ).datepicker();

    $('.filters input[name=filter]').change(function() {
        window.location.href = '?sort=' + $(this).val();
    }); 

    var url = window.location.href;
    if(url.split('?')[1]) {
        url = url.split('?')[1].split('sort=')[1];
        console.log(url);
        $('.filters #' + url).attr('checked', 'checked');
    }

    // Update entry
    $('.note-editor .edit.save').click(function() {
        var entry = {}
        entry.title = $('.note-editor #title').val(); 
        entry.description = $('.note-editor #description').val(); 
        console.log(entry);
        
        function success(data, status) {
            window.location.pathname = "/";
        }

        console.log($('.note-editor form').data('id'));

        $.ajax({
            type: "POST",
            url: "/notes/" + $('.note-editor form').data('id'),
            data: entry,
            succes: success()
        });
    });

    // Done
    $('.done-input').click(function() {
        var $closest = $(this).closest('.list-item');
        console.log($closest.data('id'));

        var update = {}
        update.done = ($closest.data('done') == true ? false : true); 
        console.log(update.done);
        
        function success(data, status) {
            $closest.attr('data-done', update.done);
            $closest.data('done', update.done);
        }    

        $.ajax({
            type: "POST",
            url: "/notes/" + $closest.data('id'),
            data: update,
            succes: success()
        });
    })

    $('.list-item').on('mouseenter mouseleave', function() {
        $(this).find('.edit').toggleClass('hovered'); 
    })
}()); 

export default { controller };



