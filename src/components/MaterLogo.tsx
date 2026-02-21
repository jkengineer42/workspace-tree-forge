const MaterLogo = () => (
  <div className="flex items-center gap-2.5">
    {/* Tree icon */}
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-forest"
    >
      <path
        d="M14 3L6 13h3l-3.5 6H11v6h6v-6h5.5L19 13h3L14 3z"
        fill="currentColor"
      />
    </svg>
    <span className="font-mono text-lg font-medium tracking-tight text-foreground">
      Materia
    </span>
  </div>
);

export default MaterLogo;
