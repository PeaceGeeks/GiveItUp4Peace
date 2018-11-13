$( document ).ready(function() {

  // Leaderboard
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  var movementCampaignIds = [
    "1209",
    "1236",
    "1237",
    "1238",
    "1245",
    "1248",
    "1249",
    "1251",
    // "1259", // hide Unbounce
    "1261",
    "1262",
    // "1263", //hide Elastic Path
    "1264",
    "1272",
    "1273",
    "1277",
  ];
  // Array storing total donation amounts (including externals) and html string
  var teams = [];
  var totalRaised = 0;
  var totalMatched = 0;
  var totalRawRaised = 0;
  var matchCap = 25000;
  // Group ids (a subset)
  var affinityBridgeGID = 15630;
  var communityParticipantsGID = 14985;
  var peacegeeksGID = 14838;
  var blackFamilyGID = 15763;
  var hiveGID = 14972;
  var airbnbGID = 15640;
  var friasGID = 15745;
  var leftGID = 14971;
  var flipboardGID = 15631;
  // Groups that need their donations adjusted
  var groupIdsForDonationAdjustments = [
    affinityBridgeGID,
    communityParticipantsGID,
    peacegeeksGID,
    blackFamilyGID,
    hiveGID,
    airbnbGID,
    friasGID,
    leftGID,
    flipboardGID,
  ];
  // Groups that shouldn't be public facing
  var groupIdBlacklist = [
    communityParticipantsGID,
  ];

  $.ajax({
    type: 'GET',
    url: 'https://chimp.net/api/v1/campaigns/stats?api_key=b80f1c6798efeaf85e92e2964d9b6a26c961be7c&campaign='+movementCampaignIds.join()+'&sort_by=money_raised&sort_desc=true',
    dataType: 'json',
    xhrFields: {
      withCredentials: false
    },
    success:function(response) {
      $.each(response, function (index, object) {
        var groupId = object.group_id;
        var chimpMoney = Number(object.money_raised);
        var groupTotal = 0;

        // Handle adjustments
        // Format: groupTotal = Online total with match + offline total with match
        if (groupIdsForDonationAdjustments.includes(groupId)) {
          if (groupId === affinityBridgeGID) {
            groupTotal = (chimpMoney * 2) + 1000;
          }
          if (groupId === communityParticipantsGID) {
            groupTotal = ((chimpMoney - 15) * 2) + 8014; 
          }
          if (groupId === peacegeeksGID) {
            groupTotal = ((chimpMoney - 120) * 2) + 3982.40;
          }
          if (groupId === blackFamilyGID) {
            groupTotal = (chimpMoney * 2) + 6060;
          }
          if (groupId === hiveGID) {
            groupTotal = (chimpMoney * 2) + 1560;
          }
          if (groupId === airbnbGID) {
            groupTotal = (chimpMoney * 2) + 6500;
          }
          if (groupId === friasGID) {
            groupTotal = (chimpMoney * 2) + 124;
          }
          if (groupId === leftGID) {
            groupTotal = (chimpMoney * 2);
          }
          if (groupId === flipboardGID) {
            groupTotal = (chimpMoney * 2) + 570;
          }
        } else {
          groupTotal = chimpMoney * 2;
        }
        // Update total
        totalMatched += groupTotal;
        totalRaised = totalMatched / 2 + 25850;
        totalRawRaised = totalRaised / 2;

        // Hack to customize campaign names
        var companyName = object.name.replace('#GiveItUp4Peace with', '').replace('!', '').replace('the', '');
        console.log(companyName + ': ' + groupTotal);
        // Store donation data
        if (!groupIdBlacklist.includes(groupId)) {
          teams.push({
            'groupTotal': groupTotal,
            'htmlString': '<a href="' + object.campaign_url + '" target="_blank"><div class="column-flex">' +
              '<img src="' + object.campaign_logo + '" alt="' + object.name + '" />' +
              '<h3>' + companyName + '</h3>' +
              '<span id="btn"><h2>$' + groupTotal + '</h2></span>' +
              '</div></a>'
          });
        }
      });

      const compareFn = function(first, second) {
        if (first.groupTotal > second.groupTotal) {
          return -1;
        }
        if(first.groupTotal < second.groupTotal) {
          return 1;
        }
        return 0;
      }
      teams.sort(compareFn);

      for (var i = 0; i < teams.length; i++) {
        $('.campaigns').append(teams[i].htmlString);
      }

      // Display final total
      var totalHtml = '<span class=campaign-total-color>$' + formatNumber(totalRaised) + '</span>';
      var rawHtml = totalRawRaised > matchCap ? '$' + formatNumber(matchCap) : '$' + formatNumber(totalRawRaised);
      $('.campaign-total').append(totalHtml);
      $('.campaign-total2').append(totalHtml);
      $('#raw-total').append(rawHtml);
    }
  });
});

