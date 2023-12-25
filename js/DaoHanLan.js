// 获取导航栏元素
var header = document.querySelector('.header');

// 监听滚动事件
window.addEventListener('scroll', function () {
    // 判断滚动距离是否大于等于导航栏高度
    if (window.pageYOffset >= header.offsetHeight) {
        // 如果是，则添加吸顶样式
        header.classList.add('fixed-top');
    } else {
        // 如果不是，则移除吸顶样式
        header.classList.remove('fixed-top');
    }
});