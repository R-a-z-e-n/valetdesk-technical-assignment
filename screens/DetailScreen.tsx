
import React, { useEffect, useState } from 'react';
import { ParkingTicket, TicketStatus } from '../types';
import { mockApi } from '../services/mockApi';
import { Loading } from '../components/Loading';
import { ErrorView } from '../components/ErrorView';
import { MapPin, Calendar, CreditCard, Info, User, CheckCircle2, XCircle, Loader2, RotateCcw } from 'lucide-react';

interface DetailScreenProps {
  ticketId: string;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({ ticketId }) => {
  const [ticket, setTicket] = useState<ParkingTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getTicketById(ticketId);
      if (data) {
        setTicket(data);
      } else {
        setError('Ticket not found.');
      }
    } catch (err) {
      setError('Failed to fetch ticket details.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: TicketStatus) => {
    try {
      setIsUpdating(true);
      const updated = await mockApi.updateTicketStatus(ticketId, newStatus);
      setTicket(updated);
    } catch (err) {
      console.error(err);
      alert('Failed to update status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  if (loading) return <Loading />;
  if (error) return <ErrorView message={error} onRetry={fetchTicket} />;
  if (!ticket) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Hero Header */}
      <div className="bg-slate-50 p-6 border-b border-slate-200">
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
          Case ID: {ticket.id}
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">{ticket.title}</h2>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <MapPin size={16} />
          <span>{ticket.location}</span>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Status & Amount Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
            <p className={`font-bold ${
              ticket.status === TicketStatus.RESOLVED ? 'text-green-600' : 
              ticket.status === TicketStatus.CANCELLED ? 'text-red-600' : 
              'text-amber-600'
            }`}>
              {ticket.status}
            </p>
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Amount</p>
            <div className="flex items-center gap-1">
              <CreditCard size={14} className="text-slate-400" />
              <p className="font-bold text-slate-900">${ticket.amount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Detailed Info Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="text-blue-500" size={18} />
            <h3 className="font-bold text-slate-800">Observation Report</h3>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <p className="text-slate-700 leading-relaxed text-sm italic">
              "{ticket.fullDetails || 'No additional details provided.'}"
            </p>
          </div>
        </section>

        {/* Vehicle Info Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="text-blue-500" size={18} />
            <h3 className="font-bold text-slate-800">Vehicle Records</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-500">License Plate</span>
              <span className="font-mono font-bold text-slate-900 px-2 py-1 bg-slate-100 rounded text-sm">
                {ticket.vehiclePlate}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-500">Date Issued</span>
              <div className="flex items-center gap-2 font-medium text-slate-900 text-sm">
                <Calendar size={14} />
                {new Date(ticket.date).toLocaleString()}
              </div>
            </div>
          </div>
        </section>

        {/* Action Center */}
        <div className="pt-4 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Ticket Actions</h3>
          
          {ticket.status === TicketStatus.PENDING ? (
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleUpdateStatus(TicketStatus.RESOLVED)}
                disabled={isUpdating}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    <span>Mark as Resolved</span>
                  </>
                )}
              </button>
              
              <button 
                onClick={() => handleUpdateStatus(TicketStatus.CANCELLED)}
                disabled={isUpdating}
                className="w-full bg-white text-red-600 border border-red-200 py-4 rounded-2xl font-bold active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <XCircle size={20} />
                    <span>Cancel Ticket</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center space-y-3">
              <div className="mx-auto w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                <Info size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">No further actions needed</p>
                <p className="text-xs text-slate-500 mt-1">
                  This ticket is currently <span className="font-bold text-slate-900">{ticket.status.toLowerCase()}</span>.
                </p>
              </div>
              <button 
                onClick={() => handleUpdateStatus(TicketStatus.PENDING)}
                disabled={isUpdating}
                className="text-xs font-bold text-blue-600 flex items-center justify-center gap-1 mx-auto hover:underline mt-2 disabled:opacity-50"
              >
                <RotateCcw size={12} />
                Re-open to Pending
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
