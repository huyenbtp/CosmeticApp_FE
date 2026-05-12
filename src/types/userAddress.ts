export interface IUserAddress {
  _id: string;
  user_id: string;
  receiver_name: string;
  phone: string;
  address_line: string;
  ward_code: number;
  district_code: number;
  city_code: number;
  ward: string;
  district: string;
  city: string;
  is_default: boolean;
}