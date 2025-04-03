import { useFetch, useRuntimeConfig } from "nuxt/app";

export function useRecipes() { 
  const config = useRuntimeConfig();
  const { data, pending, error } = useFetch(`${config.public.apiBase}`);
  return { data, pending, error };
}