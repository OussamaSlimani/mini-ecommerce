import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Composant principal de l'application
import './index.css'; // Styles globaux

// React Query pour la gestion des requêtes côté client
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Création d'une instance de QueryClient pour React Query
const queryClient = new QueryClient();

/**
 * Point d'entrée de l'application
 * -------------------------------
 * - React.StrictMode : active les vérifications supplémentaires pour le développement
 * - QueryClientProvider : fournit le client React Query à toute l'application
 * - ReactQueryDevtools : outil pour debugger les requêtes et le cache React Query
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App /> {/* Composant principal avec toutes les routes */}
      <ReactQueryDevtools initialIsOpen={false} /> {/* Devtools React Query */}
    </QueryClientProvider>
  </React.StrictMode>
);
