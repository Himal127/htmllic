	function refreshCaptcha(){
			 $.ajax({
		            url: "captcha.jpeg",
		            type: 'GET',
		            beforeSend: function () {
		                $(".loaderDiv").show();
		            },
		            complete: function () {
		                $(".loaderDiv").hide();
		            },
		            success: function(data) {
		            	$("#captchaImage").attr('src', data);
		            	$("#captchaText").val("");
		            }
		        }); 
	}
	
	function removeItem(id,itemValue){
		
		$.ajax({
			url: "deletePolicy?policyNumber="+itemValue,
			type: 'POST',
            beforeSend: function () {
                $(".loaderDiv").show();
            },
            complete: function () {
                $(".loaderDiv").hide();
            },
		});
		
		id.remove();
	}
	
	/*function disableVIDOrAadhaarField(){
	    var radio = $("input[name='inputType']:checked").val();
        $('#aadhaarNumber, #virtualId').attr('disabled',true);
        if(radio == "aadhaar"){
            $('#aadhaarNumber').attr('disabled',false);
            $("#aadhaarNumber").focus();
            $('#virtualId').val("");
	    }else if(radio == "vid"){
		    $('#virtualId').attr('disabled',false);
            $("#virtualId").focus();
            $('#aadhaarNumber').val("");
	    }
    }*/

