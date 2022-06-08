from locale import currency
from bs4 import BeautifulSoup
import requests
import json
from sqlalchemy import create_engine,Table, select
from datetime import date,timedelta
from sqlalchemy.ext.automap import automap_base

    response = requests.get("https://www.eventbriteapi.com/v3/organizations/998864999843/events/",headers = {"Authorization": "Bearer WNMBUO3H37MGLME5T7XV"})
    a=response.json()
    events=a["events"]
for i in range(0,len(events)):
    a=events[i]
    title=a['name']['text']
    image=a['logo']['original']['url']
    description=a['description']['text']
    start=a['start']['local']
    end=a['end']['local']
    timezone=a['start']['timezone']
    online=a['online_event']
    line=id+'^'+title+'^'+image+'^'+description+'^'+start+'^'+end+'^'+timezone+'^'+str(online)+'\n'
    line=line.replace('\n', '').replace('‘',"'")+'\n'
    f.write(line)
    response = requests.get("https://www.eventbriteapi.com/v3/events/"+id+"/ticket_classes/",headers = {"Authorization": "Bearer WNMBUO3H37MGLME5T7XV"})
    a=response.json()
    classes=a['ticket_classes']
    for t_class in classes:
        ticket_id=t_class['id']
        price=t_class['cost']
        if price==None:
            price='Free'
            currency=''
        else:
            price=price['display']
            currency=t_class['cost']['currency']    
        fee=t_class['fee']
        if fee==None:
            fee='No fees'
        else:
            fee=fee['display']     
        name=t_class['name']
        description=t_class['description']
        if description==None:
            description=''
        status=t_class["on_sale_status"]
        line=ticket_id+'^'+id+'^'+price+'^'+name+'^'+description+'^'+currency+'^'+fee+'^'+status
        line=line.replace('\n', '')+'\n'
        g.write(line)
f.close()
g.close()