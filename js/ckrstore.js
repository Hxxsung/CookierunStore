(($)=>{
  class ckrStore {
    init(){
      this.whole();      
      this.header();      
      this.section1();
      this.section2();
      this.section3();
      this.section4();
      this.section5();
      this.section6();
      this.section7();
      this.section8();
      this.section9();
      this.section10();
      this.section11();
      this.section12();
      this.footer();
      this.gotop();
    }
    whole(){
      $('a').removeAttr('title');
    }
    header(){
      //메뉴 스크롤 이벤트
      let downTop = $(window).scrollTop();
      let upTop = downTop;      

      $(window).scroll(()=>{
        downTop = $(window).scrollTop();

          //console.log('downTop', downTop);
          //console.log('upTop', upTop);

          if( downTop-upTop > 0 ){
            $('#header').removeClass('up');
            $('#header').addClass('down');
          }
          if( downTop-upTop < 0 || downTop === upTop){
            $('#header').removeClass('up');
            $('#header').addClass('down');        
          }
          if( downTop === 0 ){
            $('#header').removeClass('down');
            $('#header').removeClass('up');
          }

        upTop = downTop;
      });

      //언어박스 클릭 이벤트
      $('.select-wrap').on({
        click: function(){
          $(this).toggleClass('click');     
        }
      });

      //모바일 메뉴 버튼 이벤트
      $('.mobile-btn').on({
        click: function(){
          $(this).toggleClass('on');
        }
      });
    }
    section1(){
      let cnt=0;
      let n=4;
      let setId=0;          
      //터치스와이프
      let touchStart = 0;
      let touchEnd = 0;
      let result = null;
      
      //이미지 슬라이드
      function mainSlide(){
        slideBtn();                       
        $('#section1 .slide-wrap').stop().animate({left:`${-100*cnt}%`}, 600, function(){
          cnt>n?cnt=0:cnt;
          cnt<0?cnt=n:cnt;          
          // console.log('cnt',cnt);          
          
          //텍스트 애니메이션
          let text = $('#section1 .text-wrap');
          // 1. 애니메이션 초기화
          text.removeClass('sec1Ani');
          
          // 2. 개별 애니메이션 설정
          if( cnt===0 ){
            text.eq(1).addClass('sec1Ani');
            text.eq(5).removeClass('sec1Ani');
          }
          else if ( cnt===1 ){            
            text.eq(1).removeClass('sec1Ani');
            text.eq(2).addClass('sec1Ani');
          }
          else if ( cnt===2 ){            
            text.eq(2).removeClass('sec1Ani');
            text.eq(3).addClass('sec1Ani');
          }
          else if ( cnt===3 ){            
            text.eq(3).removeClass('sec1Ani');
            text.eq(4).addClass('sec1Ani');
          }
          else if ( cnt===4 ){            
            text.eq(4).removeClass('sec1Ani');
            text.eq(5).addClass('sec1Ani');
          }

          $(this).stop().animate({left:`${-100*cnt}%`}, 0)
        });                
      }
      function nextCount(){
        cnt++;
        mainSlide();
      }
      function prevCount(){
        cnt--;
        mainSlide();
      }
      function autoTimer(){
        setId = setInterval(nextCount, 5000);
        //setInterval(prevCount, 5000);
      }
      autoTimer();      

      //슬라이드 좌우 버튼
      $('#section1 .next-btn').on({
        click: function(){          
          clearInterval(setId);
          nextCount();
          autoTimer();
        }
      });
      $('#section1 .prev-btn').on({
        click: function(){          
          clearInterval(setId);
          prevCount();
          autoTimer();
        }
      });
      //좌우버튼 show/hide
      $('#section1 .slide-container').on({
        mouseenter: function(){
          $('#section1 button').fadeIn(300);
        },
        mouseleave: function(){
          $('#section1 button').fadeOut(300);
        }
      });

      //슬라이드 버튼
      function slideBtn(){
        $('#section1 .slide-btn').removeClass('active');
        $('#section1 .slide-btn').eq(cnt>4 ? 0 : cnt).addClass('active');
      }
      $('#section1 .slide-btn').each(function(idx){
        $(this).on({
          click: function(event){
            event.preventDefault();
            cnt=idx;
            clearInterval(setId);
            mainSlide();
            autoTimer();
          }
        });
      });

      //모바일 전용 핑거(손가락) 터치 이벤트
      $('#section1 .slide-container').on({
        touchstart: function(event){ //mousedown          
          touchStart = event.originalEvent.changedTouches[0].clientX;   // .originalEvent.touches[0]   순수자바스크립트              
          dragStart = event.originalEvent.changedTouches[0].clientX-$('#section1 .slide-wrap').offset().left-winW;                    
          mouseDown = true;
        },
        touchend: function(event){ //mouseup
          touchEnd = event.originalEvent.changedTouches[0].clientX;
          result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';                    
          if( result==='NEXT' ){   
            if(!$('#section1 .slide-wrap').is(':animated')){
              nextCount();
            }
          }
          if( result==='PREV' ){
            if(!$('#section1 .slide-wrap').is(':animated')){
              prevCount();
            }
          }
          mouseDown = false;
        },
        touchmove: function(event){ //mousemove
          if(!mouseDown)return;
          dragEnd = event.originalEvent.changedTouches[0].clientX;
          $('#section1 .slide-wrap').css({left : dragEnd - dragStart });
        }
      });
    }
    section2(){

      let cnt=0;
      //터치스와이프
      let touchStart = 0;
      let touchEnd = 0;
      let result = null;
      
      //슬라이드 너비 반응형 구하기
      //너비와 높이가 단 1픽셀이라도 변경되면 동작한다
      //크기변경이 없으면 절대 동작하지 않는다
      let winW = $(window).width(); //창너비 초기값
        $(window).resize(function(){ //반응형 창너비(데스크탑, 태블릿, 노트북, 모바일)
          winW = $(window).width();
          console.log('창너비', winW);
          sec2Slide();
          return winW;          
        });

      function sec2Slide(){        
        $('#section2 .rank').stop().animate({left:`${-1540*cnt}`}, 1000, function(){          
          $(this).stop().animate({left:`${-1540*cnt}`}, 0)
        });        
      }
      function nextCount(){
        cnt++;
        sec2Slide();
      }
      function prevCount(){
        cnt--;
        sec2Slide();
      }

      //상품랭킹 보기
      //버튼 나타나기      
      $('#section2 .content').on({
        mouseenter: function(){
          if( 1 > $('#section2 .rank li') >= cnt ){
            $('#section2 #right').show();
            $('#section2 #left').hide();            
          }
          else {
            $('#section2 #left').show();
            $('#section2 #right').hide();
          }
        }
      });

      //다음/이전 버튼클릭
      $('#section2 #right').on({
        click: function(){
          nextCount();
          $(this).hide();
        }
      });
      $('#section2 #left').on({
        click: function(){          
          prevCount();                
          $(this).hide();
        }
      });
      
      let winH = $(window).height();  
      let sec2Top = $('#section2').offset().top-winH;

      $(window).scroll(()=>{
          if( $(window).scrollTop()===0 ){
            $('#section2').removeClass('sec2Ani');
          }
          if( $(window).scrollTop() > sec2Top ){
            $('#section2').addClass('sec2Ani');    
          }
      });

      //모바일 전용 핑거(손가락) 터치 이벤트
      $('#section2 .content').on({
        touchstart: function(event){ //mousedown                            
          touchStart = event.originalEvent.changedTouches[0].clientX;   // .originalEvent.touches[0]   순수자바스크립트              
          dragStart = event.originalEvent.changedTouches[0].clientX-$('#section2 .rank').offset().left-winW;                    
          mouseDown = true;
        },
        touchend: function(event){ //mouseup
          touchEnd = event.originalEvent.changedTouches[0].clientX;
          result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';                    
          if( result==='NEXT' ){   
            if(!$('#section2 .rank').is(':animated')){
              nextCount();
            }
          }
          if( result==='PREV' ){
            if(!$('#section2 .rank').is(':animated')){
              prevCount();
            }
          }
          mouseDown = false;
        },
        touchmove: function(event){ //mousemove
          if(!mouseDown)return;
          dragEnd = event.originalEvent.changedTouches[0].clientX;
          $('#section2 .rank').css({left : dragEnd - dragStart });
        }
      });

    }
    section3(){
      let winH = $(window).height();  
      let sec3Top = $('#section3').offset().top-winH;

      $(window).scroll(()=>{
          // if( $(window).scrollTop()===0 ){
          //   $('#section3').removeClass('sec3Ani');
          // }
          if( $(window).scrollTop() > sec3Top ){
            $('#section3').addClass('sec3Ani');    
          }
      });
    }
    section4(){
      let winH = $(window).height();  
      let sec4Top = $('#section4').offset().top-winH;

      $(window).scroll(()=>{
          // if( $(window).scrollTop()===0 ){
          //   $('#section4').removeClass('sec4Ani');
          // }
          if( $(window).scrollTop() > sec4Top ){
            $('#section4').addClass('sec4Ani');    
          }
      });
    }
    section5(){}
    section6(){
      let winH = $(window).height();  
      let sec6Top = $('#section6').offset().top-winH;

      $(window).scroll(()=>{
          if( $(window).scrollTop()===0 ){
            $('#section6').removeClass('sec6Ani');
          }
          if( $(window).scrollTop() > sec6Top ){
            $('#section6').addClass('sec6Ani');    
          }
      });
    }
    section7(){
      let winH = $(window).height();  
      let sec7Top = $('#section7').offset().top-winH;

      $(window).scroll(()=>{
          if( $(window).scrollTop()===0 ){
            $('#section7').removeClass('sec7Ani');
          }
          if( $(window).scrollTop() > sec7Top ){
            $('#section7').addClass('sec7Ani');    
          }
      });
    }
    section8(){
      let winH = $(window).height();  
      let sec8Top = $('#section8').offset().top-winH;

      $(window).scroll(()=>{
          if( $(window).scrollTop()===0 ){
            $('#section8').removeClass('sec8Ani');
          }
          if( $(window).scrollTop() > sec8Top ){
            $('#section8').addClass('sec8Ani');    
          }
      });
    }
    section9(){
      let winH = $(window).height();  
      let sec9Top = $('#section9').offset().top-winH;

      $(window).scroll(()=>{
          // if( $(window).scrollTop()===0 ){
          //   $('#section9').removeClass('sec9Ani');
          // }
          if( $(window).scrollTop() > sec9Top ){
            $('#section9').addClass('sec9Ani');    
          }
      });
    }
    section10(){
      let winH = $(window).height();  
      let sec10Top = $('#section10').offset().top-winH;

      $(window).scroll(()=>{
          if( $(window).scrollTop()===0 ){
            $('#section10').removeClass('sec10Ani');
          }
          if( $(window).scrollTop() > sec10Top ){
            $('#section10').addClass('sec10Ani');    
          }
      });
    }
    section11(){
      let winH = $(window).height();  
      let sec11Top = $('#section11').offset().top-winH;

      $(window).scroll(()=>{
          if( $(window).scrollTop()===0 ){
            $('#section11').removeClass('sec11Ani');
          }
          if( $(window).scrollTop() > sec11Top ){
            $('#section11').addClass('sec11Ani');    
          }
      });
    }
    section12(){
      let winH = $(window).height();  
      let sec12Top = $('#section12').offset().top-winH;

      $(window).scroll(()=>{
          // if( $(window).scrollTop()===0 ){
          //   $('#section12').removeClass('sec12Ani');
          // }
          if( $(window).scrollTop() > sec12Top ){
            $('#section12').addClass('sec12Ani');    
          }
      });
    }    
    footer(){}
    gotop(){
      $(window).scroll(()=>{
        if( $(window).scrollTop() > 100 ){
          $('#gotop').stop().fadeIn(1000);
        }
        else {
          $('#gotop').stop().fadeOut(1000);
        }
      });

      //스무스 스크롤링
      $('.gotop-btn').on({
        click: function(){
          $('html, body').stop().animate({scrollTop : 0}, 500);
        }
      });
    }
    
  }
  const newckrStore = new ckrStore();
  newckrStore.init();

})(jQuery);