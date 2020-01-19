$(function(){
  function buildHTML(message) {
    if ( message.image ){
      var html = `<div class="message__box">
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
                    <img class="message__box__image" src=${message.image} alt="181122 29 21 2">
                    </div>`
      return html;
    }else{
      var html = `<div class="message__box">
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
                  </div>`
      return html;
    };
  }
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
});