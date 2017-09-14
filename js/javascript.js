var ctr = 0;
var list;
var items;
var listOfDetails;

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

function add(){
    var li2 = document.createElement("li");
    li2.innerHTML = document.getElementById('firstLi').innerHTML;
    document.getElementById('list').append(li2);
    ctr++;
}

function parse(){
    var retArr = [];
    var retStr = "";
    listOfDetails =[];
    var i;
    
    list = document.getElementById('list');
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
    if(timeFormat.includes('Pacific')){
        convertToUTC(listOfDetails);
    }
}

function convertToUTC(listOfDetails){
    var i;
    
    for(i = 0; i < listOfDetails.length; i++){
        listOfDetails[i].date = listOfDetails[i].getDate().toLocaleString('en-US', { timeZone:'Europe/London'});
        console.log(detail.getDate());
        console.log(detail.getReason());
    }
}