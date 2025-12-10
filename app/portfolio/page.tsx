import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Skills } from "@/components/home/Skills";
import { Projects } from "@/components/home/Projects";
import { Contact } from "@/components/home/Contact";
import { Footer } from "@/components/home/Footer";
import ChatBot from "@/components/home/Chatbot";

export default function PortfolioHome() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <ChatBot />
      <Footer />
    </div>
  );
}
