export interface TCar {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: 'available' | 'unavailable';
  features: string[];
  pricePerHour: number;
  location: string;
  img: string;
  isDeleted: boolean;
}
