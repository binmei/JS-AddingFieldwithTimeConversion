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

		function addRow(){
            var tempList = document.getElementById('rca_list');
            var isEmptyList = tempList.getElementsByTagName('*').length == 0;
            
            if(isEmptyList) {
                addFirst();    
            } else {
                var elementID = "rca_li" + ++idCtr;
                var newLi = document.createElement("li");
                var tempItem = tempList.getElementsByTagName('li');
                tempItemId = tempItem[0].id;
                newLi.innerHTML = document.getElementById(tempItemId).innerHTML;
                newLi.setAttribute("class", "rca_list_element");
                newLi.setAttribute("id", elementID);            
                document.getElementById('rca_list').append(newLi);
            }
		}
        
        function addFirst(){
            var elementID = "rca_li0";
            var newLi = document.createElement("li");
            
            newLi.innerHTML = '<input type="datetime-local"></input>' +
                '<textarea type="html" class="input"></textarea>' + 
                '<button onclick="deleteRow(this)">Delete</button>';
            newLi.setAttribute("class", "rca_list_element");
            newLi.setAttribute("id", elementID);            
            document.getElementById('rca_list').append(newLi);
        }
        
		function deleteRow(element){
			var ele = element;
            var par = ele.parentNode;
            document.getElementById(par.id).remove();
            parseInput();
		}
        
        
        function enablePostBtn(){
			var irt_num = document.getElementById('sys_display.cirt').value;
			var previewText = document.getElementById('rca_preview_text').value;
			var containsInvalid = false;
			containsInvalid = previewText.includes('Invalid Date');
			if(irt_num != "" &amp;&amp; previewText != "" &amp;&amp; containsInvalid === false){
				document.getElementById("rca_post_btn").disabled = false;
			} else {
				alert("Please make sure the IRT field, Date, and Description Fields are filled in properly!");
			}
        }
        
        function parseInput(){
            listOfDetails = [];            
            var i;
            var list = document.getElementById('rca_list');
            var items = list.getElementsByTagName('li');
        
			for(i = 0; i &lt; items.length; i++){
				var date = new Date(items[i].getElementsByTagName("input")[0].value);
				var description = items[i].getElementsByTagName("textarea")[0].value;
				var detail = new Detail(date, description);
				listOfDetails.push(detail);
			}
        }
        
        function displayList(){
            var i;
            var displayStr = '';
            
            for(i = 0; i &lt; listOfDetails.length; i++){
				var detail = listOfDetails[i];
                displayStr += detail.getDate() + " " + detail.getReason() + "\n";
			}

            document.getElementById('rca_preview_text').innerHTML = displayStr;
        }
        
		function preview(){
			parseInput();
			displayList();
            enablePostBtn();
		}
        
		function convertTime(){
			parseInput();
			convertToUTC(listOfDetails);
            displayList();
            enablePostBtn();
		}

		function convertToUTC(listOfDetails){            
			var i;
            var tempStr = "";
		
			for(i = 0; i &lt; listOfDetails.length; i++){
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
		
		function clearRCAPreview(){
            document.getElementById('rca_preview_text').innerHTML = '';
			document.getElementById("rca_post_btn").disabled = true;
        }
		
		function submitToSN(str){
            var confirmedToSend = false;
			var irt_num = document.getElementById('sys_display.cirt').value;
            confirmedToSend = confirm("Update RCA Now?\n\nWarning: This will overwrite RCA's Incident Description Field if it's already written.");
            if(confirmedToSend === true){
                var payloadStr = "";
                var i;
                
                for(i = 0; i &lt; listOfDetails.length; i++){
                    var detail = listOfDetails[i];
                    payloadStr += detail.getDate() + " " + detail.getReason() + "&lt;br \&gt;";
                };
                
                var payload = {
					"irt_num" : irt_num,
                    "text" : payloadStr
                };
            
                var xhr = new XMLHttpRequest();
               
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.send(JSON.stringify(payload));
                alert("RCA has not been updated.");
            } else {
                alert("RCA has been updated.");
            }
		}