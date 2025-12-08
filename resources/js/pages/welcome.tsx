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
import CUSTOMERTHUMBNAIL from "../../images/customer thumbnail.jpeg";
import BUSINESSTHUMBANAIL from "../../images/business thumbnail.jpeg";

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
                {/* Primary Meta Tags */}
                <title>StampBayan - Digital Loyalty Card System for Philippine Businesses</title>
                <meta name="title" content="StampBayan - Digital Loyalty Card System for Philippine Businesses" />
                <meta name="description" content="Modern customer loyalty program for Filipino businesses. Say goodbye to paper punch cards. Free 1-month trial. Build customer relationships and boost repeat sales with QR code stamping." />
                <meta name="keywords" content="loyalty program Philippines, customer loyalty card, digital stamp card, Filipino business tools, punch card system, customer rewards Philippines, loyalty card app, business loyalty program, StampBayan" />
                
                {/* Canonical URL */}
                <link rel="canonical" href="https://www.stampbayan.com" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.stampbayan.com" />
                <meta property="og:title" content="StampBayan - Digital Loyalty Card System for Philippine Businesses" />
                <meta property="og:description" content="Modern customer loyalty program for Filipino businesses. Free 1-month trial. Build customer relationships and boost repeat sales." />
                <meta property="og:image" content="https://www.stampbayan.com/images/og-image.jpg" />
                <meta property="og:site_name" content="StampBayan" />
                <meta property="og:locale" content="en_PH" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://www.stampbayan.com" />
                <meta property="twitter:title" content="StampBayan - Digital Loyalty Card System" />
                <meta property="twitter:description" content="Modern customer loyalty program for Filipino businesses. Free 1-month trial." />
                <meta property="twitter:image" content="https://www.stampbayan.com/images/og-image.jpg" />

                {/* Additional SEO Tags */}
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="7 days" />
                <meta name="author" content="StampBayan" />
                
                {/* Geo Tags for Philippines */}
                <meta name="geo.region" content="PH" />
                <meta name="geo.placename" content="Philippines" />
            </Head>

            <div className="min-h-screen relative overflow-hidden bg-primary">
                {/* Header */}
                <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 lg:px-8 xl:px-12 lg:py-6 transition-all duration-300 ${
                    isScrolled ? 'bg-primary shadow-lg' : 'bg-transparent'
                }`}>
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <img src={LOGO} alt="StampBayan - Digital Loyalty Card System Logo" className='sm:h-10 sm:w-32 h-8 w-24'/>
                        </div>

                        <nav className={`hidden lg:flex items-center gap-4 xl:gap-8 transition-all duration-300 ${
                            isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                        }`}>
                            <a 
                                href="#benefits" 
                                onClick={(e) => scrollToSection(e, '#benefits')}
                                className={`text-sm font-medium transition-all px-4 xl:px-5 py-2 whitespace-nowrap relative ${
                                    activeSection === 'benefits' 
                                        ? 'text-white' 
                                        : 'text-white/90 hover:text-white'
                                }`}
                            >
                                BENEFITS
                                {activeSection === 'benefits' && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>
                                )}
                            </a>
                            <a 
                                href="#features" 
                                onClick={(e) => scrollToSection(e, '#features')}
                                className={`text-sm font-medium transition-all px-4 xl:px-5 py-2 whitespace-nowrap relative ${
                                    activeSection === 'features' 
                                        ? 'text-white' 
                                        : 'text-white/90 hover:text-white'
                                }`}
                            >
                                FEATURES
                                {activeSection === 'features' && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>
                                )}
                            </a>
                            <a 
                                href="#how-it-works" 
                                onClick={(e) => scrollToSection(e, '#how-it-works')}
                                className={`text-sm font-medium transition-all px-4 xl:px-5 py-2 whitespace-nowrap relative ${
                                    activeSection === 'how-it-works' 
                                        ? 'text-white' 
                                        : 'text-white/90 hover:text-white'
                                }`}
                            >
                                HOW IT WORKS
                                {activeSection === 'how-it-works' && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>
                                )}
                            </a>
                            <a 
                                href="#pricing" 
                                onClick={(e) => scrollToSection(e, '#pricing')}
                                className={`text-sm font-medium transition-all px-4 xl:px-5 py-2 whitespace-nowrap relative ${
                                    activeSection === 'pricing' 
                                        ? 'text-white' 
                                        : 'text-white/90 hover:text-white'
                                }`}
                            >
                                PRICING
                                {activeSection === 'pricing' && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>
                                )}
                            </a>
                            <a 
                                href="#faq" 
                                onClick={(e) => scrollToSection(e, '#faq')}
                                className={`text-sm font-medium transition-all px-4 xl:px-5 py-2 whitespace-nowrap relative ${
                                    activeSection === 'faq' 
                                        ? 'text-white' 
                                        : 'text-white/90 hover:text-white'
                                }`}
                            >
                                FAQ
                                {activeSection === 'faq' && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></span>
                                )}
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
                                        <button 
                                            onClick={() => handleLoginChoice('business')}
                                            className="group relative p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg"
                                        >
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
                                        
                                        <button 
                                            onClick={() => handleLoginChoice('customer')}
                                            className="group relative p-6 rounded-xl border-2 border-gray-200 hover:border-green-500 transition-all duration-300 hover:shadow-lg"
                                        >
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
                    {/* H1 is crucial for SEO - only one per page */}
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-2 px-4">
                        Stop Losing Customers to Competitors
                    </h1>
                    
                    <p className="text-white/80 text-xs sm:text-base lg:text-lg mb-8 sm:mb-12 px-4 max-w-3xl mx-auto">
                        Turn one-time buyers into loyal regulars with a digital loyalty program that actually works. No more lost punch cards. No more forgotten rewards.
                    </p>

                    {/* Key Benefits List */}
                    <div className="flex justify-center gap-4 sm:gap-8 mb-8 sm:mb-10 mx-auto text-white/90 flex-wrap">
                        <p className="text-xs sm:text-base flex flex-col">
                             <strong>✓ FREE for 30 days</strong>
                             <span className='text-[10px] sm:text-xs'>See results before paying anything</span>
                        </p>
                        <p className="text-xs sm:text-base flex flex-col">
                            <strong>✓ Set up in 5 minutes</strong>
                              <span className='text-[10px] sm:text-xs'>Print QR code, start today</span>
                        </p>
                        <p className="text-xs sm:text-base flex flex-col">
                            <strong>✓ ₱99/month after trial</strong>
                              <span className='text-[10px] sm:text-xs'>Less than ₱4 per day</span>
                        </p>
                    </div>
                    <button 
                        onClick={() => setLoginDialogOpen(true)}
                        className="text-primary cursor-pointer font-semibold px-5 sm:px-10 lg:px-12 py-2 sm:py-4 rounded-full sm:text-lg md:text-base text-xs transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg bg-white"
                    >
                        <div className="flex flex-col items-center justify-between">
                            Start Your FREE 30 Days
                            <span className="sm:text-xs text-[8px]">No Credit Card Required</span>
                        </div>
                    </button>

                    {/* Trust Indicators */}
                    <div className="text-white/70 text-xs sm:text-sm mt-6">
                        ✓ Cancel anytime  •  ✓ No setup fees  •  ✓ 24/7 support
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
            {/* Stats Cards */}
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
                <p className="text-black/60 text-xs">
                    Studies show loyal customers spend significantly more than new ones
                </p>
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
                <p className="text-black/60 text-xs">
                    Customers with loyalty cards visit 5 times more often
                </p>
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
                <p className="text-black/60 text-xs">
                    Just 5% increase in retention can boost profits dramatically
                </p>
            </div>
        </div>
    </div>
</section>



        {/* Video Demo Section */}
        <section className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#f8f9fa] to-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
                        See It In Action
                    </h2>
                    <p className="text-black/90 text-base sm:text-lg max-w-2xl mx-auto">
                        Watch how easy it is for both businesses and customers
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {/* Business POV Video */}
                    <div className="group">
                        <div className="bg-white rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="relative bg-white rounded-xl mb-4 overflow-hidden mx-auto" style={{ maxWidth: '400px' }}>
                                {/* Phone aspect ratio container - 9:16 for vertical videos */}
                                <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <Play className="w-16 h-16 text-white/80 mx-auto mb-3" />
                                            <p className="text-white/60 text-sm">Business Demo Video</p>
                                        </div>
                                    </div>
                               
                                    <video 
                                        className="absolute inset-0 w-full h-full object-contain"
                                        controls
                                        poster={BUSINESSTHUMBANAIL}
                                    >
                                        <source src={BUSINESSPOV} type="video/mp4" />
                                    </video>
                                   
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Business View</h3>
                            <p className="text-gray-600 text-sm text-center">
                                See how simple it is to manage your loyalty program and track customer activity
                            </p>
                        </div>
                    </div>

                    {/* Customer POV Video */}
                    <div className="group">
                        <div className="bg-white rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="relative bg-white rounded-xl mb-4 overflow-hidden mx-auto" style={{ maxWidth: '400px' }}>
                                {/* Phone aspect ratio container - 9:16 for vertical videos */}
                                <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <Play className="w-16 h-16 text-white/80 mx-auto mb-3" />
                                            <p className="text-white/60 text-sm">Customer Demo Video</p>
                                        </div>
                                    </div>
                                
                                    <video 
                                        className="absolute inset-0 w-full h-full object-contain"
                                        controls
                                        poster={CUSTOMERTHUMBNAIL}
                                    >
                                        <source src={CUSTOMERPOV} type="video/mp4" />
                                    </video>
                                   
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Customer Experience</h3>
                            <p className="text-gray-600 text-sm text-center">
                                Watch how customers scan, collect stamps, and redeem rewards in seconds
                            </p>
                        </div>
                    </div>
                </div>

                {/* Key Benefits Bar */}
                <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-white">
                                <p className="font-bold text-lg">Very Easy to Use</p>
                                <p className="text-white/80 text-sm">Set up in minutes, not hours</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-white">
                                <p className="font-bold text-lg">No App Download</p>
                                <p className="text-white/80 text-sm">Works in any browser instantly</p>
                            </div>
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

            {/* Pricing Section */}
            <section id="pricing" className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ color: '#333333' }}>
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-4">
                            Choose the plan that works best for your business
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                        {/* Free Tier */}
                        <div className="group relative p-8 lg:p-10 rounded-3xl bg-white border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
                            <div className="absolute top-8 right-8">
                                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#f0f0f0', color: '#666' }}>
                                    NEW USERS
                                </span>
                            </div>
                            
                            <div className="mb-8">
                                <h3 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#333333' }}>
                                    Free Trial
                                </h3>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-4xl lg:text-5xl font-bold" style={{ color: '#333333' }}>₱0</span>
                                    <span className="text-gray-500 text-lg">/month</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Valid for 1 month • Perfect for testing
                                </p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#F4B942' }}>
                                        <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 text-sm lg:text-base">Unlimited customer accounts</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#F4B942' }}>
                                        <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 text-sm lg:text-base">24/7 support</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#F4B942' }}>
                                        <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 text-sm lg:text-base">Customizable cards</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#F4B942' }}>
                                        <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 text-sm lg:text-base">Customizable perks & discounts</span>
                                </div>
                            </div>

                            <button onClick={() => setLoginDialogOpen(true)} className="w-full py-3.5 rounded-full font-semibold text-base lg:text-lg transition-all duration-300 hover:scale-105 border-2 hover:shadow-lg" style={{ borderColor: '#333333', color: '#333333', backgroundColor: 'transparent' }}>
                                Start Free Trial
                            </button>
                        </div>

                        {/* Premium Tier */}
                        <div className="group relative p-8 lg:p-10 rounded-3xl transition-all duration-300 hover:shadow-2xl shadow-xl" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
                            <div className="absolute top-8 right-8">
                                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#F4B942', color: '#333333' }}>
                                    POPULAR
                                </span>
                            </div>
                            
                            <div className="mb-8">
                                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                    Premium
                                </h3>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-4xl lg:text-5xl font-bold text-white">₱99</span>
                                    <span className="text-white/80 text-lg">/month</span>
                                </div>
                                <p className="text-white/90 text-sm">
                                    Everything you need to grow your business
                                </p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#F4B942' }}>
                                        <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-white text-sm lg:text-base">Unlimited customer accounts</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#F4B942' }}>
                                        <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-white text-sm lg:text-base">24/7 support</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#F4B942' }}>
                                        <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-white text-sm lg:text-base">Customizable cards</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#F4B942' }}>
                                        <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-white text-sm lg:text-base">Customizable perks & discounts</span>
                                </div>
                            </div>

                            <button onClick={() => setLoginDialogOpen(true)} className="w-full py-3.5 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ backgroundColor: '#F4B942', color: '#333333' }}>
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="text-center mt-12 lg:mt-16">
                        <p className="text-gray-600 text-sm lg:text-base">
                            All plans include full access to features • No hidden fees
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
<section id="faq" className="relative z-10 px-4 sm:px-6  sm:py-12 lg:py-16 bg-white">
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

            <AccordionItem value="item-5" className="border-2 border-gray-100 rounded-2xl px-6 hover:border-primary transition-colors">
                <AccordionTrigger className="text-left text-lg sm:text-xl font-bold hover:no-underline py-6" style={{ color: '#333333' }}>
                    Do I need to pay?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base sm:text-lg pb-6 leading-relaxed">
                    We offer a 1-month free trial with full access to all features! During this trial, you'll see if this system is right for you, gauge your customers' interest, and discover if it helps your business earn and grow. After the trial, our Premium plan is just ₱99/month—an affordable investment in your business's future.
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

           {/* Footer */}
<footer className="relative z-10 px-4 sm:px-6 py-6 bg-white border-t border-gray-200">
    <div className="max-w-7xl mx-auto">
        {/* Social Media Links */}
        <div className="flex justify-center items-center gap-6 mb-4">
            {/* Facebook */}
            <a 
                href="https://www.facebook.com/profile.php?id=61584319949414" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
            >
                <Facebook className="w-6 h-6" />
            </a>

            {/* Instagram */}
            <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
            >
                <Instagram className="w-6 h-6" />
            </a>

            {/* TikTok - Using a custom SVG since Lucide doesn't have TikTok */}
            <a 
                href="https://www.tiktok.com/@stampbayan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="TikTok"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
            </a>

            {/* Email */}
            <a 
                href="mailto:stampbayan@gmail.com" 
                className="text-gray-600 hover:text-orange-600 transition-colors"
                aria-label="Email"
            >
                <Mail className="w-6 h-6" />
            </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
            <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} Stamp Bayan. All rights reserved.
            </p>
        </div>
    </div>
</footer>
        </div>   
        </>      
    );
}

