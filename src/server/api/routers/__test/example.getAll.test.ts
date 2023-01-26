import { test, expect } from "@jest/globals";
import { appRouter } from "../../root";
import { prisma } from "../../../db";
import { mockDeep } from "jest-mock-extended";
import type { Example, PrismaClient } from "@prisma/client";

test("getAll test", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Example[] = [
    { id: "test", createdAt: new Date(), updatedAt: new Date() },
  ];

  prismaMock.example.findMany.mockResolvedValue(mockOutput);

  const caller = appRouter.createCaller({ session: null, prisma: prismaMock });

  const result = await caller.example.getAll();

  expect(result).toHaveLength(mockOutput.length);
  expect(result).toStrictEqual(mockOutput);
});
