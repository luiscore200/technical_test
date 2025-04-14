import { prisma } from "../prismaClient";

export const createCompany = async (data: {
  email: string;
  password: string;
  profile: {
    name: string;
    category: string;
    location: string;
    instagram: string;
    tiktok: string;
    facebook: string;
  };
}) => {
  try {
    const created = await prisma.company.create({
      data: {
        email: data.email,
        password: data.password,
        profile: {
          create: data.profile,
        },
      },
      include: {
        profile: true,
      },
    });

    return created; // Solo los datos, sin procesar
  } catch (err: any) {
    throw new Error('An error occurred while creating the company.');
  }
};

export const getCompanies = async () => {
  try {
    const companies = await prisma.company.findMany();
    return companies; // Solo los datos
  } catch (error: any) {
    throw new Error('An error occurred while retrieving the companies.');
  }
};

export const getCompanyById = async (id: number) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new Error(`Company with id ${id} does not exist.`);
    }

    return company; // Solo los datos
  } catch (error: any) {
    throw new Error('An error occurred while retrieving the company.');
  }
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

  try {
    const existingCompany = await prisma.company.findUnique({
      where: { id },
    });

    if (!existingCompany) {
      throw new Error(`Company with id ${id} does not exist.`);
    }

    const updatedCompany = await prisma.company.update({
      where: { id },
      data: {
        ...companyData,
        profile: profile
          ? {
              update: profile,
            }
          : undefined,
      },
      include: { profile: true },
    });

    return updatedCompany; // Solo los datos
  } catch (error: any) {
    throw new Error('An error occurred while updating the company.');
  }
};

export const deleteCompany = async (id: number) => {
  try {
    const deleted = await prisma.company.delete({
      where: { id },
    });
    return deleted; // Solo los datos
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw new Error(`Company with id ${id} does not exist.`);
    }

    throw new Error('An error occurred while trying to delete the company.');
  }
};
