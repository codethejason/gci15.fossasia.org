$(document).ready(function(){var $slider=$(".slider"),$slideBGs=$(".slide__bg"),diff=0,curSlide=0,numOfSlides=$(".slide").length-1,animating=false,animTime=500,autoSlideTimeout,autoSlideDelay=6000,$pagination=$(".slider-pagi");(function createBullets(){for(var i=0;i<numOfSlides+1;i++){var $li=$("<li class='slider-pagi__elem'></li>");$li.addClass("slider-pagi__elem-"+i).data("page",i);if(!i)$li.addClass("active");$pagination.append($li);}})();function manageControls(){$(".slider-control").removeClass("inactive");if(!curSlide)$(".slider-control.left").addClass("inactive");if(curSlide===numOfSlides)$(".slider-control.right").addClass("inactive");};function autoSlide(){autoSlideTimeout=setTimeout(function(){curSlide++;if(curSlide>numOfSlides)curSlide=0;changeSlides();},autoSlideDelay);};autoSlide();function changeSlides(instant){if(!instant){animating=true;manageControls();$slider.addClass("animating");$slider.css("top");$(".slide").removeClass("active");$(".slide-"+curSlide).addClass("active");setTimeout(function(){$slider.removeClass("animating");animating=false;},animTime);}window.clearTimeout(autoSlideTimeout);$(".slider-pagi__elem").removeClass("active");$(".slider-pagi__elem-"+curSlide).addClass("active");$slider.css("transform","translate3d("+-curSlide*100+"%,0,0)");$slideBGs.css("transform","translate3d("+curSlide*50+"%,0,0)");diff=0;autoSlide();}function navigateLeft(){if(animating)return;if(curSlide>0)curSlide--;changeSlides();}function navigateRight(){if(animating)return;if(curSlide<numOfSlides)curSlide++;changeSlides();}$(document).on("mousedown touchstart",".slider",function(e){if(animating)return;window.clearTimeout(autoSlideTimeout);var startX=e.pageX||e.originalEvent.touches[0].pageX,winW=$(window).width();diff=0;$(document).on("mousemove touchmove",function(e){var x=e.pageX||e.originalEvent.touches[0].pageX;diff=(startX-x)/winW*70;if((!curSlide&&diff<0)||(curSlide===numOfSlides&&diff>0))diff/=2;$slider.css("transform","translate3d("+(-curSlide*100-diff)+"%,0,0)");$slideBGs.css("transform","translate3d("+(curSlide*50+diff/2)+"%,0,0)");});});$(document).on("mouseup touchend",function(e){$(document).off("mousemove touchmove");if(animating)return;if(!diff){changeSlides(true);return;}if(diff>-8&&diff<8){changeSlides();return;}if(diff<=-8){navigateLeft();}if(diff>=8){navigateRight();}});$(document).on("click",".slider-control",function(){if($(this).hasClass("left")){navigateLeft();}else{navigateRight();}});$(document).on("click",".slider-pagi__elem",function(){curSlide=$(this).data("page");changeSlides();});function isElementInViewport(elem,biasUp){var $elem=$(elem);var scrollElem=((navigator.userAgent.toLowerCase().indexOf('webkit')!=-1)?'body':'html');var viewportTop=$(scrollElem).scrollTop();var viewportBottom=viewportTop+$(window).height();var elemTop=Math.round($elem.offset().top);var elemBottom=elemTop+$elem.height();return((elemTop<viewportBottom+(biasUp?0:500))&&(elemBottom>viewportTop-(biasUp?0:500)));}function checkAnimation(){var $elem=$('.section-h1').each(function(index){var isInView=isElementInViewport($(this));if($(this).hasClass('start')){if(!isInView){$(this).removeClass('start');}return;};if(isInView){$(this).addClass('start');}});}var images=$.makeArray($('.card-img-top'));function checkImages(){if(!images){return;}images.forEach(function(item,index){if(item.getAttribute("src")==""&&isElementInViewport(item,scrollingUp)){item.setAttribute("src",item.getAttribute("data"));images.splice(index,1);}});}var lastScrollTop=0;var scrollingUp=false;$(document).scroll(function(){var st=$(this).scrollTop();scrollingUp=st<lastScrollTop;checkAnimation();if(!images.length<1){checkImages();}lastScrollTop=st;});var isMobile=($(window).width()<500?true:false);$("#GPlusPage").html('<div class="g-page" data-layout="'+(isMobile?"landscape":"portrait")+'" data-width="'+(isMobile?150:450)+'" data-href="https://plus.google.com/+FossasiaOrg"></div>');$.getJSON("https://api.github.com/repos/fossasia/gci15.fossasia.org/contributors?per_page=100",function(json){output="";for(var i=0;i<=json.length-1;i++){output=output+'<div class="col-xs-4 col-sm-4 col-md-1 col-lg-1 ">\n';output=output+'<div class="grid">\n';output=output+'<figure class="effect-duke">\n';output=output+'<a href="https://github.com/'+json[i].login+'" style="display:none"><i id="github" class="icon-github"></i></a>';output=output+'<div class="card">\n';output=output+'<div class="avatar img-circle">\n';output=output+'<img class="card-img-top" src="" data="https://avatars.githubusercontent.com/u/'+json[i].id+'?v=3" alt="'+json[i].login+'">\n';output=output+'</div>';output=output+'<div class="card-block">';output=output+'<h4 id="h4"><p class="overflow ellipsis">'+json[i].login+'</p></h4>';output=output+'<figcaption><div class="social"><div class="icon-holder"><a href="https://github.com/'+json[i].login+' "><i id="github" class="icon-github"></i></a></div></div></figcaption>';output=output+'</div>';output=output+'</div>';output=output+'</figure>';output=output+'</div>';output=output+'</div>';}$('.contributers').append(output);images=$.makeArray($('.card-img-top[src=""]'));});var loklak_request=$.ajax({url:"http://www.loklak.org/api/peers.json",method:"GET",dataType:"jsonp"});(function(){var newsletterDiv=$('#newsletterDiv');if(newsletterDiv.length>0){$(window).scroll(function(){var distanceTop=$('#last').offset().top-$(window).height();if($(window).scrollTop()>distanceTop){newsletterDiv.animate({'bottom':'0px'},550);}else{newsletterDiv.stop(true).animate({'bottom':'-430px'},550);}});$('#newsletterDiv .close').on('click',function(){$(this).parent().remove();$('footer').animate({'padding-bottom':'50px'},550);});}})();loklak_request.done(function(json_result){var peers=json_result.peers;var table=$('#loklak_table');var count=json_result.count;var counter=(count/2);var ocount=Math.ceil(count/2)-1;if(count%2!=0){for(i=0;i<ocount;i++){table.append("<tr><td>"+peers[i].host+"</td><td>"+dateFormatter(peers[i].lastSeen)+" Hours Ago</td><td>"+peers[i+ocount].host+"</td><td>"+dateFormatter(peers[i+ocount].lastSeen)+" Hours Ago</td></tr>");}table.append("<tr><td>"+peers[i+ocount].host+"</td><td>"+dateFormatter(peers[i+ocount].lastSeen)+" Hours Ago</td><td id='endrow'style='text-align:right' > Available Peers: &nbsp;</td><td id='endrow'>"+count+"</td></tr>");}else{for(i=0;i<counter;i++){table.append("<tr><td>"+peers[i].host+"</td><td>"+dateFormatter(peers[i].lastSeen)+" Hours Ago</td><td>"+peers[i+counter].host+"</td><td>"+dateFormatter(peers[i+counter].lastSeen)+" Hours Ago</td></tr>");}table.append("<tr ><td id='endrow'rowspan= '1' colspan='4' > Available Peers: &nbsp;"+count+"</td></tr>");}});var dateFormatter=function(unix_timestamp){var date=new Date(unix_timestamp);var dateNow=(new Date).getTime();var difference=Math.abs(dateNow-date);var dateCompare=new Date(difference*1000);var hours=dateCompare.getHours();return hours;};var tweetsTemplate=function(tweet,tweetURL,username,name,profilePicURL){$('#tweet-container').append('<div class="tweetbox"> \
                      <a class="tweetLink" target="_blank" href="'+tweetURL+'">Tweet</a> \
                      <div class="profilePic"> \
                        <img src="'+profilePicURL+'"> \
                      </div> \
                      <div class="tweet-content"> \
                        <h4><a class="nameLink" target="_blank" href="https://twitter.com/'+username+'">'+name+'</a></h4> \
                        '+tweet+' \
                      </div> \
                    </div> ');};
                             


$(document).ready(function() {
  var tweets = [
    {
      "timestamp": "2016-06-13T04:19:32.864Z",
      "created_at": "2016-06-13T04:18:51.000Z",
      "screen_name": "aviaryan123",
      "text": "Working with @fossasia on Open Event project has taught me so much about working in teams and writing quality code. #gsoc",
      "link": "https://twitter.com/aviaryan123/status/742209593699241984",
      "id_str": "742209593699241984",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 0,
      "favourites_count": 0,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Much",
      "place_id": "",
      "place_context": "FROM",
      "place_country": "Germany",
      "place_country_code": "DE",
      "place_country_center": [
        -7.494265035490628,
        27.509584379154063
      ],
      "location_point": [
        7.400000014994276,
        50.91667173007346
      ],
      "location_radius": 0,
      "location_mark": [
        7.404623760919735,
        50.913130141135
      ],
      "location_source": "PLACE",
      "hosts": [],
      "hosts_count": 0,
      "links": [],
      "links_count": 0,
      "mentions": ["fossasia"],
      "mentions_count": 1,
      "hashtags": ["gsoc"],
      "hashtags_count": 1,
      "classifier_profanity": "swear",
      "classifier_profanity_probability": 3.889406471398604E-20,
      "classifier_emotion": "joy",
      "classifier_emotion_probability": 1.8535688572805165E-18,
      "classifier_language": "english",
      "classifier_language_probability": 3.1861622007774257E-18,
      "without_l_len": 121,
      "without_lu_len": 111,
      "without_luh_len": 105,
      "user": {
        "appearance_first": "2016-06-13T04:19:32.864Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/714353648873181184/zc35RNCD_bigger.jpg",
        "screen_name": "aviaryan123",
        "user_id": "1715431548",
        "name": "Avi Aryan",
        "appearance_latest": "2016-06-13T04:19:32.864Z"
      }
    },
    {
      "timestamp": "2016-06-12T17:35:45.307Z",
      "created_at": "2016-06-12T16:52:22.000Z",
      "screen_name": "KhoslaSopan",
      "text": "3rd blog post! Loklak enters Wordpress Universe! http://loklak.org/x?id=742036833656147968 @lklknt @loklak_app @0rb1t3r @mariobehling @fossasia",
      "link": "https://twitter.com/KhoslaSopan/status/742036833656147968",
      "id_str": "742036833656147968",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 0,
      "favourites_count": 1,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.61091980131373,
        13.004557453739551
      ],
      "location_source": "PLACE",
      "hosts": ["loklaknet.wordpress.com"],
      "hosts_count": 1,
      "links": ["https://loklaknet.wordpress.com/2016/06/12/loklak-enters-wordpress-universe/"],
      "links_count": 1,
      "mentions": [
        "lklknt",
        "loklak_app",
        "0rb1t3r",
        "mariobehling",
        "fossasia"
      ],
      "mentions_count": 5,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_emotion": "joy",
      "classifier_emotion_probability": 8.71664495953866E-15,
      "classifier_language": "english",
      "classifier_language_probability": 2.051975431206169E-15,
      "without_l_len": 101,
      "without_lu_len": 48,
      "without_luh_len": 48,
      "user": {
        "appearance_first": "2016-06-12T17:35:45.307Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/710078394029858816/qI2vhx4f_bigger.jpg",
        "screen_name": "KhoslaSopan",
        "user_id": "4811705533",
        "name": "sopan khosla",
        "appearance_latest": "2016-06-12T17:35:45.307Z"
      }
    },
    {
      "timestamp": "2016-06-12T15:59:45.631Z",
      "created_at": "2016-06-12T14:43:54.000Z",
      "screen_name": "sreeja_k5",
      "text": "Working hard on google summer of code . My blog post for week 3 . Good UI Vs Bad UI . http://loklak.org/x?id=742004507333165056 @fossasia @gsoc @hpdang",
      "link": "https://twitter.com/sreeja_k5/status/742004507333165056",
      "id_str": "742004507333165056",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 1,
      "favourites_count": 1,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Wick",
      "place_id": "",
      "place_context": "FROM",
      "place_country": "United Kingdom",
      "place_country_code": "GB",
      "place_country_center": [
        -4.696459893461537,
        30.077280001750808
      ],
      "location_point": [
        -3.094239990736469,
        58.439060188103014
      ],
      "location_radius": 0,
      "location_mark": [
        -3.094158323208566,
        58.434886136111
      ],
      "location_source": "PLACE",
      "hosts": ["codelifefungsoc16.wordpress.com"],
      "hosts_count": 1,
      "links": ["https://codelifefungsoc16.wordpress.com/2016/06/11/217/"],
      "links_count": 1,
      "mentions": [
        "fossasia",
        "gsoc",
        "hpdang"
      ],
      "mentions_count": 3,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_language": "english",
      "classifier_language_probability": 6.32946770549821E-21,
      "without_l_len": 109,
      "without_lu_len": 85,
      "without_luh_len": 85,
      "user": {
        "appearance_first": "2016-06-12T15:59:45.631Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/711477940836372480/JhVMIQdA_bigger.jpg",
        "screen_name": "sreeja_k5",
        "user_id": "3276026317",
        "name": "sreeja kamishetty",
        "appearance_latest": "2016-06-12T15:59:45.631Z"
      }
    },
    {
      "timestamp": "2016-06-12T13:19:50.890Z",
      "created_at": "2016-06-12T12:03:09.000Z",
      "screen_name": "yudocaa",
      "text": "@lalatenduM Yeah! That's me at @fossasia this year :)",
      "link": "https://twitter.com/yudocaa/status/741964050502914048",
      "id_str": "741964050502914048",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 0,
      "favourites_count": 1,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "",
      "place_id": "",
      "place_context": "ABOUT",
      "hosts": [],
      "hosts_count": 0,
      "links": [],
      "links_count": 0,
      "mentions": [
        "lalatenduM",
        "fossasia"
      ],
      "mentions_count": 2,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_language": "english",
      "classifier_language_probability": 1.0919270607701037E-6,
      "without_l_len": 53,
      "without_lu_len": 31,
      "without_luh_len": 31,
      "user": {
        "appearance_first": "2016-06-12T13:19:50.890Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/459049843990614016/3x1_waOi_bigger.jpeg",
        "screen_name": "yudocaa",
        "user_id": "53687449",
        "name": "Sayan Chowdhury",
        "appearance_latest": "2016-06-12T13:19:50.890Z"
      }
    },
    {
      "timestamp": "2016-06-12T13:19:50.890Z",
      "created_at": "2016-06-12T11:43:22.000Z",
      "screen_name": "aviaryan123",
      "text": "Better fields and validation in Flask Restplus, an inside into Open Event's API http://loklak.org/x?id=741959074389098496 cc @gsoc @fossasia @mariobehling",
      "link": "https://twitter.com/aviaryan123/status/741959074389098496",
      "id_str": "741959074389098496",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 1,
      "favourites_count": 0,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "",
      "place_id": "",
      "place_context": "ABOUT",
      "hosts": ["aviaryan.in"],
      "hosts_count": 1,
      "links": ["http://aviaryan.in/blog/gsoc/restplus-validation-custom-fields.html"],
      "links_count": 1,
      "mentions": [
        "gsoc",
        "fossasia",
        "mariobehling"
      ],
      "mentions_count": 3,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_language": "english",
      "classifier_language_probability": 1.609756668626991E-17,
      "without_l_len": 112,
      "without_lu_len": 82,
      "without_luh_len": 82,
      "user": {
        "appearance_first": "2016-06-13T04:19:32.864Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/714353648873181184/zc35RNCD_bigger.jpg",
        "screen_name": "aviaryan123",
        "user_id": "1715431548",
        "name": "Avi Aryan",
        "appearance_latest": "2016-06-13T04:19:32.864Z"
      }
    },
    {
      "timestamp": "2016-06-12T11:09:45.774Z",
      "created_at": "2016-06-12T09:25:03.000Z",
      "screen_name": "niranjan94",
      "text": "Building interactive elements for my @gsoc project with @fossasia . http://loklak.org/x?id=741924265151193088",
      "link": "https://twitter.com/niranjan94/status/741924265151193088",
      "id_str": "741924265151193088",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 1,
      "favourites_count": 1,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Dragu",
      "place_id": "",
      "place_context": "FROM",
      "place_country": "Romania",
      "place_country_code": "RO",
      "place_country_center": [
        -14.826780252543628,
        24.11666482413031
      ],
      "location_point": [
        23.39999957168473,
        47.0166700831692
      ],
      "location_radius": 0,
      "location_mark": [
        23.39932252881228,
        47.01795887894001
      ],
      "location_source": "PLACE",
      "hosts": ["blog.codezero.xyz"],
      "hosts_count": 1,
      "links": ["https://blog.codezero.xyz/building-interactive-elements-with-html-and-javascript-drag-and-drop/"],
      "links_count": 1,
      "mentions": [
        "gsoc",
        "fossasia"
      ],
      "mentions_count": 2,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_emotion": "joy",
      "classifier_emotion_probability": 8.447999566471012E-17,
      "classifier_language": "english",
      "classifier_language_probability": 6.148461948119727E-17,
      "without_l_len": 67,
      "without_lu_len": 51,
      "without_luh_len": 51,
      "user": {
        "appearance_first": "2016-06-12T11:09:45.774Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/539819194271801344/UOx_6cxH_bigger.png",
        "screen_name": "niranjan94",
        "user_id": "109789337",
        "name": "Niranjan Rajendran",
        "appearance_latest": "2016-06-12T11:09:45.774Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.575Z",
      "created_at": "2016-06-11T17:57:39.000Z",
      "screen_name": "KhoslaSopan",
      "text": "#Loklak installation party in Bangalore Discussed varying use cases of Loklak. Pretty cool stuff! @lklknt @0rb1t3r @fossasia @mariobehling",
      "link": "https://twitter.com/KhoslaSopan/status/741690877752401921",
      "id_str": "741690877752401921",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 3,
      "favourites_count": 4,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.57998922561193,
        12.967517619828515
      ],
      "location_source": "PLACE",
      "hosts": [],
      "hosts_count": 0,
      "links": [],
      "links_count": 0,
      "mentions": [
        "lklknt",
        "0rb1t3r",
        "fossasia",
        "mariobehling"
      ],
      "mentions_count": 4,
      "hashtags": ["loklak"],
      "hashtags_count": 1,
      "classifier_language": "english",
      "classifier_language_probability": 7.286522730673428E-13,
      "without_l_len": 138,
      "without_lu_len": 97,
      "without_luh_len": 89,
      "user": {
        "appearance_first": "2016-06-12T17:35:45.307Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/710078394029858816/qI2vhx4f_bigger.jpg",
        "screen_name": "KhoslaSopan",
        "user_id": "4811705533",
        "name": "sopan khosla",
        "appearance_latest": "2016-06-12T17:35:45.307Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.576Z",
      "created_at": "2016-06-10T09:39:04.000Z",
      "screen_name": "aayush113002",
      "text": "How SASS can be used for theme based concept #OpenEvent project @gsoc @fossasia @mariobehling, Here is the blog post http://loklak.org/x?id=741203014103359488",
      "link": "https://twitter.com/aayush113002/status/741203014103359488",
      "id_str": "741203014103359488",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 1,
      "favourites_count": 0,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.52622627482549,
        13.059667149651188
      ],
      "location_source": "PLACE",
      "hosts": ["opev.wordpress.com"],
      "hosts_count": 1,
      "links": ["https://opev.wordpress.com/2016/06/10/sass-for-the-theme-based-concept/"],
      "links_count": 1,
      "mentions": [
        "gsoc",
        "fossasia",
        "mariobehling"
      ],
      "mentions_count": 3,
      "hashtags": ["openevent"],
      "hashtags_count": 1,
      "classifier_emotion": "joy",
      "classifier_emotion_probability": 2.8438374003459255E-26,
      "classifier_language": "english",
      "classifier_language_probability": 2.386180320740907E-19,
      "without_l_len": 116,
      "without_lu_len": 87,
      "without_luh_len": 76,
      "user": {
        "appearance_first": "2016-06-12T08:55:24.675Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/651381255750074368/r522x4hR_bigger.jpg",
        "screen_name": "aayush113002",
        "user_id": "3792477493",
        "name": "aayush",
        "appearance_latest": "2016-06-12T08:55:24.675Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.577Z",
      "created_at": "2016-06-10T04:38:10.000Z",
      "screen_name": "jigyasa_grover",
      "text": "Let's \"meetup\" with Loklak ! http://loklaknet.wordpress.com/?p=989 @loklak_app Revolutionizing social networking 🤘 Wham @fossasia @mariobehling @0rb1t3r !",
      "link": "https://twitter.com/jigyasa_grover/status/741127292026523648",
      "id_str": "741127292026523648",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 2,
      "favourites_count": 4,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.51632862533592,
        12.948012387150024
      ],
      "location_source": "PLACE",
      "hosts": ["loklaknet.wordpress.com"],
      "hosts_count": 1,
      "links": ["http://loklaknet.wordpress.com/?p=989"],
      "links_count": 1,
      "mentions": [
        "loklak_app",
        "fossasia",
        "mariobehling",
        "0rb1t3r"
      ],
      "mentions_count": 4,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_emotion": "joy",
      "classifier_emotion_probability": 1.1289221779620107E-9,
      "classifier_language": "english",
      "classifier_language_probability": 9.27586230048405E-10,
      "without_l_len": 117,
      "without_lu_len": 72,
      "without_luh_len": 72,
      "user": {
        "appearance_first": "2016-06-12T14:33:37.340Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/681453748519071744/UtweT0T8_bigger.jpg",
        "screen_name": "jigyasa_grover",
        "user_id": "3180367712",
        "name": "Jigyasa Grover",
        "appearance_latest": "2016-06-12T14:33:37.340Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.581Z",
      "created_at": "2016-06-09T17:04:01.000Z",
      "screen_name": "KhoslaSopan",
      "text": "Loklak now supports PHP as well!! http://loklak.org/x?id=740952604977467397 @0rb1t3r @mariobehling @fossasia @loklak_app @lklknt",
      "link": "https://twitter.com/KhoslaSopan/status/740952604977467397",
      "id_str": "740952604977467397",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 2,
      "favourites_count": 3,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.58785182035828,
        12.93005712772223
      ],
      "location_source": "PLACE",
      "hosts": ["loklaknet.wordpress.com"],
      "hosts_count": 1,
      "links": ["https://loklaknet.wordpress.com/2016/06/09/loklak-api-now-supports-php/"],
      "links_count": 1,
      "mentions": [
        "0rb1t3r",
        "mariobehling",
        "fossasia",
        "loklak_app",
        "lklknt"
      ],
      "mentions_count": 5,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_emotion": "joy",
      "classifier_emotion_probability": 2.1017717040818613E-16,
      "classifier_language": "english",
      "classifier_language_probability": 5.178591621110118E-16,
      "without_l_len": 86,
      "without_lu_len": 33,
      "without_luh_len": 33,
      "user": {
        "appearance_first": "2016-06-12T17:35:45.307Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/710078394029858816/qI2vhx4f_bigger.jpg",
        "screen_name": "KhoslaSopan",
        "user_id": "4811705533",
        "name": "sopan khosla",
        "appearance_latest": "2016-06-12T17:35:45.307Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.582Z",
      "created_at": "2016-06-09T17:02:32.000Z",
      "screen_name": "KhoslaSopan",
      "text": "http://loklak.org/x?id=740952229176217601 @0rb1t3r @mariobehling @fossasia @loklak_app @lklknt",
      "link": "https://twitter.com/KhoslaSopan/status/740952229176217601",
      "id_str": "740952229176217601",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 2,
      "favourites_count": 2,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.62296692023091,
        13.016220241913716
      ],
      "location_source": "PLACE",
      "hosts": ["loklaknet.wordpress.com"],
      "hosts_count": 1,
      "links": ["https://loklaknet.wordpress.com/2016/06/07/the-all-new-gooey-gui-for-python-api/"],
      "links_count": 1,
      "mentions": [
        "0rb1t3r",
        "mariobehling",
        "fossasia",
        "loklak_app",
        "lklknt"
      ],
      "mentions_count": 5,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_emotion": "joy",
      "classifier_emotion_probability": 5.938461528076644E-12,
      "classifier_language": "english",
      "classifier_language_probability": 5.47738278344756E-11,
      "without_l_len": 52,
      "without_lu_len": 0,
      "without_luh_len": 0,
      "user": {
        "appearance_first": "2016-06-12T17:35:45.307Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/710078394029858816/qI2vhx4f_bigger.jpg",
        "screen_name": "KhoslaSopan",
        "user_id": "4811705533",
        "name": "sopan khosla",
        "appearance_latest": "2016-06-12T17:35:45.307Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.658Z",
      "created_at": "2016-06-09T16:26:46.000Z",
      "screen_name": "daggerdwivedi",
      "text": "@fossasia @mariobehling Setting up the backend for the app-generator. https://app-generator.firebaseapp.com #GSoC2016 #firebase https://pic.twitter.com/IvvbsKfy4i",
      "link": "https://twitter.com/daggerdwivedi/status/740943230800367616",
      "id_str": "740943230800367616",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 2,
      "favourites_count": 1,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.62018941113101,
        12.954109415365194
      ],
      "location_source": "PLACE",
      "hosts": [
        "app-generator.firebaseapp.com",
        "pic.twitter.com"
      ],
      "hosts_count": 2,
      "links": [
        "https://app-generator.firebaseapp.com",
        "https://pic.twitter.com/IvvbsKfy4i"
      ],
      "links_count": 2,
      "mentions": [
        "fossasia",
        "mariobehling"
      ],
      "mentions_count": 2,
      "hashtags": [
        "gsoc2016",
        "firebase"
      ],
      "hashtags_count": 2,
      "classifier_emotion": "joy",
      "classifier_emotion_probability": 5.851194528894155E-11,
      "classifier_language": "english",
      "classifier_language_probability": 8.854806644864599E-12,
      "without_l_len": 89,
      "without_lu_len": 65,
      "without_luh_len": 45,
      "user": {
        "appearance_first": "2016-06-12T08:55:24.672Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/718162140465508352/jaVeNII8_bigger.jpg",
        "screen_name": "daggerdwivedi",
        "user_id": "3405973906",
        "name": "Harshit Dwivedi",
        "appearance_latest": "2016-06-12T08:55:24.672Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.660Z",
      "created_at": "2016-06-08T15:50:23.000Z",
      "screen_name": "jigyasa_grover",
      "text": "@loklak_app @fossasia @gsoc Check this out: @0rb1t3r @mariobehling @hpdang @lklknt @loklak_app",
      "link": "https://twitter.com/jigyasa_grover/status/740571685171122176",
      "id_str": "740571685171122176",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 1,
      "favourites_count": 2,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.65941211858438,
        12.995234975824003
      ],
      "location_source": "PLACE",
      "hosts": [],
      "hosts_count": 0,
      "links": [],
      "links_count": 0,
      "mentions": [
        "loklak_app",
        "fossasia",
        "gsoc",
        "0rb1t3r",
        "mariobehling",
        "hpdang",
        "lklknt",
        "loklak_app"
      ],
      "mentions_count": 8,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_language": "english",
      "classifier_language_probability": 5.25062091583095E-7,
      "without_l_len": 94,
      "without_lu_len": 15,
      "without_luh_len": 15,
      "user": {
        "appearance_first": "2016-06-12T14:33:37.340Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/681453748519071744/UtweT0T8_bigger.jpg",
        "screen_name": "jigyasa_grover",
        "user_id": "3180367712",
        "name": "Jigyasa Grover",
        "appearance_latest": "2016-06-12T14:33:37.340Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.662Z",
      "created_at": "2016-06-08T15:49:32.000Z",
      "screen_name": "jigyasa_grover",
      "text": "Aha ! We now have http://blog.loklak.net scraped. Articles incoming straight for @loklak_app. Here we go @fossasia🤘 https://pic.twitter.com/vF3OuZwvUw",
      "link": "https://twitter.com/jigyasa_grover/status/740571471563661312",
      "id_str": "740571471563661312",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 2,
      "favourites_count": 3,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.53534537658582,
        12.873691044891546
      ],
      "location_source": "PLACE",
      "hosts": [
        "blog.loklak.net",
        "pic.twitter.com"
      ],
      "hosts_count": 2,
      "links": [
        "http://blog.loklak.net",
        "https://pic.twitter.com/vF3OuZwvUw"
      ],
      "links_count": 2,
      "mentions": [
        "loklak_app",
        "fossasia"
      ],
      "mentions_count": 2,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_profanity": "sex",
      "classifier_profanity_probability": 1.8541598778281856E-18,
      "classifier_language": "english",
      "classifier_language_probability": 1.210143795643602E-16,
      "without_l_len": 93,
      "without_lu_len": 73,
      "without_luh_len": 73,
      "user": {
        "appearance_first": "2016-06-12T14:33:37.340Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/681453748519071744/UtweT0T8_bigger.jpg",
        "screen_name": "jigyasa_grover",
        "user_id": "3180367712",
        "name": "Jigyasa Grover",
        "appearance_latest": "2016-06-12T14:33:37.340Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.665Z",
      "created_at": "2016-06-08T11:59:24.000Z",
      "screen_name": "Daminisatya",
      "text": "The app \"Sentiment Visualizer\" will be out today on #Loklak apps page. @0rb1t3r @fossasia @gsoc @mariobehling",
      "link": "https://twitter.com/Daminisatya/status/740513556236378112",
      "id_str": "740513556236378112",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 1,
      "favourites_count": 4,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.5308529281429,
        12.933276284493164
      ],
      "location_source": "PLACE",
      "hosts": [],
      "hosts_count": 0,
      "links": [],
      "links_count": 0,
      "mentions": [
        "0rb1t3r",
        "fossasia",
        "gsoc",
        "mariobehling"
      ],
      "mentions_count": 4,
      "hashtags": ["loklak"],
      "hashtags_count": 1,
      "classifier_language": "english",
      "classifier_language_probability": 5.1893205010866694E-11,
      "without_l_len": 109,
      "without_lu_len": 70,
      "without_luh_len": 62,
      "user": {
        "appearance_first": "2016-06-12T14:33:37.341Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/734011449492668416/NEqkCIhM_bigger.jpg",
        "screen_name": "Daminisatya",
        "user_id": "2744240858",
        "name": "Damini Satya",
        "appearance_latest": "2016-06-12T14:33:37.341Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.666Z",
      "created_at": "2016-06-08T09:37:55.000Z",
      "screen_name": "codekat",
      "text": "@jancborchardt thanks so much! would love to meet you guys @fossasia @hpdang @triplez82 @jsstrn @younglucas @woohuiren @icedwater @yjwong!",
      "link": "https://twitter.com/codekat/status/740477948717899776",
      "id_str": "740477948717899776",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 0,
      "favourites_count": 0,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.5039912624497,
        13.027893566210052
      ],
      "location_source": "PLACE",
      "hosts": [],
      "hosts_count": 0,
      "links": [],
      "links_count": 0,
      "mentions": [
        "jancborchardt",
        "fossasia",
        "hpdang",
        "triplez82",
        "jsstrn",
        "younglucas",
        "woohuiren",
        "icedwater",
        "yjwong"
      ],
      "mentions_count": 9,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_language": "english",
      "classifier_language_probability": 1.0251738016440679E-13,
      "without_l_len": 138,
      "without_lu_len": 45,
      "without_luh_len": 45,
      "user": {
        "appearance_first": "2016-06-12T08:55:24.666Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/733420962209759233/H8DFAkyD_bigger.jpg",
        "screen_name": "codekat",
        "user_id": "19225509",
        "name": "Kat Braybrooke ( ᐛ )",
        "appearance_latest": "2016-06-12T08:55:24.666Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.667Z",
      "created_at": "2016-06-08T09:37:23.000Z",
      "screen_name": "woohuiren",
      "text": "@jancborchardt @codekat @ArtSciMuseum @fossasia @hpdang @triplez82 @jsstrn @younglucas @icedwater @yjwong clashes with Pycon SG. :(",
      "link": "https://twitter.com/woohuiren/status/740477815271739393",
      "id_str": "740477815271739393",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 0,
      "favourites_count": 0,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.55760466562575,
        12.985894660864446
      ],
      "location_source": "PLACE",
      "hosts": [],
      "hosts_count": 0,
      "links": [],
      "links_count": 0,
      "mentions": [
        "jancborchardt",
        "codekat",
        "ArtSciMuseum",
        "fossasia",
        "hpdang",
        "triplez82",
        "jsstrn",
        "younglucas",
        "icedwater",
        "yjwong"
      ],
      "mentions_count": 10,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_emotion": "joy",
      "classifier_emotion_probability": 6.787943857489154E-5,
      "classifier_language": "english",
      "classifier_language_probability": 3.251031739637256E-5,
      "without_l_len": 131,
      "without_lu_len": 25,
      "without_luh_len": 25,
      "user": {
        "appearance_first": "2016-06-12T08:55:24.667Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/663623265231892480/dX2lyJHk_bigger.jpg",
        "screen_name": "woohuiren",
        "user_id": "1454430638",
        "name": "Woo Huiren",
        "appearance_latest": "2016-06-12T08:55:24.667Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.669Z",
      "created_at": "2016-06-08T08:40:52.000Z",
      "screen_name": "jancborchardt",
      "text": "@codekat @ArtSciMuseum oooh nice! You should go there @fossasia @hpdang @triplez82 @jsstrn @younglucas @woohuiren @icedwater @yjwong :)",
      "link": "https://twitter.com/jancborchardt/status/740463595289518080",
      "id_str": "740463595289518080",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 2,
      "favourites_count": 2,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.55006452305939,
        12.978309980750867
      ],
      "location_source": "PLACE",
      "hosts": [],
      "hosts_count": 0,
      "links": [],
      "links_count": 0,
      "mentions": [
        "codekat",
        "ArtSciMuseum",
        "fossasia",
        "hpdang",
        "triplez82",
        "jsstrn",
        "younglucas",
        "woohuiren",
        "icedwater",
        "yjwong"
      ],
      "mentions_count": 10,
      "hashtags": [],
      "hashtags_count": 0,
      "classifier_language": "english",
      "classifier_language_probability": 1.1537347743839632E-9,
      "without_l_len": 135,
      "without_lu_len": 33,
      "without_luh_len": 33,
      "user": {
        "appearance_first": "2016-06-12T08:55:24.669Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/543415412524711936/Vsh81m0g_bigger.png",
        "screen_name": "jancborchardt",
        "user_id": "389634390",
        "name": "Jan-C. Borchardt",
        "appearance_latest": "2016-06-12T08:55:24.669Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.670Z",
      "created_at": "2016-06-08T07:59:44.000Z",
      "screen_name": "championswimmer",
      "text": "How the #nodejs based event website generator works in the #OpenEvent project under @gsoc at @fossasia - http://loklak.org/x?id=740453240144334848",
      "link": "https://twitter.com/championswimmer/status/740453240144334848",
      "id_str": "740453240144334848",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 8,
      "favourites_count": 8,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.55515199490357,
        12.902259935823096
      ],
      "location_source": "PLACE",
      "hosts": ["opev.wordpress.com"],
      "hosts_count": 1,
      "links": ["https://opev.wordpress.com/2016/06/06/webapp-the-generator-for-making-schedule-pages/"],
      "links_count": 1,
      "mentions": [
        "gsoc",
        "fossasia"
      ],
      "mentions_count": 2,
      "hashtags": [
        "nodejs",
        "openevent"
      ],
      "hashtags_count": 2,
      "classifier_language": "english",
      "classifier_language_probability": 1.5367816700219297E-16,
      "without_l_len": 104,
      "without_lu_len": 88,
      "without_luh_len": 69,
      "user": {
        "appearance_first": "2016-06-12T08:55:24.670Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/433338030259044353/NBgWx2tQ_bigger.jpeg",
        "screen_name": "championswimmer",
        "user_id": "63066473",
        "name": "Arnav Gupta",
        "appearance_latest": "2016-06-12T08:55:24.670Z"
      }
    },
    {
      "timestamp": "2016-06-12T08:55:24.671Z",
      "created_at": "2016-06-07T17:50:42.000Z",
      "screen_name": "jigyasa_grover",
      "text": "Now extracted Group Info & Recent Meetups for @loklak_app using #JSoup 🔍 Go @fossasia ! cc: @mariobehling @0rb1t3r https://pic.twitter.com/Po1sQlqVro",
      "link": "https://twitter.com/jigyasa_grover/status/740239576548118530",
      "id_str": "740239576548118530",
      "source_type": "TWITTER",
      "provider_type": "SCRAPED",
      "retweet_count": 2,
      "favourites_count": 3,
      "images": [],
      "images_count": 0,
      "audio": [],
      "audio_count": 0,
      "videos": [],
      "videos_count": 0,
      "place_name": "Bengaluru, India",
      "place_id": "1b8680cd52a711cb",
      "place_context": "FROM",
      "place_country": "India",
      "place_country_code": "IN",
      "place_country_center": [
        -48.06441112331319,
        17.463699331257345
      ],
      "location_point": [
        77.59368891715707,
        12.971939888304064
      ],
      "location_radius": 0,
      "location_mark": [
        77.53925733096582,
        12.998876734995049
      ],
      "location_source": "PLACE",
      "hosts": ["pic.twitter.com"],
      "hosts_count": 1,
      "links": ["https://pic.twitter.com/Po1sQlqVro"],
      "links_count": 1,
      "mentions": [
        "loklak_app",
        "fossasia",
        "mariobehling",
        "0rb1t3r"
      ],
      "mentions_count": 4,
      "hashtags": ["jsoup"],
      "hashtags_count": 1,
      "classifier_emotion": "joy",
      "classifier_emotion_probability": 1.8779599999640267E-13,
      "classifier_language": "english",
      "classifier_language_probability": 9.910084905473404E-13,
      "without_l_len": 115,
      "without_lu_len": 70,
      "without_luh_len": 63,
      "user": {
        "appearance_first": "2016-06-12T14:33:37.340Z",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/681453748519071744/UtweT0T8_bigger.jpg",
        "screen_name": "jigyasa_grover",
        "user_id": "3180367712",
        "name": "Jigyasa Grover",
        "appearance_latest": "2016-06-12T14:33:37.340Z"
      }
    }
  ];
  for (var index in tweets) {
    var tweet = tweets[index].text.replace(/\\/g, '');
    var tweetLink = tweets[index].link;
    var username = tweets[index].user.screen_name;
    var name = tweets[index].user.name;
    var profilePic = tweets[index].user.profile_image_url_https;
    tweetsTemplate(tweet, tweetLink, username, name, profilePic);
}});

$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});
$('.slider').saSlider();
$(function() {
    $('#left-arrow1').click(function() {
        if ($('#photostack-1 nav span.current').prev().length !== 0) {
            $('#photostack-1 nav span.current').prev().click();
        } else {
            $('#photostack-1 nav span.current').parent().children().last().click();
        }
    });
    $('#right-arrow1').click(function() {
        if ($('#photostack-1 nav span.current').next().length !== 0) {
            $('#photostack-1 nav span.current').next().click();
        } else {
            $('#photostack-1 nav span.current').parent().children().first().click();
        }
    });
});
$('.gallery-item').hover(function() {
    $(this).find('h5, p').stop().animate({
        opacity: '1',
        marginLeft: '230px'
    }, 300);
}, function() {
    $(this).find('h5, p').stop().animate({
        opacity: '0',
        marginLeft: '0px'
    }, 100);
});

function loadblog() {
    $.ajax({
        type: "GET",
        url: "loadblog.html",
        beforeSend: function() {
            document.getElementById("dime").style.display = "inherit";
        },
        success: function(data) {
            $(".blogs_wrapper").html(data);
        }
    });
}
$("#grideee a").toggle();
loadblog();
});

function displayBlog(element, event, blognum) {
    event.preventDefault();
    var blogText = blogData[blognum - 1];
    var wordContainer = $(".pText");
    var url = $(element).attr("href");
    wordContainer.html(blogText + "<br><p>See more at: <a href='" + url + "' target=_blank>" + url + "</a></p>");
    if ($('.blogText').css('display') == 'none') {
        toggleDisplay();
    }
}

function toggleDisplay() {
    var textOverlay = $('.blogText');
    textOverlay.toggle();
}