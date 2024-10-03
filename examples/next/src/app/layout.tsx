import { sayHello } from "library"

console.log('library', sayHello())

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}


export const dynamic = 'force-dynamic';