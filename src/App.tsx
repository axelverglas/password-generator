import React, { useState } from "react";
import { getRandomChar, getSpecialChar } from "./utils";
import { FaClipboard } from "react-icons/fa";

export default function App() {
  const [values, setValues] = useState({
    length: 6,
    uppercase: true,
    lowercase: true,
    numbers: false,
    symbols: false,
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fieldsArray = [
    {
      field: values.uppercase,
      getChar: () => getRandomChar(65, 90),
    },
    {
      field: values.lowercase,
      getChar: () => getRandomChar(97, 122),
    },
    {
      field: values.numbers,
      getChar: () => getRandomChar(48, 57),
    },
    {
      field: values.symbols,
      getChar: () => getSpecialChar(),
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let generatedPassword = "";
    const checkedfields = fieldsArray.filter((field) => field.field);
    if (checkedfields.length === 0) {
      setError("Veuillez choisir au moins une option");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    for (let i = 0; i < values.length; i++) {
      const field =
        checkedfields[Math.floor(Math.random() * checkedfields.length)];
      generatedPassword += field.getChar();
    }
    setPassword(generatedPassword);
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setValues({ ...values, [name]: newValue });
  };

  const handleClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setSuccess("Mot de passe copié");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } else {
      setError("Veuillez générer un mot de passe");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-900 text-gray-100">
      {success ? (
        <p className="mb-4 w-96 rounded-lg bg-green-500 px-8 py-4 text-center font-bold text-white">
          {success}
        </p>
      ) : error ? (
        <p className="mb-4 w-96 rounded-lg bg-red-500 px-8 py-4 text-center font-bold text-white">
          {error}
        </p>
      ) : null}
      <div className="w-96 rounded-lg bg-gray-800 px-8 py-6 shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="relative mb-7 overflow-hidden rounded-md bg-slate-100">
            <input
              type="text"
              id="result"
              placeholder="Min 6 Char"
              readOnly
              value={password}
              className="h-full w-[85%] bg-transparent p-3 text-black"
            />
            <div
              className="absolute right-0 top-[50%] flex h-full w-[15%] translate-y-[-50%] cursor-pointer items-center justify-center bg-blue-400 text-2xl text-white"
              onClick={handleClipboard}
            >
              <FaClipboard />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="font-medium">
              Taille
            </label>
            <input
              type="number"
              name="length"
              id="length"
              min={6}
              max={20}
              value={values.length}
              onChange={handleChange}
              className="h-10 w-12 rounded border-none bg-slate-100 p-2 pr-0 text-black outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="uppercase" className="font-medium">
              Majuscule
            </label>
            <input
              type="checkbox"
              name="uppercase"
              id="uppercase"
              checked={values.uppercase}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="lowercase" className="font-medium">
              Minuscule
            </label>
            <input
              type="checkbox"
              name="lowercase"
              id="lowercase"
              checked={values.lowercase}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="numbers" className="font-medium">
              Nombres
            </label>
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              checked={values.numbers}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="symbols" className="font-medium">
              Symboles
            </label>
            <input
              type="checkbox"
              name="symbols"
              id="symbols"
              checked={values.symbols}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-blue-400 py-2 px-4 text-gray-100 hover:bg-blue-500 focus:outline-none focus:ring-opacity-50"
          >
            Générer un mot de passe
          </button>
        </form>
      </div>
    </div>
  );
}
