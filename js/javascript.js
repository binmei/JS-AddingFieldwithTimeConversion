var ctr = 0;

function add(){
    var li2 = document.createElement("li");
    li2.innerHTML = document.getElementById('firstLi').innerHTML;
    document.getElementById('list').append(li2);
    ctr++;
}

function parse(){
    var retArr = [];
    var retStr = "";
    var list = document.getElementById('list');
    var items = list.getElementsByTagName('li');
    
    for(i = 0; i < items.length; i++){
        var date = items[i].getElementsByTagName("input")[0].value;
        var description = items[i].getElementsByTagName("textarea")[0].value;
        retStr += "At " + date + " " + description + "\n";
    }
    
    console.log(retStr);
    
    
}