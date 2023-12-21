export type Group = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export const BloodGroups: Group[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]

export type status = 'accept' | 'pending' | 'canceled'

export const donationStatus: status[] = ['accept', 'pending', 'canceled']

export const donationFilterableField = ['searchTerm', 'status', 'bloodGroup']
