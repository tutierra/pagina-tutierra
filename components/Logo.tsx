type LogoProps = {
  className?: string;
  withWordmark?: boolean;
};

export default function Logo({ className = "", withWordmark = true }: LogoProps) {
  // Por defecto, al ser fondo oscuro, mostramos el logo vector SVG en blanco (/logo-white.svg).
  // Si explícitamente se pide verde/original, mostramos /logo.svg.
  const isWhite = !className.includes("text-tech-green");

  if (withWordmark) {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={isWhite ? "/logo-white.svg" : "/logo.svg"}
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
