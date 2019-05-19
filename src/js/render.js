(function($,root){
    //实现整个页面渲染
    //模块化，封闭作用域,把root暴露出去
    function renderImg(src){
        console.log(src)
        var img = new Image();
        img.src = src;
        img.onload = function(){
            $('.img-box img').attr('src',src);
            root.blurImg(img, $('body'));
        } 
    }
    function renderInfo(info){
        var str = `<div class="song-name">${info.song}</div>
                   <div class="singer-name">${info.singer}</div>
                   <div class="album-name">${info.album}</div>`;
        $('.song-info').html(str);

        $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            'transform':'rotateZ(0deg)',
            'transition':'none'
        })
    }
    function renderIsLike(like){
        if(like){
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }
    
    root.render = function(data){
        console.log(data.image)
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
    root.renderIsLike = renderIsLike;
})(window.Zepto,window.player || (window.player = {}));//要多次调用，传参数,模块化增强
