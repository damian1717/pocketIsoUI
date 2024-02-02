
export interface Company {
    id: string;
    name: string;
    code: string;
    director: string;
    nip?: number;
    city?: string;
    postalCode?: string;
    street?: string;
    numberBuilding?: number;
    numberApartment?: string;
    knowHow?: string;
    itemsCompany?: string;
    technologiesUsed?: string;
    communicationSystem?: string;
    strengths?: string;
    weaknesses?: string;
    opportunitiesForTheCompany?: string;
    threatsToTheCompany?: string;
    isArchive: boolean;
  }
  