import axios from "axios";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { showToast } from "nextjs-toast-notify";

export const peticionesAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

peticionesAuth.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session && session.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

peticionesAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      return;
    }

    const estatus = error.response.status;
    const respuesta = error.response.data.errores;

    switch (estatus) {
      case 400:
        if (respuesta) {
          respuesta.forEach((r) => {
            showToast.warning(r.descripcion);
          });
        }
        break;
      case 404:
        if (respuesta) {
          showToast.error(respuesta[0].descripcion);
        }
        break;
      default:
        showToast.error(error.response.data.errores[0].descripcion);
        break;
    }
    return Promise.reject(error);
  },
);
