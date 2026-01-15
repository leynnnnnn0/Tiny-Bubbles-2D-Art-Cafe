import first from '../../../public/images/1.jpg';
import CoffeeArt from '../../../public/images/coffee-art-2d.png';
import StepArt from '../../../public/images/loyalty-steps.png';
import MainLogo from '../../../public/images/mainLogo.png';
import {Head} from '@inertiajs/react';
import third from '../../../public/images/3.jpg';

import fourth from '../../../public/images/4.jpg';

import fifth from '../../../public/images/5.jpg';

import sixth from '../../../public/images/6.jpg';

import seventh from '../../../public/images/7.jpg';

import { router } from '@inertiajs/react';
import eight from '../../../public/images/8.jpg';
import menu1 from "../../../public/images/menu1.jpg";
import menu2 from '../../../public/images/menu2.jpg';
import menu3 from '../../../public/images/menu3.jpg';
import menu4 from '../../../public/images/menu4.jpg';
import menu5 from '../../../public/images/menu5.jpg';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
export default function Welcome() {
    return (
        <>
            <Head>
                {/* Favicon Links */}
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="96x96"
                    href="/favicon-96x96.png"
                />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />

                {/* Primary Meta Tags */}
                <title>
                    Tiny Bubbles 2D Art Cafe - Coffee, Tea & Meals | Cagayan de
                    Oro's First 2D Cafe
                </title>
                <meta
                    name="title"
                    content="Tiny Bubbles 2D Art Cafe - Coffee, Tea & Meals | Cagayan de Oro"
                />
                <meta
                    name="description"
                    content="Experience the magic of Cagayan de Oro's first 2D art cafe! Tiny Bubbles offers specialty coffee, bubble tea, and delicious meals in a unique cartoon-style setting. Est. 2018. Open daily in CDO."
                />
                <meta
                    name="keywords"
                    content="2D cafe Cagayan de Oro, Tiny Bubbles Tea Room, coffee shop CDO, bubble tea Cagayan de Oro, aesthetic cafe Philippines, 2D art cafe, instagrammable cafe CDO, specialty coffee CDO, milk tea Cagayan de Oro, unique cafe Philippines"
                />

                {/* Canonical URL */}
                <link
                    rel="canonical"
                    href="https://tinybubbles2dartcafe.stampbayan.com"
                />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://tinybubbles2dartcafe.stampbayan.com"
                />
                <meta
                    property="og:title"
                    content="Tiny Bubbles 2D Art Cafe - The First 2D Cafe in Cagayan de Oro"
                />
                <meta
                    property="og:description"
                    content="Step into a cartoon world! Cagayan de Oro's first and only 2D art cafe serving specialty coffee, bubble tea, and delicious meals. Join our loyalty program and earn rewards with every visit."
                />
                <meta
                    property="og:image"
                    content="https://tinybubbles2dartcafe.stampbayan.com/images/og-image.jpg"
                />
                <meta
                    property="og:site_name"
                    content="Tiny Bubbles 2D Art Cafe"
                />
                <meta property="og:locale" content="en_PH" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:url"
                    content="https://tinybubbles2dartcafe.stampbayan.com"
                />
                <meta
                    name="twitter:title"
                    content="Tiny Bubbles 2D Art Cafe - CDO's First 2D Cafe"
                />
                <meta
                    name="twitter:description"
                    content="Experience Cagayan de Oro's first 2D art cafe! Specialty coffee, bubble tea & meals in a unique cartoon setting. Est. 2018."
                />
                <meta
                    name="twitter:image"
                    content="https://tinybubbles2dartcafe.stampbayan.com/images/twitter-image.jpg"
                />

                {/* Additional Meta Tags */}
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="7 days" />
                <meta name="author" content="Tiny Bubbles Tea Room" />
                <meta name="geo.region" content="PH-MSR" />
                <meta name="geo.placename" content="Cagayan de Oro City" />
                <meta name="geo.position" content="8.4542;124.6319" />
                <meta name="ICBM" content="8.4542, 124.6319" />

                {/* Structured Data - Local Business */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CafeOrCoffeeShop',
                        name: 'Tiny Bubbles 2D Art Cafe',
                        image: 'https://tinybubbles2dartcafe.stampbayan.com/images/cafe-photo.jpg',
                        url: 'https://tinybubbles2dartcafe.stampbayan.com',
                        telephone: '0954 399 4175',
                        priceRange: '₱100 - ₱300',
                        servesCuisine: ['Coffee', 'Tea', 'Asian Fusion'],
                        foundingDate: '2018',
                        address: {
                            '@type': 'PostalAddress',
                            streetAddress: 'Cagayan de Oro City!',
                            addressLocality: 'Cagayan de Oro City',
                            addressRegion: 'Misamis Oriental',
                            postalCode: '9000',
                            addressCountry: 'PH',
                        },
                        geo: {
                            '@type': 'GeoCoordinates',
                            latitude: 8.4542,
                            longitude: 124.6319,
                        },
                        openingHoursSpecification: [
                            {
                                '@type': 'OpeningHoursSpecification',
                                dayOfWeek: [
                                    'Monday',
                                    'Tuesday',
                                    'Wednesday',
                                    'Thursday',
                                    'Friday',
                                    'Saturday',
                                ],
                                opens: '10:00',
                                closes: '22:00',
                            },
                            {
                                '@type': 'OpeningHoursSpecification',
                                dayOfWeek: 'Sunday',
                                opens: '11:00',
                                closes: '21:00',
                            },
                        ],
                        sameAs: [
                            'https://www.facebook.com/tinybubblestearoom',
                            'https://www.instagram.com/tinybubblestearoom',
                        ],
                        acceptsReservations: 'False',
                        description:
                            'The first 2D art cafe in Cagayan de Oro City offering specialty coffee, bubble tea, and delicious meals in a unique cartoon-style atmosphere. Established in 2018.',
                    })}
                </script>

                {/* Structured Data - Organization */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Organization',
                        name: 'Tiny Bubbles Tea Room',
                        alternateName: 'Tiny Bubbles 2D Art Cafe',
                        url: 'https://tinybubbles2dartcafe.stampbayan.com',
                        logo: 'https://tinybubbles2dartcafe.stampbayan.com/images/logo.png',
                        foundingDate: '2018',
                        slogan: 'The 1st 2D spot in the heart of Cagayan de Oro City',
                        contactPoint: {
                            '@type': 'ContactPoint',
                            contactType: 'Customer Service',
                            availableLanguage: ['English', 'Filipino'],
                        },
                        sameAs: [
                            'https://www.facebook.com/tinybubblestearoom',
                            'https://www.instagram.com/tinybubblestearoom',
                        ],
                    })}
                </script>
            </Head>
            <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
                {/* Navigation */}
                <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-black/5 bg-white/80 p-6 backdrop-blur-md lg:px-20">
                    <img
                        src={MainLogo}
                        alt="Logo"
                        className="h-10 w-auto grayscale"
                    />
                    <div className="flex gap-4 text-xs font-bold tracking-widest uppercase md:gap-8">
                        <button
                            onClick={() => router.get('/customer/login')}
                            className="cursor-pointer rounded-full border border-black px-5 py-2 transition-colors hover:bg-black hover:text-white"
                        >
                            Login
                        </button>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12 px-6 py-16 lg:flex-row lg:py-24">
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        <h1 className="font-serif text-6xl leading-tight tracking-tighter md:text-8xl">
                            Brewed for <br />
                            <span className="font-light text-gray-400 italic underline decoration-black/10">
                                Loyalty.
                            </span>
                        </h1>
                        <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-600 lg:mx-0">
                            Every cup tells a story. Join our circle and turn
                            your daily ritual into rewards.
                        </p>
                        <button
                            onClick={() => router.get('/customer/login')}
                            className="cursor-pointer rounded-full bg-black px-12 py-4 font-bold text-white transition-all hover:shadow-xl active:scale-95"
                        >
                            Get Started
                        </button>
                    </div>
                    <div className="relative flex flex-1 items-center justify-center">
                        <div className="absolute -z-10 h-[300px] w-[300px] rounded-full bg-gray-50 md:h-[450px] md:w-[450px]" />
                        <img
                            src={CoffeeArt}
                            alt="2D Cafe Art"
                            className="h-auto w-full max-w-[400px] object-contain"
                        />
                    </div>
                </main>

                <section className="bg-white px-6 py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 font-serif text-5xl md:text-6xl">
                                Featured{' '}
                                <span className="text-gray-400 italic">
                                    Menu
                                </span>
                            </h2>
                            <p className="text-gray-500">
                                Handpicked favorites from our collection
                            </p>
                        </div>

                        <Carousel
                            opts={{
                                align: 'start',
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {[menu1, menu2, menu3, menu4, menu5].map(
                                    (img, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
                                        >
                                            <div className="group relative overflow-hidden rounded-2xl border border-black/5 bg-gray-50 p-1">
                                                <div className="aspect-[3/4] overflow-hidden rounded-xl">
                                                    <img
                                                        src={img}
                                                        alt={`Menu item ${index + 1}`}
                                                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                                                    />
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ),
                                )}
                            </CarouselContent>
                            <CarouselPrevious className="left-0 -translate-x-1/2 border-black/10 bg-white hover:bg-black hover:text-white" />
                            <CarouselNext className="right-0 translate-x-1/2 border-black/10 bg-white hover:bg-black hover:text-white" />
                        </Carousel>
                    </div>
                </section>

                {/* Section 2: How It Works - Improved Grid Layout */}
                <section className="bg-gray-50 px-6 py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 text-center">
                            <h2 className="font-serif text-5xl md:text-6xl">
                                Simple Steps. <br />
                                <span className="text-gray-400">
                                    Endless Perks for you.
                                </span>
                            </h2>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    step: '01',
                                    title: 'Scan QR',
                                    desc: 'Find our standee at the counter and scan with your phone.',
                                },
                                {
                                    step: '02',
                                    title: 'Register',
                                    desc: 'Create your profile in seconds to start tracking progress.',
                                },
                                {
                                    step: '03',
                                    title: 'Earn Stamps',
                                    desc: 'Collect stamps with every purchase and unlock free treats.',
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="group relative rounded-3xl border border-black/5 bg-white p-10 transition-all hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <span className="mb-6 block font-serif text-6xl text-gray-100 transition-colors group-hover:text-black/10">
                                        {item.step}
                                    </span>
                                    <h3 className="mb-3 text-xl font-bold tracking-tight uppercase">
                                        {item.title}
                                    </h3>
                                    <p className="leading-relaxed text-gray-500">
                                        {item.desc}
                                    </p>
                                    {/* Decorative Accent */}
                                    <div className="mt-6 h-1 w-12 bg-black/5 transition-all group-hover:w-20 group-hover:bg-black" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 3: The Gallery - Stylish Bento Grid */}
                <section className="px-6 py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 flex flex-col items-end justify-between gap-4 border-b border-black/5 pb-8 md:flex-row">
                            <h2 className="font-serif text-5xl italic">
                                The Community
                            </h2>
                            <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                                @tinybubblestearoom
                            </p>
                        </div>

                        {/* Stylish Asymmetric Grid (8 Images) */}
                        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4">
                            <div className="overflow-hidden rounded-sm bg-gray-100 md:col-span-2 md:row-span-2">
                                <img
                                    src={first}
                                    className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                    alt="1"
                                />
                            </div>
                            <div className="overflow-hidden rounded-sm bg-gray-100">
                                <img
                                    src={third}
                                    className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                    alt="2"
                                />
                            </div>
                            <div className="row-span-2 overflow-hidden rounded-sm bg-gray-100">
                                <img
                                    src={fourth}
                                    className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                    alt="3"
                                />
                            </div>
                            <div className="overflow-hidden rounded-sm bg-gray-100">
                                <img
                                    src={fifth}
                                    className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                    alt="4"
                                />
                            </div>
                            <div className="overflow-hidden rounded-sm bg-gray-100">
                                <img
                                    src={sixth}
                                    className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                    alt="5"
                                />
                            </div>
                            <div className="overflow-hidden rounded-sm bg-gray-100 md:col-span-2">
                                <img
                                    src={seventh}
                                    className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                    alt="6"
                                />
                            </div>
                            <div className="overflow-hidden rounded-sm bg-gray-100">
                                <img
                                    src={eight}
                                    className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                    alt="7"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="border-t border-black/5 py-12 text-center">
                    <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">
                        Est. 2026 — Tiny Bubbles 2D Art Cafe
                    </p>
                </footer>
            </div>
        </>
    );
}
