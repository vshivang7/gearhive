"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Car, Calendar, Shield, Cpu, Bot, Zap, Eye, Brain, TrendingUp, CheckCircle, Star, ChevronDown } from "lucide-react";
import { SignedOut } from "@clerk/nextjs";
import { getFeaturedCars } from "@/actions/home";
import { CarCard } from "@/components/car-card";
import { HomeSearch } from "@/components/home-search";
import Link from "next/link";
import Image from "next/image";
import { bodyTypes, carMakes, faqItems } from "@/lib/data";

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const arr = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`,
    }));
    setParticles(arr);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-2 bg-orange-500 rounded-full animate-pulse"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};

const NeuralNetwork = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
    <svg className="w-full h-full">
      {[...Array(8)].map((_, i) => (
        <g key={i}>
          <circle
            cx={`${20 + i * 10}%`}
            cy={`${30 + Math.sin(i) * 20}%`}
            r="2"
            fill="#ffa116"
            className="animate-pulse"
          />
          <line
            x1={`${20 + i * 10}%`}
            y1={`${30 + Math.sin(i) * 20}%`}
            x2={`${20 + (i + 1) * 10}%`}
            y2={`${30 + Math.sin(i + 1) * 20}%`}
            stroke="#ffa116"
            strokeWidth="0.5"
            opacity="0.4"
          />
        </g>
      ))}
    </svg>
  </div>
);

const AIThinkingAnimation = ({ show }) => {
  if (!show) return null;
  return (
    <div className="flex items-center gap-2 text-orange-600 mt-4 justify-center">
      <Brain className="w-4 h-4 animate-pulse" />
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <span className="text-sm font-medium">AI Processing...</span>
    </div>
  );
};

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  asChild = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default:
      "bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:scale-105 shadow-lg hover:shadow-orange-500/40",
    ghost:
      "bg-transparent text-orange-700 hover:text-orange-600 hover:bg-orange-50",
    outline: "bg-white border border-orange-300 text-orange-700 hover:bg-orange-50",
  };
  const sizes = {
    default: "px-5 py-2.5 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${classes} ${children.props.className || ""}`,
      ...props,
    });
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

const Accordion = ({ children, type = "single", collapsible = true, className = "" }) => {
  return <div className={className}>{children}</div>;
};

const AccordionItem = ({ children, value, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  );
};

const AccordionTrigger = ({ children, className = "", isOpen, setIsOpen }) => {
  return (
    <button
      className={`${className} w-full text-left py-4 flex items-center justify-between text-gray-900 font-bold hover:text-orange-700`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
      <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

const AccordionContent = ({ children, className = "", isOpen }) => {
  return (
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
      <div className={`text-gray-800 ${className}`}>{children}</div>
    </div>
  );
};

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const cars = await getFeaturedCars();
      setFeaturedCars(cars);
    };
    fetchCars();
  }, []);


  return (
    <div className="pt-16 md:pt-0 flex flex-col min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 text-gray-800 overflow-hidden relative">
      {/* Neural Network Background */}
      <NeuralNetwork />
      
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Floating AI Icons */}
      <div className="fixed top-50 right-10 animate-bounce z-10">
        <Cpu className="w-10 h-10 text-orange-600 opacity-80"/>
      </div>
      <div className="fixed bottom-20 left-10 animate-bounce z-10" style={{ animationDelay: '1s' }}>
        <Bot className="w-10 h-10 text-amber-600 opacity-80" />
      </div>

      {/* Hero Section with Gradient Title */}
      <section className="relative py-4 md:py-8 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <div className="mb-2">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 rounded-full animate-pulse shadow-lg">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-orange-700 via-amber-600 to-orange-700 bg-clip-text text-transparent font-extrabold">
              Find your Dream Car with GearHive AI
            </h1>
            
            <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto font-medium">
              Revolutionary AI technology that understands your needs and matches you with your perfect vehicle in milliseconds.
            </p>

            {/* AI Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">99.9%</div>
                <div className="text-sm text-gray-700 font-medium">AI Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">&lt;0.5s</div>
                <div className="text-sm text-gray-700 font-medium">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">1M+</div>
                <div className="text-sm text-gray-700 font-medium">Daily Analysis</div>
              </div>
            </div>

            {/* Enhanced Search Component with Glassmorphism */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/95 backdrop-blur-md border border-orange-200 rounded-2xl p-6 shadow-xl">
                <HomeSearch onSearching={setIsSearching} />
                <AIThinkingAnimation show={isSearching} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-16 bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
            AI-Powered Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Brain, title: "Neural Matching", desc: "Advanced AI learns your preferences and finds perfect matches" },
              { icon: Eye, title: "Computer Vision", desc: "AI analyzes vehicle condition with 99.9% accuracy" },
              { icon: TrendingUp, title: "Predictive Pricing", desc: "AI forecasts market trends and fair pricing" },
              { icon: Zap, title: "Smart Recommendations", desc: "Personalized suggestions based on your behavior" }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-white to-amber-50 backdrop-blur-lg border border-orange-200 rounded-2xl p-6 hover:scale-105 transform transition-all duration-300 hover:shadow-xl hover:shadow-orange-300/50">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform shadow-md">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-800">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* Featured Cars */}
      <section className="pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
              AI-Verified Featured Cars
            </h2>
            <Button variant="ghost" className="flex items-center">
              View All  <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

