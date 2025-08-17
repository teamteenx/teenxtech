export default function ScrollSection({ id, className, style, children }) {
  return (
    <section
      id={id}
      className={["scroll-section", className].filter(Boolean).join(" ")}
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "800px",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
