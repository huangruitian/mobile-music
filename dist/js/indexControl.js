(function($,root){
    //控制音频
    function Control(len){
       this.index = 0;
       this.len = len;
    }
    Control.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(+1);            
        },
        getIndex:function(val){
            var index = this.index;
            var len = this.len;
            //小技巧
            var curIndex = (index + val + len) % len;
            //要更新索引
            this.index = curIndex;
            return curIndex;
        }
    }
    root.ControlIndex = Control;
})(window.Zepto,window.player || (window.player = {}));
