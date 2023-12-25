let users = [{ name: '高启强', pwd: '111' }, { name: '刘华强', pwd: '111' }, { name: '陈浩南', pwd: '111' }];
let gly = [{ name: '秋刀鱼', pwd: '123' }, { name: '小付', pwd: '123' }]

let username = document.getElementById("username");
let pwd = document.getElementById("pwd");
let btn = document.getElementById("log");

/* 点击按钮后触发声明 */
btn.onclick = function () {
	/* 遍历两个数组 */
	let ret = users.some(function (value) {
		return value.name == username.value && value.pwd == pwd.value;
	});

	let gly1 = gly.some(function (value) {
		return value.name == username.value && value.pwd == pwd.value;
	});

	/* 判断键盘获取用户名和密码是否注册了并存储在了locaStorage中 */
	if (username.value == localStorage.getItem('username1') && pwd.value == localStorage.getItem('pwd1')) {
		alert("用户登入成功");
		window.location.href = "../index.html"
		/* 判断是否是预设账户 并判断是用户或管理分别跳转 */
	} else if (ret) {
		alert("用户登入成功");
		window.location.href = "181.html"

	} else if (gly1) {
		alert("管理员登入成功");
		window.location.href = "GuanLi.html"
	} else {/* 输入错误 */
		alert("输入正确用户名和密码");
	}
}


