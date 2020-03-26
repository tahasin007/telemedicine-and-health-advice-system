window.setTimeout(function() {
    $('.alert').fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
}, 2000);

CKEDITOR.replace('mail',{
	plugins: 'wysiwygarea,toolbar,basicstyles,link',
});



$(".next-btn1").click(function() {
   
      $(".tab-pane").hide();
      $("#step2").fadeIn(1000);
      $('.progressbar-dots').removeClass('active');
      $('.progressbar-dots:nth-child(2)').addClass('active');
 });
$(".next-btn2").click(function() {
   
      $(".tab-pane").hide();
      $("#step3").fadeIn(1000);
      $('.progressbar-dots').removeClass('active');
      $('.progressbar-dots:nth-child(3)').addClass('active');
});
