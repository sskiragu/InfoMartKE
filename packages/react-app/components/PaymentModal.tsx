import React, { useState } from 'react';
import cUSDIcon from '../public/celo.png';
import MpesaIcon from '../public/mpesa.svg';
import MasterCardIcon from '../public/master_card.png';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paymentMethod: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedPaymentMethod) {
      onConfirm(selectedPaymentMethod);
      onClose();
    } else {
      alert('Please select a payment method');
    }
  };

  const paymentMethods = [
    { name: 'cUSD', icon: cUSDIcon },
    { name: 'Mpesa', icon: MpesaIcon },
    { name: 'MasterCard', icon: MasterCardIcon },
  ];

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>
        <div className="grid grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className={`border p-4 rounded-lg cursor-pointer ${selectedPaymentMethod === method.name ? 'border-green-500' : 'border-gray-300'}`}
              onClick={() => setSelectedPaymentMethod(method.name)}
            >
              <img src={method.icon} alt={method.name} className="w-full h-12 object-contain" />
              <p className="text-center mt-2">{method.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2">
            Cancel
          </button>
          <button onClick={handleConfirm} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
