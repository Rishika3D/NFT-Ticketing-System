import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { useStore } from '../lib/store';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  event: any;
}

export function CheckoutModal({ isOpen, onClose, onConfirm, event }: CheckoutModalProps) {
  const { addTicket } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const priceNum = parseFloat(event.price);
  const total = (priceNum * quantity).toFixed(2);
  const fee = (0.005 * quantity).toFixed(3);
  const finalTotal = (parseFloat(total) + parseFloat(fee)).toFixed(3);

  const handleMint = async () => {
    setIsProcessing(true);

    // Simulate Smart Contract Interaction
    setTimeout(() => {
      const newTicket = {
        id: Math.random().toString(36).substr(2, 9),
        eventId: event.id,
        eventName: event.title,
        date: event.date,
        location: event.location,
        image: event.image,
        tokenId: `#${Math.floor(Math.random() * 10000)}`,
        purchaseDate: new Date().toLocaleDateString()
      };

      addTicket(newTicket);
      setIsProcessing(false);
      onConfirm();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h2 className="text-xl font-bold">Checkout</h2>
              <p className="text-sm text-gray-500">Complete purchase</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><X className="w-5 h-5 text-gray-500" /></button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <img src={event.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
              <div>
                <h3 className="font-bold text-gray-900">{event.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Tickets</span>
              <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1 border border-gray-200">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 bg-white rounded-full shadow-sm">-</button>
                <span className="font-bold w-6 text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-8 h-8 bg-white rounded-full shadow-sm">+</button>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>{total} ETH</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Service Fee</span>
                <span>{fee} ETH</span>
              </div>
              <div className="flex justify-between items-center pt-2 font-bold text-gray-900 text-lg">
                <span>Total</span>
                <span>{finalTotal} ETH</span>
              </div>
            </div>

            <Button onClick={handleMint} disabled={isProcessing} className="w-full py-6 text-lg rounded-xl bg-gray-900 hover:bg-black text-white shadow-lg">
              {isProcessing ? <><Loader2 className="animate-spin mr-2" /> Processing...</> : "Confirm Purchase"}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-wider font-medium">
              <ShieldCheck className="w-3 h-3" /> Powered by Ethereum
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}