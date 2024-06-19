<<<<<<< HEAD
import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

import prisma from './src/database/index';

jest.mock('./src/database/index', () => ({
=======
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import prisma from './src/database/dataprisma';

jest.mock('./src/database/dataprisma', () => ({
>>>>>>> 2cd2ee4 (feat: add reservation tests)
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