/* Client Logo Slider */

$(document).ready(function(){
    $('.customer-logos').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      arrows: false,
      dots: false,
        pauseOnHover: false,
        responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 520,
        settings: {
          slidesToShow: 2
        }
      }]
    });
  });

/* FitVids
  ------------------------------------------------------ */
  $(document).ready(function(){
    // Target your .container, .wrapper, .post, etc.
    $(".fluid-video-wrapper").fitVids();
  });


  /*----------------------------------------------------*/
    /* ScrollMagic
    ------------------------------------------------------ */

  var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 500}});

  // build scenes
  new ScrollMagic.Scene({triggerElement: "#teams"})
          .setClassToggle("#high1", "active")
          // .addIndicators()
          .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#projects"})
          .setClassToggle("#high2", "active")
          // .addIndicators()
          .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#howitworks"})
          .setClassToggle("#high3", "active")
          // .addIndicators()
          .addTo(controller);
  new ScrollMagic.Scene({triggerElement: "#participant"})
          .setClassToggle("#high4", "active")
          // .addIndicators()
          .addTo(controller);

   /*----------------------------------------------------*/
  /* Adjust Primary Navigation Background Opacity
  ------------------------------------------------------*/
   $(window).on('scroll', function() {

    var h = $('header').height();
    var y = $(window).scrollTop();
    var header = $('#top-menu');
    var logo = $('#giu4p-logo')

     if ((y > h + 15 ) && ($(window).outerWidth() > 768 ) ) {
        header.addClass('opaque');
        logo.addClass('showlogo');
     }
      else {
         if (y < h + 30) {
            header.removeClass('opaque');
            logo.removeClass('showlogo');
         }
         else {
            header.addClass('opaque');
            logo.addClass('showlogo');
         }
      }

  });


  /*----------------------------------------------------*/
  /* Smooth Scrolling
  ------------------------------------------------------ */
  $('.smoothscroll').on('click', function (e) {

  e.preventDefault();

  var target = this.hash,
    $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 800, 'swing', function () {
      window.location.hash = target;
    });

  });


   /*-----------------------------------------------------*/
   /* Mobile Menu
   ------------------------------------------------------ */
    var menu_icon = $("<span class='menu-icon'>Menu</span>");
    var toggle_button = $("<a>", {
                        id: "toggle-btn",
                        html : "",
                        title: "Menu",
                        href : "#" }
                        );
    var nav_wrap = $('nav#nav-wrap')
    var nav = $("ul#nav");

   /* if JS is enabled, remove the two a.mobile-btns
    and dynamically prepend a.toggle-btn to #nav-wrap */
    nav_wrap.find('a.mobile-btn').remove();
    toggle_button.append(menu_icon);
    nav_wrap.prepend(toggle_button);

    toggle_button.on("click", function(e) {
    e.preventDefault();
      nav.slideToggle("fast");
    });

    if (toggle_button.is(':visible')) nav.addClass('mobile');
    $(window).resize(function() {
    if (toggle_button.is(':visible')) nav.addClass('mobile');
      else nav.removeClass('mobile');
    });

    $('ul#nav li a').on("click", function() {
    if (nav.hasClass('mobile')) nav.fadeOut('fast');
    });


/*-----------------------------------------------------*/
   /* TEXT ROTATOR
   ------------------------------------------------------ */

var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }

  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }

  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
    cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
    nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }

  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);


/* -- insta --*/
$(document).ready(function(){
  $.ajax({
    url: 'https://www.instagram.com/explore/tags/giveitup4peace/?__a=1',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function(data) {
      $(data.graphql.hashtag.edge_hashtag_to_media.edges).each(function(index, value) {
  // Filter out naughty lady using similar hashtag!
  if (value.node.owner.id != '2272528858') {
          $('#instafeed ul').append('<li class="list-inline-item insta-foto"><img class="img-fluid" src="'+value.node.thumbnail_resources[4].src+'"><a href="https://www.instagram.com/p/'+value.node.shortcode+'/" class="insta-description" target="_blank"><p> '+value.node.edge_media_to_caption.edges[0].node.text+'</p><small><i class="fas fa-heart"></i>  '+value.node.edge_liked_by.count+'&nbsp; <i class="fas fa-comment-alt"></i>  '+value.node.edge_media_to_comment.count+'</small></a></li>');
        }
      });
    }
  });
});


