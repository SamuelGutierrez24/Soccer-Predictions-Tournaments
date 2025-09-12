interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}


export const DeleteConfirmModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
          <h3 className="text-xl font-bold mb-4">Confirmar finalización</h3>
          <p className="mb-6">¿Está seguro que desea finalizar esta polla?</p>
          <div className="flex justify-end space-x-3">
            <button 
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 transition-colors"
              onClick={() => {
                onConfirm();
              }}
            >
              Finalizar
            </button>
          </div>
        </div>
      </div>
    );
};
