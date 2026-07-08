export interface Vehicle {
  id: string;
  modelName: string;
  category: 'City' | 'Sedan' | 'SUV' | '4x4' | 'Pick-up' | 'LCV';
  imageUrl: string;
  priceRange: string;
  fuelType: string;
  transmission: 'Manual' | 'Automatic' | 'CVT' | 'HEV E-CVT';
  engineCc: string;
  powerHp: string;
  description: string;
  features: string[];
}

export interface ServiceItem {
  id: string;
  serviceName: string;
  description: string;
  iconName: string;
}

export interface ServiceBooking {
  customerName: string;
  email: string;
  phone: string;
  preferredDate: string;
  vehicleModel: string;
  serviceType: string;
  message?: string;
}

export interface CarListing {
  id: string;
  modelName: string;
  year: number;
  price: string;
  mileage: string;
  location: string;
  imageUrl: string;
  description: string;
  transmission: string;
  fuelType: string;
  category?: string;
  engineCc?: string;
  powerHp?: string;
  features?: string[];
  featured?: boolean;
}
