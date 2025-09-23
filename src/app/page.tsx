"use client";

import { useState, useEffect } from "react";

export default function WeddingPage() {
  const [showRsvpForm, setShowRsvpForm] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "",
    guests: "1",
    dietary: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Wedding date - December 14, 2025, 11:00 AM
  const weddingDate = new Date('2025-12-14T11:00:00').getTime();

  // Gallery images
  const galleryImages = [
    {
      src: "https://ext.same-assets.com/1150350535/8293315.jpeg",
      alt: "Golf and Mo engagement photo",
      caption: "Our engagement in the gardens"
    },
    {
      src: "https://ext.same-assets.com/1150350535/100577191.jpeg",
      alt: "Romantic rose photo",
      caption: "Love blooms like roses"
    },
    {
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop",
      alt: "Wedding preparation",
      caption: "Getting ready for our special day"
    },
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      alt: "Sofitel Sukhumvit Bangkok",
      caption: "3rd floor & 11th floor"
    }
  ];


  //Transparent to color navagation
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  // Close the menu if window is resized to desktop
  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setMobileOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // (Optional) lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);
  
  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.attendance) {
      errors.attendance = "Please let us know if you'll be attending";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("RSVP submitted:", formData);
      alert("Thank you for your RSVP! We'll be in touch soon.");
      setShowRsvpForm(false);
      setFormData({
        name: "",
        email: "",
        attendance: "",
        guests: "1",
        dietary: "",
        message: ""
      });
      setFormErrors({});
      setIsSubmitting(false);
    }, 1500);
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Add scroll animations on mount
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          scrolled
            ? "bg-[#b8bfaf]/85 backdrop-blur-md border-b border-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Top bar */}
          <div className="relative flex items-center justify-center h-14">
            {/* Brand – mobile only (hidden on md+) */}
            <div className="md:hidden text-white/95 tracking-widest text-sm">
              {/* You can remove this div entirely if you want no brand at all */}
            </div>

            {/* Desktop links */}
            <div className="hidden md:flex justify-center gap-8">
              {[
                ["Home", "hero"],
                ["Countdown", "countdown"],
                ["Our Story", "story"],
                ["Program", "program"],
                ["Gallery", "gallery"],
                ["Location", "location"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => handleNav(id)}
                  className="text-white hover:text-stone-800 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Hamburger – mobile only, absolute bars (no wrapping) */}
            <button
              className="md:hidden relative w-10 h-10 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span
                className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 -translate-y-2 bg-white transition-transform ${
                  mobileOpen ? "rotate-45 translate-y-0" : ""
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 bg-white transition-opacity ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 translate-y-2 bg-white transition-transform ${
                  mobileOpen ? "-rotate-45 translate-y-0" : ""
                }`}
              />
            </button>
          </div>

          {/* Mobile dropdown */}
          <div
            className={`md:hidden absolute left-0 right-0 origin-top ${
              mobileOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
            } transition-all duration-200`}
          >
            <div className="mx-2 mb-2 rounded-xl shadow-lg overflow-hidden bg-[#b8bfaf]/95 backdrop-blur-md border border-black/10">
              {[
                ["Home", "hero"],
                ["Countdown", "countdown"],
                ["Our Story", "story"],
                ["Program", "program"],
                ["Gallery", "gallery"],
                ["Location", "location"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => handleNav(id)}
                  className="w-full text-left px-5 py-3 text-stone-900 hover:bg-white/40 border-b border-black/10 last:border-b-0"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tap-to-close overlay */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/Hero.jpg')`,
          backgroundPosition: "50% 80%"
        }}
      >
        <div className="text-center text-white/80 z-10 animate-fade-in">
          <h1 className="hero-title text-5xl md:text-6xl mb-3">
            Krisadaporn <span className="text-5xl md:text-7xl">&</span> Pongtarin
          </h1>
          <h2 className="hero-subtitle text-xl md:text-3xl font-extralight tracking-widest mb-8 uppercase">
            Are Getting Married
          </h2>

          <button
            className="bg-transparent border border-white/80 text-white hover:bg-white hover:text-black px-8 py-3 text-lg font-light font-mono tracking-widest uppercase transition-all duration-300 transform hover:scale-105"
            onClick={() => setShowRsvpForm(!showRsvpForm)}
          >
            RSVP Here
          </button>
        </div>

        {/* Desktop: left + right labels */}
        <div className="hidden md:block absolute bottom-8 left-8 text-white animate-fade-in-left">
          <p className="text-lg font-mono">DECEMBER 14, 2025, 11:00 AM</p>
        </div>
        <div className="hidden md:block absolute bottom-8 right-8 text-white animate-fade-in-right">
          <p className="text-lg font-mono">SOFITEL BANGKOK SUKHUMVIT</p>
        </div>

        {/* Mobile: stack two centered lines above the arrow */}
        <div className="md:hidden absolute inset-x-0 bottom-12 px-4 text-white text-center space-y-1">
          <p className="text-xs font-mono font-light tracking-normal">
            DECEMBER 14, 2025, 11:00 AM
          </p>
          <p className="text-xs font-mono font-light tracking-normal">
            SOFITEL BANGKOK SUKHUMVIT
          </p>
        </div>

        {/* Scroll indicator (unchanged, just a bit lower) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('countdown')}
            className="text-white text-1xl"
          >
            ↓
          </button>
        </div>
      </section>

      {/* Countdown Section */}
      <section id="countdown" className="py-16 px-8 bg-[#b8bfaf] animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-heading text-3xl text-center mb-4 uppercase">Until We Say "I Do"</h2>
          <p className="text-lg text-[#5c645a] mb-4">DECEMBER 14, 2025, 11:00 AM</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-2xl mx-auto">
            <div className="p-4 transform hover:scale-105 transition-all">
              <div className="text-4xl md:text-5xl font-quat font-light text-[#5c645a] mb-2">{timeLeft.days}</div>
              <div className="text-[#5c645a] uppercase tracking-wide text-sm">Days</div>
            </div>

            <div className="p-4 transform hover:scale-105 transition-all">
              <div className="text-4xl md:text-5xl font-quat font-light text-[#5c645a] mb-2">{timeLeft.hours}</div>
              <div className="text-[#5c645a] uppercase tracking-wide text-sm">Hours</div>
            </div>

            <div className="p-4 transform hover:scale-105 transition-all">
              <div className="text-4xl md:text-5xl font-quat font-light text-[#5c645a] mb-2">{timeLeft.minutes}</div>
              <div className="text-[#5c645a] uppercase tracking-wide text-sm">Minutes</div>
            </div>

            <div className="p-4 transform hover:scale-105 transition-all">
              <div className="text-4xl md:text-5xl font-quat font-light text-[#5c645a] mb-2">{timeLeft.seconds}</div>
              <div className="text-[#5c645a] uppercase tracking-wide text-sm">Seconds</div>
            </div>
          </div>

          <p className="text-[#5c645a] mt-5 text-lg">We can't wait to celebrate with you!</p>
        </div>
      </section>

      {/* Enhanced RSVP Form Modal */}
      {showRsvpForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 transform animate-scale-in">
            <h3 className="text-2xl font-serif text-center mb-6">RSVP for Mo & Golf</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full p-2 border rounded-md transition-colors ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300 focus:border-amber-500'
                  }`}
                  required
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full p-2 border rounded-md transition-colors ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300 focus:border-amber-500'
                  }`}
                  required
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Will you be attending? *</label>
                <select
                  value={formData.attendance}
                  onChange={(e) => handleInputChange('attendance', e.target.value)}
                  className={`w-full p-2 border rounded-md transition-colors ${
                    formErrors.attendance ? 'border-red-500' : 'border-gray-300 focus:border-amber-500'
                  }`}
                >
                  <option value="">Please select</option>
                  <option value="yes">Yes, I'll be there!</option>
                  <option value="no">Unfortunately, I can't make it</option>
                </select>
                {formErrors.attendance && <p className="text-red-500 text-sm mt-1">{formErrors.attendance}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Number of Guests</label>
                <select
                  value={formData.guests}
                  onChange={(e) => handleInputChange('guests', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 transition-colors"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Dietary Restrictions</label>
                <input
                  type="text"
                  value={formData.dietary}
                  onChange={(e) => handleInputChange('dietary', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 transition-colors"
                  placeholder="Any allergies or dietary needs?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message for the Couple</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md h-20 focus:border-amber-500 transition-colors"
                  placeholder="Share your excitement or wishes!"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-amber-800 text-white hover:bg-amber-900'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowRsvpForm(false)}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Our Story Section (reference layout) */}
      <section id="story" className="py-24 px-8 bg-[#E7EFE3] animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          {/* Row: Left heading – Image – Right heading */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
            {/* Left title (1st on mobile, 1st on desktop) */}
            <h2 className="order-1 md:order-1 text-center md:text-right font-heading uppercase tracking-tight text-4xl md:text-4xl leading-tight text-[#5c645a]">
              OUR LOVE STORY
            </h2>

            {/* Image (3rd on mobile, 2nd on desktop) */}
            <div className="order-3 md:order-2 justify-self-center">
              <img
                src="/our-story.jpg"
                alt="Golf & Mo"
                className="w-[300px] md:w-[420px] aspect-[3/4] object-cover"
              />
            </div>

            {/* Right title (2nd on mobile, 3rd on desktop) */}
            <h3 className="order-2 md:order-3 text-center md:text-left font-heading uppercase tracking-wide md:tracking-normal text-2xl md:text-4xl leading-tight md:text-[#5c645a] text-[#afc0ad]">
              Reading into Love
            </h3>
          </div>

            {/* Paragraph under everything */}
            <p className="mt-12 max-w-3xl mx-auto text-center text-stone-900/90 font-mono font-light text-base leading-7">
              Write a paragraph that tells your story as a couple. You can include details like how you met,
              your journey together, and what makes your relationship unique. This is your chance to share
              your personality and connect with your guests.
            </p>
        </div>
      </section>

      <section
        id="divider"
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/divider1.jpg')`,
          backgroundPosition: "75% 45%"
        }}
      >
      </section>

      <section id="program" className="py-24 px-8 bg-[#E7EFE3]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Left: PROGRAM */}
          <div>
            <h2 className="font-heading text-[#5c645a] text-4xl md:text-5xl tracking-tight mb-10">
              PROGRAM
            </h2>
            <ul className="mt-6">
              {[
                { time: "11:00 AM", title: "Guests Arrive & Reception Opens" },
                { time: "12:30 PM", title: "Here Come the Bride & Groom!" },
                { time: "1:00 PM", title: "Warm Wishes & Toasts for the Couple" },
                { time: "1:15 PM", title: "Group Photos & Happy Memories" },
                { time: "1:30 PM", title: "Enjoy celebration!" },
              ].map((item, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[110px_1fr] items-center gap-8 py-6 border-b border-stone-500/60 border-dotted"
                >
                  <span className="font-mono font-light text-[#5c645a]">{item.time}</span>
                  <span className="font-mono font-light text-[#5c645a]">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: RECEPTION */}
          <div>
            <h2 className="font-heading text-[#5c645a] text-4xl md:text-5xl tracking-tight mb-10">
              RECEPTION
            </h2>

            <div className="space-y-10">
              <div>
                <h3 className="font-heading text-xl text-[#5c645a] mb-2">Reception Venue</h3>
                <p className="font-mono font-light leading-7 text-stone-900/90">
                  Our reception will take place in
                  {" "} <strong className="font-mono font-semibold text-stone-900">
                  The LE GRAND BALLROOM, 7th Floor </strong> {" "}
                   — designed with an indoor garden atmosphere. Soft greenery, gentle lighting, and natural accents create a warm and welcoming garden-like setting within the ballroom.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl text-[#5c645a] mb-2">Dress Code</h3>

                {/* Color palette */}
                <div
                  className="mt-3 flex flex-wrap items-center gap-3"
                  role="list"
                  aria-label="Dress code color palette"
                >
                  {["#D7BCB5", "#C79989", "#B49576", "#F1EAD8", "#ABB38E", "#627055"].map(
                    (hex) => (
                      <span
                        key={hex}
                        role="listitem"
                        title={hex}
                        aria-label={hex}
                        className="h-6 w-6 rounded-full ring-1 ring-black/15 shadow-sm"
                        style={{ backgroundColor: hex }}
                      />
                    )
                  )}
                </div>

                <p className="mt-4 font-mono font-light leading-7 text-stone-900/90">
                  In keeping with the indoor garden setting, we kindly request guests 
                  to dress in soft pastels and natural tones. These colors will enhance 
                  the atmosphere and create a graceful harmony throughout the celebration.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl text-[#5c645a] mb-2">Parking & Directions</h3>
                <p className="font-mono font-light leading-7 text-stone-900/90">
                  Free parking is available on-site, with designated areas for PWDs and senior
                  guests. If you need special assistance or a drop-off closer to the garden
                  entrance, let us know.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Gallery Section */}
      <section id="gallery" className="py-16 px-8 bg-[#b8bfaf] animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-heading text-5xl uppercase md:text-5x1 text-center mb-12">Our Gallery</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  setSelectedImage(index);
                  setShowGallery(true);
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-2xl opacity-0 hover:opacity-100 transition-opacity">+</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 animate-fade-in">
          <div className="max-w-4xl max-h-4xl mx-4">
            <div className="relative">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4 text-lg">
                {galleryImages[selectedImage].caption}
              </p>

              {/* Navigation */}
              <button
                onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : galleryImages.length - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-amber-300 transition-colors"
              >
                ‹
              </button>
              <button
                onClick={() => setSelectedImage(prev => prev < galleryImages.length - 1 ? prev + 1 : 0)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-amber-300 transition-colors"
              >
                ›
              </button>

              {/* Close button */}
              <button
                onClick={() => setShowGallery(false)}
                className="absolute top-4 right-4 text-white text-2xl hover:text-amber-300 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location & Directions Section */}
      <section id="location" className="py-16 px-8 bg-[#E7EFE3] animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-[#5c645a] text-4xl md:text-5xl uppercase text-center tracking-tight mb-12">Location & Directions</h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Venue Information */}
            <div>
              <h3 className="text-3xl font-mono mb-6 text-stone-800">Sofitel Sukhumvit Bangkok</h3>
              <div className="space-y-4 text-stone-600">
                <div className="flex items-start gap-3">
                  <span className="text-amber-600 text-xl">📍</span>
                  <div>
                    <p className="font-mono">Address:</p>
                    <p>189 Sukhumvit Road Soi 13-15,
                      Klongtoey Nua, Wattana
                      <br />10110 BANGKOK, Thailand</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-amber-600 text-xl">🚗</span>
                  <div>
                    <p className="font-mono">Parking:</p>
                    <p>Free on-site indoor parking available.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-amber-600 text-xl">🚌</span>
                  <div>
                    <p className="font-mono">Public Transport:</p>
                    <p>BTS Sukhumvit Line - Nana Station (5-minute walk)
                      <br />Multiple bus routes available</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-amber-600 text-xl">✈️</span>
                  <div>
                    <p className="font-mono">From Airport:</p>
                    <p>45-min drive from Suvarnabhumi Airport, 
                      <br />or taking Airport Link (ARL) to Phaya Thai Station. 
                       Transfer to BTS Sukhumvit Line to Nana Station.
                      </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <button
                  onClick={() => window.open('https://maps.app.goo.gl/8eGEKEtQDyb2FqRJA', '_blank')}
                  className="w-full bg-[#b8bfaf] text-white px-6 py-3 rounded-lg hover:bg-[#6F7369] transition-colors"
                >
                  🗺️ Open in Google Maps
                </button>

              </div>
            </div>

            {/* Interactive Map */}
            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.6537440124985!2d100.55514561239282!3d13.739401186595504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee677aa7f5b%3A0x98f7b56cc80c88cc!2sSofitel%20Bangkok%20Sukhumvit!5e0!3m2!1sen!2sth!4v1757950539162!5m2!1sen!2sth"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Location"
              ></iframe>
            </div>
          </div>

          <div className="mt-12 bg-amber-50 p-8 rounded-lg">
            <h4 className="text-2xl font-medium mb-4 text-stone-800 text-center">Travel Tips</h4>
            <div className="grid md:grid-cols-3 gap-6 text-stone-600">
              <div className="text-center">
                <span className="text-2xl mb-2 block">🕕</span>
                <p className="font-medium">Arrive Early</p>
                <p className="text-sm">We recommend arriving 15-30 minutes before the ceremony for photos and seating.</p>
              </div>

              <div className="text-center">
                <span className="text-2xl mb-2 block">👗</span>
                <p className="font-medium">Garden Setting</p>
                <p className="text-sm">The venue has grass areas, so consider comfortable shoes and garden party attire.</p>
              </div>

              <div className="text-center">
                <span className="text-2xl mb-2 block">📱</span>
                <p className="font-medium">Need Help?</p>
                <p className="text-sm">Call hotel at (+66) 2-126-9999 if you need directions or assistance finding the venue.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Registry Section */}
      <section className="py-16 px-8 bg-white animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-stone-600 leading-relaxed mb-8">
            Your presence is truly the best gift we could ask for.
          </p>
          <p className="text-stone-600 leading-relaxed">
            But if you feel called to give a little something, we've put together a small registry with some of our
            most wished-for items at Sining Spaces. Scan the QR on this page or send an email to hello@reallygreatsite.com
            with the Registry No. 12345 as the subject line for our updated gift list.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 px-8 bg-stone-800 text-white animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif italic mb-8">Our Appreciation</h2>
          <div className="space-y-4">
            <p className="text-xl hover:text-amber-300 transition-colors cursor-pointer">from Mo & Golf</p>
          </div>
        </div>
      </section>
    </div>
  );
}
