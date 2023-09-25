export default function Confirmation({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: Function;
  onConfirm: Function;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="font-semibold text-xl mb-5">Appointment Cancel Confirmation</div>
        <div className="">Are you sure you want to cancel the appointment?</div>
        <div className="py-2 flex flex-row-reverse gap-3">
          <button
            className="mt-4 bg-orange-500 hover:bg-orange-300 text-white font-bold py-2 px-4 rounded"
            onClick={() => onConfirm()}
          >
            Confirm
          </button>
          <button
            id="close-button"
            className="mt-4 bg-gray-400 text-white font-bold py-2 px-4 rounded"
            onClick={() => onClose(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
