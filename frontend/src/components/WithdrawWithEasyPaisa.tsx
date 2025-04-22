// EasypaisaWithdrawalForm.jsx
import { useState } from "react";

const EasypaisaWithdrawalForm = () => {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");

  const handleWithdraw = async (e : any) => {
    e.preventDefault();
    const response = await fetch("/api/easypaisa/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, phone }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleWithdraw} className="p-4 rounded shadow bg-white max-w-sm mx-auto">
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
    </form>
  );
};

export default EasypaisaWithdrawalForm;
