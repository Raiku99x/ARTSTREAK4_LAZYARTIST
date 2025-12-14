// Splash Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splashScreen');
        if (splash) {
            splash.style.display = 'none';
        }
    }, 4000); // 4 seconds total (3s animation + 1s buffer)
});

// Title Data

const DAILY_TITLES = [
    { id: 1, name: "Fresh Canvas", requirement: 1, tier: "common" },
    { id: 2, name: "Sketch Starter", requirement: 3, tier: "common" },
    { id: 3, name: "Line Learner", requirement: 7, tier: "common" },
    { id: 4, name: "Ten-Day Illustrator", requirement: 10, tier: "common" },
    { id: 5, name: "Half-Month Creator", requirement: 15, tier: "uncommon" },
    { id: 6, name: "Brush Beginner", requirement: 20, tier: "uncommon" },
    { id: 7, name: "One-Month Maker", requirement: 30, tier: "uncommon" },
    { id: 8, name: "Form Builder", requirement: 45, tier: "rare" },
    { id: 9, name: "Stroke Striver", requirement: 60, tier: "rare" },
    { id: 10, name: "Color Explorer", requirement: 80, tier: "rare" },
    { id: 11, name: "Century Sketcher", requirement: 100, tier: "rare" },
    { id: 12, name: "Half-Year Artist", requirement: 150, tier: "rare" },
    { id: 13, name: "Double-Century Designer", requirement: 200, tier: "epic" },
    { id: 14, name: "Quarter-K Creator", requirement: 250, tier: "epic" },
    { id: 15, name: "Triple-Century Artisan", requirement: 300, tier: "epic" },
    { id: 16, name: "Vision Vanguard", requirement: 350, tier: "epic" },
    { id: 17, name: "Quad-Century Illustrator", requirement: 400, tier: "legendary" },
    { id: 18, name: "Half-Thousand Artmaster", requirement: 500, tier: "legendary" },
    { id: 19, name: "Six-Hundred Sketch Sage", requirement: 600, tier: "legendary" },
    { id: 20, name: "Canvas Conqueror", requirement: 750, tier: "mythic" }
];

const WEEKLY_TITLES = [
    { id: 1, name: "Weekend Sketcher", requirement: 1, tier: "common" },
    { id: 2, name: "Line-Loyal Apprentice", requirement: 2, tier: "common" },
    { id: 3, name: "Monthly Maker", requirement: 4, tier: "common" },
    { id: 4, name: "Palette Pathfinder", requirement: 6, tier: "common" },
    { id: 5, name: "Ten-Week Illustrator", requirement: 10, tier: "uncommon" },
    { id: 6, name: "Artful Adventurer", requirement: 20, tier: "uncommon" },
    { id: 7, name: "Canvas Challenger", requirement: 30, tier: "uncommon" },
    { id: 8, name: "Brushwork Guardian", requirement: 40, tier: "rare" },
    { id: 9, name: "Yearly Artisan", requirement: 52, tier: "rare" },
    { id: 10, name: "Seasoned Stylist", requirement: 65, tier: "rare" },
    { id: 11, name: "Virtuoso Voyager", requirement: 80, tier: "rare" },
    { id: 12, name: "Century Creator", requirement: 100, tier: "epic" },
    { id: 13, name: "Studio Sentinel", requirement: 120, tier: "epic" },
    { id: 14, name: "Craft Crusader", requirement: 140, tier: "epic" },
    { id: 15, name: "Masterpiece Keeper", requirement: 160, tier: "legendary" },
    { id: 16, name: "Easel Emperor", requirement: 180, tier: "legendary" },
    { id: 17, name: "Grandmaster of Mediums", requirement: 200, tier: "legendary" },
    { id: 18, name: "The Four-Year Evergreen Artist", requirement: 208, tier: "mythic" }
];

