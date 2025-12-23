import React, { useState, useRef, useEffect } from 'react';
import './HomePage.css';
import { WEDDING_DATA } from '../../utils/mock_data';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- HIỆU ỨNG TRÁI TIM RƠI ---
const FloatingElements = () => {
  const elements = Array.from({ length: 15 });
  return (
    <div className="floating-container">
      {elements.map((_, i) => (
        <motion.div
          key={i}
          className="heart-particle"
          initial={{ 
            top: -20, 
            left: Math.random() * 100 + "%", 
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5 
          }}
          animate={{ 
            top: "110vh", 
            opacity: [0, 1, 1, 0],
            rotate: 360,
            x: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
};

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const contentRef = useRef(null);
  const audioRef = useRef(null);

  const weddingPhotos = [
    WEDDING_DATA.assets.couplePhoto1,
    WEDDING_DATA.assets.couplePhoto2,
    WEDDING_DATA.assets.couplePhoto3,
    WEDDING_DATA.assets.couplePhoto4,
  ];

  // Variants cho hiệu ứng xuất hiện khi scroll
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const handleEnvelopeClick = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Blocked:", err));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setTimeout(() => {
        contentRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 800);
    }
  }, [isOpen]);

  return (
    <div className="wedding-card-container">
      <FloatingElements /> {/* Hiệu ứng hạt rơi nền */}

      <audio ref={audioRef} loop>
        <source src="/assets/music/wedding-song.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Toggle - Thêm hiệu ứng nhịp đập khi đang phát */}
      <motion.div 
        className={`music-toggle-btn ${isPlaying ? 'spinning' : ''}`} 
        onClick={toggleMusic}
        whileTap={{ scale: 0.9 }}
      >
        <span className="music-icon">{isPlaying ? '♫' : '🔇'}</span>
      </motion.div>

      <div className={`invitation-wrapper ${isOpen ? 'is-open' : ''}`}>
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1.5 }}
            className="header-caption"
        >
            YOU ARE • THE LOVE OF • MY LIFE
        </motion.div>
        
        <h1 className="main-title">Wedding Invitation</h1>
        
        <motion.p 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="instruction" 
          style={{ opacity: isOpen ? 0 : 1 }}
        >
          Chạm để mở thiệp
        </motion.p>
        
        <div className={`envelope-container ${isOpen ? 'is-open' : ''}`} onClick={handleEnvelopeClick}>
          <div className="envelope-flap"></div>
          <div className="envelope-base"></div>
         <div className="wax-seal-img"><span>❤</span></div>
          <img src={WEDDING_DATA.assets.couplePhoto} alt="Couple" className="pop-up-photo" />
        </div>

        <div className="expanded-content" ref={contentRef}>
            {/* 1. Thông tin mời - Hiệu ứng trôi lên */}
            <motion.div {...fadeInUp} className="invitation-body">
                <div className="invite-text-shadow">Trân trọng kính mời</div>
                <h2 className="guest-name-cursive">{WEDDING_DATA.guestName}</h2>
                <div className="event-description">ĐẾN DỰ BUỔI TIỆC CHUNG VUI</div>
                
                <div className="date-large">
                    <span>{WEDDING_DATA.time}</span>|<span>{WEDDING_DATA.day}</span>|<span>{WEDDING_DATA.date}</span>
                </div>
                <div className="lunar-date">(Nhằm ngày {WEDDING_DATA.lunarDate})</div>
                
                <div className="location-divider"></div>
                <h3 className="location-name">{WEDDING_DATA.location.name}</h3>
                <p className="location-address">{WEDDING_DATA.location.address}</p>
                
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="map-button" 
                    onClick={() => window.open(WEDDING_DATA.location.mapLink)}
                >
                    Xem đường đi
                </motion.button>
            </motion.div>

            {/* 2. Lịch - Hiệu ứng Stagger (xuất hiện từng chút một) */}
            <motion.div {...fadeInUp} className="calendar-section">
                <div className="date-large" style={{fontSize: '18px', marginBottom: '10px'}}>
                    THÁNG 01 | 2026
                </div>
                <div className="calendar-grid">
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
                        <div key={day} className="calendar-day" style={{fontWeight: 'bold'}}>{day}</div>
                    ))}
                    {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                        <motion.div 
                            key={day} 
                            whileHover={{ scale: 1.2, color: '#d4a373' }}
                            className={`calendar-day ${day === WEDDING_DATA.eventDate ? 'marked' : ''}`}
                        >
                            {day}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* 3. PHẦN LOVE STORY VỚI ẢNH XẾP CHỒNG */}
                        <div className="love-story-section">
                          <h2 className="save-the-date-center">Save the Date</h2>
                            <div className="bottom-content">
                                <p>{WEDDING_DATA.loveStory.topQuote}</p>
                            </div>
            
                            <div className="layered-photo-container">
                                <div className="vertical-text left">MY LOVE</div>
                                <div className="vertical-text right">FOREVER</div>
                                <img 
                                    src={WEDDING_DATA.loveStory.mainPhoto} 
                                    alt="Background Love" 
                                    className="bg-layered-photo"
                                />
                                <img 
                                    src={WEDDING_DATA.loveStory.cutoutPhoto} 
                                    alt="Sticker Couple" 
                                    className="sticker-photo"
                                />
                            </div>
                            <div className="love-you-right">I Love You</div>
            
                            <div className="bottom-content">
                                {WEDDING_DATA.loveStory.bottomQuotes.map((quote, index) => (
                                    <p key={index} style={{margin: '5px 0'}}>{quote}</p>
                                ))}
                            </div>
                        </div>
                        <div className="floating-gift-btn" onClick={() => window.open(WEDDING_DATA.location.mapLink)}>
                          Xem đường đi
                        </div>

            {/* 3. Ảnh Grid - Hiệu ứng Zoom khi xem */}
            <section className="section-grid">
              <div className="photo-grid">
                {weddingPhotos.map((photo, index) => (
                  <motion.div 
                    key={index} 
                    className="grid-item"
                    layoutId={`photo-${index}`} 
                    onClick={() => setSelectedImg(photo)} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, cursor: 'zoom-in' }}
                  >
                    <img src={photo} alt={`grid-${index}`} loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </section>
            <div className="footer-text">"Sự hiện diện của quý khách là niềm vinh dự lớn nhất đối với chúng tôi."</div>
        </div>
        </div>
        <AnimatePresence>
        {selectedImg && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)} // Nhấn ra ngoài để tắt
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.5, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click lan ra ngoài làm tắt ảnh
            >
              <img src={selectedImg} alt="Zoomed" />
              <button className="close-lightbox" onClick={() => setSelectedImg(null)}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> 
      </div>
  );
};

export default HomePage;