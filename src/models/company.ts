import { prisma } from "../prismaClient";



export const createCompany = async (data: {
  email: string;
  password:string;
  profile: {
    name:string;
    category: string;
    location: string;
    instagram: string;
    tiktok: string;
    facebook: string;
  };
}) => {
  return await prisma.company.create({
    data: {
      email: data.email,
      password: data.password,
      profile: {
        create: data.profile
      }
    },
    include: {
      profile: true
    }
  });
};

export const getCompanies = async () => {
  return await prisma.company.findMany();
};

export const getCompanyById = async (id: number) => {
  return await prisma.company.findUnique({ where: { id } });
};

export const updateCompany = async (
  id: number,
  data: Partial<{
    email: string;
    name: string;
    profile: {
      category?: string;
      location?: string;
      instagram?: string;
      tiktok?: string;
      facebook?: string;
    };
  }>
) => {
  const { profile, ...companyData } = data;

  const update = await prisma.company.update({
    where: { id },
    data: {
      ...companyData,
      profile: profile ? {
        update: profile
      } : undefined
    },
    include: { profile: true }
  });

  return update;
};

export const deleteCompany = async (id: number) => {
  return await prisma.company.delete({ where: { id } });
};
