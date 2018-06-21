import json
import os
import re

import requests
from bs4 import BeautifulSoup

base = 'http://www.unb.ca/academics/calendar/undergraduate/current/frederictonprograms'

url = os.path.join(base, 'bachelorofscienceinsoftwarenegineering.html')
r = requests.get(url)
soup = BeautifulSoup(r.content, 'html5lib')

mcontent = soup.find(id='mcontent')

data = []
for link in soup.findAll('a', href=re.compile('\.\./frederictoncourses/'))[:41]:  # only grab the
    course = {'name': link.text.replace(' ', ''), 'title': str(link.next_sibling)}
    print('Adding {}'.format(course['name']))

    url = os.path.join(base, link.attrs['href'])
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html5lib')
    course['description'] = soup.find('course_description').text

    course['prerequisites'] = []
    for a in soup.find('course_prereq').findAll('a'):
        course['prerequisites'].append(a.text.replace(' ', ''))

    course['corequisites'] = []
    for a in soup.find('course_coreq').findAll('a'):
        course['corequisites'].append(a.text.replace(' ', ''))

    data.append(course)

with open('data.json', 'w') as fp:
    json.dump(data, fp)
