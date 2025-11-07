'use client';
import { useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const simulate = async () => {
    const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/demo');
    const contract = new ethers.Contract(
      "0xDéployéIci",
      ["function setMessage(string)"],
      provider
    );
    
    const tx = await contract.setMessage.populateTransaction(input);
    const gasEstimate = await provider.estimateGas(tx);
    const gasPrice = await provider.getGasPrice();
    const ethPrice = 3085;
    const costUSD = Number(gasEstimate * gasPrice * ethPrice / 1e18).toFixed(4);

    setResult(`Gas: ${gasEstimate} | Coût: $${costUSD}`);
  };

  return (
    <div style={{ padding: 50, fontFamily: 'Arial' }}>
      <h1>Gas Simulator Live</h1>
      <input 
        placeholder="Tape un message..." 
        value={input} 
        onChange={e => setInput(e.target.value)}
        style={{ width: 300, padding: 10 }}
      />
      <button onClick={simulate} style={{ padding: 10, margin: 10 }}>
        SIMULER
      </button>
      <h2>{result}</h2>
    </div>
  );
}
