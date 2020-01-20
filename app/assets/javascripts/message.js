$(function(){
  var buildHTML = function (message) {
    if ( message.content && message.image ) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__box">
                      <div class="message__box__upper-info">
                        <p class="message__box__upper-info__name">
                          ${message.user_name}
                        </p>
                        <p class="message__box__upper-info__date">
                          ${message.created_at}
                        </p>
                      </div>
                      <div class="message__box__text">
                        <p class="message__box__text__content"></p>
                          ${message.content}
                      </div>
                      <img class="message__box__image" src=${message.image} >
                    </div>
                  </div>`
    } else if (message.content){
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__box">
                      <div class="message__box__upper-info">
                        <p class="message__box__upper-info__name">
                          ${message.user_name}
                        </p>
                        <p class="message__box__upper-info__date">
                          ${message.created_at}
                        </p>
                      </div>
                      <div class="message__box__text">
                        <p class="message__box__text__content">
                          ${message.content}
                        </p>
                      </div>
                    </div>
                  </div>`
    } else if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__box">
                      <div class="message__box__upper-info">
                        <p class="message__box__upper-info__name">
                          ${message.user_name}
                      </p>
                        <p class="message__box__upper-info__date">
                          ${message.created_at}
                        </p>
                      </div>
                      <img class="message__box__image" src=${message.image} >
                    </div>
                  </div>`
      
    };
    return html;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
      $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.input--box')[0].reset('');
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    })
    .always(function() {
      $('.submit_btn').prop('disabled', false);
    });
  });
  var reloadMessages = function(){
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function (messages) {
      if (messages.length !== 0){
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});