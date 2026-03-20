import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ChevronDown, Users, Lightbulb, Shield, HandshakeIcon, BookOpen, Target, Award, Building2, TrendingUp, Activity, Smartphone, Cloud, Hospital, Stethoscope, Database, BarChart3, Globe, Heart, Zap, CheckCircle } from 'lucide-react';
import logo from '../assets/HB HEALTH.png';
import slide1 from '../assets/1.jpeg';
import slide2 from '../assets/2.jpeg';
import idis2go from '../assets/idis2go.jpeg';
import bridge from '../assets/bridge.jpeg';
import booth from '../assets/booth1.png';

const MainPage = () => {
  // Add Tailwind CSS
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const slides = [
    slide1,
    slide2,
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'vision', 'values', 'objectives', 'products', 'infrastructure', 'capacity', 'future'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTimeout(() => setIsFading(false), 500);
      }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full bg-white text-amber-50 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="HB eHealth Logo" className=" h-12" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Vision', 'Values', 'Products', 'Contact'].map((item) => {
                if (item === 'Products') {
                  return (
                    <div key={item} className="relative">
                      <button
                        onClick={() => setIsProductsOpen((prev) => !prev)}
                        className={`inline-flex items-center text-sm font-medium transition-colors ${
                          scrolled ? 'text-gray-700 hover:text-teal-600' : 'text-gray-800 hover:text-teal-600'
                        }`}
                      >
                        <span>Products</span>
                        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isProductsOpen && (
                        <div className="absolute left-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                          {['bridgehms', 'idis2go', 'smart-health'].map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                let scrollTarget = sub;
                                if (sub === 'bridgehms') scrollTarget = 'products';
                                if (sub === 'smart-health') scrollTarget = 'smart-health';
                                scrollToSection(scrollTarget);
                                setIsProductsOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50"
                            >
                              {
                                sub === 'bridgehms'
                                  ? 'BridgeHMS'
                                  : sub === 'idis2go'
                                    ? 'IDIS2GO'
                                    : sub === 'smart-health'
                                      ? 'Smart Health Booth'
                                      : sub.charAt(0).toUpperCase() + sub.slice(1)
                              }
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-colors ${
                      scrolled ? 'text-gray-700 hover:text-teal-600' : 'text-gray-800 hover:text-teal-600'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-black" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {['Home', 'About', 'Vision', 'Values', 'Products', 'Contact'].map((item) => {
                if (item === 'Products') {
                  return (
                    <div key={item}>
                      <button
                        onClick={() => setIsMobileProductsOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between px-4 py-2 text-left text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
                      >
                        <span>Products</span>
                        <ChevronDown className={`w-4 h-4 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isMobileProductsOpen && (
                        <div className="ml-4 mt-2 space-y-1">
                          {['products', 'bridgehms', 'idis2go', 'smart-health'].map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                const scrollTarget = sub === 'bridgehms' ? 'products' : sub;
                                scrollToSection(scrollTarget);
                                setIsMenuOpen(false);
                                setIsMobileProductsOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-lg"
                            >
                              {sub === 'bridgehms'
                                ? 'BridgeHMS'
                                : sub === 'idis2go'
                                  ? 'IDIS2GO'
                                  : sub === 'smart-health'
                                    ? 'Smart Health Booth'
                                    : sub.charAt(0).toUpperCase() + sub.slice(1)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(item.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundImage: `url(${slides[currentSlide]})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%' }}></div>
        {/* <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50 to-white opacity-60"></div> */}
        {/* <div className="absolute top-20 right-10 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div> */}
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6">
              {/* <div className="w-24 h-1 bg-linear-to-r from-teal-600 to-cyan-600 mx-auto"></div> */}
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r   from-teal-600 to-cyan-600 mb-6 leading-tight">
              Transforming Healthcare<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r text-gray-900">
                Delivery in Africa
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white  mb-12 max-w-3xl mx-auto leading-relaxed">
              Digital health solutions connecting people, providers, and data for better health outcomes across Africa
            </p>

            {/* Key Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { icon: Database, label: 'Digital Systems' },
                { icon: Smartphone, label: 'Mobile Solutions' },
                { icon: Users, label: 'People-Centered' },
                { icon: Activity, label: 'Connected Health' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <feature.icon className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                  <div className="text-sm font-semibold text-gray-800">{feature.label}</div>
                </div>
              ))}
            </div>

            <div className="flex sm:flex-row gap-5 justify-center">
              <button 
                onClick={() => scrollToSection('about')}
                className="px-4 py-3 bg-linear-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Explore Our Solutions</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-4 py-3 bg-white text-teal-600 border-2 border-teal-600 rounded-xl font-semibold hover:bg-teal-50 transition-all"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Us</h2>
            <div className="w-24 h-1 bg-linear-to-r from-teal-600 to-cyan-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">HB eHealth Ltd</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                A digital health company dedicated to transforming healthcare delivery in Africa through innovative, technology-driven solutions.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We design and implement intelligent digital health products, telemedicine platforms, and smart health infrastructure aimed at improving access, efficiency, and quality of care across the continent.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By integrating technology, insight, and collaboration, we bridge critical gaps in healthcare systems, empowering providers and enhancing patient outcomes through smart, reliable, and scalable digital solutions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 items-center justify-center">
              {[
                {
                  icon: Database,
                  title: 'Digital Solutions',
                  desc: 'Customized HMS/EMR platforms and telemedicine solutions'
                },
                {
                  icon: Building2,
                  title: 'Health Infrastructure',
                  desc: 'Smart health booths, Networking equipment,alternative power solutions and computer hardwares'
                },
                {
                  icon: BookOpen,
                  title: 'Digital Capacity',
                  desc: 'Training health workers to effectively use eHealth tools'
                },
                {
                  icon: TrendingUp,
                  title: 'Systems Strengthening',
                  desc: 'Enhancing healthcare delivery through data and technology'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex-col items-center justify-center bg-linear-to-br  from-teal-50 to-cyan-50 p-6 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1"
                >

                  <div className='w-16 h-16 flex items-center justify-center mx-auto'>
                  <item.icon className="w-10 h-10 text-teal-600  mb-4" />

                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-teal-600 to-cyan-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Vision & Mission</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/10 flex-col items-center justify-center backdrop-blur-lg p-10 rounded-3xl hover:bg-white/20 transition-all">
              

              <div className="flex-col items-center justify-center space-x-3 mb-6">
                <div className="w-16 h-16 flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 mb-5" />
              </div>
                <h3 className="text-3xl font-bold">Our Vision</h3>
              </div>

              <p className="text-xl mb-6 leading-relaxed">
                "To redefine healthcare in Africa by building intelligent digital systems that connect people, providers, and data for better health."
              </p>
             
            </div>

            <div className="bg-white/10 flex-col items-center justify-center backdrop-blur-lg p-10 rounded-3xl hover:bg-white/20 transition-all">
              <div className="flex-col items-center justify-center space-x-3 mb-6">
                <div className='w-16 h-16 flex items-center justify-center mx-auto'>
                  <Heart className="w-8 h-8 mb-5" />
                </div>
                <h3 className="text-3xl font-bold">Our Mission</h3>
              </div>
              
              <p className="text-xl mb-6 leading-relaxed">
                "To create and foster practical and intelligent digital health tools that solve real challenges in healthcare delivery – improving access, coordination, and quality of care across all levels of the health system."
              </p>
              
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="values" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Core Values</h2>
            <div className="w-24 h-1 bg-linear-to-r from-teal-600 to-cyan-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: Users,
                title: 'People First',
                desc: 'We design with empathy, ensuring technology serves both the patient and the provider.'
              },
              {
                icon: Lightbulb,
                title: 'Innovation with Purpose',
                desc: 'Every solution we build answers a real problem in healthcare delivery.'
              },
              {
                icon: Shield,
                title: 'Reliability',
                desc: 'We commit to dependable products and responsive support that healthcare facilities can trust.'
              },
              {
                icon: HandshakeIcon,
                title: 'Collaboration',
                desc: 'We grow through strong partnerships with health institutions, governments, and communities.'
              },
              {
                icon: BookOpen,
                title: 'Continuous Learning',
                desc: 'We evolve with technology and user feedback, improving with every project.'
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-linear-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 text-center"
              >
                <div className="w-16 h-16 bg-linear-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Objectives Section */}
      <section id="objectives" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Strategic Objectives</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              HB eHealth's strategic objectives guide our mission to transform healthcare in Africa through digital innovation.
            </p>
            <div className="w-24 h-1 bg-linear-to-r from-teal-600 to-cyan-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {[
              {
                icon: TrendingUp,
                title: 'Build and Scale Digital Health Products',
                color: 'from-teal-500 to-teal-600'
              },
              {
                icon: Building2,
                title: 'Pioneer Smart Health Infrastructure',
                color: 'from-cyan-500 to-cyan-600'
              },
              {
                icon: HandshakeIcon,
                title: 'Become a Leading Implementation Partner',
                color: 'from-teal-600 to-cyan-600'
              },
              {
                icon: Award,
                title: 'Strengthen Institutional Trust',
                color: 'from-cyan-600 to-teal-600'
              },
              {
                icon: Zap,
                title: 'Drive Innovation and Sustainability',
                color: 'from-teal-500 to-cyan-500'
              }
            ].map((objective, index) => (
              <div 
                key={index}
                className="  flex-col justify-center items-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-linear-to-br ${objective.color}  rounded-xl flex items-center justify-center mx-auto mb-6 
                   `}>
                  <objective.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{objective.title}</h4>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg font-semibold text-teal-700">
              Our strategic approach bridges healthcare gaps through technology
            </p>
          </div>
        </div>
      </section>

      {/* Products Section - Health Information Systems */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Health Information Systems</h2>
            <div className="w-24 h-1 bg-linear-to-r from-teal-600 to-cyan-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              HB eHealth develops and deploys customized Hospital Management System (HMS) and Electronic Medical Record (EMR) platforms to transform healthcare delivery in Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-block bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Flagship Solution
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Bridge HMS</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our flagship solution that consolidates clinical, operational, and financial information into a unified digital ecosystem, revolutionizing healthcare management.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                By automating daily operations and digitizing critical processes, we help healthcare facilities in Africa improve efficiency, accuracy, and overall service quality.
              </p>

              <div className="space-y-4">
                {[
                  'Streamlined operations',
                  'Enhanced patient care',
                  'Data-driven decisions',
                  'Improved efficiency'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Users,
                  title: 'Patient Registration',
                  desc: 'Streamlined patient intake and demographic management'
                },
                {
                  icon: Activity,
                  title: 'Appointment Scheduling',
                  desc: 'Efficient appointment management and reminders'
                },
                {
                  icon: Database,
                  title: 'Electronic Health Records',
                  desc: 'Digital documentation with improved accessibility'
                },
                {
                  icon: BarChart3,
                  title: 'Data Analytics',
                  desc: 'Comprehensive reporting and insights'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-linear-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl hover:shadow-lg transition-all"
                >

                    <div className='w-16 h-16 flex items-center justify-center mx-auto'>
                  <feature.icon className="w-10 h-10 text-teal-600 mb-4 " />
                    </div>
                  
                  
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <img src={bridge} alt="Bridge" className="mx-auto" />

        <a href="https://bridgehms.com" target="_blank" rel="noopener noreferrer"
                className="inline-block mt-3 px-4 py-3 bg-white text-teal-600 border-2 border-teal-600 rounded-xl font-semibold hover:bg-teal-50 transition-all"
              >
                See More
              </a>
      </section>

      {/* Mobile & TeleHealth Solutions */}
      <section id="idis2go" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Mobile & TeleHealth Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Extending healthcare access to underserved populations through innovative mobile solutions.
            </p>
            <div className="w-24 h-1 bg-linear-to-r from-teal-600 to-cyan-600 mx-auto"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                {/* <div className="inline-block bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  Featured Solution
                </div> */}
                <h3 className="text-3xl font-bold text-gray-900 mb-6">IDIS2GO: Portable TeleHealth System</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  A comprehensive IoT and cloud solution that enables remote collection and transmission of patient data.
                </p>

                <div className="space-y-4">
                  {[
                    'Enables remote collection of vital signs',
                    'Facilitates transmission to healthcare providers',
                    'Enables preliminary diagnostics'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">How IDIS2GO Extends Healthcare Access</h4>
                
                {[
                  {
                    icon: Activity,
                    title: 'Data Collection',
                    desc: 'Vital signs',
                    color: 'from-teal-500 to-teal-600'
                  },
                  {
                    icon: Shield,
                    title: 'Secure Transmission',
                    desc: 'IoT technology',
                    color: 'from-cyan-500 to-cyan-600'
                  },
                  {
                    icon: Cloud,
                    title: 'Remote Consultation',
                    desc: 'Cloud-based',
                    color: 'from-teal-600 to-cyan-600'
                  }
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 pb-4">
                    <div className={`w-12 h-12 bg-linear-to-br ${step.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">{step.title}</h5>
                      <p className="text-gray-600 text-sm text-left">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              
            </div>
<img src={idis2go} alt="IDIS2GO" className="mx-auto" />
            <div className="border-t pt-12">
              <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">Impact & Benefits</h4>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { title: 'Accessible in rural areas' },
                  { title: 'Reduces health disparities' },
                  { title: 'Facilitates periodic monitoring' },
                  { title: 'Extends hospital-level care' }
                ].map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-linear-to-br from-teal-50 to-cyan-50 p-6 rounded-xl text-center"
                  >
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-semibold text-gray-900">{benefit.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Health Infrastructure */}
      <section id="smart-health" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Smart Health Booth</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              HB eHealth designs intelligent health booths and connected devices that serve as self-service digital healthcare stations, bringing essential care to underserved areas.
            </p>
            <div className="w-24 h-1 bg-linear-to-r from-teal-600 to-cyan-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-linear-to-br from-teal-600 to-cyan-700 p-10 rounded-3xl text-white">
              <div className='w-16 h-16 flex items-center justify-center mx-auto'>
              <Building2 className="w-12 h-12 mb-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Intelligent Health Booths</h3>
              <p className="text-teal-100 text-lg leading-relaxed">
                Self-service digital healthcare stations offering medical screening and teleconsultation.
              </p>
            </div>

            <div className="bg-linear-to-br from-cyan-600 to-teal-700 p-10 rounded-3xl text-white">
              <div className='w-16 h-16 flex items-center justify-center mx-auto'>
                <Activity className="w-12 h-12 mb-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Connected Health Devices</h3>
              <p className="text-cyan-100 text-lg leading-relaxed">
                IoT-enabled tools for vital signs, ECG, blood sugar, and more, extending healthcare capabilities.
              </p>
            </div>
          </div>

          <img src={booth} alt="Health Booth" className="mx-auto h-[400px] mb-15 rounded-2xl shadow-lg" />

          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Impact & Benefits</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Heart,
                  title: 'Primary Care',
                  desc: 'Delivers essential healthcare services in underserved areas'
                },
                {
                  icon: Smartphone,
                  title: 'Teleconsultation',
                  desc: 'Connects patients with remote healthcare providers'
                },
                {
                  icon: Shield,
                  title: 'Preventive Care',
                  desc: 'Promotes early intervention and health monitoring'
                },
                {
                  icon: Hospital,
                  title: 'Hospital Relief',
                  desc: 'Reduces strain on traditional healthcare facilities'
                }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-linear-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl hover:shadow-lg transition-all"
                >
                  <div className='w-16 h-16 flex items-center justify-center mx-auto'>
                  <benefit.icon className="w-10 h-10 text-teal-600 mb-4" />
                    </div>
                  <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>



          <div className="text-center mt-12">
            <div className="inline-block bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-900 px-6 py-3 rounded-full font-semibold">
              Integrated Health Ecosystem
            </div>
          </div>
        </div>
      </section>

      {/* Digital Capacity Building */}
      <section id="capacity" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Digital Capacity Building & Health Systems Strengthening
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-teal-600 to-cyan-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="bg-white p-10 rounded-3xl shadow-lg">
              <div className="flex-col justify-center items-center space-x-3 mb-6">
                <div className='w-16 h-16 flex items-center justify-center mx-auto'>
                <BookOpen className="w-10 h-10 text-teal-600" />

                </div>
                <h3 className="text-2xl font-bold text-gray-900">Digital Capacity Building</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Training health workers to effectively use eHealth tools, empowering healthcare professionals to adopt new digital technologies.
              </p>
              <ul className="space-y-3 text-left">
                {[
                  'Addresses insufficient IT skills and low digital literacy among healthcare workers',
                  'Overcomes key barriers to eHealth integration in African countries',
                  'Builds sustainable digital literacy for long-term healthcare transformation'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg">
              <div className="flex-col items-center space-x-3 mb-6">
                <div className='w-16 h-16 flex items-center justify-center mx-auto'>
                <TrendingUp className="w-10 h-10 text-cyan-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Health Systems Strengthening</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">  
                Using data and technology to make healthcare delivery more efficient, connected, and patient-centered across Africa.
              </p>
              <ul className="space-y-3">
                {[
                  'Improving institutional and organizational capacity',
                  'Implementing primary health care-oriented policies',
                  'Enhancing access, data management, and service delivery',
                  'Ensuring health systems respond to needs of entire population'
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-linear-to-r from-teal-600 to-cyan-600 p-8 rounded-2xl text-center">
            <p className="text-xl font-semibold text-white">
              Integrated approach: Building digital capacity and strengthening systems for sustainable healthcare transformation
            </p>
          </div>
        </div>
      </section>

      {/* Building a Healthier Future */}
      <section id="future" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-teal-600 to-cyan-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Building a Healthier Future for Africa</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-teal-100 max-w-4xl mx-auto leading-relaxed">
              HB eHealth is dedicated to forging a healthier future for Africa by leveraging smart, reliable, and scalable digital solutions. We remain steadfast in our vision to redefine healthcare by building intelligent digital systems that seamlessly connect people, providers, and data, ultimately enhancing health outcomes across the continent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Improved Access',
                desc: 'Extending healthcare access to underserved populations through digital solutions and smart infrastructure.'
              },
              {
                icon: Zap,
                title: 'Enhanced Efficiency',
                desc: 'Streamlining healthcare delivery systems to reduce wait times and optimize resource allocation.'
              },
              {
                icon: Heart,
                title: 'Better Outcomes',
                desc: 'Using data-driven insights to improve patient care and health outcomes across Africa.'
              }
            ].map((goal, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl hover:bg-white/20 transition-all text-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <goal.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{goal.title}</h3>
                <p className="text-teal-100 leading-relaxed">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-12">
            Ready to transform healthcare delivery? Let's connect and explore how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-4 bg-linear-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:-translate-y-1"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setIsContactModalOpen(false); }}
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Contact Form</h3>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                X
              </button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Form submitted!');
                setIsContactModalOpen(false);
              }}
            >
              <div>
                <label className="block text-left text-sm font-semibold text-gray-700">First Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-left text-sm font-semibold text-gray-700">Last Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-left text-sm font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-left text-sm font-semibold text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex justify-between items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className=" bg-linear-to-br from-teal-500 to-cyan-600 px-4 py-2 font-semibold text-white hover:bg-teal-700 rounded-lg border"
                >
                  Submit
                </button>
                
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">HB eHealth</div>
                  <div className="text-xs text-teal-400">Transforming Healthcare</div>
                </div>
              </div>
              <p className="text-gray-400">
                Digital health solutions connecting people, providers, and data for better health outcomes across Africa.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['About', 'Products', 'Contact'].map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollToSection(link.toLowerCase())}
                      className="text-gray-400 hover:text-teal-400 transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <p className="text-gray-400 mb-4">Stay updated with our latest innovations and solutions.</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HB eHealth Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;