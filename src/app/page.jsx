'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { Flex, Typography, Row, Col, Card, Button, List, Skeleton, Space, Avatar, Collapse, FloatButton } from 'antd';
import { MailOutlined, LinkedinOutlined, GithubOutlined, UserOutlined, DownOutlined, MessageOutlined, BgColorsOutlined, CodeSandboxOutlined, RocketOutlined, InstagramOutlined, WhatsAppOutlined, CompassOutlined, FolderOutlined, UpOutlined } from '@ant-design/icons';
import { TypeAnimation } from 'react-type-animation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaReact, FaNodeJs, FaFigma } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandVercel } from 'react-icons/tb';

// Ini adalah import yang benar untuk CSS Modules
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

const { Title, Paragraph, Link } = Typography;

const colorPalette = { primary: '#f7b722', accent: '#e31f26', teal: '#45bfb4', text: '#E0E0E0', cardBg: 'rgba(40, 40, 40, 0.5)', headerBg: 'rgba(26, 26, 26, 0.8)', footerBg: '#0f0f0f' };

const packageData = [
  { title: 'Paket Starter', price: 'Mulai dari Rp 250.000 - 1.000.000', features: ['Desain Landing Page Modern', 'Responsif di semua perangkat', 'Dikerjakan oleh 1 Developer', 'Konsultasi Desain (1 Sesi)', 'Waktu Pengerjaan: 2 Minggu'], buttonText: 'Pilih Paket', recommended: false },
  { title: 'Paket Bisnis', price: 'Mulai dari Rp 1.000.000 - 3.000.000', features: ['Situs Web hingga 5 Halaman', 'Integrasi Sistem Manajemen Konten (CMS)', 'Dikerjakan oleh 2 Developer', 'Optimisasi SEO Dasar', 'Waktu Pengerjaan: 4 Minggu'], buttonText: 'Paling Populer', recommended: true },
  { title: 'Paket Enterprise', price: 'Hubungi untuk Penawaran', features: ['Solusi Web Kompleks / Aplikasi Web', 'Fitur Kustom & Integrasi API', 'Tim Developer Khusus', 'Dukungan Prioritas & Maintenance', 'Waktu Pengerjaan: Sesuai Proyek'], buttonText: 'Konsultasi Sekarang', recommended: false },
];

const portfolioData = [
  { 
    title: 'Lionel Game', 
    description: 'Sebuah game web interaktif yang dikembangkan menggunakan teknologi web modern.',
    imageUrl: '/keregae.PNG', 
    link: 'https://lionel-game.vercel.app/' 
  },
  { 
    title: 'Branding Portofolio', 
    description: 'Aplikasi web untuk mengelola tugas dan pekerjaan dengan efisien.', 
    imageUrl: '/okema.PNG', 
    link: 'https://remed-assignment.vercel.app/' 
  },
  { 
    title: 'Website E-commerce', 
    description: 'Situs web e-commerce dengan fungsionalitas keranjang belanja dan pembayaran.',
    imageUrl: '/cakep.PNG', 
    link: '#' 
  },
  { 
    title: 'Sistem Manajemen Klinik', 
    description: 'Sistem untuk mengelola jadwal, rekam medis, dan informasi pasien di klinik.',
    imageUrl: 'https://placehold.co/400x200/2a2a2a/f7b722?text=Proyek+4', 
    link: '#' 
  },
  { 
    title: 'Blog Pribadi', 
    description: 'Platform blog yang dirancang minimalis dan responsif untuk berbagi cerita.',
    imageUrl: 'https://placehold.co/400x200/2a2a2a/45bfb4?text=Proyek+5', 
    link: '#' 
  },
  { 
    title: 'Aplikasi Reservasi Online', 
    description: 'Aplikasi untuk reservasi tempat secara real-time dengan notifikasi.',
    imageUrl: 'https://placehold.co/400x200/2a2a2a/e31f26?text=Proyek+6', 
    link: '#' 
  },
];

