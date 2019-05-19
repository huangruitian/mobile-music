var root = window.player;
var $scope = $(document.body);
var dataList;
var len;
var audio = root.audioManager;
var control;//控制索引
var timer;
//取到数据，渲染页面
function getData(url) {
    // $.ajax({
    //     type: "GET",
    //     url: url,
    //     success: function (data) {
            bindEvent();
            bindTouch();
            dataList = [
                {
                    "image": "./source/song_1.jpg",
                    "audio": "./source/song_1.mp3",
                    "song": "丑八怪",
                    "album": "意外",
                    "singer": "薛之谦",
                    "duration": 253,
                    "isLike": true
                },
                {
                    "image": "./source/song_2.jpg",
                    "audio": "./source/song_2.mp3",
                    "song": "小半",
                    "album": "小梦大半",
                    "singer": "陈粒",
                    "duration": 297,
                    "isLike": false
                },
                {
                    "image": "./source/song_3.jpg",
                    "audio": "./source/song_3.mp3",
                    "song": "Shape of You",
                    "album": "÷",
                    "singer": "ed sheeran",
                    "duration": 235,
                    "isLike": false
                }
            ];
            len = dataList.length;
            root.render(dataList[0]);
            control = new root.ControlIndex(len);
            $scope.trigger("play:change", 0);
        // },
        // error: function () {
        //     console.log("error");
        // }
    // })
}
//实现拖拽
function bindTouch() {
    var $slider = $scope.find('.slider-point');
    var offset = $scope.find('.pro-bottom').offset();
    var left = offset.left;
    var width = offset.width;
    $slider.on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        //拿到X轴距离,算百分比
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per <= 1) {
            root.pro.update(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        //防止用户猛拉
        if (per < 0) {
            //上一首
            $scope.find('.prev').trigger('click');
        } else if (per > 1) {
            //继续放下一首
            $scope.find('.next').trigger('click');
        }
        console.log(per)
        if (per > 0 && per < 1) {
            var curTime = per * dataList[control.index].duration;
            audio.playTo(curTime);
            $scope.find('.play').addClass('playing');
            //再一次开始，音频的状态也应该变为播放；
            root.pro.start(per);
            audio.play();
            // 图片也继续转
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        }
    });
}
function bindEvent() {
    //自定义事件
    $('body').on('play:change', function (e, index) {
        audio.getAudio(dataList[index].audio);
        if (audio.status == 'play') {
            audio.play();
            // root.pro.start(0);
            rotated(0);
        }
        root.pro.renderAllTime(dataList[index].duration);
        root.render(dataList[index]);

    });
    $('.prev').on('click', function () {
        var index = control.prev();
        root.pro.start(0);
        $('body').trigger("play:change", index);
    });
    $('.next').on('click', function () {
        var index = control.next();
        root.pro.start(0);
        $('body').trigger("play:change", index);
    });
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        } else {
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    });
    $('.like').on('click', function () {
        var like = dataList[control.index].isLike;
        dataList[control.index].isLike = !like
        root.renderIsLike(dataList[control.index].isLike);
    })
}
function rotated(deg) {
    //防止定时器叠加
    clearInterval(timer);
    deg = +deg;//字符串转整型
    timer = setInterval(function () {
        deg += 5;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transition': 'all 1s ease-out'
        })
    }, 200);
}

getData("../mock/data.json");


//模块化开发，先确认模块，然后每个模块只关注自己的功能，暴露一个接口
//信息加图片渲染到页面上 render();
//点击按钮
//音频的播放与暂停  切歌
//进度条的运动和拖拽
//图片旋转
//列表切歌(index 对应)

