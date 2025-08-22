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

// 初始化移动端导航状态
function initMobileNav() {
  if (!isMobile()) return;
  
  // 强制设置初始状态
  $hlinks.addClass('hidden');
  $btn.removeClass('close');
  
  // 确保CSS样式正确应用
  $hlinks.css({
    'display': 'none',
    'visibility': 'hidden',
    'opacity': '0',
    'pointer-events': 'none'
  });
  
  console.log('Mobile navigation initialized - folded state enforced with CSS');
}

// 移动端特殊处理函数
function handleMobileNav() {
  if (!isMobile()) return;
  
  // 移动端：检查是否有真正的导航项（不是语言切换器）
  var hasRealNavItems = false;
  $hlinks.children().each(function() {
    if (!$(this).hasClass('language-switcher')) {
      hasRealNavItems = true;
      return false; // 跳出循环
    }
  });
  
  // 根据是否有真正的导航项来决定按钮的显示状态
  if (hasRealNavItems) {
    // 有导航项时显示按钮，但折叠框保持隐藏状态（直到用户点击）
    if ($btn.hasClass('hidden')) {
      $btn.removeClass('hidden');
    }
    // 重要：不要自动显示折叠框，保持用户点击前的状态
    if (!$hlinks.hasClass('hidden') && !$btn.hasClass('close')) {
      $hlinks.addClass('hidden');
    }
  } else {
    // 没有导航项时隐藏按钮和折叠框
    if (!$btn.hasClass('hidden')) {
      $btn.addClass('hidden');
    }
    if (!$hlinks.hasClass('hidden')) {
      $hlinks.addClass('hidden');
    }
  }
  
  console.log('Mobile navigation handled - real nav items:', hasRealNavItems, 'folded:', $hlinks.hasClass('hidden'));
}

function updateNav() {
  // 移动端特殊处理
  if (isMobile()) {
    // 先让原始的greedy navigation逻辑运行
    var availableSpace = $nav.width() - $btn.width() - 30;
    
    // 检查visible-links是否溢出
    if($vlinks.width() > availableSpace) {
      // 记录宽度
      breaks.push($vlinks.width());
      
      // 移动项目到hidden-links
      $vlinks.children().last().prependTo($hlinks);
      
      // 显示按钮
      if($btn.hasClass('hidden')) {
        $btn.removeClass('hidden');
      }
    } else {
      // 检查是否有空间放回项目
      if(availableSpace > breaks[breaks.length-1]) {
        $hlinks.children().first().appendTo($vlinks);
        breaks.pop();
      }
    }
    
    // 更新计数器
    $btn.attr("count", breaks.length);
    
    // 应用移动端特殊处理
    handleMobileNav();
    
    // 如果还有溢出，递归调用
    if($vlinks.width() > availableSpace) {
      updateNav();
    }
    
    return;
  }

  // 桌面端使用原始逻辑
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
  setTimeout(function() {
    updateNav();
    initMobileNav(); // 初始化移动端状态
  }, 100);
});

// 监听窗口大小变化，确保响应式处理
$(window).on('orientationchange', function() {
  setTimeout(function() {
    updateNav();
    initMobileNav(); // 重新初始化移动端状态
  }, 100);
});