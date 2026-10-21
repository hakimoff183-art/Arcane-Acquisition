import { SiteHeader } from "@/sections/header";
import { Hero } from "@/sections/hero";
import { SignalsRail } from "@/sections/signals-rail";
import { Problem } from "@/sections/problem";
import { Video } from "@/sections/video";
import { Contents } from "@/sections/contents";
import { Process } from "@/sections/process";
import { Who } from "@/sections/who";
import { Faq } from "@/sections/faq";
import { Apply } from "@/sections/apply";
import { SiteFooter } from "@/sections/footer";

export function App() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-[70] rounded-full bg-ink px-4 py-2 font-semibold text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Aller au contenu
      </a>
      <SiteHeader />
      <main id="contenu">
        <Hero />
        <SignalsRail />
        <Problem />
        <Video />
        <Contents />
        <Process />
        <Who />
        <Faq />
        <Apply />
      </main>
      <SiteFooter />
    </>
  );
}
