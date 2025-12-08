import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Phone, Mail, Menu, Award, Gift, Tag, ChevronDown, QrCode, BarChart3, Palette, Wifi, WifiOff, Headphones, LogIn, Play, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { Facebook, Instagram } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import APP from '../../images/app.png';
import LOGO from '../../images/mainLogo.png';
import { router } from '@inertiajs/react';
import BUSINESSPOV from "../../videos/business pov.mov";
import CUSTOMERPOV from "../../videos/customer pov.mov";
import CUSTOMERTHUMBNAIL from "../../images/customer thumbnail.png";
import BUSINESSTHUMBANAIL from "../../images/business thumbnail.png";

export default function Welcome() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [isDemo, setIsDemo] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.querySelector('main');
            if (heroSection) {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                setIsScrolled(window.scrollY > heroBottom - 100);
            }

            const sections = ['benefits', 'features', 'how-it-works', 'pricing', 'faq'];
            const scrollPosition = window.scrollY + 150;

            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleLoginChoice = (type : string) => {
        let route = "/login";
        setLoginDialogOpen(false);
        if(type == "customer") {
            route = '/customer/login';
        }
        if(isDemo){
            router.get(route, {
            data: {
                is_demo: true
            }
        });
        }else{
            router.get(route);
        }
    };

    useEffect(() => {
        if(!loginDialogOpen){
            setIsDemo(false);
        }
    },[loginDialogOpen])

    const handleDemoClick = () => {
        setIsDemo(true);
        setLoginDialogOpen(true);
    }

    return (
        <>
            {/* SEO HEAD TAGS - THIS IS THE MOST IMPORTANT PART */}
           <Head>
                <title>StampBayan - Free Digital Loyalty Card System for Philippine Businesses</title>
                <meta name="title" content="StampBayan - Free Digital Loyalty Card System" />
                <meta name="description" content="Modern customer loyalty program for Filipino businesses. 100% Free. Build customer relationships and boost repeat sales." />
                <meta name="keywords" content="free loyalty program Philippines, customer loyalty card, digital stamp card, Filipino business tools" />
                <link rel="canonical" href="https://www.stampbayan.com" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.stampbayan.com" />
                <meta property="og:title" content="StampBayan - Free Digital Loyalty Card System" />
                <meta property="og:description" content="Modern customer loyalty program for Filipino businesses. 100% Free." />
                <meta property="og:image" content="https://www.stampbayan.com/images/og-image.jpg" />
                <meta property="og:site_name" content="StampBayan" />
                <meta property="og:locale" content="en_PH" />
                <meta name="robots" content="index, follow" />
            </Head>

            <div className="min-h-screen relative overflow-hidden bg-primary">
                {/* Header */}
                <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 lg:px-8 xl:px-12 lg:py-6 transition-all duration-300 ${
                    isScrolled ? 'bg-primary shadow-lg' : 'bg-transparent'
                }`}>
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <img src={LOGO} alt="StampBayan Logo" className='sm:h-10 sm:w-32 h-8 w-24'/>
                        </div>

                        <nav className={`hidden lg:flex items-center gap-4 xl:gap-8 transition-all duration-300 ${
                            isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                        }`}>
                            <a href="#benefits" onClick={(e) => scrollToSection(e, '#benefits')} className={`text-sm font-medium transition-all px-4 xl:px-5 py-2 relative ${activeSection === 'benefits' ? 'text-white' : 'text-white/90 hover:text-white'}`}>
                                BENEFITS
                                {activeSection === 'benefits' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>}
                            </a>
                            <a href="#features" onClick={(e) => scrollToSection(e, '#features')} className={`text-sm font-medium transition-all px-4 xl:px-5 py-2 relative ${activeSection === 'features' ? 'text-white' : 'text-white/90 hover:text-white'}`}>
                                FEATURES
                                {activeSection === 'features' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>}
                            </a>
                            <a href="#how-it-works" onClick={(e) => scrollToSection(e, '#how-it-works')} className={`text-sm font-medium transition-all px-4 xl:px-5 py-2 relative ${activeSection === 'how-it-works' ? 'text-white' : 'text-white/90 hover:text-white'}`}>
                                HOW IT WORKS
                                {activeSection === 'how-it-works' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>}
                            </a>
                            {/* PRICING LINK REMOVED */}
                            <a href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className={`text-sm font-medium transition-all px-4 xl:px-5 py-2 relative ${activeSection === 'faq' ? 'text-white' : 'text-white/90 hover:text-white'}`}>
                                FAQ
                                {activeSection === 'faq' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>}
                            </a>
                        </nav>

                        <div className="flex items-center gap-3">
                            <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
                                <DialogTrigger asChild>
                                    <button className="flex items-center gap-2 bg-white hover:bg-white/30 transition sm:px-8 py-2 rounded-full text-primary font-medium text-xs sm:text-sm px-5 cursor-pointer">
                                        Login
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold text-center mb-2">Welcome Back!</DialogTitle>
                                        <DialogDescription className="text-center">
                                            Choose your account type to continue
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <button onClick={() => handleLoginChoice('business')} className="group relative p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                                    <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                                <div className="text-left flex-1">
                                                    <h3 className="font-bold text-lg text-gray-900">Business Login</h3>
                                                    <p className="text-sm text-gray-600">Access your business dashboard</p>
                                                </div>
                                                <ChevronDown className="w-5 h-5 text-gray-400 -rotate-90 group-hover:text-blue-500 transition-colors" />
                                            </div>
                                        </button>
                                        
                                        <button onClick={() => handleLoginChoice('customer')} className="group relative p-6 rounded-xl border-2 border-gray-200 hover:border-green-500 transition-all duration-300 hover:shadow-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                                                    <svg className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div className="text-left flex-1">
                                                    <h3 className="font-bold text-lg text-gray-900">Customer Login</h3>
                                                    <p className="text-sm text-gray-600">View your loyalty rewards</p>
                                                </div>
                                                <ChevronDown className="w-5 h-5 text-gray-400 -rotate-90 group-hover:text-green-500 transition-colors" />
                                            </div>
                                        </button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </header>

                <main className="relative z-10 px-4 sm:px-4 py-8 sm:py-12 lg:py-16 xl:py-20 pt-24 sm:mt-16">
                    <div className="sm:max-w-7xl sm:mx-auto">
                        <div className="text-center sm:max-w-5xl mx-auto leading-0">
                            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-2 px-4">
                                Stop Losing Customers to Competitors
                            </h1>
                            
                            <p className="text-white/80 text-xs sm:text-base lg:text-lg mb-8 sm:mb-12 px-4 max-w-3xl mx-auto">
                                Turn one-time buyers into loyal regulars with a digital loyalty program that actually works. No more lost punch cards. No more forgotten rewards.
                            </p>

                            {/* UPDATED: Free Forever Messages */}
                            <div className="flex justify-center gap-4 sm:gap-8 mb-8 sm:mb-10 mx-auto text-white/90 flex-wrap">
                                <p className="text-xs sm:text-base flex flex-col">
                                    <strong>✓ 100% Free</strong>
                                    <span className='text-[10px] sm:text-xs'>Grow your business at zero cost</span>
                                </p>
                                <p className="text-xs sm:text-base flex flex-col">
                                    <strong>✓ Set up in 5 minutes</strong>
                                    <span className='text-[10px] sm:text-xs'>Print QR code, start today</span>
                                </p>
                                <p className="text-xs sm:text-base flex flex-col">
                                    <strong>✓ Unlimited Access</strong>
                                    <span className='text-[10px] sm:text-xs'>No subscription fees</span>
                                </p>
                            </div>
                            
                            <button onClick={() => setLoginDialogOpen(true)} className="text-primary cursor-pointer font-semibold px-5 sm:px-10 lg:px-12 py-2 sm:py-4 rounded-full sm:text-lg md:text-base text-xs transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg bg-white">
                                <div className="flex flex-col items-center justify-between">
                                    Create Free Account
                                    <span className="sm:text-xs text-[8px]">No Credit Card Required</span>
                                </div>
                            </button>

                            <div className="text-white/70 text-xs sm:text-sm mt-6">
                                ✓ No hidden fees  •  ✓ No setup fees  •  ✓ 24/7 support
                            </div>
                        </div>
                    </div>
                </main>

                {/* Stats Section */}
                <section id="benefits" className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                                Why Loyalty Programs Work
                            </h2>
                            <p className="text-black/80 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-4">
                                The numbers speak for themselves
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            <div className="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-400/20 flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-black">67%</div>
                                        <div className="text-black/70 text-sm">More spending from loyal customers</div>
                                    </div>
                                </div>
                                <p className="text-black/60 text-xs">Studies show loyal customers spend significantly more than new ones</p>
                            </div>

                            <div className="bg-white/10 shadow-lg backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-white-400/20 flex items-center justify-center">
                                        <Users className="w-6 h-6 text-white-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-black">5x</div>
                                        <div className="text-black/70 text-sm">More likely to return</div>
                                    </div>
                                </div>
                                <p className="text-black/60 text-xs">Customers with loyalty cards visit 5 times more often</p>
                            </div>

                            <div className="bg-white/10 shadow-lg backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center">
                                        <BarChart3 className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-black">25-95%</div>
                                        <div className="text-black/70 text-sm">Profit increase potential</div>
                                    </div>
                                </div>
                                <p className="text-black/60 text-xs">Just 5% increase in retention can boost profits dramatically</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Video Demo Section */}
                <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#f8f9fa] to-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
                                See It In Action (No Need To Download)
                            </h2>
                            <p className="text-black/90 text-base sm:text-lg max-w-2xl mx-auto">
                                Watch how easy it is for both businesses and customers
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                            <div className="group">
                                <div className="bg-white rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300">
                                    <div className="relative bg-white rounded-xl mb-4 overflow-hidden mx-auto" style={{ maxWidth: '400px' }}>
                                        <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <Play className="w-16 h-16 text-white/80 mx-auto mb-3" />
                                                    <p className="text-white/60 text-sm">Business Demo Video</p>
                                                </div>
                                            </div>
                                            <video className="absolute inset-0 w-full h-full object-contain" controls poster={BUSINESSTHUMBANAIL}>
                                                <source src={BUSINESSPOV} type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Business View</h3>
                                    <p className="text-gray-600 text-sm text-center">See how simple it is to manage your loyalty program and track customer activity</p>
                                </div>
                            </div>

                            <div className="group">
                                <div className="bg-white rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300">
                                    <div className="relative bg-white rounded-xl mb-4 overflow-hidden mx-auto" style={{ maxWidth: '400px' }}>
                                        <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <Play className="w-16 h-16 text-white/80 mx-auto mb-3" />
                                                    <p className="text-white/60 text-sm">Customer Demo Video</p>
                                                </div>
                                            </div>
                                            <video className="absolute inset-0 w-full h-full object-contain" controls poster={CUSTOMERTHUMBNAIL}>
                                                <source src={CUSTOMERPOV} type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Customer Experience</h3>
                                    <p className="text-gray-600 text-sm text-center">Watch how customers scan, collect stamps, and redeem rewards in seconds</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

        
                {/* Features Section */}
                <section id="features" className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 lg:py-28" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ color: '#333333' }}>
                                Powerful Features for Your Business
                            </h2>
                            <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-4">
                                Everything you need to run a successful loyalty program
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            <article className="group p-6 lg:p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-xl">
                                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942' }}>
                                    <BarChart3 className="w-7 h-7 lg:w-8 lg:h-8 text-white"/>
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: '#333333' }}>
                                    Customer Analytics
                                </h3>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    Track customer traffic by day, visit frequency, and new customer counts to make data-driven decisions and plan better.
                                </p>
                            </article>

                            <article className="group p-6 lg:p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-xl">
                                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942' }}>
                                    <Palette className="w-7 h-7 lg:w-8 lg:h-8 text-white"/>
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: '#333333' }}>
                                    Customizable Cards
                                </h3>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    Design loyalty cards that match your brand with custom colors, logos, and reward structures.
                                </p>
                            </article>

                            <article className="group p-6 lg:p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-xl">
                                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942' }}>
                                    <QrCode className="w-7 h-7 lg:w-8 lg:h-8 text-white"/>
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: '#333333' }}>
                                    Custom QR Codes
                                </h3>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    Generate unique QR codes for your business to display at your location for easy customer scanning.
                                </p>
                            </article>

                            <article className="group p-6 lg:p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-xl">
                                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942' }}>
                                    <Wifi className="w-7 h-7 lg:w-8 lg:h-8 text-white"/>
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: '#333333' }}>
                                    Scan to Stamp
                                </h3>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    Customers can instantly earn stamps by scanning your QR code with their smartphone.
                                </p>
                            </article>

                            <article className="group p-6 lg:p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-xl">
                                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942' }}>
                                    <WifiOff className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: '#333333' }}>
                                    Offline Stamp Codes
                                </h3>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    Award stamps even without internet connection using unique offline codes.
                                </p>
                            </article>

                            <article className="group p-6 lg:p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-xl">
                                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942' }}>
                                    <Headphones className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: '#333333' }}>
                                    24/7 Customer Support
                                </h3>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    Get help anytime with our ticket-based support system. We're always here to assist you.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

       
            {/* How It Works Section */}
            <section id="how-it-works" className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white" >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ color: '#333333' }}>
                            How It Works
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-4">
                            Get started in minutes with our simple three-step process
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Side - Image */}
                        <img src={APP} alt="application user interface" className="w-full rounded-2xl" />
                        
                        {/* Right Side - Steps */}
                        <div className="order-1 lg:order-2 space-y-1 lg:space-y-3">
                            {/* Step 1 */}
                            <div className="flex gap-4 sm:gap-3 group">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-bold text-xl sm:text-2xl transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942', color: '#ffffff' }}>
                                        1
                                    </div>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ color: '#333333' }}>
                                        Create Business Account
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                                        Sign up in seconds and set up your business profile. Customize your loyalty program with your brand colors and rewards.
                                    </p>
                                </div>
                            </div>

                            {/* Connector Line */}
                            <div className="ml-6 sm:ml-8 h-8 w-0.5 bg-gradient-to-b from-gray-300 to-transparent"></div>

                            {/* Step 2 */}
                            <div className="flex gap-4 sm:gap-6 group">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-bold text-xl sm:text-2xl transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942', color: '#ffffff' }}>
                                        2
                                    </div>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ color: '#333333' }}>
                                        Print Your QR Code
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                                        Generate and print your unique QR code. Display it at your counter, entrance, or anywhere customers can easily scan it.
                                    </p>
                                </div>
                            </div>

                            {/* Connector Line */}
                            <div className="ml-6 sm:ml-8 h-8 w-0.5 bg-gradient-to-b from-gray-300 to-transparent"></div>

                            {/* Step 3 */}
                            <div className="flex gap-4 sm:gap-6 group">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-bold text-xl sm:text-2xl transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942', color: '#ffffff' }}>
                                        3
                                    </div>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ color: '#333333' }}>
                                        Customers Scan & Join
                                    </h3>
                                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                                        Customers scan the QR code, register, and instantly join your loyalty program. No paper cards, no hassle!
                                    </p>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="pt-6 lg:pt-8">
                                <a 
                                    href='/documentation'
                                    target='_blank'
                                    className="sm:w-auto font-semibold px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg cursor-pointer w-full"
                                    style={{ backgroundColor: '#F4B942', color: '#ffffff' }}
                                >
                                    Full guide
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Pricing Section (Updated to reflect FREE service) */}
                <section id="pricing" className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 lg:py-28 bg-[#f8f9fa]">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ color: '#333333' }}>
                                Simple, Transparent Pricing
                            </h2>
                            <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-4">
                                Start now for free. No catch.
                            </p>
                        </div>

                        <div className="max-w-md mx-auto">
                            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-4 border-primary">
                                <div className="text-center">
                                    <Tag className="w-10 h-10 text-primary mx-auto mb-4"/>
                                    <h3 className="text-3xl font-bold mb-2">
                                        StampBayan FREE Plan
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Built for Filipino businesses to thrive.
                                    </p>
                                    <div className="my-8">
                                        <p className="text-5xl font-extrabold text-primary inline-flex items-end">
                                            <span className="text-3xl align-top">₱</span>0
                                            <span className="text-xl font-medium text-gray-500">/month</span>
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => setLoginDialogOpen(true)}
                                        className="w-full text-white bg-primary hover:bg-primary/90 cursor-pointer font-semibold px-8 py-3 rounded-full text-base transition-all duration-300 hover:shadow-lg shadow-md"
                                    >
                                        Start Your Loyalty Program
                                    </button>
                                    <p className="text-xs text-gray-500 mt-3">
                                        No credit card required.
                                    </p>
                                </div>
                                
                                <ul className="mt-8 space-y-4 text-left">
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"/>
                                        <span className="text-gray-700"><strong>Unlimited</strong> customers</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"/>
                                        <span className="text-gray-700"><strong>Unlimited</strong> stamps and rewards</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"/>
                                        <span className="text-gray-700">Full access to <strong>Customer Analytics</strong></span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"/>
                                        <span className="text-gray-700">Custom Card & QR Code Builder</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"/>
                                        <span className="text-gray-700">Dedicated Support (Email/Chat)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            {/* FAQ Section */}
<section id="faq" className="relative z-10 px-4 py-4 sm:px-6  sm:py-12 lg:py-16 bg-white">
    <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ color: '#333333' }}>
                Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl px-4">
                Everything you need to know about StampBayan
            </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 border-gray-100 rounded-2xl px-6 hover:border-primary transition-colors">
                <AccordionTrigger className="text-left text-lg sm:text-xl font-bold hover:no-underline py-6" style={{ color: '#333333' }}>
                    What is StampBayan?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base sm:text-lg pb-6 leading-relaxed">
                    StampBayan is a modern Customer Loyalty Card system where businesses can reward their customers for coming back and build relationships with them to strengthen customer loyalty. Say goodbye to paper punch cards and hello to a digital solution that's easy for both you and your customers.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 border-gray-100 rounded-2xl px-6 hover:border-primary transition-colors">
                <AccordionTrigger className="text-left text-lg sm:text-xl font-bold hover:no-underline py-6" style={{ color: '#333333' }}>
                    What is your goal?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base sm:text-lg pb-6 leading-relaxed">
                    Our goal is to introduce businesses to modern systems so they can see the benefits and advantages of using digital loyalty programs. We want to show businesses that having a system doesn't have to be expensive to maintain—it's actually a powerful tool to help you grow and thrive.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 border-gray-100 rounded-2xl px-6 hover:border-primary transition-colors">
                <AccordionTrigger className="text-left text-lg sm:text-xl font-bold hover:no-underline py-6" style={{ color: '#333333' }}>
                    How will this help my business?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base sm:text-lg pb-6 leading-relaxed">
                    Building strong connections with your customers keeps them coming back. Research shows that increasing customer retention by just 5% can boost profits by 25-95%. Loyal customers spend 67% more than new customers and are five times more likely to make repeat purchases. With StampBayan, you create meaningful relationships that turn one-time visitors into lifelong patrons.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 border-gray-100 rounded-2xl px-6 hover:border-primary transition-colors">
                <AccordionTrigger className="text-left text-lg sm:text-xl font-bold hover:no-underline py-6" style={{ color: '#333333' }}>
                    What is Customer Analytics?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base sm:text-lg pb-6 leading-relaxed">
                    Our Customer Analytics feature gives you valuable insights into your business performance. You'll see:
                    <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                        <li>Customer traffic by day - Know when your store is busiest</li>
                        <li>Customer visit frequency - Understand how often customers return</li>
                        <li>New customer count - Track your business growth</li>
                        <li>Peak hours and trends - Plan staffing and inventory better</li>
                    </ul>
                    <span className="block mt-3">All this data helps you make smarter business decisions and serve your customers better.</span>
                </AccordionContent>
            </AccordionItem>

 

            <AccordionItem value="item-6" className="border-2 border-gray-100 rounded-2xl px-6 hover:border-primary transition-colors ">
                <AccordionTrigger className="text-left text-lg sm:text-xl font-bold hover:no-underline py-6" style={{ color: '#333333' }}>
                    What makes StampBayan different from other loyalty systems?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base sm:text-lg pb-6 leading-relaxed">
                    At StampBayan, we believe that even small businesses deserve access to powerful systems. We've designed our platform to be affordable because we know that useful tools don't have to be expensive. Our system focuses on delivering real benefits to your business while being incredibly easy to use. No complicated setup, no hidden costs—just a straightforward solution that helps you grow.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
</section>

       {/* Footer - The approved dark footer */}
                <footer className="px-4 sm:px-6 py-12 bg-primary">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-white/70 text-sm">
                        <div className="md:col-span-1">
                            <img src={LOGO} alt="StampBayan Logo" className='h-8 mb-4'/>
                            <p className='mb-4'>Digital Loyalty for Filipino Businesses.</p>
                            <div className="flex gap-4">
                                <Facebook className="w-5 h-5 hover:text-white transition cursor-pointer" />
                                <Instagram className="w-5 h-5 hover:text-white transition cursor-pointer" />
                            </div>
                        </div>

                        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-bold mb-3 text-white">Navigate</h4>
                                <ul>
                                    <li><a href="#benefits" onClick={(e) => scrollToSection(e, '#benefits')} className="hover:text-white">Benefits</a></li>
                                    <li><a href="#features" onClick={(e) => scrollToSection(e, '#features')} className="hover:text-white">Features</a></li>
                                    <li><a href="#pricing" onClick={(e) => scrollToSection(e, '#pricing')} className="hover:text-white">Pricing</a></li>
                                    <li><a href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className="hover:text-white">FAQ</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-3 text-white">Contact</h4>
                                <p className='flex items-center gap-2 mb-2'><Mail className='w-4 h-4 text-white/50'/> stampbayan@gmail.com</p>
                                <p className='flex items-center gap-2'><Phone className='w-4 h-4 text-white/50'/> +63 9266887267</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/50">
                        &copy; {new Date().getFullYear()} StampBayan. All rights reserved.
                    </div>
                </footer>
            </div>

      
        </>      
    );
}

