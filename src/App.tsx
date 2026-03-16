import React from 'react';
import { proxy, useSnapshot } from './mini-valtio';

const state = proxy({ count: 0, text: 'Hello' });

const Counter = () => {
  const snap = useSnapshot(state);
  return (
    <div>
      <p>Count: {snap.count}</p>
      <button onClick={() => state.count++}>Increment</button>
      <button onClick={() => state.count--}>Decrement</button>
    </div>
  );
};

const TextInput = () => {
  const snap = useSnapshot(state);
  return (
    <div>
      <input
        value={snap.text}
        onChange={(e) => (state.text = e.target.value)}
      />
      <p>Text: {snap.text}</p>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <h1>mini-valtio demo</h1>
      <Counter />
      <TextInput />
    </div>
  );
}
