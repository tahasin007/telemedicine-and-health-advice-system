var input = document.querySelector('textarea[name=tags]'),
    // init Tagify script on the above inputs
tagify = new Tagify(input, {
    enforeWhitelist : true,
    whitelist       : ["The Shawshank Redemption"]
});
tagify.addTag(["yes"]);

// toggle Tagify on/off
document.querySelector('input[type=checkbox]').addEventListener('change', function(){
    document.body.classList[this.checked ? 'add' : 'remove']('disabled');
})