"use client";

const { useState } = require("react");
export default function Counter({ users }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p> There is {users.length} user in the web site </p>
      <button onClick={() => setCount((c) => c + 1)}> {count} </button>
    </div>
  );
}
