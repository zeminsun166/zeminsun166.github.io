/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $hlinks = $('#site-nav .hidden-links');

var breaks = [];

// 将breaks数组暴露到全局作用域，以便外部重置
window.breaks = breaks;

// 检测是否为移动设备
function isMobile() {
  return window.innerWidth <= 768;
}

function updateNav() {
  // 移动端特殊处理
  if (isMobile()) {
    // 移动端始终显示按钮，但根据内容决定是否显示折叠框
    if (!$btn.hasClass('hidden')) {
      $btn.removeClass('hidden');
    }
    
    // 检查是否需要显示折叠框
    var hasHiddenItems = $hlinks.children().length > 0;
    if (hasHiddenItems) {
      $hlinks.removeClass('hidden');
    } else {
      $hlinks.addClass('hidden');
    }
    
    // 移动端不需要复杂的宽度计算，直接返回
    return;
  }

  var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;

  // The visible list is overflowing the nav
  if($vlinks.width() > availableSpace) {

    // Record the width of the list
    breaks.push($vlinks.width());

    // Move item to the hidden list
    $vlinks.children().last().prependTo($hlinks);

    // Show the dropdown btn
    if($btn.hasClass('hidden')) {
      $btn.removeClass('hidden');
    }

  // The visible list is not overflowing
  } else {

    // There is space for another item in the nav
    if(availableSpace > breaks[breaks.length-1]) {

      // Move the item to the visible list
      $hlinks.children().first().appendTo($vlinks);
      breaks.pop();
    }

    // Hide the dropdown btn if hidden list is empty
    if(breaks.length < 1) {
      $btn.addClass('hidden');
      $hlinks.addClass('hidden');
    }
  }

  // Keep counter updated
  $btn.attr("count", breaks.length);

  // Recur if the visible list is still overflowing the nav
  if($vlinks.width() > availableSpace) {
    updateNav();
  }
}

// Window listeners

$(window).resize(function() {
  updateNav();
});

$btn.on('click', function() {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
});

// 初始化时调用一次
updateNav();

// 确保在DOM加载完成后再次调用
$(document).ready(function() {
  setTimeout(updateNav, 100);
});

// 监听窗口大小变化，确保响应式处理
$(window).on('orientationchange', function() {
  setTimeout(updateNav, 100);
});