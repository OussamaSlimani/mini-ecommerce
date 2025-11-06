// Importation de la classe Component depuis React
// (nécessaire pour créer un composant basé sur une classe)
import { Component } from 'react';

// Définition d’un composant de type "Error Boundary"
// Ce type de composant intercepte les erreurs JavaScript dans le rendu de ses enfants
class ErrorBoundary extends Component {
  // Initialisation de l’état local
  // hasError : indique si une erreur a été capturée
  state = { hasError: false };

  // Méthode de cycle de vie spéciale (statique)
  // Appelée automatiquement lorsqu’une erreur est détectée dans un composant enfant
  // Elle met à jour l’état local pour afficher un message d’erreur à l’utilisateur
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Méthode render : définit ce que le composant affiche
  render() {
    // Si une erreur a été détectée, on affiche un message d’erreur simple et stylisé
    if (this.state.hasError) {
      return (
        <div className="text-center py-10 text-red-600">
          Something went wrong.
        </div>
      );
    }

    // Sinon, on affiche normalement les composants enfants
    return this.props.children;
  }
}

// Exportation du composant pour utilisation dans le reste de l’application
export default ErrorBoundary;
