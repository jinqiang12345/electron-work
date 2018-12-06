const ipc = require('electron').ipcRenderer
const path = require('path')

document.getElementById('github').addEventListener('click', (event) => {
  ipc.send('github');
})
document.getElementById('wechat').addEventListener('click', (event) => {
  ipc.send('wechat');
})
document.getElementById('weibo').addEventListener('click', (event) => {
  ipc.send('weibo');
})
document.getElementById('youtube').addEventListener('click', (event) => {
  ipc.send('youtube');
})
gettdwidth();
function gettdwidth() {
  var td = $(".fixtabletd");
  var totalwidth = 0;
  var th = $(".fixtableth");
  var bool = false;
  var height = $(".tablebody").height();
  var tableheight = $("#tablebodyc").height();
  if(height < tableheight) {
    bool = true;
  }
  for (var i = 0; i < th.length; i++) {
    if(i == th.length - 1 && bool) {
      totalwidth += td.eq(i).width() + 20;
      th.eq(i).css("width", (td.eq(i).width() + 20));
    } else {
      totalwidth += td.eq(i).width() + 16;
      th.eq(i).css("width", (td.eq(i).width() + 16));
    }
  }
  $(".tablehead").css("width", totalwidth + 1);
}
$(window).resize(function() {
  gettdwidth();
}); 
$(".baritem").on("click", function() {
  $(".baritemon").removeClass("baritemon");
  $(this).addClass("baritemon");
})  