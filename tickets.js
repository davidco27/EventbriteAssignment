const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let id = params.event_id;
  var url = 'https://secure-hamlet-77364.herokuapp.com/https://www.eventbriteapi.com/v3/events/'+id+'/ticket_classes/' ;
  fetch(url, {
    method: 'GET',
    headers: {
        "Authorization": "Bearer WNMBUO3H37MGLME5T7XV"}}
  )
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response =>loadTickets(response.ticket_classes));
  function loadTickets(tickets){
    function compare(a,b) {
        a_price=a.cost.major_value
        b_price=b.cost.major_value
        if ( a_price > b_price){
          return -1;
        }
        if (a_price < b_price){
          return 1;
        }
        return 0;
    
      }
      tickets.sort(compare);
      html='';
    for (let i = 0; i < tickets.length; i++) {
        ticket=tickets[i]
      html=html+'<div style="height: 40%;">'+
      '<h2><b>'+ticket.name+'</b></h2>'
      if(ticket.cost==null)
        html=html+ '<h4>Free Tickets</h4>'
      else 
      html=html+ '<h4>'+ticket.cost.display+" + " +ticket.fee.display +" in Fees"+'</h4>'
      if (ticket.description!=null)
      html=html+'<p style= "font-size:15">'+ticket.description+'</p>'

      html=html+'<p style="margin-left:85%;font-size: large;">'+ticket.on_sale_status+'</p>'+
       '</div>'+
  '<hr style="border-width: 5%; width:100%;text-align:left;margin-left:0">'
        
    }
    document.getElementById("ticket_classes").innerHTML=html

  }