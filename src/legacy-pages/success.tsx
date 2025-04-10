import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Payment Authorized!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your hold has been placed successfully. You’ll receive a confirmation if your purchase is captured.
        </p>
        <Link
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-xl transition"
        >
          Return to Catalog
        </Link>
      </div>
    </div>
  );
}
