import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShivamOS — Portfolio of Shivam Kumar | Software Engineer",
  description:
    "A Photoshop-inspired digital operating system portfolio. Explore the work, projects, skills, and journey of Shivam Kumar — Software Engineer, AI Enthusiast, Full Stack Developer.",
  keywords: [
    "Shivam Kumar",
    "Software Engineer",
    "Portfolio",
    "Full Stack Developer",
    "AI",
    "Machine Learning",
    "React",
    "Next.js",
    "Flutter",
    "Python",
  ],
  openGraph: {
    title: "ShivamOS — Portfolio of Shivam Kumar",
    description:
      "A Photoshop-inspired digital OS portfolio. Engineering meets design.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShivamOS — Portfolio of Shivam Kumar",
    description:
      "A Photoshop-inspired digital OS portfolio. Engineering meets design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const color = localStorage.getItem('portfolio-accent-color');
                if (color) {
                  document.documentElement.style.setProperty('--accent', color);
                  document.documentElement.style.setProperty('--accent-dim', color + '15');
                }
              } catch(e){}
            `
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