const LandingPage = () => {
  const mainRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const [isHeaderVisible, setHeaderVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY < 80) setHeaderVisible(true);
      else setHeaderVisible(false);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi Fade-in untuk Hero Section
      gsap.from(".hero-text", { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: 'power3.out', delay: 0.2 });

      // Fungsi untuk membuat animasi fade-in & slide-up saat scroll
      const createScrollAnimation = (triggerSelector, targets) => {
        gsap.from(targets, { 
          opacity: 0, 
          y: 50, 
          duration: 0.8, 
          ease: 'power3.out', 
          stagger: 0.15,
          scrollTrigger: { 
            trigger: triggerSelector, 
            start: 'top 85%', 
            toggleActions: 'play reverse play reverse'
          }
        });
      };
      
      // Menerapkan animasi ke setiap bagian
      createScrollAnimation("#tentang", ".about-element");
      createScrollAnimation("#paket", `.${styles['package-card']}`);
      createScrollAnimation("#portfolio", `.${styles['portfolio-card']}`);
      createScrollAnimation("#workflow", `.${styles['workflow-step']}`);
      createScrollAnimation("#tech-stack", `.${styles['tech-icon']}`);
      createScrollAnimation("#faq", `.${styles['faq-item']}`);
      createScrollAnimation("#kontak", ".contact-element");
      createScrollAnimation("footer", ".footer-item");

      // Animasi hover untuk Workflow
      gsap.utils.toArray(`.${styles['workflow-step']}`).forEach(element => {
        gsap.to(element, { 
          scale: 1.1, 
          y: -10,
          duration: 0.3, 
          ease: "power2.out", 
          paused: true,
          overwrite: "auto"
        });
        element.addEventListener("mouseenter", () => gsap.to(element, { scale: 1.1, y: -10, duration: 0.3, ease: "power2.out" }));
        element.addEventListener("mouseleave", () => gsap.to(element, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" }));
      });
      
      // Animasi hover untuk Tech Stack (dengan efek neon)
      gsap.utils.toArray(`.${styles['tech-icon']}`).forEach(element => {
        const iconSpan = element.querySelector('span');
        gsap.to(iconSpan, {
          '--neon-glow': '1',
          scale: 1.2,
          duration: 0.3, 
          ease: "power2.out", 
          paused: true,
          overwrite: "auto"
        });
        
        element.addEventListener("mouseenter", () => {
          gsap.to(iconSpan, { '--neon-glow': '1', scale: 1.2, duration: 0.3, ease: "power2.out" });
        });
        element.addEventListener("mouseleave", () => {
          gsap.to(iconSpan, { '--neon-glow': '0', scale: 1, duration: 0.3, ease: "power2.out" });
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(mainRef.current, {
          backgroundPosition: "50% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      });
      
    }, mainRef);
    
    return () => ctx.revert();
  }, []);

  const handleScrollLeft = () => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <main 
      ref={mainRef} 
      style={{ 
        position: 'relative', 
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${colorPalette.teal} -80%, #1A1A1A 40%), radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${colorPalette.primary} -50%, #1A1A1A 30%)`,
        transition: 'background 0.2s ease-out',
      }}
    >
      {/* HEADER */}
      <header style={{ position: 'fixed', top: isHeaderVisible ? '0' : '-100px', left: 0, width: '100%', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, background: colorPalette.headerBg, backdropFilter: 'blur(10px)', transition: 'top 0.4s ease-in-out' }}>
        <Image src="/LN.png" alt="Logo Login" width={40} height={40} />
        <Space size="large" className={styles['desktop-nav']}>
          {/* Tambahkan className di sini */}
          <Link href="#tentang" style={{ color: colorPalette.text }} className={styles['header-link-animated']}>Tentang</Link>
          <Link href="#paket" style={{ color: colorPalette.text }} className={styles['header-link-animated']}>Paket</Link>
          <Link href="#portfolio" style={{ color: colorPalette.text }} className={styles['header-link-animated']}>Portofolio</Link>
          <Link href="#kontak" style={{ color: colorPalette.text }} className={styles['header-link-animated']}>Kontak</Link>
        </Space>
      </header>
      
      {/* HERO */}
      <Flex align="center" justify="center" style={{ minHeight: '100vh', textAlign: 'center', padding: '0 20px', position: 'relative' }}>
        <div className={styles['hero-background-gradient']}></div>
        <div>
          <Title level={1} className="hero-text" style={{ color: colorPalette.text, margin: 0, fontWeight: 700, fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}>Halo, saya <span style={{ color: colorPalette.teal }}>Lionel</span> <span style={{ color: colorPalette.primary }}>Nando</span></Title>
          <div className="hero-text"><Paragraph style={{ marginTop: '8px', marginBottom: '24px', fontSize: 'clamp(1.2rem, 4vw, 2rem)' }}>Seorang <TypeAnimation sequence={['Developer Web', 2000, 'Pengembang Kreatif', 2000, 'Spesialis Digital', 2000]} wrapper="span" speed={40} style={{ color: colorPalette.accent, fontWeight: 'bold' }} repeat={Infinity}/></Paragraph></div>
          <Paragraph className="hero-text" style={{ color: colorPalette.text, maxWidth: '600px', margin: '0 auto', fontSize: 'clamp(1rem, 3vw, 1.1rem)' }}>Mengubah ide-ide kompleks menjadi pengalaman web yang intuitif dan indah.</Paragraph>
          <Space className="hero-text" style={{ marginTop: '40px' }} size="large">
            <Button
              size="large"
              type="primary"
              style={{ background: colorPalette.primary, borderColor: colorPalette.primary }}
              href="#kontak"
            >
              Hubungi Saya
            </Button>
            <Button
              size="large"
              style={{ background: colorPalette.cardBg, color: colorPalette.text, borderColor: 'rgba(255, 255, 255, 0.1)' }}
              href="#portfolio"
            >
              Lihat Portofolio
            </Button>
          </Space>
        </div>
      </Flex>
      
      {/* TENTANG */}
      <div id="tentang" style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} className="about-element" style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '60px', background: `linear-gradient(to right, ${colorPalette.teal}, ${colorPalette.primary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Tentang Kami</Title>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={12} className="about-element" style={{ textAlign: 'center' }}>
            {/* Ubah width dan height di sini untuk foto Lionel */}
            <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto', marginBottom: '24px' }}>
              <Image src="/Lionel.png" alt="Lionel" layout="fill" objectFit="cover" style={{ borderRadius: '50%', border: `3px solid ${colorPalette.primary}` }} />
            </div>
            <Title level={4} style={{ color: colorPalette.primary, margin: 0 }}>Lionel</Title>
            <Paragraph style={{ color: colorPalette.text, fontSize: '1.1rem' }}>Saya adalah pengembang web yang fokus pada **pengalaman pengguna** yang intuitif dan **desain yang menarik**. Mengubah ide menjadi kode yang bersih dan fungsional adalah gairah saya.</Paragraph>
          </Col>
          <Col xs={24} md={12} className="about-element" style={{ textAlign: 'center' }}>
            {/* Ubah width dan height di sini untuk foto Hernando */}
            <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto', marginBottom: '24px' }}>
              <Image src="/Hernando.png.png" alt="Hernando" layout="fill" objectFit="cover" style={{ borderRadius: '50%', border: `3px solid ${colorPalette.teal}` }} />
            </div>
            <Title level={4} style={{ color: colorPalette.teal, margin: 0 }}>Hernando</Title>
            <Paragraph style={{ color: colorPalette.text, fontSize: '1.1rem' }}>Saya adalah ahli dalam **optimasi performa** dan **arsitektur sistem yang skalabel**. Mengembangkan backend yang kokoh dan efisien adalah keahlian utama saya.</Paragraph>
          </Col>
        </Row>
      </div>

      {/* PAKET */}
      <div id="paket" style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} className="package-title" style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '60px' }}>Paket Layanan</Title>
        <Row gutter={[32, 32]} justify="center">{packageData.map((pkg, index) => <Col xs={24} md={12} lg={8} key={index} className={styles['package-card']}><Card variant="bordered" style={{ background: colorPalette.cardBg, backdropFilter: 'blur(10px)', border: `1px solid ${pkg.recommended ? colorPalette.primary : 'rgba(255, 255, 255, 0.1)'}`, height: '100%' }}><Title level={4} style={{ color: colorPalette.primary }}>{pkg.title}</Title><Paragraph style={{ color: colorPalette.text, fontWeight: 'bold' }}>{pkg.price}</Paragraph><List dataSource={pkg.features} renderItem={(item) => <List.Item style={{ color: colorPalette.text, border: 'none', padding: '4px 0' }}>- {item}</List.Item>} style={{ margin: '20px 0' }}/><Button type={pkg.recommended ? 'primary' : 'default'} size="large" block style={pkg.recommended ? { background: colorPalette.primary, borderColor: colorPalette.primary } : {}}>{pkg.buttonText}</Button></Card></Col>)}</Row>
      </div>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: '100px 20px', position: 'relative' }}>
        <Title level={2} style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '60px' }}>Karya & Portofolio</Title>
        
        {/* Kontainer Scroll Horizontal */}
        <div ref={horizontalScrollRef} style={{ display: 'flex', gap: '40px', padding: '0 5vw', overflowX: 'hidden', scrollBehavior: 'smooth' }}>
          {portfolioData.map((project, index) => (
            <div key={index} style={{ flexShrink: 0, width: 'clamp(300px, 30vw, 400px)' }}>
              <Link href={project.link} target="_blank" style={{ textDecoration: 'none' }}>
                <Card variant="bordered" className={styles['portfolio-card']} style={{ background: colorPalette.cardBg, backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', height: '100%' }}>
                  <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '8px', position: 'relative' }}>
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease-in-out' }} 
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/400x200/2a2a2a/f7b722?text=Error+Loading+Image';
                      }}
                    />
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <Title level={5} style={{ color: colorPalette.primary }}>{project.title}</Title>
                    <Paragraph style={{ color: colorPalette.text }}>{project.description}</Paragraph>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        
        {/* Tombol Navigasi dengan onClick yang sudah diubah */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)', padding: '0 10px' }}>
          <Button
            shape="circle"
            icon={<DownOutlined rotate={90} />}
            onClick={handleScrollLeft}
            style={{ zIndex: 10, background: colorPalette.cardBg, color: colorPalette.primary, border: 'none' }}
          />
          <Button
            shape="circle"
            icon={<DownOutlined rotate={-90} />}
            onClick={handleScrollRight}
            style={{ zIndex: 10, background: colorPalette.cardBg, color: colorPalette.primary, border: 'none' }}
          />
        </div>
      </section>

      {/* WORKFLOW */}
      <div id="workflow" style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '80px' }}>Proses Kerja Kami</Title>
        <Row gutter={[32, 32]} justify="center">{[{icon: <MessageOutlined />, title: "1. Diskusi & Konsep"},{icon: <BgColorsOutlined />, title: "2. Desain & Prototipe"},{icon: <CodeSandboxOutlined />, title: "3. Pengembangan"},{icon: <RocketOutlined />, title: "4. Peluncuran & Dukungan"}].map(step => (<Col xs={12} md={6} key={step.title} className={styles['workflow-step']} style={{ textAlign: 'center' }}><Avatar size={80} icon={step.icon} style={{ background: colorPalette.cardBg, color: colorPalette.teal, border: `2px solid ${colorPalette.teal}`, marginBottom: '16px' }} /><Title level={5} style={{ color: colorPalette.text }}>{step.title}</Title></Col>))}</Row>
      </div>

      {/* TECH STACK */}
      <div id="tech-stack" style={{ padding: '100px 20px', maxWidth: '900px', margin: '0 auto' }}>
          <Title level={2} style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '60px' }}>Teknologi Andalan Kami</Title>
          <Row gutter={[16, 48]} justify="center" align="middle">{[ {icon: <FaReact size="3em"/>, name: "React"}, {icon: <TbBrandNextjs size="3em"/>, name: "Next.js"}, {icon: <FaNodeJs size="3em"/>, name: "Node.js"}, {icon: <TbBrandVercel size="3em"/>, name: "Vercel"}, {icon: <FaFigma size="3em"/>, name: "Figma"} ].map(tech => (<Col xs={8} sm={6} md={4} key={tech.name} className={styles['tech-icon']} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}><span style={{ color: colorPalette.teal }}>{tech.icon}</span><span className={styles['tech-name']} style={{ color: colorPalette.text }}>{tech.name}</span></Col>))}</Row>
      </div>

      {/* FAQ - KEMBALI MENGGUNAKAN ANT DESIGN */}
      <div id="faq" style={{ padding: '100px 20px', maxWidth: '900px', margin: '0 auto' }}>
          <Title level={2} style={{ textAlign: 'center', color: colorPalette.text, marginBottom: '60px' }}>Tanya Jawab (FAQ)</Title>
          <Collapse accordion ghost expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />} expandIconPosition="end" className={styles['faq-item']}>
            <Collapse.Panel header={<span style={{ color: colorPalette.primary, fontWeight: 'bold' }}>Berapa lama proses pembuatan website?</span>} key="1">
              <Paragraph style={{ color: colorPalette.text, margin: 0 }}>Tergantung kompleksitas. Untuk landing page biasanya sekitar 2 minggu. Untuk situs yang lebih besar bisa memakan waktu 4-6 minggu.</Paragraph>
            </Collapse.Panel>
            <Collapse.Panel header={<span style={{ color: colorPalette.primary, fontWeight: 'bold' }}>Apakah harga sudah termasuk domain dan hosting?</span>} key="2">
              <Paragraph style={{ color: colorPalette.text, margin: 0 }}>Harga paket belum termasuk. Namun, saya bisa membantu proses pembelian dan setup-nya sesuai provider pilihan Anda.</Paragraph>
            </Collapse.Panel>
            <Collapse.Panel header={<span style={{ color: colorPalette.primary, fontWeight: 'bold' }}>Bagaimana alur pembayarannya?</span>} key="3">
              <Paragraph style={{ color: colorPalette.text, margin: 0 }}>Umumnya sistem 50% uang muka sebelum proyek dimulai, dan 50% pelunasan setelah website selesai dan siap untuk dipublikasikan.</Paragraph>
            </Collapse.Panel>
          </Collapse>
      </div>

      {/* FOOTER PREMIUM */}
      <footer id="kontak" style={{ backgroundColor: '#0A0A0A', color: colorPalette.text, padding: '100px 20px', position: 'relative', overflow: 'hidden' }}>
        {/* Efek Gradien & Glow di Belakang */}
        <div style={{ position: 'absolute', top: '20%', left: '0', width: '300px', height: '300px', background: colorPalette.primary, opacity: 0.1, borderRadius: '50%', filter: 'blur(80px)' }} className="footer-item"></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '0', width: '300px', height: '300px', background: colorPalette.teal, opacity: 0.1, borderRadius: '50%', filter: 'blur(80px)' }} className="footer-item"></div>
        
        <Row gutter={[48, 48]} justify="center" style={{ maxWidth: '1400px', margin: '0 auto', zIndex: 1, position: 'relative' }}>
          <Col xs={24} lg={10} className="footer-item">
            <Title level={3} style={{ color: colorPalette.text, margin: 0 }}>Hubungi <span style={{ color: colorPalette.primary }}>Kami</span></Title>
            <Paragraph style={{ color: '#aaa', marginTop: '16px', fontSize: '1.1rem' }}>
              Mari wujudkan ide digital Anda. Tim kami siap membantu dari tahap konsep hingga peluncuran.
            </Paragraph>
            <Space direction="vertical" style={{ width: '100%', marginTop: '32px' }}>
              <Button type="primary" size="large" block href="https://wa.me/6281234567890" target="_blank" style={{ background: colorPalette.teal, borderColor: colorPalette.teal, fontWeight: 'bold' }}>
                <WhatsAppOutlined style={{ marginRight: '8px' }} /> Chat via WhatsApp
              </Button>
              <Button type="default" size="large" block href="mailto:emailanda@example.com" style={{ background: 'transparent', color: colorPalette.text, borderColor: 'rgba(255, 255, 255, 0.2)', fontWeight: 'bold' }}>
                <MailOutlined style={{ marginRight: '8px' }} /> Kirim Email
              </Button>
            </Space>
          </Col>
          
          <Col xs={12} sm={8} lg={4} className="footer-item">
            <Title level={5} style={{ color: colorPalette.text, borderLeft: `2px solid ${colorPalette.primary}`, paddingLeft: '8px' }}>Navigasi</Title>
            <Space direction="vertical" size="middle" style={{ marginTop: '16px' }}>
              <Link href="#tentang" className={styles['footer-link-animated']} style={{ color: '#aaa' }}>Tentang</Link>
              <Link href="#paket" className={styles['footer-link-animated']} style={{ color: '#aaa' }}>Paket Layanan</Link>
              <Link href="#portfolio" className={styles['footer-link-animated']} style={{ color: '#aaa' }}>Portofolio</Link>
            </Space>
          </Col>
          
          <Col xs={12} sm={8} lg={4} className="footer-item">
            <Title level={5} style={{ color: colorPalette.text, borderLeft: `2px solid ${colorPalette.teal}`, paddingLeft: '8px' }}>Layanan</Title>
            <Space direction="vertical" size="middle" style={{ marginTop: '16px' }}>
              <Link href="#workflow" className={styles['footer-link-animated']} style={{ color: '#aaa' }}>Proses Kerja</Link>
              <Link href="#tech-stack" className={styles['footer-link-animated']} style={{ color: '#aaa' }}>Teknologi</Link>
              <Link href="#faq" className={styles['footer-link-animated']} style={{ color: '#aaa' }}>FAQ</Link>
            </Space>
          </Col>

          <Col xs={24} sm={8} lg={6} className="footer-item">
            <Title level={5} style={{ color: colorPalette.text, borderLeft: `2px solid ${colorPalette.primary}`, paddingLeft: '8px' }}>Ikuti Kami</Title>
            <Space size="large" style={{ marginTop: '16px' }}>
              <Link href="https://linkedin.com/in/usernameanda" target="_blank" style={{ fontSize: '1.8rem', color: colorPalette.text, transition: 'color 0.3s' }}><LinkedinOutlined /></Link>
              <Link href="https://github.com/usernameanda" target="_blank" style={{ fontSize: '1.8rem', color: colorPalette.text, transition: 'color 0.3s' }}><GithubOutlined /></Link>
              <Link href="https://instagram.com/usernameanda" target="_blank" style={{ fontSize: '1.8rem', color: colorPalette.text, transition: 'color 0.3s' }}><InstagramOutlined /></Link>
            </Space>
          </Col>
        </Row>
        
        <div style={{ textAlign: 'center', marginTop: '100px', paddingTop: '20px', borderTop: '1px solid #333', zIndex: 1, position: 'relative' }}>
          <Paragraph style={{ margin: 0, fontSize: '0.9rem', color: '#888' }}>
            <span style={{ color: colorPalette.primary }}>&copy; {new Date().getFullYear()} Lionel & Hernando.</span> Semua Hak Cipta Dilindungi.
          </Paragraph>
        </div>
      </footer>
      
      {/* Floating Button yang Sudah Didesain Ulang */}
      <FloatButton.Group trigger="hover" style={{ right: 24, bottom: 24 }} className={styles['floating-btn-group']}>
        <FloatButton href="https://wa.me/6281234567890" target="_blank" icon={<WhatsAppOutlined />} tooltip="WhatsApp" className={`${styles['float-btn']} ${styles['wa-btn']}`} />
        <FloatButton href="https://instagram.com/usernameanda" target="_blank" icon={<InstagramOutlined />} tooltip="Instagram" className={`${styles['float-btn']} ${styles['ig-btn']}`} />
        <FloatButton.BackTop icon={<UpOutlined />} tooltip="Kembali ke Atas" className={styles['backtop-btn']} />
      </FloatButton.Group>
    </main>
  );
};

export default LandingPage; 
