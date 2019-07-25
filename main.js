$('#start').on('click',function(){
    $('.description').hide('slow');
    $('.uploaddisplay').show('slow');
});

//ドロップ範囲のみcursorがcopyになる
$(document).on('dragover', function(e){
    switch(e.target.className){
        case 'dragspace':
            e.stopPropagation();
            e.preventDefault();
            e.originalEvent.dataTransfer.dropEffect = 'copy';
            break;
        default:
            e.stopPropagation();
            e.preventDefault();
    }
});

let image = new Image();;
let original_width;
let original_height;
//ドロップ範囲にドロップされると次の画面に画像出力・遷移
$(document).on('drop ', function(e){
    switch(e.target.className){
        case 'dragspace':
            e.stopPropagation();
            e.preventDefault();
            $('.uploaddisplay').hide('slow');
            $('.editdisplay').show('slow');
            let reader = new FileReader();
            reader.onload = function(){
                image.src = reader.result; 
                $('#upimg').attr('src', reader.result);
                if (image.width > image.height){
                    let height = (500 / image.width) * image.height;
                    $('#upimg').css({
                        'height': height+'px',
                        'width': '500px'
                    });
                }
                else {
                    let width = (500 / image.height) * image.width;
                    $('#upimg').css({
                        'height': '500px',
                        'width': width+'px'
                    });
                }
            }
            reader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
            break;
        default:
            e.stopPropagation();
            e.preventDefault();
    }
});

//ファイルを選択されると次の画面に画像出力・遷移
$('#file_photo').on('change', function(){
    let file = this.files[0];
    if(file != null){
        $('.uploaddisplay').hide('slow');
        $('.editdisplay').show('slow');
        let reader = new FileReader();
        reader.onload = function(){
            image.src = reader.result;
            $('#upimg').attr('src', reader.result);
            if (image.width > image.height){
                let height = (500 / image.width) * image.height;
                $('#upimg').css({
                    'height': height+'px',
                    'width': '500px'
                });
            }
            else {
                let width = (500 / image.height) * image.width;
                $('#upimg').css({
                    'height': '500px',
                    'width': width+'px'
                });
            }
        }
        reader.readAsDataURL(file);
    }
});

$img = $('#upimg');
$img.originSrc = $img.src;
$img.src = "";

let img_width;
let img_height;
let canvas;
let context;
let src;
let src_original;
let callback_counter = 0;
// コールバックを設定
$img.bind('load', function(){
    callback_counter += 1;
    img_width = $('#upimg').width();
    img_height = $('#upimg').height();
    image = new Image();
    image.src = $('#upimg').attr('src');
    original_width = image.width;
    original_height = image.height;

    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    canvas.width = original_width;
    canvas.height = original_height;
    image.onload = function() {
        context.drawImage(image, 0, 0);
        src = context.getImageData(0,0,original_width,original_height);
        if (callback_counter == 1){
            src_original = $.extend([], src.data);
        }
    }
});


//RGBA値のrangeバーとその右に位置する数字入力欄とのシンクロ
$(document).on('input', function(e){
    switch(e.target.id){
        case 'rnum':
            $('#rrange').val( $('#rnum').val() );
            break;
        case 'gnum':
            $('#grange').val( $('#gnum').val() );
            break;
        case 'bnum':
            $('#brange').val( $('#bnum').val() );
            break;
        case 'anum':
            $('#arange').val( $('#anum').val() );
            break;
        case 'rrange':
            $('#rnum').val( $('#rrange').val() );
            break;
        case 'grange':
            $('#gnum').val( $('#grange').val() );
            break;
        case 'brange':
            $('#bnum').val( $('#brange').val() );
            break;
        case 'arange':
            $('#anum').val( $('#arange').val() );
            break;
        default:
    }
});

