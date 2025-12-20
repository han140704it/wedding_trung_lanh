import React, { useState, useRef, useEffect } from 'react';
import './HomePage.css';
import { WEDDING_DATA } from '../../utils/mock_data';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); 
  
  const contentRef = useRef(null);
  const audioRef = useRef(null); 

  const handleEnvelopeClick = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Trình duyệt chặn tự động phát nhạc:", error);
      });
      setIsPlaying(true);
    }
  };
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };    

  const toggleBankInfo = () => {
    setShowBank(!showBank);
  };
  useEffect(() => {
    if (isOpen && contentRef.current) {
      setTimeout(() => {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 800);
    }
  }, [isOpen]);

  const calendarDays = Array.from({length: 31}, (_, i) => i + 1);

  return (
    <div className="wedding-card-container">
      <audio ref={audioRef} loop>
        <source src="/src/assets/music/wedding-song.mp3" type="audio/mpeg" />
        Trình duyệt không hỗ trợ audio.
      </audio>

      <div 
        className={`music-toggle-btn ${isPlaying ? 'spinning' : ''}`} 
        onClick={toggleMusic}
      >
        <span className="music-icon">{isPlaying ? '♫' : '🔇'}</span>
      </div>

      <div className={`invitation-wrapper ${isOpen ? 'is-open' : ''}`}>

        <div className="header-caption">YOU ARE • THE LOVE OF • MY LIFE</div>
        <h1 className="main-title">Wedding Invitation</h1>
        
        <p className="instruction" style={{ opacity: isOpen ? 0 : 1 }}>
          Chạm để mở thiệp
        </p>
        
        {/* KHỐI BAO THƯ */}
        <div className={`envelope-container ${isOpen ? 'is-open' : ''}`} onClick={handleEnvelopeClick}>
          <div className="envelope-flap"></div>
          <div className="envelope-base"></div>
          <div className="wax-seal-img"><span>❤</span></div>
          <img src={WEDDING_DATA.assets.couplePhoto} alt="Couple Pop-up" className="pop-up-photo" />
        </div>

        {/* NỘI DUNG CHI TIẾT HIỆN RA SAU KHI MỞ */}
        <div className="expanded-content" ref={contentRef}>
            
            {/* 1. THÔNG TIN LỜI MỜI */}
            <div className="invitation-body">
                <div className="invite-text-shadow">Trân trọng kính mời</div>
                <h2 className="guest-name-cursive">{WEDDING_DATA.guestName}</h2>
                <div className="event-description">ĐẾN DỰ BUỔI TIỆC CHUNG VUI <br/> CÙNG GIA ĐÌNH CHÚNG TÔI VÀO LÚC</div>
                <div className="date-large">
                    <span>{WEDDING_DATA.time}</span>|<span>{WEDDING_DATA.day}</span>|<span>{WEDDING_DATA.date}</span>
                </div>
                <div className="lunar-date">(Nhằm ngày {WEDDING_DATA.lunarDate})</div>
                
                <div className="location-divider"></div>
                <div className="location-title">HÔN LỄ ĐƯỢC CỬ HÀNH TẠI</div>
                <h3 className="location-name">{WEDDING_DATA.location.name}</h3>
                <p className="location-address">{WEDDING_DATA.location.address}</p>
                <button className="map-button" onClick={() => window.open(WEDDING_DATA.location.mapLink)}>
                    Xem đường đi
                </button>
            </div>

            {/* 2. PHẦN LỊCH THÁNG 1/2026 */}
            <div className="calendar-section">
                <div className="date-large" style={{fontSize: '18px', marginBottom: '10px'}}>
                    THÁNG 01 | 2026
                </div>
                <div className="calendar-grid">
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
                        <div key={day} className="calendar-day" style={{fontWeight: 'bold', fontSize: '12px'}}>{day}</div>
                    ))}
                    {calendarDays.map(day => (
                        <div key={day} className={`calendar-day ${day === WEDDING_DATA.eventDate ? 'marked' : ''}`}>
                            {day}
                        </div>
                    ))}
                </div>
                 <div className="lunar-date" style={{marginTop: '15px'}}>THỨ BẢY | {WEDDING_DATA.date}</div>
            </div>

            {/* 3. PHẦN LOVE STORY VỚI ẢNH XẾP CHỒNG */}
            <div className="love-story-section">
              <h2 className="save-the-date-center">Save the Date</h2>
                <div className="top-quote-container">
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

                <div className="bottom-quote-container">
                    {WEDDING_DATA.loveStory.bottomQuotes.map((quote, index) => (
                        <p key={index} style={{margin: '5px 0'}}>{quote}</p>
                    ))}
                </div>
            </div>

            {/* 4. HỘP QUÀ CƯỚI */}
            <div className="gift-section">
                <div className="gift-icon">♥</div>
                <h3 className="gift-title">Hộp quà cưới</h3>
                <img 
                    src={WEDDING_DATA.assets.giftIcon} 
                    alt="Gift Box" 
                    className="gift-box-img" 
                    onClick={toggleBankInfo}
                    style={{ cursor: 'pointer' }}
                />

                {showBank && (
                    <div className="bank-details-card">
                        <p><strong>{WEDDING_DATA.bankInfo.bankName}</strong></p>
                        <p>Số tài khoản: <span>{WEDDING_DATA.bankInfo.accountNumber}</span></p>
                        <p>Chủ tài khoản: <span>{WEDDING_DATA.bankInfo.accountName}</span></p>
                        <img 
                            src={WEDDING_DATA.bankInfo.qrCode} 
                            alt="QR Code" 
                            className="qr-code-display" 
                        />
                        <button className="close-bank-btn" onClick={toggleBankInfo}>Đóng</button>
                    </div>
                )}
            </div>

            {/* 5. ẢNH LỚN CUỐI THIỆP */}
            <div className="couple-photo-section">
                <div className="vertical-text left">MY LOVE</div>
                <div className="vertical-text right">FOREVER</div>
                <img src={WEDDING_DATA.assets.couplePhoto} alt="Couple Large" className="couple-photo-large" />
            </div>
            <div className="footer-text">"Sự hiện diện của quý khách là niềm vinh dự lớn nhất đối với chúng tôi."</div>
        </div> 
      </div>
    </div>
  );
};

export default HomePage;