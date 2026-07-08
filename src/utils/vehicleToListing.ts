import type { Vehicle, CarListing } from '../types';

const FEATURED_IDS = ['prado', 'hilux', 'corolla-cross-hev', 'starlet'];
const BRANCH_LOCATIONS = ['Harare', 'Bulawayo', 'Masvingo', 'Mutare'];

export function vehicleToListing(vehicle: Vehicle, index = 0): CarListing {
  return {
    id: vehicle.id,
    modelName: vehicle.modelName,
    year: 2025,
    price: vehicle.priceRange,
    mileage: 'Brand New',
    location: BRANCH_LOCATIONS[index % BRANCH_LOCATIONS.length],
    imageUrl: vehicle.imageUrl,
    description: vehicle.description,
    transmission: vehicle.transmission,
    fuelType: vehicle.fuelType,
    category: vehicle.category,
    engineCc: vehicle.engineCc,
    powerHp: vehicle.powerHp,
    features: vehicle.features,
    featured: FEATURED_IDS.includes(vehicle.id),
  };
}

export function vehiclesToListings(vehicles: Vehicle[]): CarListing[] {
  return vehicles.map((vehicle, index) => vehicleToListing(vehicle, index));
}
