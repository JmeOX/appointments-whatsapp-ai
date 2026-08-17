"use client";

export default function TestEnv() {
  return (
    <button
      onClick={() => {
        console.log("SECRET (client):", process.env.SECRET_MESSAGE);
        console.log("PUBLIC (client):", process.env.NEXT_PUBLIC_SAFE_MESSAGE);
      }}
    >
      Log env vars
    </button>
  );
}