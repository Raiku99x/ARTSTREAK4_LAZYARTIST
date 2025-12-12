* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

/* Profile Section */
.profile-section {
    background: white;
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    animation: slideDown 0.6s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.profile-avatar {
    font-size: 60px;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    animation: pulse 2s infinite;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s;
}

.profile-avatar:hover {
    transform: scale(1.05);
}

.profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.profile-info {
    flex: 1;
}

.username-input {
    font-size: 28px;
    font-weight: bold;
    border: none;
    border-bottom: 2px solid #e0e0e0;
    padding: 5px;
    width: 100%;
    max-width: 400px;
    transition: border-color 0.3s;
}

.username-input:focus {
    outline: none;
    border-bottom-color: #667eea;
}

.title-display {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 10px;
}

.title-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 8px 16px;
    color: white;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
}

.title-badge.common {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    animation: shimmer 3s infinite;
}

.title-badge.uncommon {
    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
    animation: shimmerPulse 2.5s infinite;
}

.title-badge.rare {
    background: linear-gradient(135deg, #c084fc 0%, #a855f7 100%);
    animation: rareGlow 2s infinite;
}

.title-badge.epic {
    background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
    animation: epicFlame 1.5s infinite;
    box-shadow: 0 0 15px rgba(251, 146, 60, 0.4);
}

.title-badge.legendary {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    animation: legendaryShine 2s infinite;
    box-shadow: 0 0 25px rgba(251, 191, 36, 0.6), 0 0 50px rgba(251, 191, 36, 0.3);
}

.title-badge.mythic {
    background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%);
    background-size: 200% 200%;
    animation: mythicRainbow 3s infinite, mythicFloat 2s ease-in-out infinite;
    box-shadow: 0 0 30px rgba(236, 72, 153, 0.8), 0 0 60px rgba(139, 92, 246, 0.5), 0 0 90px rgba(59, 130, 246, 0.3);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    font-weight: 700;
    border: 2px solid rgba(255, 255, 255, 0.5);
}

.title-badge.no-title {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    animation: shimmer 3s infinite;
}

@keyframes shimmer {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.8;
    }
}

@keyframes shimmerPulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.85;
        transform: scale(1.02);
    }
}

@keyframes rareGlow {
    0%, 100% {
        box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
        transform: scale(1);
    }
    50% {
        box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
        transform: scale(1.03);
    }
}

@keyframes epicFlame {
    0%, 100% {
        box-shadow: 0 0 15px rgba(251, 146, 60, 0.4), 0 0 30px rgba(249, 115, 22, 0.2);
        transform: scale(1);
    }
    50% {
        box-shadow: 0 0 25px rgba(251, 146, 60, 0.6), 0 0 50px rgba(249, 115, 22, 0.4);
        transform: scale(1.05);
    }
}

@keyframes legendaryShine {
    0%, 100% {
        box-shadow: 0 0 25px rgba(251, 191, 36, 0.6), 0 0 50px rgba(251, 191, 36, 0.3);
        filter: brightness(1);
        transform: scale(1);
    }
    50% {
        box-shadow: 0 0 35px rgba(251, 191, 36, 0.8), 0 0 70px rgba(251, 191, 36, 0.5), 0 0 100px rgba(251, 191, 36, 0.2);
        filter: brightness(1.2);
        transform: scale(1.05);
    }
}

@keyframes mythicRainbow {
    0% {
        background-position: 0% 50%;
        filter: hue-rotate(0deg) brightness(1.2);
    }
    50% {
        background-position: 100% 50%;
        filter: hue-rotate(20deg) brightness(1.4);
    }
    100% {
        background-position: 0% 50%;
        filter: hue-rotate(0deg) brightness(1.2);
    }
}

@keyframes mythicFloat {
    0%, 100% {
        transform: translateY(0px) scale(1);
    }
    50% {
        transform: translateY(-3px) scale(1.08);
    }
}

.change-title-btn {
    padding: 8px 16px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
}

.change-title-btn:hover {
    background: #5568d3;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Streak Grid */
.streak-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.streak-card {
    background: white;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    animation: fadeInUp 0.6s ease-out;
    animation-fill-mode: both;
    position: relative;
    overflow: hidden;
}

.streak-card.daily {
    animation-delay: 0.1s;
}

.streak-card.weekly {
    animation-delay: 0.2s;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.streak-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.streak-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.streak-header h2 {
    font-size: 24px;
    color: #333;
}

.streak-status {
    padding: 5px 12px;
    background: #4ade80;
    color: white;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
}

.streak-status.at-risk {
    background: #f59e0b;
    animation: warningPulse 1s infinite;
}

.streak-status.broken {
    background: #ef4444;
}

@keyframes warningPulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.6;
    }
}

