"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Box,
  Database,
  Search,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    title: "Modern Portfolio Template",
    description:
      "A clean, minimal, and responsive portfolio template for developers.",
    href: "#",
    icon: <Box className="w-6 h-6 text-blue-500" />,
    tags: ["Next.js", "Tailwind", "Framer Motion"],
  },
  {
    title: "Voice Bot Flow",
    description:
      "Interactive voice bot workflow builder for automated customer service.",
    href: "#",
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    tags: ["React Flow", "OpenAI", "WebSockets"],
  },
  {
    title: "Scraping Agent Builder",
    description: "No-code builder for creating custom web scraping agents.",
    href: "#",
    icon: <Database className="w-6 h-6 text-green-500" />,
    tags: ["Python", "Selenium", "Docker"],
  },
];

const allProducts = [
  {
    title: "TikTok 20M Data",
    description:
      "Comprehensive dataset of TikTok trends and user engagement metrics.",
    href: "#",
    icon: <Database className="w-5 h-5" />,
  },
  {
    title: "Scrape Instagram Profile",
    description:
      "Automated tool to extract public profile data from Instagram.",
    href: "#",
    icon: <Search className="w-5 h-5" />,
  },
  {
    title: "Skool 5k Data",
    description: "Community data from Skool for market research and analysis.",
    href: "#",
    icon: <Database className="w-5 h-5" />,
  },
  {
    title: "Linktree 240k Data",
    description:
      "Large-scale dataset of Linktree profiles and social connections.",
    href: "#",
    icon: <LinkIcon className="w-5 h-5" />,
  },
  {
    title: "AI Searching Engine",
    description: "Semantic search engine powered by vector embeddings.",
    href: "#",
    icon: <Search className="w-5 h-5" />,
  },
  {
    title: "Auto Image Gen",
    description: "AI-powered tool for automated image and video generation.",
    href: "#",
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    title: "Crunchbase 2.8M Data",
    description: "Extensive startup and funding data from Crunchbase.",
    href: "#",
    icon: <Database className="w-5 h-5" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 mt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Products</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A collection of digital products, templates, and datasets I&apos;ve built.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-16"
      >
        {/* Featured Products */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" /> Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group relative bg-card hover:bg-accent/50 border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-secondary rounded-lg group-hover:bg-background transition-colors">
                    {product.icon}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={product.href} className="absolute inset-0">
                  <span className="sr-only">View {product.title}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* All Products */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">All Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allProducts.map((product, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group relative bg-card/50 hover:bg-accent/50 border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-secondary rounded-md text-muted-foreground group-hover:text-primary transition-colors">
                    {product.icon}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                    {product.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ArrowUpRight className="w-3 h-3 ml-1" />
                </div>
                <Link href={product.href} className="absolute inset-0">
                  <span className="sr-only">View {product.title}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          variants={item}
          className="bg-secondary/30 border border-border rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              I can build custom digital products, scrapers, and automation
              tools tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="font-semibold" asChild>
                <Link href="mailto:hi@grvx.dev">Get In Touch</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/portfolio/contact">Contact Me</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
