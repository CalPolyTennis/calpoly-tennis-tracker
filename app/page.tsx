'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialPlayers = [
  { name: 'Raz Haviv', wins: 0, losses: 0 },
  { name: 'Jovan Lubbe', wins: 0, losses: 0 },
  { name: 'Luc Hoeijmans', wins: 0, losses: 0 },
  { name: 'Sean Kamyshev', wins: 0, losses: 0 },
  { name: 'Jack Cross', wins: 0, losses: 0 },
  { name: 'Denzel Seetso', wins: 0, losses: 0 },
  { name: 'Derek Hafiz', wins: 0, losses: 0 },
  { name: 'Aaron Eliscu', wins: 0, losses: 0 },
  { name: 'Sean Ferguson', wins: 0, losses: 0 },
];

export default function Page() {
  const [players, setPlayers] = useState(initialPlayers);
  const [winner, setWinner] = useState('');
  const [loser, setLoser] = useState('');
  const [matchHistory, setMatchHistory] = useState([]);
  const [user, setUser] = useState('');

  function login(username) {
    setUser(username);
  }

  function handleSubmit() {
    if (!winner || !loser || winner === loser) return;

    const updated = players.map(p => {
      if (p.name === winner) return { ...p, wins: p.wins + 1 };
      if (p.name === loser) return { ...p, losses: p.losses + 1 };
      return p;
    });
    setPlayers(updated);
    setMatchHistory([{ id: uuidv4(), winner, loser, date: new Date().toLocaleString() }, ...matchHistory]);
    setWinner('');
    setLoser('');
  }

  const leaderboard = [...players].sort((a, b) => b.wins - a.wins);

  return (
    <main className="p-4 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Cal Poly Tennis Tracker</h1>

      {!user ? (
        <div className="border p-4 rounded space-y-2">
          <h2 className="text-xl font-semibold">Login</h2>
          <input
            placeholder="Enter your name"
            value={user}
            onChange={e => setUser(e.target.value)}
            className="border p-2 rounded"
          />
          <button onClick={() => login(user)} className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </button>
        </div>
      ) : (
        <>
          <div className="border p-4 rounded space-y-2 shadow">
            <h2 className="text-xl font-semibold">Submit Match Result</h2>
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Winner's name"
                value={winner}
                onChange={e => setWinner(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                placeholder="Loser's name"
                value={loser}
                onChange={e => setLoser(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
              Submit Result
            </button>
          </div>

          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Player</th>
                  <th className="border px-4 py-2">Wins</th>
                  <th className="border px-4 py-2">Losses</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map(player => (
                  <tr key={player.name}>
                    <td className="border px-4 py-2">{player.name}</td>
                    <td className="border px-4 py-2 text-center">{player.wins}</td>
                    <td className="border px-4 py-2 text-center">{player.losses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Match History</h2>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Date</th>
                  <th className="border px-4 py-2 text-left">Winner</th>
                  <th className="border px-4 py-2 text-left">Loser</th>
                </tr>
              </thead>
              <tbody>
                {matchHistory.map(match => (
                  <tr key={match.id}>
                    <td className="border px-4 py-2">{match.date}</td>
                    <td className="border px-4 py-2">{match.winner}</td>
                    <td className="border px-4 py-2">{match.loser}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
