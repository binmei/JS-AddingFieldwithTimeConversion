        var idCtr = 0;
		var list;
		var items;
		var listOfDetails = [];
		var utcStr = '';
		
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
			var newLi = document.createElement("li");
            var newID = "li" + ++idCtr;
			newLi.innerHTML = document.getElementById('li1').innerHTML;
            newLi.setAttribute("class", "rca_element");
            newLi.setAttribute("id", newID);
			document.getElementById('rca_list').append(newLi);
			// idCtr++;
		}

		// function delete(this){
			// var li = this.parentNode;
			// li = null;
		// }

		function parse(){
			var retArr = [];
			var retStr = "";
			var i;

			list = document.getElementById('rca_list');
			items = list.getElementsByTagName('li');


			for(i = 0; i < items.length; i++){
				var date = new Date(items[i].getElementsByTagName("input")[0].value);
				var description = items[i].getElementsByTagName("textarea")[0].value;
				var detail = new Detail(date, description);
				retStr += "At " + date + " " + description + "\n";
				listOfDetails.push(detail);
			}

			console.log(retStr);
		}

		function convertTime(){
			var timeFormat = document.getElementsByTagName("select")[0].value;
			if(timeFormat.includes('PST') || timeFormat.includes('PDT') || timeFormat.includes('Pacific')){
				convertToUTC(listOfDetails);
			}
		}

		function convertToUTC(listOfDetails){
			var i;
		
			for(i = 0; i < listOfDetails.length; i++){
				var detail = listOfDetails[i];
				detail.date = detail.getDate().toLocaleString('en-US', { timeZone:'Europe/London'});
				console.log("At " + detail.getDate() + "(UTC)" + detail.getReason());
				utcStr += "At " + detail.getDate() + "(UTC)" + detail.getReason() + "\n";
			}
			console.log("in convertToUTC function: " + utcStr);

		}
		
		function submitToSN(str){
			var payload = {
				"text" : str
			}
		
			var xhr = new XMLHttpRequest();
			xhr.open("POST", 'https://requestb.in/1iz9vsi1', true);
			// <!--xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
			// xhr.setRequestHeader('Access-Control-Allow-Origin', '*'); -->
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send(JSON.stringify(payload));
			console.log(JSON.stringify(payload));
		}