import { useState, useEffect } from 'react';
import { Phone, Mail, Menu, Award, Gift, Tag } from 'lucide-react';
import APP from '../../images/app.png';

export default function Welcome() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.querySelector('main');
            if (heroSection) {
                const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                setIsScrolled(window.scrollY > heroBottom - 100);
            }

            // Detect active section
            const sections = ['benefits', 'how-it-works', 'pricing'];
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

    return (
        <div className="min-h-screen relative overflow-hidden bg-primary">
            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 lg:px-8 xl:px-12 lg:py-6 transition-all duration-300 ${
                isScrolled ? 'bg-primary shadow-lg' : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">STAMP</span>
                        <span className="text-xs sm:text-sm px-2 py-1 sm:px-3 rounded-full font-semibold" style={{ backgroundColor: '#F4B942', color: '#333333' }}>BAYAN</span>
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
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition cursor-pointer">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition">
                            <Mail className="w-5 h-5 text-white" />
                        </button>
                    </div>

                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 px-4 sm:px-4 py-8 sm:py-12 lg:py-16 xl:py-20 pt-24 md:mt-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-5xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8 px-4">
                            Create a modern loyalty program for your customers
                        </h1>
                        
                        <p className="text-white/80 text-sm sm:text-base lg:text-lg mb-8 sm:mb-12 lg:mb-16 px-4 max-w-3xl mx-auto">
                            We offer three options for the loyalty program:<br className="hidden sm:block" />
                            <span className="sm:hidden"> </span>bonus, discount, combined
                        </p>

                        <button 
                            className="text-white font-semibold px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
                            style={{ backgroundColor: '#F4B942', color: '#333333' }}
                        >
                            Start Stamping
                        </button>
                    </div>
                </div>
            </main>

            {/* Benefits Section */}
            <section id="benefits" className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ color: '#333333' }}>
                            Keep Your Customers & Grow Together
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-4">
                            Say goodbye to paper stamps and hello to lasting relationships. Reward loyalty, build trust, and watch your business thrive.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {/* Benefit 1 */}
                        <div className="group p-6 lg:p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-xl">
                            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942' }}>
                                <Award className="w-7 h-7 lg:w-8 lg:h-8" style={{ color: '#333333' }} />
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: '#333333' }}>
                                Strengthen Relationships
                            </h3>
                            <p className="text-gray-600 text-sm lg:text-base">
                                Build lasting connections with your customers through personalized rewards and recognition.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="group p-6 lg:p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-xl">
                            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942' }}>
                                <Tag className="w-7 h-7 lg:w-8 lg:h-8" style={{ color: '#333333' }} />
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: '#333333' }}>
                                Amazing Discounts
                            </h3>
                            <p className="text-gray-600 text-sm lg:text-base">
                                Offer irresistible deals that keep customers coming back for more value.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="group p-6 lg:p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-xl">
                            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942' }}>
                                <Gift className="w-7 h-7 lg:w-8 lg:h-8" style={{ color: '#333333' }} />
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: '#333333' }}>
                                Free Rewards
                            </h3>
                            <p className="text-gray-600 text-sm lg:text-base">
                                Delight loyal customers with complimentary products and services they'll love.
                            </p>
                        </div>

                        {/* Benefit 4 */}
                        <div className="group p-6 lg:p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-xl">
                            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942' }}>
                                <svg className="w-7 h-7 lg:w-8 lg:h-8" style={{ color: '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 4 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: '#333333' }}>
                                Word of Mouth
                            </h3>
                            <p className="text-gray-600 text-sm lg:text-base">
                                Turn satisfied customers into brand ambassadors who spread the word to friends and family.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 lg:py-28" style={{ backgroundColor: '#f8f9fa' }}>
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
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-bold text-xl sm:text-2xl transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942', color: '#333333' }}>
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
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-bold text-xl sm:text-2xl transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942', color: '#333333' }}>
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
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-bold text-xl sm:text-2xl transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#F4B942', color: '#333333' }}>
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
                                <button 
                                    className="w-full sm:w-auto font-semibold px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
                                    style={{ backgroundColor: '#F4B942', color: '#333333' }}
                                >
                                    Get Started Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="relative z-10 px-4 sm:px-6 py-16 sm:py-20 lg:py-28 bg-white">
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

                            <button className="w-full py-3.5 rounded-full font-semibold text-base lg:text-lg transition-all duration-300 hover:scale-105 border-2 hover:shadow-lg" style={{ borderColor: '#333333', color: '#333333', backgroundColor: 'transparent' }}>
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
                                    <span className="text-4xl lg:text-5xl font-bold text-white">₱199</span>
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

                            <button className="w-full py-3.5 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ backgroundColor: '#F4B942', color: '#333333' }}>
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

            {/* Footer */}
            <footer className="relative z-10 px-4 sm:px-6 py-6 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} Stamp Bayan. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>         
    );
}