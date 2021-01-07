$( document ).ready(function() {
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
      "low fever","high fever","mild fever","sweating","chills","breathing difficulties","cough","fatigue","wheezing",
      "chest pain","shortness of breath","headache","chest discomfort","weight loss",
      ,"snezzing","runny nose","watery eyes","diarrhea","confusion","decreased urine output",
      "bloating","muscle pain","infection"],
      dropdown : {
        classname : "color-blue",
                enabled   : 0,         // show the dropdown immediately on focus
                maxItems  : 15,
                position  : "text",    // place the dropdown near the typed text
                closeOnSelect : true, // keep the dropdown open after selecting a suggestion
              }
            });


    $("#fever").change(function(){
      if($("#fever").is(':checked')){
       $('#feverCondition').modal('show');
       $('#feverCondition').on('shown.bs.modal', function (e) {
        $('#feverbtn').on('click', function(){
          const feverVal=$('input[name=feverCond]:checked', '#booking-form').val();
          if(tagify.getTagIndexByValue(feverVal) == '') tagify.addTags([feverVal])
        })
      })
     }
     if(!$("#fever").is(':checked')){
      if(tagify.getTagIndexByValue("high fever") != '')tagify.removeTag("high fever");
      if(tagify.getTagIndexByValue("mild fever") != '')tagify.removeTag("mild fever");
      if(tagify.getTagIndexByValue("low fever") != '')tagify.removeTag("low fever");
    }
    });



    // tagify.addTags([$("#vomiting").val()])
    $("#vomiting").change(function(){
      if($("#vomiting").is(':checked')){
        $('#vomitCondition').modal('show');

        $('#vomitCondition').on('shown.bs.modal', function (e) {

         $('#vomitbtn').on('click', function(){
          if($('#frequentVomit').is(':checked')){
            if(tagify.getTagIndexByValue("frequent vomiting") == '') tagify.addTags([$("#frequentVomit").val()]);
          }
          if(!$('#frequentVomit').is(':checked')){
            if(tagify.getTagIndexByValue("frequent vomiting") != '')tagify.removeTag("frequent vomiting");

          }
          if($('#bloodVomit').is(':checked')){
            if(tagify.getTagIndexByValue("vomiting with blood") == '') tagify.addTags([$("#bloodVomit").val()]);

          }
          if(!$('#bloodVomit').is(':checked')){
            if(tagify.getTagIndexByValue("vomiting with blood") != '')tagify.removeTag("vomiting with blood");
          }
          if($('#noneVomit').is(':checked')){
            if(tagify.getTagIndexByValue("vomiting") == '') tagify.addTags([$("#noneVomit").val()]);

          }
          if(!$('#noneVomit').is(':checked')){
            if(tagify.getTagIndexByValue("vomiting") != '')tagify.removeTag("vomiting");
          }
        })

       });
        $( "#frequentVomit" ).prop( "checked", false );
        $( "#bloodVomit" ).prop( "checked", false );
        $( "#noneVomit" ).prop( "checked", false );
      }
      if(!$("#vomiting").is(':checked')){

        if(tagify.getTagIndexByValue("vomiting") != '')tagify.removeTag("vomiting");
        if(tagify.getTagIndexByValue("vomiting with blood") != '')tagify.removeTag("vomiting with blood");
        if(tagify.getTagIndexByValue("frequent vomiting") != '')tagify.removeTag("frequent vomiting");
      }
    });


    $("#cough").change(function(){
      if($("#cough").is(':checked')){
        $('#coughCondition').modal('show');
        $('#coughCondition').on('shown.bs.modal', function (e) {
          $('#coughbtn').on('click', function(){
            if($('#frequentCough').is(':checked')){
              if(tagify.getTagIndexByValue("frequent cough") == '') tagify.addTags([$("#frequentCough").val()]);
            }
            if(!$('#frequentCough').is(':checked')){
              if(tagify.getTagIndexByValue("frequent cough") != '')tagify.removeTag("frequent cough");
            }
            if($('#bloodCough').is(':checked')){
              if(tagify.getTagIndexByValue("cough with blood") == '') tagify.addTags([$("#bloodCough").val()]);
            }
            if(!$('#bloodCough').is(':checked')){
              if(tagify.getTagIndexByValue("cough with blood") != '')tagify.removeTag("cough with blood");
            }
            if($('#coughDuration').is(':checked')){
              if(tagify.getTagIndexByValue("cough more than 2 weeks") == '') tagify.addTags([$("#coughDuration").val()]);
            }
            if(!$('#coughDuration').is(':checked')){
              if(tagify.getTagIndexByValue("cough more than 2 weeks") != '')tagify.removeTag("cough more than 2 weeks");
            }
            if($('#coughMucas').is(':checked')){
              if(tagify.getTagIndexByValue("cough with mucas") == '') tagify.addTags([$("#coughMucas").val()]);
            }
            if(!$('#coughMucas').is(':checked')){
              if(tagify.getTagIndexByValue("cough with mucas") != '')tagify.removeTag("cough with mucas");
            }
            if($('#noneCough').is(':checked')){
              if(tagify.getTagIndexByValue("cough") == '') tagify.addTags([$("#noneCough").val()]);
            }
            if(!$('#noneCough').is(':checked')){
              if(tagify.getTagIndexByValue("cough") != '')tagify.removeTag("cough");
            }
          });

        });
        $( "#frequentCough" ).prop( "checked", false );
        $( "#bloodCough" ).prop( "checked", false );
        $( "#coughDuration" ).prop( "checked", false );
        $( "#coughMucas" ).prop( "checked", false );
        $( "#noneCough" ).prop( "checked", false );
      }
      if(!$("#cough").is(':checked')){
        if(tagify.getTagIndexByValue("frequent cough") != '')tagify.removeTag("frequent cough");
        if(tagify.getTagIndexByValue("cough with blood") != '')tagify.removeTag("cough with blood");
        if(tagify.getTagIndexByValue("cough with mucas") != '')tagify.removeTag("cough with mucas");
        if(tagify.getTagIndexByValue("cough more than 2 weeks") != '')tagify.removeTag("cough more than 2 weeks");
        if(tagify.getTagIndexByValue("cough") != '')tagify.removeTag("cough");
      }
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
      if(symptomArr.length==0){
        $("#step2").prepend('<div style="text-align: center" class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Nothing is inserted</div>');
      }
      else{
        $(".tab-pane").hide();
      $("#step3").fadeIn(1000);
      $('.progressbar-dots').removeClass('active');
      $('.progressbar-dots:nth-child(3)').addClass('active');
        if(symptomArr.includes('vomiting with blood')||symptomArr.includes('frequent vomiting')){
          if(!symptomArr.includes('vomiting'))symptomArr.push('vomiting')
        }
      if(symptomArr.includes('frequent cough')||symptomArr.includes('cough with blood')||symptomArr.includes('cough with mucas')||symptomArr.includes('cough more than 2 weeks')){
        if(!symptomArr.includes('cough'))symptomArr.push('cough')
      }

    $.ajax({
      url: 'symptompChecker/',
      type: 'POST',
      data: {
        arr:symptomArr
      },
      success: function(response) {

       resArr=response;
         // console.log(resArr);
         finalStep(resArr);
       },
       error: function(err){
        console.log(err.status);
      }
    })
    }

    });





    $("#Asthma").hide("fast");
    $("#Acute_bronchitis").hide("fast");
    $("#Allergy").hide("fast");
    $("#Anthrax").hide("fast");
    $("#Acute_liver_failure").hide("fast");
    $("#Chronic_cough").hide("fast");
    $("#Concussion").hide("fast");
    $("#Malaria").hide("fast");
    $("#Lung_Abscess").hide("fast");
    $("#Pneumonia").hide("fast");
    $("#Leukemia").hide("fast");
    $("#Dengue").hide("fast");
    $("#Gastritis").hide("fast");
    $("#submit-btn").hide("fast");
    $("#qLabel").hide("fast");
    $("#progress-line").hide("fast");

    function finalStep  (){
      $("#processing").hide("fast");
     if(resArr.includes('Asthma'))$("#Asthma").show("fast");
     if(resArr.includes('Acute Bronchitis'))$("#Acute_bronchitis").show("fast");
     if(resArr.includes('Allergy(Hay Fever)'))$("#Allergy").show("fast");
     if(resArr.includes('Anthrax'))$("#Anthrax").show("fast");
     if(resArr.includes('Acute liver failure'))$("#Acute_liver_failure").show("fast");
     if(resArr.includes('Chronic cough'))$("#Chronic_cough").show("fast");
     if(resArr.includes('Concussion'))$("#Concussion").show("fast");
     if(resArr.includes('Malaria'))$("#Malaria").show("fast");
     if(resArr.includes('Lung Abscess'))$("#Lung_Abscess").show("fast");
     if(resArr.includes('Pneumonia'))$("#Pneumonia").show("fast");
     if(resArr.includes('Leukemia'))$("#Leukemia").show("fast");
     if(resArr.includes('Dengue'))$("#Dengue").show("fast");
     if(resArr.includes('Gastritis'))$("#Gastritis").show("fast");
     $("#submit-btn").show("fast");
     $("#qLabel").show("fast");
    $("#progress-line").show("fast");
    }


    $('#btn_first').click(function() {
      $(".tab-pane").hide();
      $("#step2").fadeIn(1000);
      $('.progressbar-dots').removeClass('active');
      $('.progressbar-dots:nth-child(2)').addClass('active');
    });
    // $(".next-btn2").click(function() {

    //   $(".tab-pane").hide();
    //   $("#step3").fadeIn(1000);
    //   $('.progressbar-dots').removeClass('active');
    //   $('.progressbar-dots:nth-child(3)').addClass('active');
    // });
});
