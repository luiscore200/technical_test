import { prisma } from "../prismaClient";


export const createCreator = async (data: any) => {
  return await prisma.creator.create({ data });
};

export const getCreators = async () => {
  return await prisma.creator.findMany();
};

export const getCreatorById = async (id: string) => {
  return await prisma.creator.findUnique({ where: { id } });
};

export const updateCreator = async (id: string, data: any) => {
  return await prisma.creator.update({
    where: { id},
    data,
  });
};

export const deleteCreator = async (id: string) => {
  return await prisma.creator.delete({ where: { id } });
};
