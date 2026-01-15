import React, { useState } from 'react';
import { Star, X, Trophy, CheckCircle2 } from 'lucide-react';

interface RatingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RatingPopup: React.FC<RatingPopupProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    // Aqui você poderia integrar com um backend ou analytics
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setRating(0);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-slate-900 border-2 border-emerald-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
        {/* Decorative background trophy */}
        <Trophy className="absolute -right-8 -bottom-8 text-emerald-500/5 rotate-12" size={160} />
        
        {!submitted ? (
          <div className="relative z-10 space-y-6 text-center">
            <button 
              onClick={onClose}
              className="absolute -top-4 -right-4 p-2 text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                O que achou do <span className="text-emerald-500">Draft?</span>
              </h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Avalie sua experiência</p>
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform active:scale-90"
                >
                  <Star
                    size={40}
                    className={`transition-colors duration-200 ${
                      (hover || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className={`w-full py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all ${
                rating > 0 
                ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 hover:-translate-y-1' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Confirmar Nota
            </button>
          </div>
        ) : (
          <div className="relative z-10 py-8 text-center space-y-4 animate-bounce-in">
            <div className="flex justify-center">
              <CheckCircle2 size={64} className="text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
              GOLAÇO!
            </h3>
            <p className="text-slate-400 text-sm font-medium">Obrigado pelo seu feedback e tenha um ótimo jogo, craque!</p>
          </div>
        )}
      </div>
    </div>
  );
};