/* -- testimonials --*/
$(function() {

  var cdSlider = $(".testimonials"),
    wrapper = cdSlider.children('ul'),
    card = wrapper.find('li'),
    animationTime = 600; // Animation duration on IE9

  initSlider();

  function initSlider() {
    var sliderWidth = cdSlider.outerWidth(),
      cardWidth = card.eq(0).outerWidth(),
      marginLeftFirstCard = sliderWidth/2 - cardWidth/2, // Center first card
      marginLeft = marginLeftFirstCard - (cardWidth * 1/7) ;

    card.css('margin-left', marginLeft + 'px');
    card.eq(0).css('margin-left', marginLeftFirstCard + 'px');

    var wrapperWidth = (card.length * cardWidth) + ( (card.length - 1) * marginLeft ) + marginLeftFirstCard;

    if (card.length > 1) {
      wrapper.css('width', wrapperWidth + 'px');
    }

    var cardCurrentIndex = cdSlider.find('li.current_slide').index(),
      translate = ( cardCurrentIndex * (cardWidth + marginLeft) ) + 'px';

    move(translate);

  }

  // card.on('click', function() {
  //   var cardWidth = card.eq(0).outerWidth(),
  //     sliderWidth = cdSlider.outerWidth(),
  //     marginLeft = ( sliderWidth/2 - cardWidth/2 ) - (cardWidth * 1/7),
  //     translate = ( $(this).index() * ( cardWidth + marginLeft ) ) + 'px';
  //
  //   move(translate);
  //
  //
  //   $(this).addClass('current_slide').siblings().removeClass('current_slide');
  //
  //
  // });

    function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");

    if (Idx > 0) {
        var version = parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
        if (version == 9) {
          $("html").addClass('ie9');
        }
    }
  }

  GetIEVersion();

  function move(translate) {
    // IE 9
    if ($(".ie9").length > 0) {
      wrapper.animate({
        'margin-left': '-' + translate
      }, animationTime);
    } else {
      wrapper.css({
        '-webkit-transform': 'translateX(-' + translate + ')',
        'transform': 'translateX(-' + translate + ')'
      });
    }
  }

  $(window).on('resize', function() {
    initSlider();
  });

});

/* Gallery */
$(document).ready(function () {
  $(".gallery-img").click(function(){
    var t = $(this).attr("src");
    $(".modal-body").html("<img src='"+t+"' class='modal-img'>");
    $("#myModal").modal();
  });
});



/**
 * ===================================================================
 * javascript plugins
 *
 * -------------------------------------------------------------------
 */

