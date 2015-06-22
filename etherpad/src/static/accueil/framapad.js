function randomPadName() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var string_length = 10;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

$(document).ready(function() {
    // Pad name
    $('#classic .pad-name, #full1 .pad-name').val(randomPadName());
    
    $('#beta').on('change', function() {
        if($(this).is(':checked')) {
            console.log('beta');
            $('#expiration').attr('disabled', 'true');
        } else {
            console.log('pas beta');
            $('#expiration').removeAttr('disabled');
        }
    });

    /*$('#expiration').on('change', function() {
        if($(this).val()=='lite6') {
            $('#expiration-help').text('Les pads à durée illimitée basculeront en lecture seule au bout de quelques mois.');
        } else {
            $('#expiration-help').text('La date d\'expiration est définie en fonction de la date de dernière édition du pad.');
            
        }
    });*/

    // Create pad
    $('#create-pad').on('submit', function() {
        var pad_name = ($('#classic-pad-name').val()=='') ? randomPadName() : $('#classic-pad-name').val();
        var instance_id = $('#expiration').val();

        if($('#beta').is(':checked')) {
            instance_id = 'beta';
        }

        var pad_url = 'https://'+instance_id+'.framapad.org/p/'+pad_name;
        
        $('#pad-url').attr('href', pad_url);
        document.getElementById('pad-url').click();
        return false;
    });
});
