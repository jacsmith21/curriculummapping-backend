module.exports = [
  {
    name: 'CS1073'
  },
  {
    name: 'CS1003'
  },
  {
    name: 'CS1303'
  },
  {
    name: 'INFO1103'
  },
  {
    name: 'CS1083',
    prerequisites: ['CS1073']
  },
  {
    name: 'CS2043',
    prerequisites: ['CS1083']
  },
  {
    name: 'CS2253',
    prerequisites: ['CS1083']
  },
  {
    name: 'CS2383',
    prerequisites: ['CS1083']
  },
  {
    name: 'CS2333',
    prerequisites: ['CS1303', 'CS1003']
  },
  {
    name: 'CS3503',
    prerequisites: ['INFO1103']
  },
  {
    name: 'CS3413',
    prerequisites: ['CS2253']
  },
  {
    name: 'CS3613',
    prerequisites: ['CS2253', 'CS2333']
  },
  {
    name: 'CS3383',
    prerequisites: ['CS2383', 'CS2333']
  },
  {
    name: 'SWE4403',
    prerequisites: ['CS2043']
  },
  {
    name: 'SWE4103',
    prerequisites: ['CS2043']
  }
]