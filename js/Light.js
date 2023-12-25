$(document).ready(function () {
    // 获取site-logo元素
    var siteLogo = $('.beijing');

    // 为site-logo添加点击事件
    siteLogo.on('click', function () {
        // 判断当前背景颜色是否为黑色
        // if ($(this).css('background-color') === 'rgb(0, 0, 0)') {
        // 如果为黑色，则将背景颜色设置为粉色
        // $(this).css('background-color', 'pink');
        // } else {
        // 如果为其他颜色，则将背景颜色设置为黑色
        // $(this).css('background-color', 'black');
        // }
        var randomColorIndex = Math.floor(Math.random() * 3);
        var colors = ['white', 'pink', 'lightblue'];
        // 根据随机数设置背景颜色
        $(this).css('background-color', colors[randomColorIndex]);
    });
});