// State
let state = {
    username: "Artist",
    avatarImage: null,
    dailyStreak: 0,
    weeklyStreak: 0,
    dailyLongest: 0,
    weeklyLongest: 0,
    lastDailyUpload: null,
    lastWeeklyUpload: null,
    currentWeekStart: null,
    uploads: [],
    selectedTitle: null,
    dailyUploadsToday: 0,
    weeklyUploadsThisWeek: 0,
    currentMonthView: new Date(),
    currentYearView: new Date().getFullYear(),
    milestonesShown: [] // FIX #7: Track shown milestones
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initializeElements();
    checkStreaks(); // FIX #5: Call before updateUI to ensure proper reset
    updateUI();
    startTimers();
    renderDailyCalendar();
    renderWeeklyCalendar();
    renderGallery();
    checkMilestonesOnLoad(); // FIX #7: Check milestones on page load
});

function initializeElements() {
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const changeTitleBtn = document.getElementById('changeTitleBtn');
    const closeModal = document.getElementById('closeModal');
    const titleModal = document.getElementById('titleModal');
    const usernameInput = document.getElementById('username');
    const fullscreenClose = document.getElementById('fullscreenClose');
    const fullscreenModal = document.getElementById('fullscreenModal');
    const profileAvatar = document.getElementById('profileAvatar');
    const avatarInput = document.getElementById('avatarInput');

    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    changeTitleBtn.addEventListener('click', () => openTitleModal());
    closeModal.addEventListener('click', () => titleModal.classList.remove('active'));
    usernameInput.addEventListener('input', (e) => {
        state.username = e.target.value || "Artist";
        saveState();
    });
    
    // FIX #8: Better fullscreen modal handling
    fullscreenClose.addEventListener('click', (e) => {
        e.stopPropagation();
        fullscreenModal.classList.remove('active');
    });
    fullscreenModal.addEventListener('click', (e) => {
        if (e.target === fullscreenModal) {
            fullscreenModal.classList.remove('active');
        }
    });

    // Profile avatar upload
    profileAvatar.addEventListener('click', () => avatarInput.click());
    avatarInput.addEventListener('change', handleAvatarUpload);

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTitles(btn.dataset.tab);
            // FIX #6: Scroll to top and manage focus
            document.getElementById('titleList').scrollTop = 0;
            document.getElementById('titleList').focus();
        });
    });

    // Calendar tab switching
    document.querySelectorAll('.calendar-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.calendar-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const calendarType = btn.dataset.calendar;
            document.getElementById('dailyCalendarView').classList.toggle('hidden', calendarType !== 'daily');
            document.getElementById('weeklyCalendarView').classList.toggle('hidden', calendarType !== 'weekly');
        });
    });

    // Calendar navigation - FIX #1: Better logic and feedback
    document.getElementById('prevMonth').addEventListener('click', () => {
        state.currentMonthView.setMonth(state.currentMonthView.getMonth() - 1);
        renderDailyCalendar();
        saveState();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const nextMonth = new Date(state.currentMonthView);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(1); // Go to first day of next month
        
        if (nextMonth <= today) {
            state.currentMonthView = nextMonth;
            renderDailyCalendar();
            saveState();
        } else {
            showUploadInfo("Can't view future months", 'error');
        }
    });

    document.getElementById('prevYear').addEventListener('click', () => {
        state.currentYearView--;
        renderWeeklyCalendar();
        saveState();
    });

    document.getElementById('nextYear').addEventListener('click', () => {
        const currentYear = new Date().getFullYear();
        
        if (state.currentYearView < currentYear) {
            state.currentYearView++;
            renderWeeklyCalendar();
            saveState();
        } else {
            showUploadInfo("Can't view future years", 'error');
        }
    });

    usernameInput.value = state.username;
    
    // Load avatar if exists
    if (state.avatarImage) {
        updateAvatarDisplay();
    }
}

