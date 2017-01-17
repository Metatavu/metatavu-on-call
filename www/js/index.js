(function () {
  'use strict';

  $(document).on('deviceready', $.proxy(function () {

    $('.duty-btn').click(function () {
      if ($(this).hasClass('on-duty')) {
        $(document).trigger('went-off-duty');
      } else {
        $(document).trigger('went-on-duty');
      }
    });

    $(document).on('went-off-duty', function () {
      $('.duty-btn').removeClass('on-duty');
      $('.duty-btn').addClass('off-duty');
      $('.duty-text').text('off-duty');
      FCMPlugin.unsubscribeFromTopic('onduty');
      window.localStorage.setItem('status', 'offduty');
    });

    $(document).on('went-on-duty', function () {
      $('.duty-btn').removeClass('off-duty');
      $('.duty-btn').addClass('on-duty');
      $('.duty-text').text('on-duty');
      FCMPlugin.subscribeToTopic('onduty');
      window.localStorage.setItem('status', 'onduty');
    });

    FCMPlugin.onNotification(function (data) {
      if (data.wasTapped) {
        //Notification was received on device tray and tapped by the user.
        alert(JSON.stringify(data));
      } else {
        //Notification was received in foreground. Maybe the user needs to be notified.
        alert(JSON.stringify(data));
      }
    });

    var status = window.localStorage.getItem('status');
    if (!status) {
      status = 'offduty';
    }
    if (status == 'offduty') {
      $(document).trigger('went-off-duty');
    } else {
      $(document).trigger('went-on-duty');
    }

  }, this));

})();