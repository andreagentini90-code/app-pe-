export const metadata = {
  title: "Cloud App",
  description: "Magic Commander Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
