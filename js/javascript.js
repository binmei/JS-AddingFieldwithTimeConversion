var ctr = 0;
var list;
var items;

function add(){
    var li2 = document.createElement("li");
    li2.innerHTML = document.getElementById('firstLi').innerHTML;
    document.getElementById('list').append(li2);
    ctr++;
}

function parse(){
    var retArr = [];
    var retStr = "";
    
    list = document.getElementById('list');
    items = list.getElementsByTagName('li');
    
    
    for(i = 0; i < items.length; i++){
        var date = new Date(items[i].getElementsByTagName("input")[0].value);
        var description = items[i].getElementsByTagName("textarea")[0].value;
        retStr += "At " + date + " " + description + "\n";
    }
    
    console.log(retStr);
}

function convertTime(){
    var timeFormat = document.getElementsByTagName("select")[0].value;
    if(timeFormat === 'Pacific'){
        convertToPacific();
    }
    if(timeFormat === 'GMT'){
        convertToUTC();
    }
}

function convertToPacific(){
    
}

function convertToUTC(){
    
    
}