/*! Lity - v1.6.6 - 2016-04-22
* http://sorgalla.com/lity/
* Copyright (c) 2016 Jan Sorgalla; Licensed MIT */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(c){return b(a,c)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=b(a,require("jquery")):a.lity=b(a,a.jQuery||a.Zepto)}("undefined"!=typeof window?window:this,function(a,b){"use strict";function c(){o[p>0?"addClass":"removeClass"]("lity-active")}function d(a){var c=b.Deferred();return w?(a.one(w,c.resolve),setTimeout(c.resolve,500)):c.resolve(),c.promise()}function e(a,c,d){if(1===arguments.length)return b.extend({},a);if("string"==typeof c){if("undefined"==typeof d)return"undefined"==typeof a[c]?null:a[c];a[c]=d}else b.extend(a,c);return this}function f(a){for(var b,c=decodeURI(a).split("&"),d={},e=0,f=c.length;f>e;e++)c[e]&&(b=c[e].split("="),d[b[0]]=b[1]);return d}function g(a,c){return a+(a.indexOf("?")>-1?"&":"?")+b.param(c)}function h(a){return b('<span class="lity-error"/>').append(a)}function i(a){if(!q.test(a))return!1;var c=b('<img src="'+a+'">'),d=b.Deferred(),e=function(){d.reject(h("Failed loading image"))};return c.on("load",function(){return 0===this.naturalWidth?e():void d.resolve(c)}).on("error",e),d.promise()}function j(a){var c;try{c=b(a)}catch(d){return!1}if(!c.length)return!1;var e=b('<span style="display:none !important" class="lity-inline-placeholder"/>');return c.after(e).on("lity:ready",function(a,b){b.one("lity:remove",function(){e.before(c.addClass("lity-hide")).remove()})})}function k(a){var c,d=a;return c=r.exec(a),c&&(d=g("https://www.youtube"+(c[2]||"")+".com/embed/"+c[4],b.extend({autoplay:1},f(c[5]||"")))),c=s.exec(a),c&&(d=g("https://player.vimeo.com/video/"+c[3],b.extend({autoplay:1},f(c[4]||"")))),c=t.exec(a),c&&(d=g("https://www.google."+c[3]+"/maps?"+c[6],{output:c[6].indexOf("layer=c")>0?"svembed":"embed"})),'<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="'+d+'"></iframe></div>'}function l(a){function f(a){27===a.keyCode&&k()}function g(){var a=m.documentElement.clientHeight?m.documentElement.clientHeight:Math.round(n.height());q.css("max-height",Math.floor(a)+"px").trigger("lity:resize",[o])}function h(a,c){o&&(q=b(c),n.on("resize",g),g(),o.find(".lity-loader").each(function(){var a=b(this);d(a).always(function(){a.remove()})}),o.removeClass("lity-loading").find(".lity-content").empty().append(q),q.removeClass("lity-hide").trigger("lity:ready",[o,a]),t.resolve())}function i(a,d,e,g){t=b.Deferred(),p++,c(),o=b(e.template).addClass("lity-loading").appendTo("body"),e.esc&&n.on("keyup",f),setTimeout(function(){o.addClass("lity-opened lity-"+a).on("click","[data-lity-close]",function(a){b(a.target).is("[data-lity-close]")&&k()}).trigger("lity:open",[o,g]),b.when(d).always(b.proxy(h,null,g))},0)}function j(a,c,d){var e,f,g=b.extend({},u,s);if(c=b.extend({},v,r,c),c.handler&&g[c.handler])f=g[c.handler](a,l),e=c.handler;else{var h={};b.each(["inline","iframe"],function(a,b){g[b]&&(h[b]=g[b]),delete g[b]});var j=function(b,c){return c?(f=c(a,l),f?(e=b,!1):void 0):!0};b.each(g,j),e||b.each(h,j)}return f&&b.when(k()).done(b.proxy(i,null,e,f,c,d)),!!f}function k(){if(o){var a=b.Deferred();return t.done(function(){p--,c(),n.off("resize",g).off("keyup",f),q.trigger("lity:close",[o]),o.removeClass("lity-opened").addClass("lity-closed");var b=o,e=q;o=null,q=null,d(e.add(b)).always(function(){e.trigger("lity:remove",[b]),b.remove(),a.resolve()})}),a.promise()}}function l(a){if(!a.preventDefault)return l.open(a);var c=b(this),d=c.data("lity-target")||c.attr("href")||c.attr("src");if(d){var e=c.data("lity-options")||c.data("lity");j(d,e,c)&&(c.blur(),a.preventDefault())}}var o,q,r={},s={},t=b.Deferred().resolve();return l.handlers=b.proxy(e,l,s),l.options=b.proxy(e,l,r),l.open=function(a,b,c){return j(a,b,c),l},l.close=function(){return k(),l},l.options(a)}var m=a.document,n=b(a),o=b("html"),p=0,q=/(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,r=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,s=/(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,t=/((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,u={image:i,inline:j,iframe:k},v={esc:!0,handler:null,template:'<div class="lity" tabindex="-1"><div class="lity-wrap" data-lity-close><div class="lity-loader">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" title="Close (Esc)" data-lity-close>×</button></div></div></div>'},w=function(){var a=m.createElement("div"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return b[c];return!1}();return l.version="1.6.6",l.handlers=b.proxy(e,l,u),l.options=b.proxy(e,l,v),b(m).on("click","[data-lity]",l()),l});

/* jshint browser:true
 * !
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */
!function(a){"use strict";a.fn.fitVids=function(b){var c={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var d=document.head||document.getElementsByTagName("head")[0],e=".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",f=document.createElement("div");f.innerHTML='<p>x</p><style id="fit-vids-style">'+e+"</style>",d.appendChild(f.childNodes[1])}return b&&a.extend(c,b),this.each(function(){var b=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]',"object","embed"];c.customSelector&&b.push(c.customSelector);var d=".fitvidsignore";c.ignore&&(d=d+", "+c.ignore);var e=a(this).find(b.join(","));e=e.not("object object"),e=e.not(d),e.each(function(b){var c=a(this);if(!(c.parents(d).length>0||"embed"===this.tagName.toLowerCase()&&c.parent("object").length||c.parent(".fluid-width-video-wrapper").length)){c.css("height")||c.css("width")||!isNaN(c.attr("height"))&&!isNaN(c.attr("width"))||(c.attr("height",9),c.attr("width",16));var e="object"===this.tagName.toLowerCase()||c.attr("height")&&!isNaN(parseInt(c.attr("height"),10))?parseInt(c.attr("height"),10):c.height(),f=isNaN(parseInt(c.attr("width"),10))?c.width():parseInt(c.attr("width"),10),g=e/f;if(!c.attr("id")){var h="fitvid"+b;c.attr("id",h)}c.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*g+"%"),c.removeAttr("height").removeAttr("width")}})})}}(window.jQuery||window.Zepto);