// FIX #3: Better file input reset and consecutive upload handling
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Check daily upload limit (max 3 per day)
    if (state.dailyUploadsToday >= 3) {
        showUploadInfo("You've reached the daily upload limit (3 uploads)", 'error');
        // Clear input to allow re-upload
        setTimeout(() => {
            e.target.value = '';
        }, 0);
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const now = new Date();
        const upload = {
            id: Date.now() + Math.random(), // Ensure unique ID even for same file
            image: event.target.result,
            timestamp: now.toISOString(),
            date: now.toDateString()
        };

        state.uploads.unshift(upload);
        state.dailyUploadsToday++;
        state.weeklyUploadsThisWeek = Math.min(state.weeklyUploadsThisWeek + 1, 21);

        // Update streaks (only first upload of the day counts for daily streak)
        if (state.dailyUploadsToday === 1) {
            updateDailyStreak();
        }
        
        // First upload of the week counts for weekly streak
        if (state.weeklyUploadsThisWeek === 1) {
            updateWeeklyStreak();
        }

        saveState();
        updateUI();
        renderDailyCalendar();
        renderWeeklyCalendar();
        renderGallery();
        
        const uploadNum = state.dailyUploadsToday === 1 ? 
            "✅ Upload complete! Daily & Weekly streaks updated!" : 
            `✅ Upload ${state.dailyUploadsToday}/3 complete!`;
        showUploadInfo(uploadNum, 'success');
        
        checkMilestones();
    };
    
    reader.onerror = () => {
        showUploadInfo("Error reading file", 'error');
    };
    
    reader.readAsDataURL(file);
    
    // Clear input after a brief delay to allow consecutive uploads
    setTimeout(() => {
        e.target.value = '';
    }, 100);
}

// FIX #2: Better avatar upload handling
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        state.avatarImage = event.target.result;
        saveState();
        updateAvatarDisplay();
        showUploadInfo("✅ Profile picture updated!", 'success');
    };
    
    reader.onerror = () => {
        showUploadInfo("Error uploading profile picture", 'error');
    };
    
    reader.readAsDataURL(file);
    e.target.value = '';
}

function updateAvatarDisplay() {
    const profileAvatar = document.getElementById('profileAvatar');
    if (state.avatarImage) {
        // FIX #2: Clear content and add img properly
        profileAvatar.innerHTML = '';
        const img = document.createElement('img');
        img.src = state.avatarImage;
        img.alt = 'Profile';
        profileAvatar.appendChild(img);
    } else {
        profileAvatar.textContent = '🎨';
    }
}

function updateDailyStreak() {
    const now = new Date();
    const today = now.toDateString();
    
    if (!state.lastDailyUpload) {
        state.dailyStreak = 1;
    } else {
        const lastUpload = new Date(state.lastDailyUpload);
        const lastDate = lastUpload.toDateString();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastDate === today) {
            // Already uploaded today
            return;
        } else if (lastDate === yesterdayStr) {
            // Consecutive day
            state.dailyStreak++;
        } else {
            // Streak broken
            state.dailyStreak = 1;
        }
    }

    state.lastDailyUpload = now.toISOString();
    if (state.dailyStreak > state.dailyLongest) {
        state.dailyLongest = state.dailyStreak;
    }
}

// FIX #4: Improved weekly streak logic with better week boundary handling
function updateWeeklyStreak() {
    const now = new Date();
    const currentWeekStart = getWeekStart(now);
    
    if (!state.currentWeekStart) {
        // First week
        state.currentWeekStart = currentWeekStart.toISOString();
        state.weeklyStreak = 1;
    } else {
        const savedWeekStart = new Date(state.currentWeekStart);
        
        if (currentWeekStart.getTime() === savedWeekStart.getTime()) {
            // Same week - already counted
            return;
        }
        
        // Check if it's the next consecutive week
        const nextWeek = new Date(savedWeekStart);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        if (currentWeekStart.getTime() === nextWeek.getTime()) {
            // Consecutive week
            state.weeklyStreak++;
        } else {
            // Streak broken - reset to 1
            state.weeklyStreak = 1;
        }
        
        // Update week start
        state.currentWeekStart = currentWeekStart.toISOString();
    }

    state.lastWeeklyUpload = now.toISOString();
    if (state.weeklyStreak > state.weeklyLongest) {
        state.weeklyLongest = state.weeklyStreak;
    }
}

