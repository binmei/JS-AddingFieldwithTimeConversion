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
			if(irt_num != "" && previewText != "" && containsInvalid === false){
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
        
			for(i = 0; i < items.length; i++){
				var date = new Date(items[i].getElementsByTagName("input")[0].value);
				var description = items[i].getElementsByTagName("textarea")[0].value;
				var detail = new Detail(date, description);
				listOfDetails.push(detail);
			}
        }
        
        function displayList(timeFlag){
            var i;
            var displayStr = '';
     
            for(i = 0; i < listOfDetails.length; i++){
				var detail = listOfDetails[i];
                var dateStr = detail.getDate().toString();
                if(timeFlag === 'Pacific'){
                    dateStr = formatPacific(dateStr);
                }
                displayStr += dateStr + " " + detail.getReason() + "\n";
			}
            document.getElementById('rca_preview_text').innerHTML = displayStr;
        }
        
		function preview(){
			parseInput();
			displayList('Pacific');
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
            var weekDay = [7];
                weekDay[1] = "Monday";
                weekDay[2] = "Tuesday";
                weekDay[3] = "Wednesday";
                weekDay[4] = "Thursday";
                weekDay[5] = "Friday";
                weekDay[6] = "Saturday";
                weekDay[7] = "Sunday";     
                
			for(i = 0; i < listOfDetails.length; i++){
				var detail = listOfDetails[i];
                var dayOfWeek = weekDay[detail.getDate().getDay()];
                var utcStr = detail.getDate().toLocaleString('en-US', { timeZone:'Europe/London'});
				detail.date = dayOfWeek + ", " + formatUTC(utcStr) + " (London Time)";
			}
		}
        
        function formatHours(str){
            str = str.substring(0, 5)
            var hour = parseInt(str.substring(0,2));
            if(hour <= 9){
                str = str.substring(1, 5) + "AM";
            } else if (hour > 9 && hour < 12){
                str = str.substring(0, 5) + "AM";
            } else if (hour == 12){
                str = str.substring(0, 5) + "PM";
            } else {
                hour = hour - 12;
                str = hour + str.substring(2, 5) + "PM";
            }
            return str;
        }
        
        function formatPacific(str){
            var newStr = '';
            var arr = str.split(' ');
            switch(arr[0]){
                case 'Sun':
                    arr[0] = 'Sunday';
                    break;
                case 'Mon':
                    arr[0] = 'Monday';
                    break;
                case 'Tue':
                    arr[0] = 'Tuesday';
                    break;
                case 'Wed':
                    arr[0] = 'Wednesday';
                    break;
                case 'Thu':
                    arr[0] = 'Thursday';
                    break;
                case 'Fri':
                    arr[0] = 'Friday';
                    break;
                case 'Sat':
                    arr[0] = 'Saturday';
                    break;
            }
            
            switch(arr[1]){
                case 'Jan':
                    arr[1] = 1;
                    break;
                case 'Feb':
                    arr[1] = 2;
                    break;
                case 'Mar':
                    arr[1] = 3;
                    break;
                case 'Apr':
                    arr[1] = 4;
                    break;
                case 'May':
                    arr[1] = 5;
                    break;
                case 'Jun':
                    arr[1] = 6;
                    break;
                case 'Jul':
                    arr[1] = 7;
                    break;
                case 'Aug':
                    arr[1] = 8;
                    break;
                case 'Sep':
                    arr[1] = 9;
                    break;
                case 'Oct':
                    arr[1] = 10;
                    break;
                case 'Nov':
                    arr[1] = 11;
                    break;
                case 'Dec':
                    arr[1] = 12;
                    break;
            }
            
            arr[4] = formatHours(arr[4]);
            
            newStr = arr[0] + ", " + arr[1] + "/" + arr[2] + "/" + arr[3] + ", " + arr[4] + " " + arr[6] + " " + arr[7] + " " + arr[8];
            return newStr;
        }
        
        function formatUTC(str){
            var newStr = '';
            var arr = str.split(' ');
            arr[1] = arr[1].substring(0,5);
            newStr = arr[0] + " " + arr[1] + arr[2];
            return newStr;
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
                var dateStr = "";
                
                for(i = 0; i < listOfDetails.length; i++){
                    var detail = listOfDetails[i];
                    dateStr = detail.getDate().toString();
                    
                    if(dateStr.includes('Pacific')){
                        dateStr = formatPacific(dateStr);
                    }
                    payloadStr += dateStr + " " + detail.getReason() + "<br \>";
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