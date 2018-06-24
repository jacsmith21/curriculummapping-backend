import collections
import json
import os
import re

import requests
from bs4 import BeautifulSoup

bases = ['http://www.unb.ca/academics/calendar/undergraduate/{}/frederictonprograms'.format(date) for date in ['current', 'archive/2013-2014']]
bases = [base for base in bases]  # saint-john-coursess

r = requests.get(os.path.join(bases[0], 'bachelorofscienceinsoftwarenegineering.html'))
soup = BeautifulSoup(r.content, 'html5lib')

mcontent = soup.find(id='mcontent')

Tag = collections.namedtuple('Tag', ['attrs', 'text'])


def make_tag(course_name):
    lookup = {
        'CS': 'computer-science',
        'STAT': 'statistics',
        'MATH': 'mathematics',
        'INFO': 'informationsystems',
        'ECE': 'electricalandcomputerengineering',
        'PHYS': 'physics',
        'EE': 'electricalengineering'
    }

    match = re.match('([A-Z]+)([0-9]+)', course_name)
    department, number = match.group(1), match.group(2)

    href = '../frederictoncourses/{}/{}-{}.html'.format(lookup[department], department.lower(), number)
    return Tag({'href': href}, course_name)


data = {}
# Only grab the core courses (there are a lot of other links to courses)
for link in soup.findAll('a', href=re.compile('\.\./frederictoncourses/'))[0:41]:
    def add_course(link):
        for base in bases:
            url = os.path.join(base, link.attrs['href'])
            r = requests.get(url)
            if r.status_code != 404:
                break
        else:
            raise Exception

        # noinspection PyShadowingNames
        soup = BeautifulSoup(r.content, 'html5lib')
        course = {
            'name': soup.find('th', {'abbr': 'Course Code'}).text,
            'title': soup.find('th', {'abbr': 'Course Dscription'}).text,
            'description': soup.find('course_description').text
        }

        # make sure we remove all whitespace
        for key, val in course.items():
            course[key] = val.strip()

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
            if name not in added_courses:
                prerequisites.append({'prerequisite': name, 'alternative': None})
                added_courses.add(name)

        course['prerequisites'] = prerequisites

        # Now grab all of the corequisites.
        # This is easier as there are no or relationships.
        corequisites = []
        for a in [*soup.select('course_coreq > p > a'), *soup.select('course_coreq > a')]:
            name = a.text
            corequisites.append(name.replace(' ', ''))
            added_courses.add(corequisites[-1])
        course['corequisites'] = corequisites

        data[course['name']] = course

        for name in added_courses:
            if name not in data:
                print('Recursively adding {}'.format(name))
                add_course(make_tag(name))

    name = link.text.replace(' ', '')
    if name not in data:
        print('Adding {}'.format(name))
        add_course(link)

with open('data.json', 'w') as fp:
    json.dump(data, fp)
