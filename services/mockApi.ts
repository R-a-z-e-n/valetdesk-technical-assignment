
import { ParkingTicket, NewTicket, TicketStatus } from '../types';

const STORAGE_KEY = 'valetdesk_tickets';

const initialTickets: ParkingTicket[] = [
  {
    id: '1',
    title: 'Illegal Parking - Zone A',
    shortDescription: 'Vehicle parked in a no-parking emergency zone.',
    fullDetails: 'On 2023-10-25, vehicle was found idling in the emergency fire hydrant access area of Zone A. No driver was present at the time of discovery.',
    location: 'Main St Entrance, Zone A',
    date: '2023-10-25T14:30:00Z',
    amount: 50.00,
    status: TicketStatus.PENDING,
    vehiclePlate: 'ABC-1234'
  },
  {
    id: '2',
    title: 'Overtime Parking',
    shortDescription: 'Meter expired for more than 30 minutes.',
    fullDetails: 'Parking meter at spot #42 had expired at 11:00 AM. Observation period of 30 minutes granted, after which a ticket was issued at 11:35 AM.',
    location: 'Market Square, Spot #42',
    date: '2023-10-24T11:35:00Z',
    amount: 25.00,
    status: TicketStatus.RESOLVED,
    vehiclePlate: 'XYZ-9876'
  },
  {
    id: '3',
    title: 'Obstruction of Driveway',
    shortDescription: 'Blocked resident access for over 2 hours.',
    fullDetails: 'Resident reported inability to exit their driveway. Vehicle was towed after 2 hours of obstruction and failure to contact the owner.',
    location: 'Oak Avenue, 452',
    date: '2023-10-23T09:15:00Z',
    amount: 150.00,
    status: TicketStatus.PENDING,
    vehiclePlate: 'LMN-5544'
  }
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getTickets: async (): Promise<ParkingTicket[]> => {
    await delay(800);
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTickets));
      return initialTickets;
    }
    return JSON.parse(data);
  },

  getTicketById: async (id: string): Promise<ParkingTicket | null> => {
    await delay(500);
    const data = localStorage.getItem(STORAGE_KEY);
    const tickets: ParkingTicket[] = data ? JSON.parse(data) : initialTickets;
    return tickets.find(t => t.id === id) || null;
  },

  createTicket: async (newTicket: NewTicket): Promise<ParkingTicket> => {
    await delay(1200);
    const data = localStorage.getItem(STORAGE_KEY);
    const tickets: ParkingTicket[] = data ? JSON.parse(data) : initialTickets;
    
    const ticket: ParkingTicket = {
      ...newTicket,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      amount: 45.00, // Default fine
      status: TicketStatus.PENDING,
    };

    const updated = [ticket, ...tickets];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return ticket;
  },

  updateTicketStatus: async (id: string, status: TicketStatus): Promise<ParkingTicket> => {
    await delay(800);
    const data = localStorage.getItem(STORAGE_KEY);
    const tickets: ParkingTicket[] = data ? JSON.parse(data) : initialTickets;
    
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Ticket not found');
    
    tickets[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    return tickets[index];
  }
};
