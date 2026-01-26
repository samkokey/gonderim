import React, { useEffect } from 'react';
import { PromoResponse } from '../types';
import { CheckCircleIcon, XCircleIcon } from './Icons';
import { translations } from '../translations';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: PromoResponse | null;
  t: typeof translations['ru']; // Type based on the default or any language structure
}

export const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, result, t }) => {
  useEffect(() => {
    if (isOpen && result?.success) {
      if (window.confetti) {
        window.confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#8b5cf6', '#f59e0b']
        });
      }
    }
  }, [isOpen, result]);

  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 relative border border-white/50"
        role="dialog"
      >
        <div className="p-8 text-center">
          <div className={`mx-auto flex items-center justify-center w-20 h-20 rounded-full mb-6 ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
            {result.success ? (
              <CheckCircleIcon className="w-10 h-10 text-green-500" />
            ) : (
              <XCircleIcon className="w-10 h-10 text-red-500" />
            )}
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            {result.success ? t.modal_success : t.modal_error}
          </h3>
          
          <p className="text-slate-500 mb-8 leading-relaxed">
            {result.message}
          </p>

          {result.success && result.promoDetails && (
            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 mb-8 border border-slate-100">
              <div className="text-xs text-purple-500 font-bold mb-1 uppercase tracking-widest">{t.modal_reward_title}</div>
              <div className="text-4xl font-extrabold text-slate-800 mb-1 tracking-tight">
                {result.followerCount}
              </div>
              <div className="text-sm font-medium text-slate-400">{t.modal_follower_label}</div>
              <div className="mt-4 text-xs font-semibold text-slate-500 bg-white inline-block px-3 py-1 rounded-full shadow-sm border border-slate-100">
                {result.promoDetails.name}
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 ${
              result.success 
                ? 'bg-slate-900 hover:bg-slate-800 shadow-slate-200' 
                : 'bg-slate-200 hover:bg-slate-300 text-slate-600 shadow-none'
            }`}
          >
            {result.success ? t.modal_btn_success : t.modal_btn_error}
          </button>
        </div>
      </div>
    </div>
  );
};