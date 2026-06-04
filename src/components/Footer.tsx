import type { Theme } from '../App';

interface FooterProps {
  theme: Theme;
}

export const Footer = ({ theme }: FooterProps) => {
  const textColor = theme === 'DARK' ? 'text-gray-500' : 'text-gray-400';

  return (
    // Mantenemos el footer centrado
    <footer className="w-full text-center py-8 mt-auto">
      {/* 
         - 'inline-block': hace que el párrafo solo ocupe el ancho de su contenido.
         - '-ml-12' (o el valor que prefieras): desplaza el bloque hacia la izquierda.
         - Ajusta el número (ml-4, ml-8, ml-12) para moverlo más o menos.
      */}
      <p className={`font-['Press_Start_2P'] text-sm inline-block -ml-12 ${textColor}`}>
        💕 Desarrollado con todo mi amor por JuanVi 💕
      </p>
    </footer>
  );
};