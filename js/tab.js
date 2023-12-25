let tabName = document.querySelector("#tabNav");//获取tabNav选择器 赋值给tabName
/* console.log(tabName); */
let lis = tabName.querySelectorAll("li");//获取tabName中所有的li

let items = document.querySelectorAll(".item");//获取item选择器
//items.forEach(value=>console.log(value));//测试是否获取到该选择器

for (let i = 0; i < lis.length; i++) {//遍历数组tabnav中的li
	lis[i].onclick = function () {//给i索引的li增加点击触发事件
		lis.forEach(value => { value.className = ''; });//给所有li的样式设为空，即取消原有样式
		lis[i].className = 'active';//把当前遍历到的li设置为active样式

		items.forEach(value => { value.className = 'item' });//设置点击的时候item内容都隐藏
		items[i].className = 'item show';//设置该遍历的索引显示该内容
	}
}