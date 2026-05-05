'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [vuelos, setVuelos] = useState([]);

  const cargarVuelos = async () => {
    const vuelos = await fetch(
      "http://localhost:8080/api/vuelos?fechaSalida=2026-05-01&origen=Miami&destino=San%20Salvador",
    );

    const vuelosJson = await vuelos.json();

    setVuelos(vuelosJson);

    console.log(vuelosJson)
  };

  useEffect(() => {
    cargarVuelos();
  }, []);


  return (
    <div>
      <h1>Vuelos</h1>
      {vuelos.map((vuelo, index) => (
        <h1 key={index}>{vuelo.avion}</h1>
      ))}
    </div>
  );
}
