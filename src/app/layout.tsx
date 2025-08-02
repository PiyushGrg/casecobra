import { Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { constructMetadata } from "@/lib/utils";
import Script from "next/script";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head> 
        {/* <script src="https://crowlit-client.vercel.app/loader.js" data-site="44576ed75197"></script> */}
        
        <Script
          src="https://crowlit-client.vercel.app/loader.js"
          data-site="44576ed75197"
          strategy="afterInteractive"
        />


      </head>
      <body className={recursive.className}>
        <Navbar />
        <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] grainy-light">
          <div className="flex flex-col flex-1 h-full">
            {children}
          </div>
          <Footer />
        </main>
        <Toaster />
        {/* <Script
          id="tawk-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/663dcf659a809f19fb2f69fc/1htgn4a5o';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        /> */}
      </body>
    </html>
  );
}
