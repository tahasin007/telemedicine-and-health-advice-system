window.setTimeout(function() {
    $('.alert').fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
}, 2000);

CKEDITOR.replace('mail',{
	plugins: 'wysiwygarea,toolbar,basicstyles,link',
});