let array;
let src_copy;
//RGBA値の適応
$(document).on('change', function(e){
    switch(e.target.id){
        case 'rnum':
            try{
                src_copy =  $.extend([], src_original);
                array = src_copy.filter(function(element, index, array) {
                    return (index % 4 == 0);
                }).map(function(element, index, array) {
                    return element + Number( $('#rnum').val() );
                });
                for (let i = 0; i < src.data.length/4; i++){
                    src.data[i*4] = array[i];
                }
                context.putImageData(src, 0, 0); //rgba値変更後に画像データの更新
                $('#upimg').attr('src', canvas.toDataURL());
                break;
            } catch (err) {
                break;
            }
            break;

        case 'gnum':
            try{
                src_copy =  $.extend([], src_original);
                array = src_copy.filter(function(element, index, array) {
                    return (index % 4 == 1);
                }).map(function(element, index, array) {
                    return element + Number( $('#gnum').val() );
                });
                for (let i = 0; i < src.data.length/4; i++){
                    src.data[i*4+1] = array[i];
                }
                context.putImageData(src, 0, 0); //rgba値変更後に画像データの更新
                $('#upimg').attr('src', canvas.toDataURL());
                break;
            } catch (err) {
                break;
            }
            break;

        case 'bnum':
            try{
                src_copy =  $.extend([], src_original);
                array = src_copy.filter(function(element, index, array) {
                    return (index % 4 == 2);
                }).map(function(element, index, array) {
                    return element + Number( $('#bnum').val() );
                });
                for (let i = 0; i < src.data.length/4; i++){
                    src.data[i*4+2] = array[i];
                }
                context.putImageData(src, 0, 0); //rgba値変更後に画像データの更新
                $('#upimg').attr('src', canvas.toDataURL());
                break;
            } catch (err) {
                break;
            }
            break;

        case 'anum':
            try{
                src_copy =  $.extend([], src_original);
                array = src_copy.filter(function(element, index, array) {
                    return (index % 4 == 3);
                }).map(function(element, index, array) {
                    return element - Number( $('#anum').val() );
                });
                for (let i = 0; i < src.data.length/4; i++){
                    src.data[i*4+3] = array[i];
                }
                context.putImageData(src, 0, 0); //rgba値変更後に画像データの更新
                $('#upimg').attr('src', canvas.toDataURL());
                break;
            } catch (err) {
                break;
            }
            break;

        case 'rrange':
            try{
                src_copy =  $.extend([], src_original);
                array = src_copy.filter(function(element, index, array) {
                    return (index % 4 == 0);
                }).map(function(element, index, array) {
                    return element + Number( $('#rnum').val() );
                });
                for (let i = 0; i < src.data.length/4; i++){
                    src.data[i*4] = array[i];
                }
                context.putImageData(src, 0, 0); //rgba値変更後に画像データの更新
                $('#upimg').attr('src', canvas.toDataURL());
                break;
            } catch (err) {
                break;
            }
            break;
            
        case 'grange':
            try{
                src_copy =  $.extend([], src_original);
                array = src_copy.filter(function(element, index, array) {
                    return (index % 4 == 1);
                }).map(function(element, index, array) {
                    return element + Number( $('#gnum').val() );
                });
                for (let i = 0; i < src.data.length/4; i++){
                    src.data[i*4+1] = array[i];
                }
                context.putImageData(src, 0, 0); //rgba値変更後に画像データの更新
                $('#upimg').attr('src', canvas.toDataURL());
                break;
            } catch (err) {
                break;
            }
            break;

        case 'brange':
            try{
                src_copy =  $.extend([], src_original);
                array = src_copy.filter(function(element, index, array) {
                    return (index % 4 == 2);
                }).map(function(element, index, array) {
                    return element + Number( $('#bnum').val() );
                });
                for (let i = 0; i < src.data.length/4; i++){
                    src.data[i*4+2] = array[i];
                }
                context.putImageData(src, 0, 0); //rgba値変更後に画像データの更新
                $('#upimg').attr('src', canvas.toDataURL());
                break;
            } catch (err) {
                break;
            }
            break;

        case 'arange':
            try{
                src_copy =  $.extend([], src_original);
                array = src_copy.filter(function(element, index, array) {
                    return (index % 4 == 3);
                }).map(function(element, index, array) {
                    return element - Number( $('#anum').val() );
                });
                for (let i = 0; i < src.data.length/4; i++){
                    src.data[i*4+3] = array[i];
                }
                context.putImageData(src, 0, 0); //rgba値変更後に画像データの更新
                $('#upimg').attr('src', canvas.toDataURL());
                break;
            } catch (err) {
                break;
            }
            break;
        default:
    }
});

