// client/src/components/AlertBanner.jsx
export default function AlertBanner({ alert }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <strong className="font-bold">{alert.title}</strong>
      <span className="block sm:inline ml-2">{alert.message}</span>
      <div className="text-xs text-gray-600 mt-1">Type: {alert.type}</div>
    </div>
  );
}
