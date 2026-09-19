const button = document.querySelector('#probar');
const result = document.querySelector('#resultado');

button.addEventListener('click', async () => {
  button.disabled = true;
  result.textContent = 'Consultando al servidor…';

  try {
    const response = await fetch('/api/saludo');
    if (!response.ok) {
      throw new Error('El servidor respondió con un error.');
    }

    const data = await response.json();
    result.textContent = data.mensaje;
  } catch (error) {
    result.textContent = 'No se pudo conectar. Revisa que el servidor esté encendido.';
  } finally {
    button.disabled = false;
  }
});

