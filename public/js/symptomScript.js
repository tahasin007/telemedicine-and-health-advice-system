const symptomArr = [];
var resArr = [];  
$(document).on("click",'#btn_first',function(){
  const Gender='Gender: '+$('#gender').find(":selected").text();
  const Age='Age: '+$('#age').val();
  // tagify.addTags([Gender,Age]);
});
var input = document.querySelector('textarea[name=tags]'),
tagify = new Tagify(input, {
  whitelist       : ["nausea","vomiting","loss of appetite","indigestion","abdominal pain",
  "fever","sweating","chills","breathing difficulties","cough","fatigue","wheezing",
  "chest pain","shortness of breath","headache","chest discomfort","weight loss",
  ,"snezzing","runny nose","watery eyes","diarrhea","confusion","decreased urine output",
  "bloating","muscle pain","infection"],
  dropdown : {
    classname : "color-blue",
            enabled   : 0,         // show the dropdown immediately on focus
            maxItems  : 15,
            position  : "text",    // place the dropdown near the typed text
            closeOnSelect : false, // keep the dropdown open after selecting a suggestion
          }
        });   

$("#fever").change(function(){
  if($("#fever").is(':checked'))tagify.addTags([$("#fever").val()])
    if(!$("#fever").is(':checked'))tagify.removeTag("fever")
  });
$("#vomiting").change(function(){
  if($("#vomiting").is(':checked'))tagify.addTags([$("#vomiting").val()])
    if(!$("#vomiting").is(':checked'))tagify.removeTag("vomiting")
  });
$("#nausea").change(function(){
  if($("#nausea").is(':checked'))tagify.addTags([$("#nausea").val()])
    if(!$("#nausea").is(':checked'))tagify.removeTag("nausea")
  });
$("#loss_of_appetite").change(function(){
  if($("#loss_of_appetite").is(':checked'))tagify.addTags([$("#loss_of_appetite").val()])
    if(!$("#loss_of_appetite").is(':checked'))tagify.removeTag("loss of appetite")
  });
$("#weight_loss").change(function(){
  if($("#weight_loss").is(':checked'))tagify.addTags([$("#weight_loss").val()])
    if(!$("#weight_loss").is(':checked'))tagify.removeTag("weight loss")
  });
$("#cough").change(function(){
  if($("#cough").is(':checked'))tagify.addTags([$("#cough").val()])
    if(!$("#cough").is(':checked'))tagify.removeTag("cough")
  });

$("#fatigue").change(function(){
  if($("#fatigue").is(':checked'))tagify.addTags([$("#fatigue").val()])
    if(!$("#fatigue").is(':checked'))tagify.removeTag("fatigue")
  });
$("#abdominal_pain").change(function(){
  if($("#abdominal_pain").is(':checked'))tagify.addTags([$("#abdominal_pain").val()])
    if(!$("#abdominal_pain").is(':checked'))tagify.removeTag("abdominal pain")
  });
$("#shortness_of_breath").change(function(){
  if($("#shortness_of_breath").is(':checked'))tagify.addTags([$("#shortness_of_breath").val()])
    if(!$("#shortness_of_breath").is(':checked'))tagify.removeTag("shortness of breath")
  });
$("#sweating").change(function(){
  if($("#sweating").is(':checked'))tagify.addTags([$("#sweating").val()])
    if(!$("#sweating").is(':checked'))tagify.removeTag("sweating")
  });
$("#wheezing").change(function(){
  if($("#wheezing").is(':checked'))tagify.addTags([$("#wheezing").val()])
    if(!$("#wheezing").is(':checked'))tagify.removeTag("wheezing")
  });
$("#headache").change(function(){
  if($("#headache").is(':checked'))tagify.addTags([$("#headache").val()])
    if(!$("#headache").is(':checked'))tagify.removeTag("headache")
  });
$("#chest_pain").change(function(){
  if($("#chest_pain").is(':checked'))tagify.addTags([$("#chest_pain").val()])
    if(!$("#chest_pain").is(':checked'))tagify.removeTag("chest pain")
  });
$("#chills").change(function(){
  if($("#chills").is(':checked'))tagify.addTags([$("#chills").val()])
    if(!$("#chills").is(':checked'))tagify.removeTag("chills")
  });
$("#breathing_difficulties").change(function(){
  if($("#breathing_difficulties").is(':checked'))tagify.addTags([$("#breathing_difficulties").val()])
    if(!$("#breathing_difficulties").is(':checked'))tagify.removeTag("breathing difficulties")
  });
$(document).on("click",'#checker',function(e){
  e.preventDefault();
  const len=tagify.getTagElms().length;
  for(var i=0;i<len;i++){
    symptomArr.push(tagify.value[i].value);
  }
  $.ajax({
    url: 'symptompChecker/',
    type: 'POST',
    data: {
      arr:symptomArr
    },
    success: function(response) {
     resArr=response;
     console.log(resArr); 
     finalStep(resArr);
   },
   error: function(err){
    console.log(err.status);
  }
})
});


function finalStep  (){ 
if(!resArr.includes('Asthma'))$("#Asthma").hide("fast");
if(!resArr.includes('Acute Bronchitis'))$("#Acute_bronchitis").hide("fast");
if(!resArr.includes('Allergy(Hay Fever)'))$("#Allergy").hide("fast");
if(!resArr.includes('Anthrax'))$("#Anthrax").hide("fast");
if(!resArr.includes('Acute liver failure'))$("#Acute_liver_failure").hide("fast");
if(!resArr.includes('Chronic cough'))$("#Chronic_cough").hide("fast");
if(!resArr.includes('Concussion'))$("#Concussion").hide("fast");
if(!resArr.includes('Malaria'))$("#Malaria").hide("fast");
if(!resArr.includes('Lung Abscess'))$("#Lung_Abscess").hide("fast");
if(!resArr.includes('Pneumonia'))$("#Pneumonia").hide("fast");
if(!resArr.includes('Leukemia'))$("#Leukemia").hide("fast");
if(!resArr.includes('Dengue'))$("#Dengue").hide("fast");
if(!resArr.includes('Gastritis'))$("#Gastritis").hide("fast");  
}