.streak-number {
    font-size: 72px;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    margin: 20px 0;
    animation: countUp 0.8s ease-out;
}

@keyframes countUp {
    from {
        opacity: 0;
        transform: scale(0.5);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.streak-record {
    text-align: center;
    color: #666;
    font-size: 16px;
    margin-bottom: 20px;
}

.streak-record span {
    font-weight: bold;
    color: #667eea;
}

.timer-container {
    background: #f3f4f6;
    border-radius: 12px;
    padding: 15px;
    margin-top: 20px;
}

.timer-label {
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 5px;
}

.timer {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    font-family: 'Courier New', monospace;
    text-align: center;
}

.timer.warning {
    color: #ef4444;
    animation: timerFlash 1s infinite;
}

@keyframes timerFlash {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.4;
    }
}

.upload-count {
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
    color: #666;
}

.upload-count span {
    font-weight: bold;
    color: #667eea;
}

/* Upload Section */
.upload-section {
    background: white;
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    animation: fadeInUp 0.6s ease-out 0.3s;
    animation-fill-mode: both;
    text-align: center;
}

.upload-section h3 {
    margin-bottom: 20px;
    color: #333;
}

.upload-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 15px 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.upload-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.upload-btn:active {
    transform: translateY(-1px);
}

.btn-icon {
    font-size: 24px;
}

.upload-info {
    margin-top: 15px;
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;
}

.upload-info.success {
    background: #d1fae5;
    color: #065f46;
}

.upload-info.error {
    background: #fee2e2;
    color: #991b1b;
}

/* Calendar Section */
.calendar-section {
    background: white;
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    animation: fadeInUp 0.6s ease-out 0.4s;
    animation-fill-mode: both;
}

.calendar-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
    border-bottom: 2px solid #e5e7eb;
}

.calendar-tab-btn {
    padding: 12px 24px;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    color: #666;
    transition: all 0.3s;
    position: relative;
}

.calendar-tab-btn.active {
    color: #667eea;
}

.calendar-tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: #667eea;
}

.calendar-tab-btn:hover {
    color: #667eea;
}

.calendar-view {
    display: block;
}

.calendar-view.hidden {
    display: none;
}

.calendar-view h4 {
    color: #333;
    font-size: 18px;
    margin-bottom: 15px;
    text-align: center;
    font-weight: 600;
}

.calendar-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
}

.calendar-nav-btn {
    background: #667eea;
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.calendar-nav-btn:hover {
    background: #5568d3;
    transform: scale(1.1);
}

.calendar-nav-btn:active {
    transform: scale(0.95);
}

.calendar-grid-wrapper {
    display: flex;
    justify-content: center;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(35px, 1fr));
    gap: 6px;
    max-width: 100%;
}

.calendar-day {
    aspect-ratio: 1;
    background: #f3f4f6;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
}

.calendar-day:hover {
    transform: scale(1.3);
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.calendar-day.has-upload-1 {
    background: #bfdbfe;
}

.calendar-day.has-upload-2 {
    background: #60a5fa;
}

.calendar-day.has-upload-3 {
    background: #2563eb;
}

.calendar-day.today {
    border: 3px solid #667eea;
    box-shadow: 0 0 0 1px #667eea;
}

.calendar-week {
    aspect-ratio: 1;
    background: #f3f4f6;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
}

.calendar-week:hover {
    transform: scale(1.3);
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.calendar-week.has-upload-low {
    background: #bfdbfe;
}

.calendar-week.has-upload-medium {
    background: #60a5fa;
}

.calendar-week.has-upload-high {
    background: #2563eb;
}

.calendar-week.has-upload-complete {
    background: #1e40af;
}

.calendar-week.current-week {
    border: 3px solid #667eea;
    box-shadow: 0 0 0 1px #667eea;
}

/* Gallery Section */
.gallery-section {
    background: white;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    animation: fadeInUp 0.6s ease-out 0.5s;
    animation-fill-mode: both;
}

.gallery-section h3 {
    margin-bottom: 20px;
    color: #333;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
}

.empty-gallery {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 20px;
    color: #999;
    font-size: 18px;
}

.gallery-item {
    position: relative;
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    animation: scaleIn 0.4s ease-out;
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.gallery-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.gallery-item-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    color: white;
    padding: 10px;
    font-size: 11px;
    opacity: 0;
    transition: opacity 0.3s;
}

.gallery-item:hover .gallery-item-info {
    opacity: 1;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    z-index: 1000;
    animation: fadeIn 0.3s;
}

.modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.modal-content {
    background: white;
    border-radius: 20px;
    padding: 30px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    animation: modalSlideUp 0.4s ease-out;
}

@keyframes modalSlideUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.modal-header h2 {
    color: #333;
}

.close-btn {
    background: none;
    border: none;
    font-size: 32px;
    cursor: pointer;
    color: #999;
    transition: color 0.3s;
}

.close-btn:hover {
    color: #333;
}

.title-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    border-bottom: 2px solid #e5e7eb;
}

.tab-btn {
    padding: 10px 20px;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    color: #666;
    transition: all 0.3s;
    position: relative;
}

.tab-btn.active {
    color: #667eea;
}

.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: #667eea;
}

