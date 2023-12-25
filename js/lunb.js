var index = 0;
var imglist = document.getElementById('imglist');
var btnlist = document.getElementById('btnlist');
var arrbtn = btnlist.getElementsByTagName('li');
/* 2秒轮播 */
function btnchange(index) {
    for (var i = 0; i < 5; i++) {
        if (i == index) {
            arrbtn[i].style.backgroundColor = 'pink';
        }
        else {
            arrbtn[i].style.backgroundColor = 'rgba(0,0,0,0.2)';
        }
    }
}

for (var i = 0; i < 5; i++) {
    arrbtn[i].num = i;
    arrbtn[i].onmouseover = function () {
        index = this.num;
        imglist.style.left = index * (-1000) + 'px';
        clearInterval(t);
        btnchange(index);
        this.onmouseout = function () {
            t = setInterval(imgchange, 2000);
        }
    }

}

function imgchange() {
    if (index == 4)
        index = -1;
    index++;
    imglist.style.left = index * (-1000) + 'px';
    btnchange(index);
}
var t = setInterval(imgchange, 2000);