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
for link in soup.findAll('a', href=re.compile('\.\./frederictoncourses/'))[0:41]:  # Only grab the core courses (there are a lot of other links to courses)
    course = {'name': link.text.replace(' ', ''), 'title': str(link.next_sibling)}
    print('Found {}. Parsing prerequisites and corequisites!'.format(course['name']))

    url = os.path.join(base, link.attrs['href'])
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html5lib')
    course['description'] = soup.find('course_description').text

    # Grab all of the prerequisites with the or relationships.
    prerequisites = []
    added_courses = set()
    tag = soup.select_one('course_prereq')
    for (prerequisite, alternative) in re.findall('([A-Z]+ [0-9]+)\s+or\s+([A-Z]+ [0-9]+)', tag.text):
        prerequisite, alternative = prerequisite.replace(' ', ''), alternative.replace(' ', '')
        added_courses.add(prerequisite), added_courses.add(alternative)
        prerequisites.append({'prerequisite': prerequisite, 'alternative': alternative})

    recommended = re.findall('recommended\s+([A-Z]+ [0-9]+)', tag.text, flags=re.IGNORECASE)
    recommended = [c.replace(' ', '') for c in recommended]
    [added_courses.add(c) for c in recommended]
    course['recommended'] = recommended

    for a in [*soup.select('course_prereq > p > a'), *soup.select('course_prereq > a')]:
        name = a.text.replace(' ', '')
        if not added_courses:
            prerequisites.append({'prerequisite': name, 'alternative': None})

    course['prerequisites'] = prerequisites

    # Now grab all of the corequisites.
    # This is easier as there are no or relationships.
    corequisites = []
    for a in [*soup.select('course_coreq > p > a'), *soup.select('course_coreq > a')]:
        name = a.text
        corequisites.append(name.replace(' ', ''))
    course['corequisites'] = corequisites

    data.append(course)

with open('data.json', 'w') as fp:
    json.dump(data, fp)