let canvas_url;
//ペン編集ボタン押されたらモーダルウィンドウ表示
$('#pen').on('click', function(){
    $(this).blur(); //ボタンからフォーカスを外す
    if($( '.modal-overlay')[0]) return false; //新たにオーバーレイが追加されるのを防ぐ
    $('body').append('<div class="modal-overlay"></div>'); //オーバーレイ用のHTMLをbody内に追加
    $('.modal-overlay').fadeIn('slow'); //オーバーレイの表示
    $('#myCanvas').attr('src', canvas.toDataURL());
    $('.modal').fadeIn('slow'); //モーダルウインドウの表示
 
    //編集前のcanvas情報保存
    canvas_url = canvas.toDataURL();

    //モーダルウインドウを保存して終了
    $('.modal-close').unbind().click(function(){
        $('#upimg').attr('src', canvas.toDataURL());
        $('.modal, .modal-overlay').fadeOut('slow', function(){ //閉じるボタンかオーバーレイ部分クリックでフェードアウト
            $('.modal-overlay').remove(); //フェードアウト後、オーバーレイをHTMLから削除
        });
    });

    //モーダルウインドウを保存して終了
    $('.modal-overlay').unbind().click(function(){
        $('#upimg').attr('src', canvas_url);
        $('.modal, .modal-overlay').fadeOut('slow', function(){ //閉じるボタンかオーバーレイ部分クリックでフェードアウト
            $('.modal-overlay').remove(); //フェードアウト後、オーバーレイをHTMLから削除
        });
    });
});

//初期値（サイズ、色、アルファ値）の決定
let defosize = 7;
let defocolor = "#000";
let defoalpha = 1.0;

//マウス継続値の初期値、ここがポイント
let mouseX = "";
let mouseY = "";

$('#myCanvas').on('mousemove mousedown', function(e){
    if (e.buttons === 1 || e.witch === 1) {
        var rect = e.target.getBoundingClientRect();
        var X = ~~(e.clientX - rect.left);
        var Y = ~~(e.clientY - rect.top);
        //draw 関数にマウスの位置を渡す
        draw(X, Y);
    }
});

$('#myCanvas').on('mouseup mouseout', function(){
    mouseX = "";
    mouseY = "";
});

function draw(X, Y) {
    context.beginPath();
    context.globalAlpha = defoalpha;
    //マウス継続値によって場合分け、直線の moveTo（スタート地点）を決定
    if (mouseX === "") {
        //継続値が初期値の場合は、現在のマウス位置をスタート位置とする
        context.moveTo(X, Y);
    } else {
        //継続値が初期値ではない場合は、前回のゴール位置を次のスタート位置とする
        context.moveTo(mouseX, mouseY);
    }
    //lineTo（ゴール地点）の決定、現在のマウス位置をゴール地点とする
    context.lineTo(X, Y);
    //直線の角を「丸」、サイズと色を決める
    context.lineCap = "round";
    context.lineWidth = defosize * 2;
    context.strokeStyle = defocolor;
    context.stroke();
    //マウス継続値に現在のマウス位置、つまりゴール位置を代入
    mouseX = X;
    mouseY = Y;
}

//menuiconの処理
$(document).on('click', function(e){
    switch(e.target.className){
        case "menuicon":
            switch(e.target.id){
                case "clear":
                    $('#upimg').attr('src', canvas_url);
                    break;
                case "alpha":
                    let offset = $('#alpha').offset();
                    $('#hiddenalpha').show('slow');
                    $('#alpha1').css({'top':'50','left':'50'});
                    $('#alpha2').css({'top':offset.top+20,'left':offset.left});
                    $('#alpha3').css({'top':offset.top+30,'left':offset.left});
                    break;
                case "size":
                    break;
                default:
                    defocolor = "#" + e.target.id;
            }
            break;
        default:
    }
})



$('#save').on('click', function(){
    $('#save').attr({
        'href':canvas.toDataURL(),
        'download':'edited.png'
    });
});


















