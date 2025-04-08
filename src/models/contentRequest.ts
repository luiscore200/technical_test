import { prisma } from "../prismaClient";



export const createContentRequest = async (data: any) => {
  return await prisma.contentRequest.create({ data });
};

export const getContentRequests = async () => {
  return await prisma.contentRequest.findMany();
};

export const getContentRequestById = async (id: string) => {
  return await prisma.contentRequest.findUnique({ where: { id } });
};

export const updateContentRequest = async (id: string, data: any) => {
  return await prisma.contentRequest.update({
    where: { id },
    data,
  });
};

export const deleteContentRequest = async (id: string) => {
  return await prisma.contentRequest.delete({ where: { id } });
};
