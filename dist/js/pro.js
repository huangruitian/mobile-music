(function ($, root) {
    //进度条模块
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var startTime,
        lastPer = 0;
    //渲染每一首歌总时间 duration
    function renderAllTime(time) {
        lastPer = 0;//切歌从00:00开始
        curDuration = time;
        //转换时间格式
        time = formatTime(time);
        console.log(time);
        $scope.find('.all-time').html(time);
        // $scope.find('.cur-time').html("00:00");
    }
    //转换时间格式    
    function formatTime(t) {
        t = Math.round(t);//取整
        var m = Math.floor(t / 60);
        var s = t % 60;
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        return m + ':' + s;
    }
    //开始时间
    function start(p) {
        lastPer = p == undefined ? lastPer : p;
        //根据总时间，和系统时间，算出百分比
        startTime = new Date().getTime();
        //死循环
        function frame() {
            var curTime = new Date().getTime();
            //当前歌曲播放百分比，等于上一次暂停的百分比
            var percent = lastPer + (curTime - startTime) / (curDuration * 1000);
            if (percent <= 1) {
                update(percent);
                frameId = requestAnimationFrame(frame);
            } else {
                //歌放完了
                cancelAnimationFrame(frameId);
                $scope.find('.pro-top').css({
                    transform: 'translateX(0)',
                });
                //继续放下一首
                $scope.find('.next').trigger('click');
            }
        }
        frame();
    }
    //停止计时
    function stop() {
        cancelAnimationFrame(frameId);
        //记录当前停止的时间,用百分比
        var stopTime = new Date().getTime();
        //停止的时候应该加上上一次停止的百分比
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
    }
    //更新区域 左侧时间+进度条运动
    function update(per) {
        var curTime = curDuration * per;
        curTime = formatTime(curTime);
        $scope.find('.cur-time').html(curTime);
        var perX = (per - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            transform: 'translateX(' + perX + ')',
        });
    }
    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update,
    }
})(window.Zepto, window.player || (window.player = {}));
