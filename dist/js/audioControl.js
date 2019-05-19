(function($,root){
    //控制音频
    //播放，暂停，加载音乐
    //play <-标记状态和歌的操作-> pause getAudio-->获取音频，播放
    function AudioManager(){
        //控制音频状态管理实例
        this.audio = new Audio();
        //音频默认状态
        this.status = "pause";
    }
    AudioManager.prototype = {
        play:function(){
            this.audio.play();
            this.status = "play";
        },
        pause:function(){
            this.audio.pause();
            this.status = "pause";
        },
        getAudio:function(src){
            this.audio.src = src;
            this.audio.load();//只加载，不播放；
        },
        playTo:function(time){
            //跳到拖拉的时间，播放音乐
            // Uncaught (in promise) DOMException谷歌浏览器js报错分析
            this.audio.currentTime = time;
            this.audio.play()
        }
    }
    root.audioManager = new AudioManager();

})(window.Zepto,window.player || (window.player = {}));
