
import React, { useState } from 'react';
import { NewTicket } from '../types';
import { mockApi } from '../services/mockApi';
import { CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';

interface CreateScreenProps {
  onSuccess: () => void;
}

export const CreateScreen: React.FC<CreateScreenProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<NewTicket>({
    title: '',
    shortDescription: '',
    location: '',
    vehiclePlate: '',
    fullDetails: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.title || !formData.vehiclePlate || !formData.location) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus('idle');
      await mockApi.createTicket(formData);
      setStatus('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      setErrorMessage('Failed to issue ticket. Please try again.');
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="text-green-600" size={48} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Ticket Issued!</h3>
        <p className="text-slate-500 mb-6">The parking ticket has been successfully registered in the system.</p>
        <p className="text-xs text-slate-400 animate-pulse">Redirecting to list...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">New Violation</h2>
        <p className="text-slate-500 text-sm">Capture and report a parking violation details below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {status === 'error' && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-start gap-3 border border-red-100 animate-in shake duration-300">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Violation Type <span className="text-red-500">*</span>
            </label>
            <input 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Double Parking"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
              required
            />
          </div>

          {/* Vehicle Plate */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
              License Plate <span className="text-red-500">*</span>
            </label>
            <input 
              name="vehiclePlate"
              value={formData.vehiclePlate}
              onChange={handleChange}
              placeholder="ABC-1234"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm font-mono"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Exact Location <span className="text-red-500">*</span>
            </label>
            <input 
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. West Wing, Spot 402"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
              required
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Short Summary
            </label>
            <input 
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Brief summary of the issue"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
            />
          </div>

          {/* Full Details */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Report Details
            </label>
            <textarea 
              name="fullDetails"
              value={formData.fullDetails}
              onChange={handleChange}
              placeholder="Provide a detailed description of the violation..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm resize-none"
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-[0.98] disabled:opacity-70 transition-all flex items-center justify-center gap-2 group"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <span>Submit Ticket</span>
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
