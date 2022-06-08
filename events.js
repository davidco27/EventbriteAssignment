 var url = 'https://secure-hamlet-77364.herokuapp.com/https://www.eventbriteapi.com/v3/organizations/998864999843/events' ;
  fetch(url, {
    method: 'GET',
    headers: {
        "Authorization": "Bearer WNMBUO3H37MGLME5T7XV"}}
  )
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response =>loadEvents(response.events));
  
  function loadEvents(events){
    events.forEach(event => {
      if(!event.online_event){
       var url = 'https://secure-hamlet-77364.herokuapp.com/https://www.eventbriteapi.com/v3/venues/'+ event.venue_id ;
        fetch(url, {
          method: 'GET',
          headers: {
              "Authorization": "Bearer WNMBUO3H37MGLME5T7XV"}}
        )
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            full_event=event
             full_event.address= response.address
             localStorage[event.id] = JSON.stringify(full_event); 
        })   

          }}
         
    )
        }
    displayEvents('San Francisco',true,true)
    function displayEvents(city,disp_online,disp_physical){
      
      html=''
      keys = Object.keys(localStorage),
      i = keys.length;
      events=[]
    while ( i-- )  {
    events.push(JSON.parse(localStorage[keys[i]]));

  }
  function compare(a,b) {
    date1=new Date (a.start.local);
    date2=new Date (b.start.local);
    if ( date1 < date2 ){
      return -1;
    }
    if ( date1 > date2 ){
      return 1;
    }
    return 0;

  }
  events.sort(compare)
  events.forEach(event => {
    if ((disp_online && event.online_event) || (disp_physical && !event.online_event)){
      date=new Date (event.start.local);
      if(event.online_event){
        html=html+'<div class="card" style="width: 20%;">'+
          '<img class="card-img-top" src="'+event.logo.original.url+'" alt="Card image cap">'+
          '<div class="card-body"><h5 class="card-title">'+event.name.text+'</h5><p class="card-text">'+
           date.toLocaleString("en-US")+ '<br>Online Event</p></div>'
          +'<div class="card-body">'+
            '<a href="event.html?event_id='+event.id+'" class="card-link">Go to the event</a></div></div>'
  
           }
      else if(event.address.city==city){
    html=html+'<div class="card" style="width: 20%;">'+
        '<img class="card-img-top" src="'+event.logo.original.url+'" alt="Card image cap">'+
        '<div class="card-body"><h5 class="card-title">'+event.name.text+'</h5><p class="card-text">'+
         date.toLocaleString("en-US")+ "<br>"+ event.address.address_1 + "<br>"+ event.address.city+","+ event.address.region +'</p></div>'
        +'<div class="card-body">'+
          '<a href="event.html?event_id='+event.id+'" class="card-link">Go to the event</a></div></div>'
         }
  }})
  document.getElementsByClassName("card-deck")[0].innerHTML=html;}