<section className="py-8 overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
        Browse by Make
      </h2>
      <Button variant="ghost" className="flex items-center" asChild>
        <Link href="/cars"> View All<ChevronRight className="ml-1 h-4 w-4" /></Link>
      </Button>
    </div>

    {/* Infinite Scroll Carousel */}
    <div className="relative overflow-hidden">
      <div className="flex w-[200%] animate-scroll">
        {[...carMakes, ...carMakes].map((make, idx) => (
          <div
  key={`${make.name}-${idx}`}
  className="min-w-[240px] px-8 flex-shrink-0"
>
            <Link href={`/cars?make=${make.name}`} className="group block">
<div className="bg-white rounded-2xl p-4 text-center hover:scale-110 transform transition-all duration-300 hover:shadow-lg hover:shadow-orange-300/50 border border-orange-100">
                <div className="h-16 w-auto mx-auto mb-2 relative">
                  <Image
                    src={make.imageUrl || `/make/${make.name.toLowerCase()}.webp`}
                    alt={make.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 className="font-bold text-gray-900">{make.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


     {/* Why Choose Us */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-12 bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
            Why Choose Our AI Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transform transition-all duration-300 shadow-lg">
                <Car className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">AI-Curated Selection</h3>
              <p className="text-gray-800">
                Millions of verified vehicles analyzed by our neural networks from trusted sources.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-700 to-amber-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transform transition-all duration-300 shadow-lg">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Instant AI Scheduling</h3>
              <p className="text-gray-800">
                Book a test drive online in milliseconds with AI-powered flexible scheduling.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transform transition-all duration-300 shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Neural Security</h3>
              <p className="text-gray-800">
                Advanced AI fraud detection and verification protocols for complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Body Type */}
      <section className="py-8 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
              Browse by Body Type
            </h2>
            <Button variant="ghost" className="flex items-center" asChild>
        <Link href="/cars"> View All<ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyTypes.map((type) => (
              <div key={type.name} className="relative group cursor-pointer">
                <div className="overflow-hidden rounded-lg h-28 relative">
                  <img
                    src={type.image}
                    alt={type.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-lg flex items-end hover:from-orange-900/80 transition-all duration-300">
                  <h3 className="text-white text-xl font-bold pl-4 pb-2">
                    {type.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
            AI Assistant - Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-gradient-to-br from-white to-amber-50 backdrop-blur-lg border border-orange-200 rounded-2xl px-6">
                  <AccordionTrigger className="text-gray-900 hover:text-orange-700 flex items-center gap-4">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <span className="flex-1">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-800 ml-12">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-8 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-orange-700 to-amber-600 bg-clip-text text-transparent">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto font-medium">
            Join thousands of satisfied customers who found their perfect vehicle through our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/cars">View All Cars</Link>
            </Button>
            <SignedOut>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sign-up">Sign Up Now</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>


      {/* Futuristic Footer */}
<footer className="bg-gradient-to-br from-amber-50 to-white text-gray-900 py-4 mt-16 border-t border-orange-200 relative overflow-hidden">
  {/* Glow Bar */}
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-orange-200 via-amber-400 to-orange-200 blur-md animate-pulse" />

  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
    {/* Brand */}
    <div>
      <Image src="/gearhive_logo.png" alt="GearHive Logo" width={160} height={60} className="mb-4" />
      <p className="text-gray-800 text-sm leading-relaxed font-medium">
        Experience the future of vehicle discovery with AI-driven precision. GearHive is redefining car buying with neural intelligence.
      </p>
    </div>

    {/* Navigation */}
    <div>
      <h4 className="text-gray-900 font-bold text-lg mb-4">Quick Links</h4>
      <ul className="space-y-2 text-gray-700 text-sm font-medium">
        <li><Link href="/" className="hover:text-orange-700 transition">Home</Link></li>
        <li><Link href="/cars" className="hover:text-orange-700 transition">All Cars</Link></li>
        <li><Link href="/reservations" className="hover:text-orange-700 transition">Reservations</Link></li>
        <li><Link href="/admin" className="hover:text-orange-700 transition">Admin Portal</Link></li>
      </ul>
    </div>

    {/* Support */}
    <div>
      <h4 className="text-gray-900 font-bold text-lg mb-4">Support</h4>
      <ul className="space-y-2 text-gray-700 text-sm font-medium">
        <li><Link href="/faq" className="hover:text-orange-700 transition">FAQs</Link></li>
        <li><Link href="/contact" className="hover:text-orange-700 transition">Contact Us</Link></li>
        <li><Link href="/privacy" className="hover:text-orange-700 transition">Privacy Policy</Link></li>
        <li><Link href="/terms" className="hover:text-orange-700 transition">Terms & Conditions</Link></li>
      </ul>
    </div>

    {/* Social & Icons */}
    <div>
      <h4 className="text-gray-900 font-bold text-lg mb-4">Connect with Us</h4>
      <div className="flex space-x-4 mb-4">
        <a href="#" className="text-orange-600 hover:scale-110 transition"><Cpu className="w-6 h-6" /></a>
        <a href="#" className="text-amber-600 hover:scale-110 transition"><Bot className="w-6 h-6" /></a>
        <a href="#" className="text-orange-600 hover:scale-110 transition"><Brain className="w-6 h-6" /></a>
        <a href="#" className="text-amber-600 hover:scale-110 transition"><Zap className="w-6 h-6" /></a>
      </div>
      <p className="text-sm text-gray-800 font-medium">hello@gearhive.ai</p>
    </div>
  </div>

  <div className="text-center text-sm text-gray-700 mt-4 z-10 relative font-medium">
    © {new Date().getFullYear()} GearHive AI. All rights reserved. 🚀
  </div>
</footer>

    </div>
  );
}