"use strict";function _defineProperty(e,i,t){return i in e?Object.defineProperty(e,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[i]=t,e}jQuery(function(e){e("#head").load("./html/header.html"),e("#foots").load("./html/footer.html");var t=new Swiper(".swiper-container",(_defineProperty(e={autoplay:!0,loop:!0,initialSlide:0},"autoplay",{disableOnInteraction:!1}),_defineProperty(e,"pagination",{el:".swiper-pagination",clickable:!0}),e));for(i=0;i<t.pagination.bullets.length;i++)t.pagination.bullets[i].onclick=function(){this.click()}});