.title-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.title-item {
    padding: 15px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title-item:hover {
    border-color: #667eea;
    background: #f9fafb;
    transform: translateX(5px);
}

.title-item.rare:hover {
    box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
}

.title-item.epic:hover {
    box-shadow: 0 0 20px rgba(251, 146, 60, 0.4);
}

.title-item.legendary:hover {
    box-shadow: 0 0 25px rgba(251, 191, 36, 0.5);
}

.title-item.mythic:hover {
    box-shadow: 0 0 30px rgba(236, 72, 153, 0.6), 0 0 50px rgba(139, 92, 246, 0.3);
    transform: translateX(5px) scale(1.02);
}

.title-item.locked {
    opacity: 0.5;
    cursor: not-allowed;
}

.title-item.locked:hover {
    border-color: #e5e7eb;
    background: white;
}

.title-item.selected {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: #667eea;
}

.title-item-name {
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
}

.title-tier {
    font-size: 10px;
    padding: 3px 8px;
    border-radius: 8px;
    text-transform: uppercase;
    font-weight: 700;
}

.title-tier.common {
    background: #94a3b8;
    color: white;
}

.title-tier.uncommon {
    background: #3b82f6;
    color: white;
}

.title-tier.rare {
    background: #a855f7;
    color: white;
}

.title-tier.epic {
    background: #f97316;
    color: white;
}

.title-tier.legendary {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: white;
    animation: legendaryPulse 2s infinite;
}

.title-tier.mythic {
    background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%);
    background-size: 200% 200%;
    color: white;
    animation: mythicShimmer 3s infinite;
    box-shadow: 0 0 10px rgba(236, 72, 153, 0.6);
}

@keyframes legendaryPulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 5px rgba(251, 191, 36, 0.3);
    }
    50% {
        transform: scale(1.1);
        box-shadow: 0 0 10px rgba(251, 191, 36, 0.6);
    }
}

@keyframes mythicShimmer {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.title-requirement {
    font-size: 12px;
    color: #666;
}

.title-item.selected .title-requirement {
    color: rgba(255,255,255,0.9);
}

/* Fullscreen Modal */
.fullscreen-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.95);
    z-index: 2000;
    animation: fadeIn 0.3s;
}

.fullscreen-modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.fullscreen-close {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 48px;
    color: white;
    cursor: pointer;
    transition: color 0.3s;
    z-index: 2001;
}

.fullscreen-close:hover {
    color: #667eea;
}

.fullscreen-img {
    max-width: 90%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 12px;
    animation: zoomIn 0.4s ease-out;
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.fullscreen-info {
    color: white;
    margin-top: 20px;
    text-align: center;
    font-size: 16px;
}

/* Milestone Notification */
.milestone-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px 30px;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    z-index: 3000;
    transform: translateX(400px);
    transition: transform 0.5s ease-out;
}

.milestone-notification.show {
    transform: translateX(0);
}

.milestone-content {
    display: flex;
    align-items: center;
    gap: 15px;
}

.milestone-icon {
    font-size: 32px;
    animation: bounce 0.6s infinite alternate;
}

@keyframes bounce {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-10px);
    }
}

.milestone-text {
    font-weight: 600;
    font-size: 16px;
}

/* Responsive */
@media (max-width: 768px) {
    .streak-grid {
        grid-template-columns: 1fr;
    }
    
    .gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
    
    .profile-section {
        flex-direction: column;
        text-align: center;
    }
    
    .username-input {
        text-align: center;
    }
}
