import { prisma } from "../prismaClient";



export const createCompany = async (data: any) => {
  return await prisma.company.create({ data });
};

export const getCompanies = async () => {
  return await prisma.company.findMany();
};

export const getCompanyById = async (id: number) => {
  return await prisma.company.findUnique({ where: { id } });
};

export const updateCompany = async (id: number, data: any) => {
  return await prisma.company.update({
    where: { id },
    data,
  });
};

export const deleteCompany = async (id: number) => {
  return await prisma.company.delete({ where: { id } });
};
