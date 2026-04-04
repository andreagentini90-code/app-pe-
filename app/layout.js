export const metadata = {
  title: "Cloud Commander App",
  description: "Magic Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
