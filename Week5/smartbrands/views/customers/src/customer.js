// Show small modal window with waiting 3 sec.
function showwait(){
    clearTimeout(myTimeOut);
    $('#myModalWait').modal('show');
    myTimeOut = setTimeout(function(){$('#myModalWait').modal('hide')}, 3000);

}

// Show Agreement modal window
function showagree(){
    let ttl = document.getElementById('myModalLongTitle');
    let cc= db.getState();
    ttl.innerText='Privacy Policy terms '+'('+cc.customers.length+')' ;
    $('#myModal').modal('show');
    // console.log(ttl.innerText);
}

document.getElementById('chklink').onclick = showagree();

