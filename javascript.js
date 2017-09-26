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
            // $(element).parent('li').remove();
            // parseInput();
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
        
        function parseTime(str){
            var time = str.split(':');
            return time[0] + ":" + time[1];
        }
        
        function displayList(){
            
            var i;
            var displayStr = '';
            
            for(i = 0; i < listOfDetails.length; i++){
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
                    payloadStr += detail.getDate() + " " + detail.getReason() + "<br \>";
                }
                
                var payload = {
                    // "text" : payloadStr
                    "text" : "cake"
                };
            
                var xhr = new XMLHttpRequest();
                xhr.open("POST", 'https://requestb.in/xzk6x5xz', true);
                xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.send(JSON.stringify(payload));
                console.log(JSON.stringify(payload));
                alert("Payload has been sent.");
            } else {
                alert("Payload not sent.");
            }
           
		}
                       
        function clearPreview(){
            // console.log(document.getElementById('rca_preview_text').innerHTML);
            document.getElementById('rca_preview_text').innerHTML = '';
        }