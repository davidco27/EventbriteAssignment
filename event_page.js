const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.event_id;
var events=JSON.parse(localStorage[value.toString()])
document.getElementById("event_image").src= events.logo.original.url;
date_start=new Date (events.start.local);
date_end=new Date (events.end.local);
html='<h1><b>'+events.name.text+'</b></h1>'+
        '<h3><b>Starting Time: </b>'+ date_start.toLocaleString("en-US")+'</h3>'+
        '<h3><b>Finishing Time: </b>'+ date_end.toLocaleString("en-US")+'</h3>'+
        '<h3><b>Timezone: </b>'+ events.start.timezone+'</h3>'
    if (events.online_event)
        html=html+'<h3><b>Online Event</b>'
    else
    html=html+'<h3><b>Event Location: </b>'+events.address.address_1+ " "+events.address.city + ","+events.address.region+'</h3>'
document.getElementsByTagName('h4')[0].innerHTML=events.description.text    
document.getElementById("event_info").innerHTML=html
document.getElementById("tickets_button").onclick= function(){location.href="ticket.html?event_id="+events.id}
