export function ScrollSection({ id, children, className = "" }) {
  return (
    <section id={id} className={className || "scroll-section"}>
      {children}
    </section>
  );
}
