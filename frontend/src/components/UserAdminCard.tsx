const AdminUserCard = ({ user }) => {
  const generateWhatsAppLink = (userId) => {
    const base = "https://yourapp.com/payments/manual/";
    return `https://wa.me/923XXXXXXXXX?text=Please make payment: ${base}${userId}`;
  };

  return (
    <div className="p-4 border rounded shadow mb-4">
      <h3 className="text-lg font-bold">{user.name}</h3>
      <p>User ID: {user._id}</p>
      <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => window.open(generateWhatsAppLink(user._id), "_blank")}
      >
        Send Payment Link via WhatsApp
      </button>
    </div>
  );
};

export default AdminUserCard;
