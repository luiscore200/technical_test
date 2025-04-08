import { prisma } from "../prismaClient";


interface CreatorData {
  name: string;
  location: string;
  categories: { id: string }[]; // Arreglo con los IDs de las categorías a asociar
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

export const createCreator = async (data: CreatorData) => {
  try {
    // Creamos el creador con las categorías asociadas
    const creator = await prisma.creator.create({
      data: {
        name: data.name,
        location: data.location,
        instagram: data.instagram,
        facebook: data.facebook,
        tiktok: data.tiktok,
        categories: {
          connect: data.categories.map((category) => ({ id: category.id })), // Asociamos las categorías por ID
        },
      },
    });
    return creator;
  } catch (error) {
    throw new Error('An error occurred while creating the creator.');
  }
};

export const getCreators = async () => {
  try {
    const creators = await prisma.creator.findMany({
      include: {
        categories: true, // Incluimos las categorías relacionadas al obtener los creadores
      },
    });
    return creators;
  } catch (error) {
    throw new Error('An error occurred while retrieving creators.');
  }
};

export const getCreatorById = async (id: string) => {
  try {
    const creator = await prisma.creator.findUnique({
      where: { id },
      include: {
        categories: true, // Incluimos las categorías en la búsqueda por ID
      },
    });
    return creator;
  } catch (error) {
    throw new Error('An error occurred while retrieving the creator.');
  }
};



export const updateCreator = async (id: string, data: CreatorData) => {
  try {
   
    const updateData: any = {
      name: data.name,
      location: data.location,
      instagram: data.instagram,
      facebook: data.facebook,
      tiktok: data.tiktok,
    };

   
    if (data.categories) {
      updateData.categories = {
        set: data.categories.map((category: { id: string }) => ({
          id: category.id,
        })),
      };
    }

    
    const updatedCreator = await prisma.creator.update({
      where: { id },
      data: updateData,
    });

    return updatedCreator;
  } catch (error) {
    throw new Error('An error occurred while updating the creator.');
  }
};


export const deleteCreator = async (id: string) => {
  try {
    const deletedCreator = await prisma.creator.delete({
      where: { id },
    });
    return deletedCreator;
  } catch (error) {
    throw new Error('An error occurred while deleting the creator.');
  }
};
