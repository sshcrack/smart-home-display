import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import * as ReactDOM from 'react-dom';
import App from '../app';

function render() {
  const root = createRoot(document.getElementById("app")); // createRoot(container!) if you use TypeScript
  root.render(<ChakraProvider>
    <App />
  </ChakraProvider>);
}

render();