function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day; // Sunday = 0
    return new Date(d.setDate(diff));
}

// FIX #5: Separate and improve checkStreaks logic
function checkStreaks() {
    const now = new Date();
    
    // Reset daily upload count if new day
    const today = now.toDateString();
    const lastUploadDate = state.lastDailyUpload ? new Date(state.lastDailyUpload).toDateString() : null;
    if (lastUploadDate !== today && state.lastDailyUpload) {
        state.dailyUploadsToday = 0;
    }

    // Reset weekly upload count if new week
    const currentWeekStart = getWeekStart(now);
    if (state.currentWeekStart && new Date(state.currentWeekStart).getTime() !== currentWeekStart.getTime()) {
        state.weeklyUploadsThisWeek = 0;
    }

    // Check daily streak validity
    if (state.lastDailyUpload) {
        const lastUpload = new Date(state.lastDailyUpload);
        const lastDate = lastUpload.toDateString();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastDate !== today && lastDate !== yesterdayStr) {
            // Streak broken
            state.dailyStreak = 0;
        }
    }

    // Check weekly streak validity
    if (state.currentWeekStart) {
        const savedWeekStart = new Date(state.currentWeekStart);
        const weekBeforeLast = new Date(currentWeekStart);
        weekBeforeLast.setDate(weekBeforeLast.getDate() - 7);
        
        if (currentWeekStart.getTime() !== savedWeekStart.getTime()) {
            // We're in a new week
            if (!state.lastWeeklyUpload || new Date(state.lastWeeklyUpload) <= weekBeforeLast) {
                // Missed last week
                state.weeklyStreak = 0;
            }
        }
    }

    saveState();
}

function updateUI() {
    // Update streak numbers
    document.getElementById('dailyStreak').textContent = state.dailyStreak;
    document.getElementById('weeklyStreak').textContent = state.weeklyStreak;
    document.getElementById('dailyLongest').textContent = state.dailyLongest;
    document.getElementById('weeklyLongest').textContent = state.weeklyLongest;

    // Update upload counts
    document.getElementById('dailyUploadCount').textContent = state.dailyUploadsToday;
    document.getElementById('weeklyUploadCount').textContent = Math.min(state.weeklyUploadsThisWeek, 21);

    // Update streak status
    updateStreakStatus();

    // Update selected title
    updateTitleDisplay();
}

function updateStreakStatus() {
    const dailyStatus = document.getElementById('dailyStatus');
    const weeklyStatus = document.getElementById('weeklyStatus');

    // Daily status
    if (state.dailyUploadsToday > 0) {
        dailyStatus.textContent = 'Complete';
        dailyStatus.className = 'streak-status';
    } else if (getTimeUntilMidnight() < 5 * 60 * 60 * 1000) {
        dailyStatus.textContent = 'At Risk!';
        dailyStatus.className = 'streak-status at-risk';
    } else {
        dailyStatus.textContent = 'Pending';
        dailyStatus.className = 'streak-status pending';
    }

    // Weekly status
    if (state.weeklyUploadsThisWeek > 0) {
        weeklyStatus.textContent = 'Complete';
        weeklyStatus.className = 'streak-status';
    } else if (getTimeUntilWeekEnd() < 5 * 60 * 60 * 1000) {
        weeklyStatus.textContent = 'At Risk!';
        weeklyStatus.className = 'streak-status at-risk';
    } else {
        weeklyStatus.textContent = 'Pending';
        weeklyStatus.className = 'streak-status pending';
    }
}

function startTimers() {
    updateTimers();
    setInterval(updateTimers, 1000);
}

