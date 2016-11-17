$(function() {
  var socket = io.sails.connect();
  socket.get('/socket');

  // Function Load Icons
  $('#get-vcb').ready(function() {
    $('#icon_done').hide();
    $('#icon_load').hide();
    $('#icon_close').hide();
    var number = $('#number_vcb').val();
    $('#number_vcb').keyup(function () {
      $('#name_vcb').val("");
      $('#icon_done').hide();
      $('#icon_load').hide();
      $('#icon_close').hide();
      if ($('#number_vcb').val().length == 13) {
        $('#icon_load').show();
        $('#icon_done').hide();
        $('#icon_put').hide();
        $('#icon_close').hide();
        var a = getname_vcb(number);
      }
    });

    // Function Load Name VCB
    function getname_vcb(number) {
      var number = $('#number_vcb').val();
      socket.get('/vcb/getname?number_vcb=' + number);
    }

    socket.on('vcb_number/check', function (data) {
      if (data.msg == null) {
        getname_vcb(number);
      } else {
        $('#icon_load').hide();
        $('#icon_done').show();
        if (data.msg == 'N/A') {
          $('#icon_done').hide();
          $('#icon_close').show();
          $('input#name_vcb').css({'color': '#a94442'});
          $('input#name_vcb').val('Tài khoản không tồn tại');
          $('input#number_vcb').css({'border': '1px solid #a94442'});
          $('input#number_vcb').css({'color': '#a94442'});

        } else {
          $('#name_vcb').val(data.msg);
          $('label.blue').css({'color': '#468847'});
          $('input#number_vcb').css({'border': '1px solid #3f8040'});
          $('input#number_vcb').css({'color': '#3f8040'});
          $('input#name_vcb').css({'color': '#3f8040'});

        }
      }
    })
  })
});
