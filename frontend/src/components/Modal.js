
const Modal = ({onClose,handleSummarize}) => {

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
      <button
          onClick={handleSummarize}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mb-2"
        >
          Summarize
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg"
        >
          Close
        </button>

        <textarea
          className="w-full p-2 border border-gray-300 rounded mt-2"
          rows="4"
          value={"text"}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default Modal;