function updateTimers() {
    const dailyTimer = document.getElementById('dailyTimer');
    const weeklyTimer = document.getElementById('weeklyTimer');

    const dailyTime = getTimeUntilMidnight();
    const weeklyTime = getTimeUntilWeekEnd();

    dailyTimer.textContent = formatTime(dailyTime);
    weeklyTimer.textContent = formatWeeklyTime(weeklyTime);

    // Add warning class if under 5 hours
    if (dailyTime < 5 * 60 * 60 * 1000) {
        dailyTimer.classList.add('warning');
    } else {
        dailyTimer.classList.remove('warning');
    }

    if (weeklyTime < 5 * 60 * 60 * 1000) {
        weeklyTimer.classList.add('warning');
    } else {
        weeklyTimer.classList.remove('warning');
    }

    updateStreakStatus();
}

function getTimeUntilMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(23, 59, 59, 999);
    return midnight - now;
}

function getTimeUntilWeekEnd() {
    const now = new Date();
    const weekEnd = new Date(now);
    const daysUntilSunday = 7 - now.getDay();
    weekEnd.setDate(now.getDate() + daysUntilSunday);
    weekEnd.setHours(23, 59, 59, 999);
    return weekEnd - now;
}

function formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatWeeklyTime(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${days}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// FIX #9: Better calendar rendering for mobile
function renderDailyCalendar() {
    const calendarGrid = document.getElementById('dailyCalendarGrid');
    const titleEl = document.getElementById('dailyCalendarTitle');
    calendarGrid.innerHTML = '';

    const viewDate = new Date(state.currentMonthView);
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    // Update title
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    titleEl.textContent = `${monthNames[month]} ${year}`;

    // Get first and last day of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const today = new Date();
    const todayStr = today.toDateString();

    // Render all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toDateString();

        const dayUploads = state.uploads.filter(u => u.date === dateStr).length;
        
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.setAttribute('data-date', dateStr);
        
        if (dayUploads > 0) {
            dayEl.classList.add(`has-upload-${Math.min(dayUploads, 3)}`);
        }
        
        if (dateStr === todayStr) {
            dayEl.classList.add('today');
        }

        dayEl.title = `${dateStr}: ${dayUploads} upload${dayUploads !== 1 ? 's' : ''}`;
        calendarGrid.appendChild(dayEl);
    }
}

function renderWeeklyCalendar() {
    const calendarGrid = document.getElementById('weeklyCalendarGrid');
    const titleEl = document.getElementById('weeklyCalendarTitle');
    calendarGrid.innerHTML = '';

    const year = state.currentYearView;
    titleEl.textContent = `${year}`;

    // Get first day of the year
    const yearStart = new Date(year, 0, 1);
    
    // Find the first Sunday of the year
    const firstSunday = new Date(yearStart);
    const dayOfWeek = yearStart.getDay();
    if (dayOfWeek !== 0) {
        firstSunday.setDate(yearStart.getDate() - dayOfWeek);
    }

    const today = new Date();
    const currentWeekStart = getWeekStart(today);

    // Render 52-53 weeks
    for (let weekNum = 0; weekNum < 53; weekNum++) {
        const weekStart = new Date(firstSunday);
        weekStart.setDate(firstSunday.getDate() + (weekNum * 7));
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        // Only show weeks that overlap with the selected year
        if (weekEnd.getFullYear() < year || weekStart.getFullYear() > year) {
            continue;
        }

        // Count uploads in this week
        const weekUploads = state.uploads.filter(upload => {
            const uploadDate = new Date(upload.date);
            return uploadDate >= weekStart && uploadDate <= weekEnd;
        }).length;

        const weekEl = document.createElement('div');
        weekEl.className = 'calendar-week';
        weekEl.setAttribute('data-week', weekNum + 1);
        
        // Color based on upload count (0-21 possible)
        if (weekUploads === 0) {
            // Keep default gray
        } else if (weekUploads <= 7) {
            weekEl.classList.add('has-upload-low');
        } else if (weekUploads <= 14) {
            weekEl.classList.add('has-upload-medium');
        } else if (weekUploads <= 21) {
            weekEl.classList.add('has-upload-high');
        }

        // Mark current week
        if (weekStart.getTime() === currentWeekStart.getTime()) {
            weekEl.classList.add('current-week');
        }

        weekEl.title = `Week ${weekNum + 1} (${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}): ${weekUploads} upload${weekUploads !== 1 ? 's' : ''}`;
        
        calendarGrid.appendChild(weekEl);
    }
}

