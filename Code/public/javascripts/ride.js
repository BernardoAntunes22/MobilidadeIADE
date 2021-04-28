window.onload = function(){
    $('#rideDate').datepicker({ dateFormat: 'yy/mm/dd' });
    $('#rideTime').timepicker({ timeFormat: 'HH:mm', interval: 60 });
}