$(document).ready(function() {
	
	$("#AadhaarNumber, #VirtualId").change(function () {
		disableVIDOrAadhaarField();
	});
	
	$('#isConsented').change(function() {
        if ($(this).is(":checked")) {
            $('#seedRequestSubmitButton').prop('disabled', false);
            $('#seedRequestSubmitButton').prop('title', "");
        } else {
        	$('#seedRequestSubmitButton').prop('title', "Please provide your consent by ticking the checkbox");
            $('#seedRequestSubmitButton').prop('disabled', true);
        }
    });
	
	$('#checkPANStatusForm').submit(function(event){
		event.preventDefault();
		
		if ($('#policyNumber').val() == '') {
			$('#checkPolPANStatusAlert strong').html("Error! Please enter Policy Number.");
	        $('#checkPolPANStatusAlert').show();
	        $('html, body').animate({
				scrollTop: $("#checkPolPANStatusAlert").offset().top
			 }, 2000);
	        $(".alert").delay(5000).slideUp("slow");
	        return false;
		} else if (isNaN($('#policyNumber').val()) || $("#policyNumber").val().length >= 10 || $("#policyNumber").val().length <= 5 ) {
			$('#policyNumber').val('');
			$('#checkPolPANStatusAlert strong').html("Error! Please enter a valid policy number.");
	        $('#checkPolPANStatusAlert').show();
	        $('html, body').animate({
	         scrollTop: $("#checkPolPANStatusAlert").offset().top
			}, 2000);
	        $(".alert").delay(5000).slideUp("slow");
	        return false;
		}
		
		if(!isValidDate($('#dateOfBirth').val())) {
        	$('#dateOfBirth').val("");
            $('#checkPolPANStatusAlert strong').html("Error! Please enter date in dd/mm/yyyy format.");
            $('#checkPolPANStatusAlert').show();
            $('html, body').animate({
				scrollTop: $("#checkPolPANStatusAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        }
		
		if(isFutureDate($('#dateOfBirth').val())) {
        	$('#dateOfBirth').val("");
            $('#checkPolPANStatusAlert strong').html("Error! Please enter correct date.");
            $('#checkPolPANStatusAlert').show();
            $('html, body').animate({
				scrollTop: $("#checkPolPANStatusAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        }
		
		if($("#pan").val().length == 10) {
        	if(!isValidPanNumber($("#pan").val())) {
        		 $("#pan").val("");
                 $('#checkPolPANStatusAlert strong').html("Error! Invalid PAN Number.");					
                 $('#checkPolPANStatusAlert').show();
				 $('html, body').animate({
					scrollTop: $("#checkPolPANStatusAlert").offset().top
				 }, 2000);
                 $(".alert").delay(5000).slideUp("slow");
                 return false;
        	}
        } else {
        	 $("#pan").val("");
        	 $('#checkPolPANStatusAlert strong').html("Error! PAN Number should be of 10 digits.");
             $('#checkPolPANStatusAlert').show();
             $('html, body').animate({
				scrollTop: $("#checkPolPANStatusAlert").offset().top
			 }, 2000);
             $(".alert").delay(5000).slideUp("slow");
             return false;
        }
		
		var formData = $('#checkPANStatusForm').serialize();
		$.ajax({
	           url: "getPolicyPANStatus",
	           type: 'POST',
	           data: formData,
	           beforeSend: function () {
	               $(".loaderDiv").show();
	           },
	           complete: function () {
	               $(".loaderDiv").hide();
	           },
	           
	           success: function(data) {
	               if (data !='' & data == "01") {
	            	   $('#redirectPolicyPANQueryForm').submit();
	               } else {
	            	   	$('#enteredPolicy').val('');
	           			$('#checkPolPANStatusAlert strong').html(data);
	           	        $('#checkPolPANStatusAlert').show();
	           	        $('html, body').animate({
	           				scrollTop: $("#checkPolPANStatusAlert").offset().top
	           			 }, 2000);
	           	        $(".alert").delay(5000).slideUp("slow");
	               }
	           }
	       });
	});
	
	$('#checkPANReqStatusForm').submit(function(event){
		event.preventDefault();
		
		if ($('#policyNumber').val() == '') {
			$('#checkPANReqStatusAlert strong').html("Error! Please enter Policy Number.");
	        $('#checkPANReqStatusAlert').show();
	        $('html, body').animate({
				scrollTop: $("#checkPANReqStatusAlert").offset().top
			 }, 2000);
	        $(".alert").delay(5000).slideUp("slow");
	        return false;
		} else if (isNaN($('#policyNumber').val()) || $("#policyNumber").val().length >= 10 || $("#policyNumber").val().length <= 5 ) {
			$('#policyNumber').val('');
			$('#checkPANReqStatusAlert strong').html("Error! Please enter a valid policy number.");
	        $('#checkPANReqStatusAlert').show();
	        $('html, body').animate({
	         scrollTop: $("#checkPANReqStatusAlert").offset().top
			}, 2000);
	        $(".alert").delay(5000).slideUp("slow");
	        return false;
		}
		
		if(!isValidDate($('#dateOfBirth').val())) {
        	$('#dateOfBirth').val("");
            $('#checkPANReqStatusAlert strong').html("Error! Please enter date in dd/mm/yyyy format.");
            $('#checkPANReqStatusAlert').show();
            $('html, body').animate({
				scrollTop: $("#checkPANReqStatusAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        }
		
		if(isFutureDate($('#dateOfBirth').val())) {
        	$('#dateOfBirth').val("");
            $('#checkPANReqStatusAlert strong').html("Error! Please enter correct date.");
            $('#checkPANReqStatusAlert').show();
            $('html, body').animate({
				scrollTop: $("#checkPANReqStatusAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        }
		
		if($("#pan").val().length == 10) {
        	if(!isValidPanNumber($("#pan").val())) {
        		 $("#pan").val("");
                 $('#checkPANReqStatusAlert strong').html("Error! Invalid PAN Number.");					
                 $('#checkPANReqStatusAlert').show();
				 $('html, body').animate({
					scrollTop: $("#checkPANReqStatusAlert").offset().top
				 }, 2000);
                 $(".alert").delay(5000).slideUp("slow");
                 return false;
        	}
        } else {
        	 $("#pan").val("");
        	 $('#checkPANReqStatusAlert strong').html("Error! PAN Number should be of 10 digits.");
             $('#checkPANReqStatusAlert').show();
             $('html, body').animate({
				scrollTop: $("#checkPANReqStatusAlert").offset().top
			 }, 2000);
             $(".alert").delay(5000).slideUp("slow");
             return false;
        }
		
		var formData = $('#checkPANReqStatusForm').serialize();
		$.ajax({
	           url: "getPANReqStatus",
	           type: 'POST',
	           data: formData,
	           beforeSend: function () {
	               $(".loaderDiv").show();
	           },
	           complete: function () {
	               $(".loaderDiv").hide();
	           },
	           
	           success: function(data) {
	               if (data !='' & data == "01") {
	            	   $('#redirectPANReqStatusForm').submit();
	               } else {
	            	   	$('#enteredPolicy').val('');
	           			$('#checkPANReqStatusAlert strong').html(data);
	           	        $('#checkPANReqStatusAlert').show();
	           	        $('html, body').animate({
	           				scrollTop: $("#checkPANReqStatusAlert").offset().top
	           			 }, 2000);
	           	        $(".alert").delay(5000).slideUp("slow");
	               }
	           }
	       });
	});
	
	$('#checkSeedingStatusForm').submit(function(event) {
		
		event.preventDefault();
		
		if ($('#enteredPolicy').val() == '') {
			$('#checkSeedStatusAlert strong').html("Error! Please enter Policy Number.");
	        $('#checkSeedStatusAlert').show();
	        $('html, body').animate({
				scrollTop: $("#checkSeedStatusAlert").offset().top
			 }, 2000);
	        $(".alert").delay(5000).slideUp("slow");
	        return false;
		} else if (isNaN($('#enteredPolicy').val()) || $("#enteredPolicy").val().length >= 10 || $("#enteredPolicy").val().length <= 5 ) {
			$('#enteredPolicy').val('');
			$('#checkSeedStatusAlert strong').html("Error! Please enter a valid policy number.");
	        $('#checkSeedStatusAlert').show();
	        $('html, body').animate({
	         scrollTop: $("#checkSeedStatusAlert").offset().top
			}, 2000);
	        $(".alert").delay(5000).slideUp("slow");
	        return false;
		}
		 
		  
		$.ajax({
	           url: "getAadhaarPanLinkingStatus?policyNumber="+$('#enteredPolicy').val(),
	           type: 'GET',
	           beforeSend: function () {
	               $(".loaderDiv").show();
	           },
	           complete: function () {
	               $(".loaderDiv").hide();
	           },
	           
	           success: function(data) {
	               if (data !='' & data == "01") {
	            	   $('#redirectQueryForm').submit();
	               } else {
	            	   	$('#enteredPolicy').val('');
	           			$('#checkSeedStatusAlert strong').html(data);
	           	        $('#checkSeedStatusAlert').show();
	           	        $('html, body').animate({
	           				scrollTop: $("#checkSeedStatusAlert").offset().top
	           			 }, 2000);
	           	        $(".alert").delay(5000).slideUp("slow");
	               }
	           }
	       });
	});
	
	$('#addPolicyButton').click(function(e) {
		var itemValue = $('#policyNumber').val();
		
		if(itemValue.length >= 10 || itemValue.length <= 5 ) {
			$('#aadhaarSeedingRequestAlert strong').html("Error! Please enter a valid Policy Number.");
			$('#policyNumber').val("");
	        $('#aadhaarSeedingRequestAlert').show();
	        $('html, body').animate({
	         scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			}, 2000);
	        $(".alert").delay(5000).slideUp("slow");
	        return false;
		}
		
		if(itemValue != ""){
			var item  = "<li class=\"col-md-2\" onclick=\"removeItem(this,"+itemValue+")\"><div class=\"thumbnail\"><a class=\"close\">x</a><p>"+itemValue+"</p></div></li>";
			$('#policyList').append(item);
			$('#policyNumber').val("");
			$.ajax({
				url: "addPolicy?policyNumber="+itemValue,
				type: 'POST',
	            beforeSend: function () {
	                $(".loaderDiv").show();
	            },
	            complete: function () {
	                $(".loaderDiv").hide();
	            },
			});
		} 
		$('#policyNumber').prop('required',false);
    });
	

	$('#retryOTPButton').click(function() {
		$('#enteredOTP').val('');
		$.ajax({
            url: "generateOTP?resendOTP=true",
            type: 'POST',
            beforeSend: function () {
                $(".loaderDiv").show();
            },
            complete: function () {
                $(".loaderDiv").hide();
            },
            success: function(data) {
                if (data !='' && data=="01") {
                	$('#resendOTPRequestAlert strong').html("OTP has been sent successfully.");
                    $('#resendOTPRequestAlert').show();
                    $('html, body').animate({
    					scrollTop: $("#resendOTPRequestAlert").offset().top
                    }, 2000);
                    $(".alert").delay(5000).slideUp("slow");
                } else {
                	$('#enteredOTP').val("");
                    $('#validateOTPRequestAlert strong').html(data);
                    $('#validateOTPRequestAlert').show();
                    $('html, body').animate({
    					scrollTop: $("#validateOTPRequestAlert").offset().top
                    }, 2000);
                    $(".alert").delay(5000).slideUp("slow");
                }
            },
            failure: function(data) {
            	console.log(data);
            }
        });
    }); 
	
	function isValidPanNumber(pan) {
		var regPan = /^([a-zA-Z]){3}[pP][a-zA-Z]([0-9]){4}([a-zA-Z]){1}?$/;
		if(regPan.test(pan)){
			   return true;
		} else{
			return false;
		}
	}

	function isValidEmail(email) {
		var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (regEmail.test(email)) {
			return true;
		} else {
			return false;
		}
	} 
	
	function isValidMobileNumber(mobileNumber) {
		var regMobileNumber = /^[6789]\d{9}$/;
		if (regMobileNumber.test(mobileNumber)) {
			return true;
		} else {
			return false;
		}
	}
	
	function isValidName(name) {
		var regexName = /^[a-zA-Z\s.]+$/;
		if(regexName.test(name)) {
			return true;
		} else {
			return false;
		}
	}
	

	function isValidDate(date) {
		var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/;
		if (date.match(dateformat)) {
			var opera1 = date.split('/');
			lopera1 = opera1.length;
			if (lopera1 > 1) {
				var pdate = date.split('/');
			}
			var dd = parseInt(pdate[0]);
			var mm = parseInt(pdate[1]);
			var yy = parseInt(pdate[2]);
			var ListofDays = [ 31, 29, 31, 30, 31, 30, 31, 31,
					30, 31, 30, 31 ];
			if (mm == 1 || mm > 2) {
				if (dd > ListofDays[mm - 1]) {
					return false;
				}
			}
			if (mm == 2) {
				var lyear = false;
				if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
					lyear = true;
				}
				if ((lyear == false) && (dd >= 29)) {
					return false;
				}
				if ((lyear == true) && (dd > 29)) {
					return false;
				}
			}
					
			return true;
		} else {
			return false;
		}
	}
	
	function isFutureDate(date) {
		var pdate = date.split('/');
		var dd = parseInt(pdate[0]);
		var mm = parseInt(pdate[1]);
		var yy = parseInt(pdate[2]);
		
		var dobDate = new Date(yy,mm-1,dd);		
		var today = new Date();
		
		if ( dobDate > today ) {
	        return true;
	    }
	}
	
	$('#validateOTPForm').submit(function(event) {
		
		event.preventDefault();
		
		if ($('#enteredOTP').val() == '') {
			$('#validateOTPRequestAlert strong').html("Error! Please enter OTP.");
	        $('#validateOTPRequestAlert').show();
	        $('html, body').animate({
				scrollTop: $("#validateOTPRequestAlert").offset().top
			 }, 2000);
	        $(".alert").delay(5000).slideUp("slow");
	        return false;
		} else if (isNaN($('#enteredOTP').val()) || $("#enteredOTP").val().length != 6) {
			$('#enteredOTP').val("");
			$('#validateOTPRequestAlert strong').html("Error! Please enter a valid OTP.");
	        $('#validateOTPRequestAlert').show();
	        $('html, body').animate({
	         scrollTop: $("#validateOTPRequestAlert").offset().top
			}, 2000);
	        $(".alert").delay(5000).slideUp("slow");
	        return false;
		}
		 
		var formData = $('#validateOTPForm').serialize();
		  
		$.ajax({
	           url: "verifyOTP",
	           type: 'GET',
	           data: formData,
	           beforeSend: function () {
	               $(".loaderDiv").show();
	           },
	           complete: function () {
	               $(".loaderDiv").hide();
	           },
	           
	           success: function(data) {
	               if (data !='' && data=="01") {
	            	   $('#redirectForm').submit();
	               } else {
	            	   $('#enteredOTP').val("");
	                   $('#validateOTPRequestAlert strong').html(data);
	                   $('#validateOTPRequestAlert').show();
	                   $('html, body').animate({
	    				scrollTop: $("#validateOTPRequestAlert").offset().top
	                   }, 2000);
	                   $(".alert").delay(5000).slideUp("slow");
	               }
	           },
	           failure: function(data) {
	           	console.log(data);
	           }
	       });
	});
	
    $('#aadhaarSeedingRequestForm').submit(function(event) {

        event.preventDefault();

        if ($('#fullName').val().trim() == '') {
        	$('#fullName').val("");
            $('#aadhaarSeedingRequestAlert strong').html("Error! Please enter your name.");
            $('#aadhaarSeedingRequestAlert').show();
            $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        } else if(!isValidName($('#fullName').val())) {
        	$('#aadhaarSeedingRequestAlert strong').html("Error! Please enter correct name. Name can only have letters, space or dot.");
            $('#aadhaarSeedingRequestAlert').show();
            $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        }
        
        if(!isValidDate($('#dob').val())) {
        	$('#dob').val("");
            $('#aadhaarSeedingRequestAlert strong').html("Error! Please enter date in dd/mm/yyyy format.");
            $('#aadhaarSeedingRequestAlert').show();
            $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        }
		
		if(isFutureDate($('#dob').val())) {
        	$('#dob').val("");
            $('#aadhaarSeedingRequestAlert strong').html("Error! Please enter correct date.");
            $('#aadhaarSeedingRequestAlert').show();
            $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        }
        
        /*if ($('#fatherName').val().trim() == '') {
        	$('#fatherName').val("");
            $('#aadhaarSeedingRequestAlert strong').html("Error! Please enter your father's name.");
            $('#aadhaarSeedingRequestAlert').show();
            $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        } else if(!isValidName($('#fatherName').val())) {
        	$('#aadhaarSeedingRequestAlert strong').html("Error! Please enter correct father's name. Name can only have letters, space or dot.");
            $('#aadhaarSeedingRequestAlert').show();
            $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        }*/
        
        
        /*var inputType = $("input[name='inputType']:checked").val();
        if(inputType == "0"){
        if (isNaN($('#aadhaarNumber').val())) {
        	$('#aadhaarNumber').val("");
            $('#aadhaarSeedingRequestAlert strong').html("Error! Please enter a valid Aadhaar number.");
            $('#aadhaarSeedingRequestAlert').show();
            $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        }

        if ($("#aadhaarNumber").val().length == 12) {
            if (!(validate($("#aadhaarNumber").val()))) {
                $("#aadhaarNumber").val("");
                $('#aadhaarSeedingRequestAlert strong').html("Error! Invalid Aadhaar Number.");
                $('#aadhaarSeedingRequestAlert').show();
                $('html, body').animate({
					scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
				 }, 2000);
                $(".alert").delay(5000).slideUp("slow");
                return false;
            }
        } else {
	    	$("#aadhaarNumber").val("");
	        $('#aadhaarSeedingRequestAlert strong').html("Error! Aadhaar Number should be of 12 digits.");
	        $('#aadhaarSeedingRequestAlert').show();
	        $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
	        $(".alert").delay(5000).slideUp("slow");
	        return false;
        }  
        } else if(inputType == "2"){
        	if (isNaN($('#virtualId').val())) {
        	$('#virtualId').val("");
            $('#aadhaarSeedingRequestAlert strong').html("Error! Please enter a valid Virtual ID.");
            $('#aadhaarSeedingRequestAlert').show();
            $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        }

         if ($("#virtualId").val().length == 16) {
            if (!(validate($("#virtualId").val()))) {
                $("#virtualId").val("");
                $('#aadhaarSeedingRequestAlert strong').html("Error! Invalid Virtual ID.");
                $('#aadhaarSeedingRequestAlert').show();
                $('html, body').animate({
					scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
				 }, 2000);
                $(".alert").delay(5000).slideUp("slow");
                return false;
            }
        } else {
	    	$("#virtualId").val("");
	        $('#aadhaarSeedingRequestAlert strong').html("Error! Virtual ID should be of 16 digits.");
	        $('#aadhaarSeedingRequestAlert').show();
	        $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
	        $(".alert").delay(5000).slideUp("slow");
	        return false;
        }
        }*/
        
        if($("#pan").val().length == 10) {
        	if(!isValidPanNumber($("#pan").val())) {
        		 $("#pan").val("");
                 $('#aadhaarSeedingRequestAlert strong').html("Error! Invalid PAN Number.");					
                 $('#aadhaarSeedingRequestAlert').show();
				 $('html, body').animate({
					scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
				 }, 2000);
                 $(".alert").delay(5000).slideUp("slow");
                 return false;
        	}
        } else {
        	 $("#pan").val("");
        	 $('#aadhaarSeedingRequestAlert strong').html("Error! PAN Number should be of 10 digits.");
             $('#aadhaarSeedingRequestAlert').show();
             $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
             $(".alert").delay(5000).slideUp("slow");
             return false;
        }
        
        if(!isValidEmail($("#emailId").val())) {
   		 $("#emailId").val("");
            $('#aadhaarSeedingRequestAlert strong').html("Error! Invalid Email Id.");					
            $('#aadhaarSeedingRequestAlert').show();
			 $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        }
        
        if($("#mobileNumber").val().length != 10) {
        	$("#mobileNumber").val("");
       	 	$('#aadhaarSeedingRequestAlert strong').html("Error! Mobile Number should be of 10 digits.");
            $('#aadhaarSeedingRequestAlert').show();
            $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        } else if(!isValidMobileNumber($("#mobileNumber").val())) {
        	$("#mobileNumber").val("");
        	$('#aadhaarSeedingRequestAlert strong').html("Error! Please provide a correct mobile number.");
            $('#aadhaarSeedingRequestAlert').show();
            $('html, body').animate({
				scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
			 }, 2000);
            $(".alert").delay(5000).slideUp("slow");
            return false;
        }
        
		if($('#policyNumber').prop('required')) {
			var itemValue = $('#policyNumber').val();
			
			if(itemValue.length >= 10 || itemValue.length <= 5 ) {
				$('#aadhaarSeedingRequestAlert strong').html("Error! Please enter a valid Policy Number.");
				$('#policyNumber').val("");
				$('#aadhaarSeedingRequestAlert').show();
				$('html, body').animate({
				 scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
				}, 2000);
				$(".alert").delay(5000).slideUp("slow");
				return false;
			} else {
				$.ajax({
					url: "addPolicy?policyNumber="+itemValue,
					type: 'POST',
					beforeSend: function () {
						$(".loaderDiv").show();
					},
					complete: function () {
						$(".loaderDiv").hide();
					},
				});
			}
		}
		
        var formData = $('#aadhaarSeedingRequestForm').serialize();

        $.ajax({
            url: "generateOTP",
            type: 'POST',
            data: formData,
            beforeSend: function () {
                $(".loaderDiv").show();
            },
            complete: function () {
                $(".loaderDiv").hide();
            },
            success: function(data) {
                if (data !='' && data=="01") {
                	$('#redirectForm').submit();
                } else {
                    $('#aadhaarSeedingRequestAlert strong').html(data);
                    $('#aadhaarSeedingRequestAlert').show();
                    $('html, body').animate({
    					scrollTop: $("#aadhaarSeedingRequestAlert").offset().top
                    }, 2000);
                    $(".alert").delay(5000).slideUp("slow");
                }
            },
            failure: function(data) {
            	console.log(data);
            }
        });
    });
    
    $(function() {
        $("#dob").datepicker({
            changeMonth: true,
            changeYear: true,
            maxDate: 0,
            dateFormat: 'dd/mm/yy',
            yearRange: '-120:+0'
        });
    });
    

    // Function to restrict numeric only input
    $("#aadhaarNumber, #mobileNumber, #enteredOTP, #enteredPolicy, #policyNumber, #virtualId").keypress(function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) return false;
    });
    
});