function renderCalendar() {
    // Legacy function - keeping for compatibility
    renderDailyCalendar();
    renderWeeklyCalendar();
}

function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (state.uploads.length === 0) {
        galleryGrid.innerHTML = '<div class="empty-gallery">No uploads yet. Start your streak today! 🎨</div>';
        return;
    }

    galleryGrid.innerHTML = '';
    state.uploads.forEach(upload => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-id', upload.id);
        
        const img = document.createElement('img');
        img.src = upload.image;
        img.alt = 'Uploaded art';
        
        const info = document.createElement('div');
        info.className = 'gallery-item-info';
        const date = new Date(upload.timestamp);
        info.textContent = date.toLocaleString();
        
        item.appendChild(img);
        item.appendChild(info);
        
        item.addEventListener('click', () => showFullscreen(upload));
        
        galleryGrid.appendChild(item);
    });
}

function showFullscreen(upload) {
    const modal = document.getElementById('fullscreenModal');
    const img = document.getElementById('fullscreenImg');
    const info = document.getElementById('fullscreenInfo');
    
    img.src = upload.image;
    const date = new Date(upload.timestamp);
    info.textContent = `Uploaded: ${date.toLocaleString()}`;
    
    modal.classList.add('active');
}

function openTitleModal() {
    const modal = document.getElementById('titleModal');
    modal.classList.add('active');
    renderTitles('daily');
    // FIX #6: Set focus for accessibility
    setTimeout(() => {
        document.querySelector('.tab-btn.active').focus();
    }, 100);
}

function renderTitles(type) {
    const titleList = document.getElementById('titleList');
    titleList.innerHTML = '';

    const titles = type === 'daily' ? DAILY_TITLES : WEEKLY_TITLES;
    const currentStreak = type === 'daily' ? state.dailyStreak : state.weeklyStreak;

    titles.forEach(title => {
        const item = document.createElement('div');
        item.className = 'title-item';
        item.setAttribute('role', 'option'); // FIX #6: Accessibility
        
        const unlocked = currentStreak >= title.requirement;
        if (!unlocked) {
            item.classList.add('locked');
            item.setAttribute('aria-disabled', 'true');
        } else {
            item.classList.add(title.tier);
            item.setAttribute('aria-disabled', 'false');
        }

        const isSelected = state.selectedTitle && 
                          state.selectedTitle.id === title.id && 
                          state.selectedTitle.type === type;
        if (isSelected) {
            item.classList.add('selected');
            item.setAttribute('aria-selected', 'true');
        }

        const prefix = type === 'daily' ? '[D]' : '[W]';
        
        item.innerHTML = `
            <div class="title-item-name">
                <span class="title-tier ${title.tier}">${title.tier}</span>
                <span>${prefix} ${title.name}</span>
            </div>
            <div class="title-requirement">${unlocked ? 'Unlocked!' : `${title.requirement} ${type === 'daily' ? 'days' : 'weeks'} needed`}</div>
        `;

        if (unlocked) {
            item.addEventListener('click', () => selectTitle(title, type));
            item.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    selectTitle(title, type);
                }
            });
        }

        titleList.appendChild(item);
    });
}

function selectTitle(title, type) {
    state.selectedTitle = { ...title, type };
    saveState();
    updateTitleDisplay();
    renderTitles(type);
}

