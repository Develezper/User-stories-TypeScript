import type { User } from '../interfaces/User'

export const users: User[] = [
  {
    id: 'USR-001',
    fullName: 'Ana Torres',
    email: 'ana.torres@riwi.dev',
    password: 'Admin123*',
    isActive: true,
    role: 'admin',
    createdAt: Date.parse('2026-04-01T08:30:00.000Z'),
  },
  {
    id: 'USR-002',
    fullName: 'Mateo Ruiz',
    email: 'mateo.ruiz@riwi.dev',
    password: 'Mateo456*',
    isActive: true,
    role: 'user',
    createdAt: Date.parse('2026-04-03T14:10:00.000Z'),
  },
  {
    id: 'USR-003',
    fullName: 'Sara Jimenez',
    email: 'sara.jimenez@riwi.dev',
    password: 'Sara789*',
    isActive: false,
    role: 'user',
    createdAt: Date.parse('2026-04-05T18:45:00.000Z'),
  },
]
