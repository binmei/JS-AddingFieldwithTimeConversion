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
            var elementID = "rca_li" + ++idCtr;
			var newLi = document.createElement("li");
			newLi.innerHTML = document.getElementById('rca_li0').innerHTML;
            newLi.setAttribute("class", "rca_list_element");
            newLi.setAttribute("id", elementID);            
			document.getElementById('rca_list').append(newLi);
		}

		function deleteRow(element){
			$(element).parent('li').remove();
            parseInput();l
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
                displayStr += detail.getDate() + " " + detail.getReason() + "\n";
			}

            document.getElementById('rca_preview_text').innerHTML = displayStr;
        }
        
		function preview(){
			parseInput();
			displayList();
		}
        
        function clear(){
            document.getElementById('rca_preview_text').innerHTML = "";
        }
        
		function convertTime(){
			var timeFormat = document.getElementsByTagName("select")[0].value;
			if(timeFormat.includes('GMT')){
				convertToUTC(listOfDetails);
			}
            clear();
            displayList();
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
			var payload = {
				"text" : str
			}
		
			var xhr = new XMLHttpRequest();
//<!-- 			xhr.open("POST", 'https://theplatformdev.service-now.com/rca_compiler.do', true); -->
			xhr.open("POST", 'https://requestb.in/xmwytaxm', true);

			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send(JSON.stringify(payload));
			console.log(JSON.stringify(payload));
		}