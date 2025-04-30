// EasypaisaWithdrawalForm.tsx
import { useState } from "react";

interface EasypaisaWithdrawalFormProps {
  userId: string | undefined;
}

const EasypaisaWithdrawalForm: React.FC<EasypaisaWithdrawalFormProps> = ({ userId }) => {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");

  const handleWithdraw = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID is missing.");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/api/easypaisa/withdraw/${userId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, amount, phone }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setAmount("");
      setPhone("");
      if (data?.whatsappLink) {
        setWhatsappLink(data.whatsappLink);
      }
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleWithdraw}
      className="mt-16 p-4 rounded shadow bg-white max-w-sm mx-auto"
    >
      <h2 className="text-xl mb-2 font-bold">Withdraw with Easypaisa</h2>
      <input
        type="text"
        placeholder="Easypaisa Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Amount (PKR)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
        max={5000}
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
      >
        Withdraw
      </button>

      {whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-green-600 font-bold"
        >
          Contact Admin on WhatsApp
        </a>
      )}
    </form>
  );
};

export default EasypaisaWithdrawalForm;
