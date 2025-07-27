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

export default function Home() {
  const [players, setPlayers] = useState(initialPlayers);
  const [winner, setWinner] = useState('');
  const [loser, setLoser] = useState('');
  const [matchHistory, setMatchHistory] = useState([]);
  const [user, setUser] = useState('');

  function login(username: string) {
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
    <main className="container">
      <h1>Cal Poly Tennis Tracker</h1>

      {!user ? (
        <div className="card">
          <h2>Login</h2>
          <input
            placeholder="Enter your name"
            value={user}
            onChange={e => setUser(e.target.value)}
          />
          <button onClick={() => login(user)}>Login</button>
        </div>
      ) : (
        <>
          <div className="card">
            <h2>Submit Match Result</h2>
            <input placeholder="Winner's name" value={winner} onChange={e => setWinner(e.target.value)} />
            <input placeholder="Loser's name" value={loser} onChange={e => setLoser(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
          </div>

          <div className="card">
            <h2>Leaderboard</h2>
            <table>
              <thead>
                <tr><th>Player</th><th>Wins</th><th>Losses</th></tr>
              </thead>
              <tbody>
                {leaderboard.map(player => (
                  <tr key={player.name}>
                    <td>{player.name}</td>
                    <td>{player.wins}</td>
                    <td>{player.losses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <h2>Match History</h2>
            <table>
              <thead>
                <tr><th>Date</th><th>Winner</th><th>Loser</th></tr>
              </thead>
              <tbody>
                {matchHistory.map(match => (
                  <tr key={match.id}>
                    <td>{match.date}</td>
                    <td>{match.winner}</td>
                    <td>{match.loser}</td>
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
