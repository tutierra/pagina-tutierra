type LogoProps = {
  className?: string;
  withWordmark?: boolean;
};

export default function Logo({ className = "", withWordmark = true }: LogoProps) {
  // Por defecto, al ser fondo oscuro, mostramos el logo en blanco (logo-white / emblem-white).
  // Si explícitamente se pide verde/original o no es blanco, mostramos el original.
  const isWhite = !className.includes("text-tech-green");

  if (withWordmark) {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={isWhite ? "/logo-white.png" : "/logo.png"}
          alt="Tutierra — Grupo Inmobiliario"
          className="h-[1.25em] w-auto object-contain shrink-0"
        />
      </div>
    );
  } else {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={isWhite ? "/emblem-white.png" : "/emblem.png"}
          alt="Tutierra"
          className="h-[1.25em] w-auto object-contain shrink-0"
        />
      </div>
    );
  }
}
