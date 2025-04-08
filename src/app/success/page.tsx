export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">✅ Payment Successful</h1>
        <p className="text-gray-700 text-lg mb-6">
          Thank you for your purchase! Your payment has been successfully processed.
        </p>
        <a
          href="/"
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-xl transition"
        >
          Back to Products
        </a>
      </div>
    </div>
  );
}