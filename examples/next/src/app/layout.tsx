import { ModeToggle } from "@/components/ModeToggle";
import "../styles/global.css";
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}


export const dynamic = 'force-dynamic';