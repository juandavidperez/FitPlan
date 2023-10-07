const generarRutina = (meta, diasSeleccionados, dificultades, ejercicios) => {
  const ejerciciosFiltrados = ejercicios.filter((ejercicio) => {
    ejercicio.objetivo.includes(meta);
  });
};

export default generarRutina;
