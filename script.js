// Professional Game Script
class ProGameEngine {
    constructor() {
        this.currentView = 'dashboard';
        this.teams = [];
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.scores = {};
        this.timer = null;
        this.timeLeft = 0;
        this.gameStarted = false;
        this.notifications = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboardContent();
        this.showView('dashboard');
        this.createAnimatedBackground();
        this.startAmbientAnimation();
    }

    setupEventListeners() {
        // Add professional event listeners
        $(document).on('click', '.pro-button', function() {
            $(this).addClass('clicked');
            setTimeout(() => $(this).removeClass('clicked'), 200);
        });

        // Keyboard shortcuts for professional gameplay
        $(document).keydown((e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.which) {
                    case 78: // Ctrl+N for new game
                        e.preventDefault();
                        this.newGame();
                        break;
                    case 83: // Ctrl+S for save
                        e.preventDefault();
                        this.saveGameState();
                        break;
                    case 82: // Ctrl+R for reset
                        e.preventDefault();
                        this.resetGame();
                        break;
                }
            }
        });
    }

    createAnimatedBackground() {
        // Create animated background elements
        const bgContainer = $('<div class="animated-bg"></div>');
        for (let i = 0; i < 3; i++) {
            bgContainer.append(`<div class="bg-circle"></div>`);
        }
        $('body').prepend(bgContainer);
    }

    startAmbientAnimation() {
        // Start ambient animations for professional feel
        setInterval(() => {
            $('.bg-circle').each(function(index) {
                const hue = (Date.now() / 50 + index * 120) % 360;
                $(this).css('filter', `blur(60px) hue-rotate(${hue}deg)`);
            });
        }, 100);
    }

    showNotification(message, type = 'success') {
        const notification = $(`
            <div class="notification ${type}">
                ${message}
            </div>
        `);
        
        $('body').append(notification);
        setTimeout(() => {
            notification.addClass('show');
        }, 10);

        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showView(viewId) {
        // Hide all views
        $('.view').addClass('hidden');
        
        // Show requested view
        $(`#view-${viewId}`).removeClass('hidden');
        
        this.currentView = viewId;
        
        // Update navigation
        this.updateNavigation();
    }

    updateNavigation() {
        if (this.currentView !== 'dashboard') {
            $('#nav-home-wrapper').removeClass('hidden');
        } else {
            $('#nav-home-wrapper').addClass('hidden');
        }
    }

    loadDashboardContent() {
        // Load solo games
        const soloGames = [
            { name: 'الأسئلة العامة', icon: 'quiz', color: 'from-purple-600 to-pink-600' },
            { name: 'الحقائق المدهشة', icon: 'science', color: 'from-blue-600 to-cyan-600' },
            { name: 'اللغز اليوم', icon: 'psychology', color: 'from-green-600 to-teal-600' },
            { name: 'الرياضيات', icon: 'calculate', color: 'from-yellow-600 to-orange-600' },
            { name: 'التاريخ', icon: 'history_edu', color: 'from-red-600 to-pink-600' },
            { name: 'الجغرافيا', icon: 'location_on', color: 'from-indigo-600 to-purple-600' },
            { name: 'الرياضة', icon: 'sports', color: 'from-emerald-600 to-green-600' },
            { name: 'الفنون', icon: 'palette', color: 'from-rose-600 to-pink-600' }
        ];

        const soloGrid = $('#dashboard-solo-grid');
        soloGrid.empty();

        soloGames.forEach(game => {
            soloGrid.append(`
                <div class="glass-card rounded-2xl p-6 cursor-pointer hover:transform hover:scale-105 transition-all duration-300 group">
                    <div class="text-center">
                        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${game.color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:shadow-xl">
                            <span class="material-symbols-outlined">${game.icon}</span>
                        </div>
                        <h4 class="font-bold text-white text-lg mb-2">${game.name}</h4>
                        <button class="w-full mt-4 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition text-sm font-medium">
                            البدء
                        </button>
                    </div>
                </div>
            `);
        });

        // Load tools
        const tools = [
            { name: 'منشئ الأسئلة', icon: 'add_circle', color: 'from-cyan-600 to-blue-600' },
            { name: 'إدارة النقاط', icon: 'leaderboard', color: 'from-emerald-600 to-green-600' },
            { name: 'الإحصائيات', icon: 'analytics', color: 'from-violet-600 to-purple-600' },
            { name: 'الإعدادات', icon: 'settings', color: 'from-amber-600 to-orange-600' }
        ];

        const toolsGrid = $('#dashboard-tools-grid');
        toolsGrid.empty();

        tools.forEach(tool => {
            toolsGrid.append(`
                <div class="glass-card rounded-xl p-4 cursor-pointer hover:transform hover:scale-105 transition-all duration-300 group">
                    <div class="text-center">
                        <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${tool.color} flex items-center justify-center text-white text-xl shadow-md group-hover:shadow-lg">
                            <span class="material-symbols-outlined">${tool.icon}</span>
                        </div>
                        <p class="text-white text-sm font-medium">${tool.name}</p>
                    </div>
                </div>
            `);
        });
    }

    addTeamField() {
        const teamsList = $('#teamsList');
        const teamCount = teamsList.children().length + 1;
        
        teamsList.append(`
            <div class="relative group animate-pop">
                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined">badge</span>
                <input type="text" placeholder="اسم الفريق ${teamCount}" class="gaming-input w-full py-4 pr-12 pl-4 rounded-xl text-white outline-none font-semibold placeholder-gray-600">
            </div>
        `);
    }

    toggleGridConfig(show) {
        if (show) {
            $('#gridConfigBtnArea').removeClass('hidden');
        } else {
            $('#gridConfigBtnArea').addClass('hidden');
        }
    }

    openBulkSetupModal() {
        $('#bulkSetupModal').removeClass('hidden');
        this.populateBulkCategories();
    }

    populateBulkCategories() {
        const categories = [
            { key: 'general', label: 'الأسئلة العامة', subType: 'categories' },
            { key: 'letters', label: 'الكلمات (حسب الحروف)', subType: 'letters' },
            { key: 'numbers', label: 'الحساب (حسب الأرقام)', subType: 'numbers' },
            { key: 'subjects', label: 'المواضيع المختلفة', subType: 'categories' }
        ];

        const container = $('#bulkCategoriesList');
        container.empty();

        categories.forEach(cat => {
            container.append(`
                <div class="p-3 rounded-xl bg-gray-800/50 border border-gray-600/50 hover:border-purple-500/50 cursor-pointer transition flex items-center justify-between" onclick="game.selectBulkCategory('${cat.key}', '${cat.label}', '${cat.subType}')">
                    <span class="text-white font-medium">${cat.label}</span>
                    <span class="material-symbols-outlined text-purple-400">arrow_forward_ios</span>
                </div>
            `);
        });
    }

    selectBulkCategory(key, label, subType) {
        currentBulkKey = key;
        currentBulkLabel = label;
        
        $('#bulkSubTitle').text(label);
        $('#bulkSubArea').removeClass('hidden');
        
        this.populateBulkSubOptions(subType);
    }

    populateBulkSubOptions(subType) {
        const container = $('#bulkSubOptions');
        container.empty();

        if (subType === 'letters') {
            const letters = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'];
            letters.forEach(letter => {
                container.append(`
                    <button onclick="game.addToBulkPool('${currentBulkKey}', '${letter}', 'specific')" class="p-2 bg-gray-700 hover:bg-purple-600 rounded-lg text-white text-sm transition">
                        ${letter}
                    </button>
                `);
            });
        } else if (subType === 'numbers') {
            for (let i = 1; i <= 20; i++) {
                container.append(`
                    <button onclick="game.addToBulkPool('${currentBulkKey}', '${i}', 'specific')" class="p-2 bg-gray-700 hover:bg-blue-600 rounded-lg text-white text-sm transition">
                        ${i}
                    </button>
                `);
            }
        } else if (subType === 'categories') {
            const subjects = ['العلوم', 'التاريخ', 'الجغرافيا', 'الرياضة', 'الفنون', 'الأدب', 'التقنية', 'الصحة'];
            subjects.forEach(subject => {
                container.append(`
                    <button onclick="game.addToBulkPool('${currentBulkKey}', '${subject}', 'specific')" class="p-2 bg-gray-700 hover:bg-green-600 rounded-lg text-white text-sm transition">
                        ${subject}
                    </button>
                `);
            });
        }
    }

    addToBulkPool(key, value, type) {
        const poolList = $('#bulkPoolList');
        if (poolList.find('.text-gray-500').length === 1) {
            poolList.empty();
        }

        const item = $(`
            <div class="p-3 rounded-xl bg-purple-600/20 border border-purple-500/30 flex justify-between items-center">
                <span class="text-white">${value}</span>
                <button onclick="this.parentElement.remove(); game.updatePoolCount();" class="text-red-400 hover:text-red-300">
                    <span class="material-symbols-outlined text-sm">close</span>
                </button>
            </div>
        `);
        
        poolList.append(item);
        this.updatePoolCount();
    }

    updatePoolCount() {
        const count = $('#bulkPoolList').children().length;
        $('#poolCountBadge').text(count);
    }

    startStreamGame() {
        // Get teams from input fields
        const teamInputs = $('#teamsList input');
        this.teams = [];
        
        teamInputs.each((index, input) => {
            const teamName = $(input).val().trim();
            if (teamName) {
                this.teams.push({
                    id: index,
                    name: teamName,
                    score: 0
                });
            }
        });

        if (this.teams.length < 1) {
            this.showNotification('يرجى إدخال اسم فريق واحد على الأقل', 'error');
            return;
        }

        // Get game settings
        const qCount = parseInt($('#qCountInput').val());
        const timerDefault = parseInt($('#timerInput').val());
        const gameStyle = $('input[name="gameStyle"]:checked').val();
        const selectionMode = $('input[name="selectionMode"]:checked').val();

        this.gameSettings = {
            qCount,
            timerDefault,
            gameStyle,
            selectionMode
        };

        // Initialize scores
        this.teams.forEach(team => {
            this.scores[team.id] = 0;
        });

        // Generate questions grid
        this.generateQuestionsGrid(qCount);

        // Show streamer game view
        this.showView('streamer-game');
        this.renderTeams();
        this.renderQuestionsGrid();
        
        // Show roulette if turn-based
        if (gameStyle === 'turn') {
            this.showRoulette();
        }
    }

    generateQuestionsGrid(count) {
        this.questions = [];
        for (let i = 0; i < count; i++) {
            this.questions.push({
                id: i,
                points: this.getRandomPoints(),
                answered: false,
                category: this.getRandomCategory(),
                question: '',
                answer: ''
            });
        }
    }

    getRandomPoints() {
        const points = [10, 20, 30, 40, 50];
        return points[Math.floor(Math.random() * points.length)];
    }

    getRandomCategory() {
        const categories = ['العلوم', 'التاريخ', 'الجغرافيا', 'الرياضة', 'الفنون', 'التقنية', 'الصحة', 'الادب'];
        return categories[Math.floor(Math.random() * categories.length)];
    }

    renderTeams() {
        const container = $('#teamsContainer');
        container.empty();

        this.teams.forEach(team => {
            container.append(`
                <div class="pro-card glass-panel flex-1 min-w-[120px]">
                    <div class="text-center">
                        <h4 class="font-bold text-white mb-2">${team.name}</h4>
                        <div class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500" id="score-${team.id}">
                            ${team.score}
                        </div>
                        <div class="text-xs text-gray-400">نقطة</div>
                    </div>
                </div>
            `);
        });
    }

    renderQuestionsGrid() {
        const container = $('#questionsGrid');
        container.empty();

        this.questions.forEach((question, index) => {
            container.append(`
                <div class="glass-card aspect-square flex flex-col items-center justify-center cursor-pointer hover:transform hover:scale-105 transition-all duration-200" 
                     onclick="game.selectQuestion(${index})" 
                     id="q-${index}">
                    <div class="text-2xl font-black text-transparent bg-clip-text ${question.answered ? 'bg-gradient-to-r from-gray-400 to-gray-600' : 'bg-gradient-to-r from-purple-400 to-pink-500'}">
                        ${question.points}
                    </div>
                    <div class="text-xs text-gray-400 mt-1">${question.category}</div>
                </div>
            `);
        });
    }

    selectQuestion(index) {
        if (this.questions[index].answered) return;

        const question = this.questions[index];
        this.currentQuestionIndex = index;

        // Show main game view
        $('#gridContainer').addClass('hidden');
        $('#gameMainView').removeClass('hidden');

        // Set question data
        $('#mainQText').text(`السؤال ${index + 1}: ${this.generateRandomQuestion()}`);
        $('#mainAText').text(this.generateRandomAnswer()).addClass('hidden');
        $('#qPointsDisplay').text(`${question.points} نقطة`);
        $('#contextText').text(question.category);

        // Start timer
        this.startTimer();
    }

    generateRandomQuestion() {
        const questions = [
            "ما هو أعلى جبل في العالم؟",
            "من هو مؤسس شركة أبل؟",
            "ما هي عاصمة فرنسا؟",
            "كم عدد كواكب النظام الشمسي؟",
            "من هو رسام لوحة الموناليزا؟",
            "ما هو أطول نهر في العالم؟",
            "من اكتشف أمريكا؟",
            "ما هي أكبر قارة من حيث المساحة؟"
        ];
        return questions[Math.floor(Math.random() * questions.length)];
    }

    generateRandomAnswer() {
        const answers = [
            "جبل إيفرست",
            "ستيف جوبز",
            "باريس",
            "8 كواكب",
            "ليوناردو دا فينشي",
            "نهر النيل",
            "كريستوفر كولومبوس",
            "آسيا"
        ];
        return answers[Math.floor(Math.random() * answers.length)];
    }

    startTimer() {
        this.timeLeft = this.gameSettings.timerDefault;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.endQuestionTimer();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        $('#mainTimerDisplay').text(timeString);
        
        // Change color when time is running low
        if (this.timeLeft <= 5) {
            $('#timerBox').addClass('bg-red-500').removeClass('bg-red-500');
        } else {
            $('#timerBox').removeClass('bg-red-500');
        }
    }

    endQuestionTimer() {
        clearInterval(this.timer);
        this.showScoringModal();
    }

    revealQ() {
        $('#mainAText').removeClass('hidden');
    }

    showScoringModal() {
        const container = $('#scoringTeamsList');
        container.empty();

        this.teams.forEach(team => {
            container.append(`
                <button class="pro-button" onclick="game.awardPoints(${team.id})">
                    ${team.name}
                </button>
            `);
        });

        $('#scoringModal').removeClass('hidden');
    }

    awardPoints(teamId) {
        const question = this.questions[this.currentQuestionIndex];
        this.scores[teamId] += question.points;
        question.answered = true;

        // Update UI
        $(`#score-${teamId}`).text(this.scores[teamId]);
        $(`#q-${this.currentQuestionIndex}`).addClass('opacity-50');

        // Close modal and return to grid
        $('#scoringModal').addClass('hidden');
        this.returnToGrid();

        // Check if game is complete
        this.checkGameComplete();
    }

    noWinner() {
        // Mark question as answered without awarding points
        this.questions[this.currentQuestionIndex].answered = true;
        $(`#q-${this.currentQuestionIndex}`).addClass('opacity-50');

        // Close modal and return to grid
        $('#scoringModal').addClass('hidden');
        this.returnToGrid();

        // Check if game is complete
        this.checkGameComplete();
    }

    returnToGrid() {
        $('#gameMainView').addClass('hidden');
        $('#gridContainer').removeClass('hidden');
    }

    checkGameComplete() {
        const allAnswered = this.questions.every(q => q.answered);
        if (allAnswered) {
            this.endGame();
        }
    }

    endGame() {
        // Find winner
        let winner = this.teams[0];
        let highestScore = this.scores[0];

        for (let i = 1; i < this.teams.length; i++) {
            if (this.scores[i] > highestScore) {
                winner = this.teams[i];
                highestScore = this.scores[i];
            }
        }

        this.showNotification(`انتهت المسابقة! الفائز: ${winner.name} بـ ${highestScore} نقطة`, 'success');
        setTimeout(() => {
            this.showView('dashboard');
        }, 3000);
    }

    finishTurn(reset = false) {
        if (reset) {
            this.resetGame();
        } else {
            if (confirm('هل أنت متأكد من إنهاء المسابقة؟')) {
                this.showView('dashboard');
            }
        }
    }

    resetGame() {
        clearInterval(this.timer);
        this.showView('dashboard');
    }

    saveGameState() {
        const gameState = {
            teams: this.teams,
            scores: this.scores,
            questions: this.questions,
            currentQuestionIndex: this.currentQuestionIndex,
            gameSettings: this.gameSettings,
            timeLeft: this.timeLeft
        };

        localStorage.setItem('proGameState', JSON.stringify(gameState));
        this.showNotification('تم حفظ حالة اللعبة بنجاح', 'success');
    }

    loadGameState() {
        const saved = localStorage.getItem('proGameState');
        if (saved) {
            const gameState = JSON.parse(saved);
            Object.assign(this, gameState);
            this.showNotification('تم تحميل حالة اللعبة', 'success');
        }
    }

    showRoulette() {
        $('#rouletteOverlay').removeClass('hidden');
    }

    spinRoulette() {
        $('#spinBtn').prop('disabled', true);
        $('#spinBtn').text('جاري التدوير...');
        
        // Animate roulette
        let spins = 0;
        const maxSpins = 20;
        const interval = setInterval(() => {
            const randomTeam = this.teams[Math.floor(Math.random() * this.teams.length)];
            $('#rouletteSpinner').text(randomTeam.name);
            spins++;
            
            if (spins >= maxSpins) {
                clearInterval(interval);
                const selectedTeam = this.teams[Math.floor(Math.random() * this.teams.length)];
                $('#rouletteSpinner').text(selectedTeam.name);
                $('#startBtn').removeClass('hidden');
                $('#spinBtn').addClass('hidden');
                
                // Set starting team
                this.currentTurn = selectedTeam.id;
                $('#turnBadge').text(selectedTeam.name);
            }
        }, 100);
    }

    closeRoulette() {
        $('#rouletteOverlay').addClass('hidden');
        $('#spinBtn').removeClass('hidden');
        $('#startBtn').addClass('hidden');
        $('#spinBtn').prop('disabled', false);
        $('#spinBtn').text('تدوير الروليت');
    }

    togglePrivacyCurtain() {
        $('#privacyCurtain').toggleClass('hidden');
    }

    openViewerModal() {
        // Generate viewer URL
        const viewerUrl = `${window.location.origin}${window.location.pathname}?viewer=true&game=${Date.now()}`;
        $('#viewerUrlInput').val(viewerUrl);
        $('#viewerLinkModal').removeClass('hidden');
    }

    copyLink() {
        const urlInput = $('#viewerUrlInput')[0];
        urlInput.select();
        document.execCommand('copy');
        
        const copyBtn = $('#copyBtn');
        copyBtn.text('تم النسخ!');
        setTimeout(() => {
            copyBtn.html('<span class="material-symbols-outlined text-sm">content_copy</span> نسخ');
        }, 2000);
    }

    showQRCode() {
        const url = $('#viewerUrlInput').val();
        $('#qrcode').empty();
        
        new QRCode(document.getElementById('qrcode'), {
            text: url,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        $('#qrCodeContainer').removeClass('hidden');
    }

    toggleCategoryModal() {
        $('#categoryModal').toggleClass('hidden');
    }

    newGame() {
        if (confirm('هل ترغب في بدء لعبة جديدة؟ سيتم فقدان التقدم الحالي.')) {
            this.resetGame();
        }
    }
}

// Global game instance
let game;
let currentBulkKey = '';
let currentBulkLabel = '';

$(document).ready(function() {
    game = new ProGameEngine();
    
    // Expose functions to global scope for HTML onclick attributes
    window.addTeamField = () => game.addTeamField();
    window.toggleGridConfig = (show) => game.toggleGridConfig(show);
    window.openBulkSetupModal = () => game.openBulkSetupModal();
    window.startStreamGame = () => game.startStreamGame();
    window.finishTurn = (reset) => game.finishTurn(reset);
    window.revealQ = () => game.revealQ();
    window.noWinner = () => game.noWinner();
    window.showGrid = () => {
        $('#gameMainView').addClass('hidden');
        $('#gridContainer').removeClass('hidden');
    };
    window.toggleCategoryModal = () => game.toggleCategoryModal();
    window.togglePrivacyCurtain = () => game.togglePrivacyCurtain();
    window.openViewerModal = () => game.openViewerModal();
    window.copyLink = () => game.copyLink();
    window.showQRCode = () => game.showQRCode();
    window.spinRoulette = () => game.spinRoulette();
    window.closeRoulette = () => game.closeRoulette();
});