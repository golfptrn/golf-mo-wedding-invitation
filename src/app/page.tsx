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
    nickname: "",
    email: "",
    attendance: "",
    guests: "1",
    dietary: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lang, setLang] = useState<"en" | "th">("en");

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

  const copy = {
    en: {
      nav: { home: "Home", countdown: "Countdown", story: "Our Story", program: "Program", gallery: "Gallery", location: "Location"},
      hero: { subtitle: "Are Getting Married", rsvp: "RSVP Here", loc: "Sofitel Bangkok Sukhumvit", date: "DECEMBER 14, 2025, 11:00 AM" },
      rsvpForm: {heading: "RSVP for Our Wedding", 
        fullName: "Full Name", nickName: "Nickname", email: "Email Address (optional)", 
        attendQ: "Will you be attending?",
        attHolder: "Please select", attOption1: "Yes, I'll be there!", attOption2: "Unfortunately, I can't make it",
        guestQ: "Number of Guests",
        dietQ: "Dietary Restrictions", dietPlaceholder: "Any allergies or dietary needs?",
      },
      buttons: {
        submit: "Submit RSVP",
        submitting: "Submitting...",
        cancel: "Cancel"
      },
      countdown: {heading: `Until We Say "I Do"`, context: "We can't wait to celebrate with you!"},
      units: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
      story: {heading: "OUR LOVE STORY", hashtag: "#Reading Into Love", 
        context: "Reading was rain and library light. We were only classmates then—sharing notes, splitting late nights, learning each other’s pace. Months later, New Year’s Eve pulled us to London. Under Big Ben and a sky torn open by fireworks, we finally spoke without deadlines: life, old hopes, the brave idea of love. By midnight the city was a roar, and quietly, between us, something began."
      },
      program: {heading: "Program", 
        program1: "Reception Opens",
        program2: "Group Photos",
        program3: "Celebration: International Buffet Lunch (served at tables)",
        program4: "End of Celebration"
      },
      reception: {heading: "Reception", 
        subtitle1:"Reception Venue", 
        subtitle2:"Dress Code", 
        subtitle3:"Parking", 
        subContext1:"Reception will take place in", 
        subContext2:"The LE GRAND BALLROOM, 7th Floor", 
        subContext3:"Dress in soft pastels and natural tones for a harmony.", 
        subContext4:"Free parking is available on-site.", 
      },
      location: {heading: "Location & Directions",
        locName: "Sofitel Sukhumvit Bangkok",
        title1: "Address",
        context1: "189 Sukhumvit Road Soi 13-15,Klongtoey Nua, Wattana 10110 BANGKOK, Thailand",
        title2: "Public Transport",
        context2: "BTS Sukhumvit Line - Nana Station (5-minute walk)",
        title3: "From Airport",
        context3: "45-min drive from Suvarnabhumi Airport,",
        context4: "or taking Airport Link (ARL) to Phaya Thai Station. Transfer to BTS Sukhumvit Line to Nana Station.",
        button: "Open in Google Maps"
      },
      gallery: {heading: "Our Gallery", 


      },
      footer: {
        message: "Your presence is truly the best gift we could ask for.",
        from: "from Mo & Golf"
      }
    },
    th: {
      nav: { home: "หน้าแรก", countdown: "นับถอยหลัง", story: "เรื่องราวของเรา", program: "กำหนดการ", gallery: "แกลเลอรี", location: "สถานที่"},
      hero: { subtitle: "ขอเรียนเชิญร่วมงานแต่งของเรา", rsvp: "ตอบรับคำเชิญ", loc: "โรงแรมโซฟิเทล กรุงเทพ สุขุมวิท", date: "14 ธันวาคม 2567, 11:00 น." },
      rsvpForm: {heading: "ตอบรับคำเชิญเข้าร่วมงาน", 
        fullName: "ชื่อ-นามสกุล", nickName: "ชื่อเล่น", email: "อีเมล (ไม่ระบุได้)", 
        attendQ: "ประสงค์เข้าร่วมงานหรือไม่?",
        attHolder: "โปรดเลือก", attOption1: "เข้าร่วมงาน", attOption2: "ไม่สามารถเข้าร่วมงานได้",
        guestQ: "จำนวนผู้ร่วมงาน",
        dietQ: "ข้อจำกัดด้านอาหาร", dietPlaceholder: "มีอาการแพ้หรือข้อจำกัดด้านอาหารใดหรือไม่?",
      },
      buttons: {
        submit: "ส่งคำตอบรับ",
        submitting: "กำลังส่ง...",
        cancel: "ยกเลิก"
      },
      countdown: { heading: "นับถอยหลังสู่วันแต่งงาน", context: "แล้วพบกันในวันพิเศษของเรานะคะ/ครับ"},
      units: { days: "วัน", hours: "ชั่วโมง", minutes: "นาที", seconds: "วินาที" },
      story: {heading: "เรื่องราวความรักของเรา",  hashtag: "#Reading Into Love", 
        context: "ณ รีดิง เมืองฝนโปรยและแสงไฟห้องสมุด พวกเราเป็นแค่เพื่อนร่วมชั้น ใช้เวลาอ่านหนังสือ แบ่งปันความเห็น พลางเรียนรู้จังหวะของกันและกันเรื่อยมา จนกระทั่งค่ำคืนปีใหม่ได้นำพาเราไปที่ลอนดอน ใต้เข็มนาฬิกาบิ้กเบนและท้องฟ้ายามค่ำคืนที่สว่างสไวไปด้วยสีสันแห่งพลุ ทางเดินและบทสนทนาอันไร้ขอบเขต -เรื่องชีวิต ความหวัง รวมถึงความรัก- ได้กลายเป็นความทรงจำอันแสนวิเศษ เวลาล่วงมาถึงเที่ยงคืน ณ ลอนดอนที่ดังสนั่นนั้น เงียบๆระหว่างเรา...เรื่องราวได้เริ่มต้นขึ้น"
      },
      program: {heading: "กำหนดการ",
        program1: "เริ่มงานเลี้ยงต้อนรับ",
        program2: "ถ่ายภาพร่วมกัน",
        program3: "งานเลี้ยง: บุฟเฟ่ต์นานาชาติ (เสิร์ฟที่โต๊ะ)",
        program4: "ปิดงาน"
      },
      reception: {heading: "รายละเอียดงานเลี้ยงฉลอง", 
        subtitle1:"สถานที่จัดงาน", 
        subtitle2:"การแต่งกาย", 
        subtitle3:"ที่จอดรถ", 
        subContext1:"งานเลี้ยงจัดขึ้นที่", 
        subContext2:"ห้อง Le Grand Ballroom ชั้น 7", 
        subContext3:"แนะนำโทนพาสเทลอ่อนและเฉดธรรมชาติ เพื่อความกลมกลืนของงาน", 
        subContext4:"ที่จอดรถบริการฟรีภายในโรงแรม", 
      },
      location: {heading: "สถานที่ และเส้นทาง",
        locName: "โรงแรมโซฟิเทล สุขุมวิท กรุงเทพฯ",
        title1: "ที่อยู่",
        context1: "189 ถนนสุขุมวิท ซอย 13-15 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110 ประเทศไทย",
        title2: "ขนส่งสาธารณะ",
        context2: "รถไฟฟ้า BTS สายสุขุมวิท - สถานีนานา (เดินประมาณ 5 นาที)",
        title3: "จากสนามบิน",
        context3: "ขับรถประมาณ 45 นาทีจากท่าอากาศยานสุวรรณภูมิ",
        context4: "หรือโดยสารแอร์พอร์ต เรล ลิงก์ (ARL) ไปสถานีพญาไท แล้วต่อ BTS สายสุขุมวิทไปสถานีนานา",
        button: "เปิดใน Google Maps"
      },
      gallery: {heading: "แกลลอรี่", 


      },
      footer: {
        message: "ตั้งหน้าตั้งตารอที่ได้ฉลองร่วมกันกับทุกคนนะคะ/ครับ",
        from: "ด้วยรักจาก โม และ กอล์ฟ"
      }
    },
    } as const;

  const navItems = [
    { label: copy[lang].nav.home, id: "hero" },
    { label: copy[lang].nav.countdown, id: "countdown" },
    { label: copy[lang].nav.story, id: "story" },
    { label: copy[lang].nav.program, id: "program" },
    { label: copy[lang].nav.gallery, id: "gallery" },
    { label: copy[lang].nav.location, id: "location" }
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

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
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
    if (!validateForm()) return;

    setIsSubmitting(true);
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxuO_LxHGp8a6-Ki7yni5zWLDfUauxeEW4Z80_pO7oZP9sSGqqW5s_wjuk8LKoaFWPyMA/exec";

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // GAS doesn't send CORS headers; we don't read the response
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          nickname: formData.nickname,
          email: formData.email,
          attendance: formData.attendance,
          guests: formData.guests,
          dietary: formData.dietary
        }),
      });

      alert("Thank you for your RSVP! We’ve recorded your response.");
      setShowRsvpForm(false);
      setFormData({
        name: "",
        nickname: "",
        email: "",
        attendance: "",
        guests: "1",
        dietary: ""
      });
      setFormErrors({});
    } catch (err) {
      console.error(err);
      alert("Something went wrong sending your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
    <div className={`min-h-screen bg-white ${lang === "en" ? "font-en" : "font-th"}`}>
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
            <div className="md:hidden text-white/95 tracking-widest text-xs">
              <button onClick={() => setLang("en")} className={lang === "en" ? "underline" : "opacity-80"}>EN</button>
              <span className="opacity-60">|</span>
              <button onClick={() => setLang("th")} className={lang === "th" ? "underline" : "opacity-80"}>TH</button>
            </div>
            
            {/* Desktop links */}
            <div className="hidden md:flex justify-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="text-white hover:text-stone-800 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="hidden md:flex absolute right-0 inset-y-0 items-center pr-2">
              <div className="flex items-center gap-2 rounded-md bg-white/10 px-2 py-1">
                <button
                  onClick={() => setLang("en")}
                  className={`text-xs uppercase tracking-wide ${lang === "en" ? "text-black bg-white px-2 py-0.5 rounded" : "text-white/90"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("th")}
                  className={`text-xs uppercase tracking-wide ${lang === "th" ? "text-black bg-white px-2 py-0.5 rounded" : "text-white/90"}`}
                >
                  TH
                </button>
              </div>
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
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="w-full text-left px-5 py-3 text-stone-900 hover:bg-white/40 border-b border-black/10 last:border-b-0"
                >
                  {item.label}
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
          <h1 className={`hero-title text-5xl md:text-6xl mb-3`}>
            Krisadaporn <span className="text-5xl md:text-7xl">&</span> Pongtarin
          </h1>
          <h2 className={`hero-subtitle text-xl md:text-3xl font-extralight tracking-widest mb-8 uppercas ${lang === "en" ? "font-en" : "font-th"}`}> 
            {copy[lang].hero.subtitle}
          </h2>

          <button
            className="bg-transparent border border-white/80 text-white hover:bg-white hover:text-black px-8 py-3 text-lg font-light  tracking-widest uppercase transition-all duration-300 transform hover:scale-105"
            onClick={() => setShowRsvpForm(!showRsvpForm)}
          >
            {copy[lang].hero.rsvp}
          </button>
        </div>

        {/* Desktop: left + right labels */}
        <div className="hidden md:block absolute bottom-8 left-8 text-white animate-fade-in-left">
          <p className="text-lg ">{copy[lang].hero.date}</p>
        </div>
        <div className="hidden md:block absolute bottom-8 right-8 text-white animate-fade-in-right">
          <p className="text-lg ">{copy[lang].hero.loc}</p>
        </div>

        {/* Mobile: stack two centered lines above the arrow */}
        <div className="md:hidden absolute inset-x-0 bottom-12 px-4 text-white text-center space-y-1">
          <p className="text-xs  font-light tracking-normal">
            {copy[lang].hero.date}
          </p>
          <p className="text-xs  font-light tracking-normal">
            {copy[lang].hero.loc}
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
      <section id="countdown" className={`py-16 px-8 bg-[#b8bfaf] animate-on-scroll ${lang === "en" ? "font-en" : "font-th"}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`section-heading text-3xl text-center mb-4 uppercase ${lang === "en" ? "font-en" : "font-th"}`}>{copy[lang].countdown.heading}</h2>
          <p className="text-lg text-[#5c645a] mb-4">{copy[lang].hero.date}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-2xl mx-auto">
            <div className="p-4 transform hover:scale-105 transition-all">
              <div className="text-4xl md:text-5xl font-quat font-light text-[#5c645a] mb-2">{timeLeft.days}</div>
              <div className="text-[#5c645a] uppercase tracking-wide text-sm">{copy[lang].units.days}</div>
            </div>

            <div className="p-4 transform hover:scale-105 transition-all">
              <div className="text-4xl md:text-5xl font-quat font-light text-[#5c645a] mb-2">{timeLeft.hours}</div>
              <div className="text-[#5c645a] uppercase tracking-wide text-sm">{copy[lang].units.hours}</div>
            </div>

            <div className="p-4 transform hover:scale-105 transition-all">
              <div className="text-4xl md:text-5xl font-quat font-light text-[#5c645a] mb-2">{timeLeft.minutes}</div>
              <div className="text-[#5c645a] uppercase tracking-wide text-sm">{copy[lang].units.minutes}</div>
            </div>

            <div className="p-4 transform hover:scale-105 transition-all">
              <div className="text-4xl md:text-5xl font-quat font-light text-[#5c645a] mb-2">{timeLeft.seconds}</div>
              <div className="text-[#5c645a] uppercase tracking-wide text-sm">{copy[lang].units.seconds}</div>
            </div>
          </div>

          <p className="text-[#5c645a] mt-5 text-lg">{copy[lang].countdown.context}</p>
        </div>
      </section>

      {/* Enhanced RSVP Form Modal */}
      {showRsvpForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 transform animate-scale-in">
            <h3 className={`text-2xl  text-center mb-6 ${lang === "en" ? "font-en" : "font-th"}`}>{copy[lang].rsvpForm.heading}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">{copy[lang].rsvpForm.fullName} *</label>
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

                <div className="">
                  <label className="block text-sm font-medium mb-2">{copy[lang].rsvpForm.nickName}</label>
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 transition-colors
                              placeholder: placeholder:font-light placeholder:text-stone-500"
                    placeholder="(optional)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{copy[lang].rsvpForm.email}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full p-2 border rounded-md transition-colors ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300 focus:border-amber-500'
                  }`}
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{copy[lang].rsvpForm.attendQ} *</label>
                <select
                  value={formData.attendance}
                  onChange={(e) => handleInputChange('attendance', e.target.value)}
                  className={`w-full p-2 border rounded-md transition-colors ${
                    formErrors.attendance ? 'border-red-500' : 'border-gray-300 focus:border-amber-500'
                  }`}
                >
                  <option value="">{copy[lang].rsvpForm.attHolder}</option>
                  <option value="yes">{copy[lang].rsvpForm.attOption1}</option>
                  <option value="no">{copy[lang].rsvpForm.attOption2}</option>
                </select>
                {formErrors.attendance && <p className="text-red-500 text-sm mt-1">{formErrors.attendance}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{copy[lang].rsvpForm.guestQ}</label>
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
                <label className="block text-sm font-medium mb-2">{copy[lang].rsvpForm.dietQ}</label>
                <input
                  type="text"
                  value={formData.dietary}
                  onChange={(e) => handleInputChange('dietary', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-amber-500 transition-colors"
                  placeholder={copy[lang].rsvpForm.dietPlaceholder}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#5c645a] text-white hover:bg-[#9da79b]"
                  }`}
                  aria-label={isSubmitting ? copy[lang].buttons.submitting : copy[lang].buttons.submit}
                >
                  {isSubmitting ? copy[lang].buttons.submitting : copy[lang].buttons.submit}
                </button>

                <button
                  type="button"
                  onClick={() => setShowRsvpForm(false)}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors"
                  aria-label={copy[lang].buttons.cancel}
                >
                  {copy[lang].buttons.cancel}
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
            <h2 className={`order-1 md:order-1 text-center md:text-right font-heading uppercase tracking-tight text-4xl md:text-4xl leading-tight text-[#5c645a] ${lang === "en" ? "font-en" : "font-th"}`}>
              {copy[lang].story.heading}
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
            <h3 className="hidden md:block order-2 md:order-3 text-center md:text-left font-heading uppercase tracking-tight md:tracking-normal text-2xl md:text-4xl leading-tight md:text-[#5c645a] text-[#afc0ad]">
              {copy[lang].story.hashtag}
            </h3>
          </div>

            {/* Paragraph under everything */}
            <p className={`mt-12 max-w-3xl mx-auto text-center text-stone-900/90  font-light text-base leading-7 ${lang === "en" ? "font-en" : "font-th"}`}>
              {copy[lang].story.context}
            </p>
        </div>
      </section>

      <section
        id="divider"
        className="relative h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/divider1.jpg')`,
          backgroundPosition: "75% 40%"
        }}
      >
      </section>

      <section id="program" className="py-24 px-8 bg-[#E7EFE3]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Left: PROGRAM */}
          <div>
            <h2 className={`font-heading text-[#5c645a] uppercase text-4xl md:text-5xl tracking-tight mb-10 ${lang === "en" ? "font-en" : "font-th"}`}>
              {copy[lang].program.heading}
            </h2>
            <ul className="mt-6">
              {[
                { time: "10:30 AM", title: copy[lang].program.program1 },
                { time: "11:30 AM", title: copy[lang].program.program2 },
                { time: "12:20 PM", title: copy[lang].program.program3 },
                { time: "2:00 PM", title: copy[lang].program.program4 }
              ].map((item, i) => (
                <li
                  key={i}
                  className={`grid grid-cols-[110px_1fr] items-center gap-8 py-6 border-b border-stone-500/60 border-dotted ${lang === "en" ? "font-en" : "font-th"}`}
                >
                  <span className=" font-light text-[#5c645a]">{item.time}</span>
                  <span className=" font-light text-[#5c645a]">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: RECEPTION */}
          <div>
            <h2 className={`font-heading text-[#5c645a] uppercase text-4xl md:text-5xl tracking-tight mb-10 ${lang === "en" ? "font-en" : "font-th"}`}>
              {copy[lang].reception.subtitle1}
            </h2>

            <div className="space-y-10">
              <div>
                <h3 className="font-heading text-3xl text-[#5c645a] mb-2">Reception Venue</h3>
                <p className={` font-light leading-7 text-stone-900/90 ${lang === "en" ? "font-en" : "font-th"}`}>
                  {copy[lang].reception.subContext1}
                  <br />
                  {" "} <strong className={` font-semibold text-stone-900 ${lang === "en" ? "font-en" : "font-th"}`}>
                  {copy[lang].reception.subContext2} </strong> {" "} 
                </p>
              </div>

              <div>
                <h3 className={`font-heading text-3xl text-[#5c645a] mb-2 ${lang === "en" ? "font-en" : "font-th"}`}>{copy[lang].reception.subtitle2}</h3>

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

                <p className={` font-light leading-7 text-stone-900/90 ${lang === "en" ? "font-en" : "font-th"}`}>
                  {copy[lang].reception.subContext3}
                </p>
              </div>

              <div>
                <h3 className={`font-heading text-3xl text-[#5c645a] mb-2 ${lang === "en" ? "font-en" : "font-th"}`}>{copy[lang].reception.subtitle3}</h3>
                <p className={` font-light leading-7 text-stone-900/90 ${lang === "en" ? "font-en" : "font-th"}`}>
                  {copy[lang].reception.subContext4}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Gallery Section */}
      <section id="gallery" className="py-16 px-8 bg-[#b8bfaf] animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className={`section-heading text-5xl uppercase md:text-5x1 text-center mb-12 ${lang === "en" ? "font-en" : "font-th"}`}>{copy[lang].gallery.heading}</h2>

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
          <h2 className={`font-heading text-[#5c645a] text-4xl md:text-5xl uppercase text-center tracking-tight mb-12 ${lang === "en" ? "font-en" : "font-th"}`}>{copy[lang].location.heading}</h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Venue Information */}
            <div>
              <h3 className={`text-3xl  mb-6 text-stone-800 ${lang === "en" ? "font-en" : "font-th"}`}>{copy[lang].location.locName}</h3>
              <div className="space-y-4 text-stone-600">
                <div className="flex items-start gap-3">
                  <span className="text-amber-600 text-xl">📍</span>
                  <div>
                    <p className="font-th">{copy[lang].location.title1}:</p>
                    <p>{copy[lang].location.context1}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-amber-600 text-xl">🚌</span>
                  <div>
                    <p className="">{copy[lang].location.title2}:</p>
                    <p>{copy[lang].location.context2}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-amber-600 text-xl">✈️</span>
                  <div>
                    <p className="">{copy[lang].location.title3}:</p>
                    <p>{copy[lang].location.context3} 
                      <br />{copy[lang].location.context4}
                      </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <button
                  onClick={() => window.open('https://maps.app.goo.gl/8eGEKEtQDyb2FqRJA', '_blank')}
                  className="w-full bg-[#b8bfaf] text-white px-6 py-3 rounded-lg hover:bg-[#6F7369] transition-colors"
                >
                  🗺️ {copy[lang].location.button}
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

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 px-8 bg-stone-800 text-white animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl font-serif italic mb-8 ${lang === "en" ? "font-en" : "font-th"}`}>{copy[lang].footer.message}</h2>
          <div className="space-y-4">
            <p className="text-xl hover:text-amber-300 transition-colors cursor-pointer">{copy[lang].footer.from}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
