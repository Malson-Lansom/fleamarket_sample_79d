$(document).on('turbolinks:load', function(){
  $(function(){

    //プレビューのhtmlを定義
    function buildHTML(count) {
      var html = `<div class="preview-box" id="preview-box__${count}">
                    <div class="upper-box">
                      <img src="" alt="preview">
                    </div>
                    <div class="lower-box">
                      <div class="delete-box" id="delete_btn_${count}">
                        <span>削除</span>
                      </div>
                    </div>
                  </div>`
      return html;
    }

    // 投稿編集時
    //items/:i/editページへリンクした際のアクション=======================================
    if (window.location.href.match(/\/products\/\d+\/edit/)){
      //登録済み画像のプレビュー表示欄の要素を取得する
      var prevContent = $('.label-content').prev();
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
      //プレビューにidを追加
      $('.preview-box').each(function(index, box){
        $(box).attr('id', `preview-box__${index}`);
      })
      //削除ボタンにidを追加
      $('.delete-box').each(function(index, box){
        $(box).attr('id', `delete_btn_${index}`);
      })
      var count = $('.preview-box').length;
      //プレビューが5あるときは、投稿ボックスを消しておく
      if (count == 5) {
        $('.label-content').hide();
      }
    }
    //=============================================================================

    // ラベルのwidth操作
    function setLabel() {
      //プレビューボックスのwidthを取得し、maxから引くことでラベルのwidthを決定
      var prevContent = $('.label-content').prev();
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
    }

    // プレビューの追加
    $(document).on('change', '.hidden-field', function() {
      setLabel();
      //hidden-fieldのidの数値のみ取得
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      //labelボックスのidとforを更新
      $('.label-box').attr({id: `label-box--${id}`,for: `product_images_attributes_${id}_image`});
      //選択したfileのオブジェクトを取得
      var file = this.files[0];
      var reader = new FileReader();
      //readAsDataURLで指定したFileオブジェクトを読み込む
      reader.readAsDataURL(file);
      //読み込み時に発火するイベント
      reader.onload = function() {
        var image = this.result;
        //プレビューが元々なかった場合はhtmlを追加
        if ($(`#preview-box__${id}`).length == 0) {
          var count = $('.preview-box').length;
          var html = buildHTML(id);
          //ラベルの直前のプレビュー群にプレビューを追加
          var prevContent = $('.label-content').prev();
          $(prevContent).append(html);
        }
        //イメージを追加
        $(`#preview-box__${id} img`).attr('src', `${image}`);
        var count = $('.preview-box').length;
        //プレビューが5個あったらラベルを隠す 
        if (count == 5) { 
          $('.label-content').hide();
        }

        //プレビュー削除したフィールドにdestroy用のチェックボックスがあった場合、チェックを外す=============
        if ($(`#product_images_attributes_${id}__destroy`)){
          $(`#product_images_attributes_${id}__destroy`).prop('checked',false);
        } 
        //=============================================================================

        //ラベルのwidth操作
        setLabel();
        //ラベルのidとforの値を変更
        if(count < 5){
          //プレビューの数でラベルのオプションを更新する
          $('.label-box').attr({id: `label-box--${count}`,for: `product_images_attributes_${count}_image`});
        }
      }
    });

    // 画像の削除
    $(document).on('click', '.delete-box', function() {
      var count = $('.preview-box').length;
      setLabel(count);
      //product_images_attributes_${id}_image から${id}に入った数字のみを抽出
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      //取得したidに該当するプレビューを削除
      $(`#preview-box__${id}`).remove();
      //新規登録時と編集時の場合分け==========================================================

      //新規投稿時
      //削除用チェックボックスの有無で判定
      if ($(`#product_images_attributes_${id}__destroy`).length == 0) {
        //フォームの中身を削除 
        $(`#product_images_attributes_${id}_image`).val("");
        var count = $('.preview-box').length;
        //5個めが消されたらラベルを表示
        if (count == 4) {
          $('.label-content').show();
        }
        setLabel(count);
        if(id < 5){
          $('.label-box').attr({id: `label-box--${id}`,for: `product_images_attributes_${id}_image`});

        }
      } else {

        //投稿編集時
        $(`#product_images_attributes_${id}__destroy`).prop('checked',true);
        //5個めが消されたらラベルを表示
        if (count == 4) {
          $('.label-content').show();
        }

        //ラベルのwidth操作
        setLabel();
        //ラベルのidとforの値を変更
        //削除したプレビューのidによって、ラベルのidを変更する
        if(id < 5){
          $('.label-box').attr({id: `label-box--${id}`,for: `product_images_attributes_${id}_image`});
        }
      }
    });
    // 手数料・利益の自動計算＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    // 新規投稿時
    $('#InputPrice').change(function() {
      var a = $('#InputPrice').val();
      var b = a * 0.1
      var tax = b.toLocaleString();
      $('#tax').html("¥" + tax)
    });
    $('#InputPrice').change(function() {
      var c = $('#InputPrice').val();
      var d = c * 0.1
      var f = c - d
      var profit = f.toLocaleString();
      $('#profit').html("¥" + profit)
    });

    // 商品編集時
    $('#InputPrice').change(function() {
      var a = $('#InputPrice').val();
      var b = a * 0.1
      var c = Math.round(b)
      var tax = c.toLocaleString();
      $('#tax').html("¥" + tax)
    });
    $('#InputPrice').change(function() {
      var d = $('#InputPrice').val();
      var f = d * 0.1
      var g = Math.round(f)
      var h = d - g
      var profit = h.toLocaleString();
      $('#profit').html("¥" + profit)
    });
  });
})