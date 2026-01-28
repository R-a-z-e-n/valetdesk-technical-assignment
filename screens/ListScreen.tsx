
import React, { useEffect, useState } from 'react';
import { ParkingTicket, TicketStatus } from '../types';
import { mockApi } from '../services/mockApi';
import { Loading } from '../components/Loading';
import { ErrorView } from '../components/ErrorView';
import { ChevronRight, MapPin, Clock, Search } from 'lucide-react';

interface ListScreenProps {
  onSelectItem: (id: string) => void;
}

export const ListScreen: React.FC<ListScreenProps> = ({ onSelectItem }) => {
  const [tickets, setTickets] = useState<ParkingTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getTickets();
      setTickets(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tickets. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <ErrorView message={error} onRetry={fetchTickets} />;

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text"
          placeholder="Search by title or plate..."
          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-400 italic">No tickets found.</p>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => onSelectItem(ticket.id)}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-sm active:scale-[0.98] transition-all text-left group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                ticket.status === TicketStatus.RESOLVED ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
              }`}>
                <MapPin size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-bold text-slate-900 truncate pr-2">{ticket.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    ticket.status === TicketStatus.RESOLVED ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-1 mb-2">{ticket.shortDescription}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{new Date(ticket.date).toLocaleDateString()}</span>
                  </div>
                  <div className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">
                    {ticket.vehiclePlate}
                  </div>
                </div>
              </div>

              <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
            </button>
          ))
        )}
      </div>
    </div>
  );
};
