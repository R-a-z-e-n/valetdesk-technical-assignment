
export enum TicketStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
  CANCELLED = 'CANCELLED'
}

export interface ParkingTicket {
  id: string;
  title: string;
  shortDescription: string;
  fullDetails: string;
  location: string;
  date: string;
  amount: number;
  status: TicketStatus;
  vehiclePlate: string;
}

export interface NewTicket {
  title: string;
  shortDescription: string;
  location: string;
  vehiclePlate: string;
  fullDetails: string;
}

export type Screen = 'list' | 'detail' | 'create';
