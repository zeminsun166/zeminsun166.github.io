// 获取按钮和内容区域
const switchToZh = document.getElementById('switch-to-zh');
const switchToEn = document.getElementById('switch-to-en');
const contentArea = document.querySelector('.page__content');

// 点击中文按钮时加载中文内容
switchToZh.addEventListener('click', function(event) {
event.preventDefault();

// 动态加载中文页面内容
fetch('/about/zh/')
    .then(response => response.text())
    .then(data => {
    contentArea.innerHTML = data; // 插入中文页面内容
    })
    .catch(error => console.log('Error:', error));
});

// 点击英文按钮时加载英文内容
switchToEn.addEventListener('click', function(event) {
event.preventDefault();

// 动态加载英文页面内容
fetch('/about/en/')
    .then(response => response.text())
    .then(data => {
    contentArea.innerHTML = data; // 插入英文页面内容
    })
    .catch(error => console.log('Error:', error));
});