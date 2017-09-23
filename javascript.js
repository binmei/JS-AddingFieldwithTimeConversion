		var idCtr = 0;
		var listOfDetails = [];
		var snStr = "";
        var retStr = "";
                    
		function Detail(date, reason){
			this.date = date;
			this.reason = reason;
			this.getDate = function(){
				return this.date; 
			};
			this.getReason = function(){
				return this.reason;
			};
		}

        //Event handler for 
		function addRow(){
            if(listEmpty) {
                
                
            } else {
                var elementID = "rca_li" + ++idCtr;
                var newLi = document.createElement("li");
                newLi.innerHTML = document.getElementById('rca_li0').innerHTML;
                newLi.setAttribute("class", "rca_list_element");
                newLi.setAttribute("id", elementID);            
                document.getElementById('rca_list').append(newLi);
            }
		}

		function deleteRow(element){
			$(element).parent('li').remove();
            parseInput();l
		}
        
        function enablePostBtn(){
            document.getElementById("rca_post_btn").disabled = false;
        }
        
        function parseInput(){
            listOfDetails = [];
            
            var i;
            var list = document.getElementById('rca_list');
            var items = list.getElementsByTagName('li');
        
			for(i = 0; i < items.length; i++){
				var date = new Date(items[i].getElementsByTagName("input")[0].value);
				var description = items[i].getElementsByTagName("textarea")[0].value;
				var detail = new Detail(date, description);
				listOfDetails.push(detail);
			}
        }
        
        function displayList(){
            
            var i;
            var displayStr = '';
            
            for(i = 0; i < listOfDetails.length; i++){
				var detail = listOfDetails[i];
                displayStr += detail.getDate() + " " + detail.getReason() + "<br \>";
			}

            document.getElementById('rca_preview_text').innerHTML = displayStr;
        }
        
		function preview(){
			parseInput();
			displayList();
            enablePostBtn();
		}
        
		function convertTime(){
			convertToUTC(listOfDetails);
            displayList();
            enablePostBtn();
		}

		function convertToUTC(listOfDetails){            
			var i;
            var tempStr = "";
		
			for(i = 0; i < listOfDetails.length; i++){
				var detail = listOfDetails[i];
                var weekDay = [7];
                weekDay[1] = "Monday";
                weekDay[2] = "Tuesday";
                weekDay[3] = "Wednesday";
                weekDay[4] = "Thursday";
                weekDay[5] = "Friday";
                weekDay[6] = "Saturday";
                weekDay[7] = "Sunday";               
                var dayOfWeek = weekDay[detail.getDate().getDay()];
                
				detail.date = dayOfWeek + ", " + detail.getDate().toLocaleString('en-US', { timeZone:'Europe/London'}) + " (UTC)";
			}
		}
		
		function submitToSN(str){
            var confirmedToSend = false;
            confirmedToSend = confirm("Send the payload to ServiceNow?");
            if(confirmedToSend === true){
                var payloadStr = "";
                var i;
                
                for(i = 0; i < listOfDetails.length; i++){
                    var detail = listOfDetails[i];
                    payloadStr += detail.getDate() + " " + detail.getReason() + "<br />";
                }
                
                var payload = {
                    "text" : payloadStr
                };
            
     
                var xhr = new XMLHttpRequest();
                xhr.open("POST", 'https://requestb.in/xmwytaxm', true);

                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.send(JSON.stringify(payload));
                console.log(JSON.stringify(payload));
                alert("Payload has been sent.");
            } else {
                alert("Payload not sent.");
            }
           
		}