function updateTitleDisplay() {
    const titleDisplay = document.getElementById('currentTitle');
    
    if (!state.selectedTitle) {
        titleDisplay.innerHTML = `
            <span class="title-badge no-title">No Title Selected</span>
            <button class="change-title-btn" id="changeTitleBtn">Change Title</button>
        `;
    } else {
        const prefix = state.selectedTitle.type === 'daily' ? '[D]' : '[W]';
        const tierClass = state.selectedTitle.tier;
        titleDisplay.innerHTML = `
            <span class="title-badge ${tierClass}">${prefix} ${state.selectedTitle.name}</span>
            <button class="change-title-btn" id="changeTitleBtn">Change Title</button>
        `;
    }

    // Re-attach event listener
    document.getElementById('changeTitleBtn').addEventListener('click', () => openTitleModal());
}

// FIX #7: Check milestones on page load and prevent duplicates
function checkMilestonesOnLoad() {
    const milestones = [
        { streak: 7, type: 'daily', message: '🔥 7 Day Streak! You\'re building momentum!' },
        { streak: 30, type: 'daily', message: '🎉 30 Day Streak! One month strong!' },
        { streak: 100, type: 'daily', message: '💎 100 Day Streak! You\'re a legend!' },
        { streak: 365, type: 'daily', message: '⭐ ONE YEAR STREAK! Incredible dedication!' },
        { streak: 4, type: 'weekly', message: '🎨 1 Month Weekly Streak! Great consistency!' },
        { streak: 52, type: 'weekly', message: '🏆 ONE YEAR Weekly Streak! Amazing commitment!' }
    ];

    milestones.forEach(milestone => {
        const streak = milestone.type === 'daily' ? state.dailyStreak : state.weeklyStreak;
        const milestoneKey = `${milestone.type}-${milestone.streak}`;
        
        if (streak === milestone.streak && !state.milestonesShown.includes(milestoneKey)) {
            showMilestone(milestone.message);
            state.milestonesShown.push(milestoneKey);
            saveState();
        }
    });
}

function checkMilestones() {
    const milestones = [
        { streak: 7, type: 'daily', message: '🔥 7 Day Streak! You\'re building momentum!' },
        { streak: 30, type: 'daily', message: '🎉 30 Day Streak! One month strong!' },
        { streak: 100, type: 'daily', message: '💎 100 Day Streak! You\'re a legend!' },
        { streak: 365, type: 'daily', message: '⭐ ONE YEAR STREAK! Incredible dedication!' },
        { streak: 4, type: 'weekly', message: '🎨 1 Month Weekly Streak! Great consistency!' },
        { streak: 52, type: 'weekly', message: '🏆 ONE YEAR Weekly Streak! Amazing commitment!' }
    ];

    milestones.forEach(milestone => {
        const streak = milestone.type === 'daily' ? state.dailyStreak : state.weeklyStreak;
        const milestoneKey = `${milestone.type}-${milestone.streak}`;
        
        if (streak === milestone.streak && !state.milestonesShown.includes(milestoneKey)) {
            showMilestone(milestone.message);
            state.milestonesShown.push(milestoneKey);
            saveState();
        }
    });
}

function showMilestone(message) {
    const notif = document.getElementById('milestoneNotif');
    notif.querySelector('.milestone-text').textContent = message;
    notif.classList.add('show');

    setTimeout(() => {
        notif.classList.remove('show');
    }, 5000);
}

function showUploadInfo(message, type) {
    const info = document.getElementById('uploadInfo');
    info.textContent = message;
    info.className = `upload-info ${type}`;

    setTimeout(() => {
        info.textContent = '';
        info.className = 'upload-info';
    }, 3000);
}

function saveState() {
    localStorage.setItem('artistStreakState', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('artistStreakState');
    if (saved) {
        const loaded = JSON.parse(saved);
        state = { ...state, ...loaded };
        
        // Convert date strings back to Date objects
        if (state.currentMonthView) {
            state.currentMonthView = new Date(state.currentMonthView);
        } else {
            state.currentMonthView = new Date();
        }
        
        if (!state.currentYearView) {
            state.currentYearView = new Date().getFullYear();
        }

        // FIX #7: Ensure milestonesShown exists
        if (!state.milestonesShown) {
            state.milestonesShown = [];
        }
    }
}