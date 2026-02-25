import React, { useState, useEffect } from 'react';

const ProGamingPlatform: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'streamer-setup' | 'streamer-game'>('dashboard');
  const [teams, setTeams] = useState<string[]>(['']);
  const [gameSettings, setGameSettings] = useState({
    questionCount: 20,
    timerDuration: 15,
    gameStyle: 'fastest',
    selectionMode: 'manual'
  });

  // Initialize the professional gaming engine
  useEffect(() => {
    initializeProGameEngine();
  }, []);

  const initializeProGameEngine = () => {
    // Add professional styling classes to body
    document.body.classList.add('pro-gaming-platform');
    
    // Initialize any required libraries or services
    console.log('Professional Gaming Platform Initialized');
  };

  const addTeam = () => {
    setTeams([...teams, '']);
  };

  const updateTeam = (index: number, value: string) => {
    const updatedTeams = [...teams];
    updatedTeams[index] = value;
    setTeams(updatedTeams);
  };

  const startGame = () => {
    // Validate teams
    const validTeams = teams.filter(team => team.trim() !== '');
    if (validTeams.length < 1) {
      alert('يرجى إدخال اسم فريق واحد على الأقل');
      return;
    }
    
    setCurrentView('streamer-game');
  };

  // Dashboard View Component
  const DashboardView = () => (
    <div className="view" id="view-dashboard">
      {/* Hero Section */}
      <section className="relative pt-12 pb-12 md:pt-20 text-center z-10 px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pulse-bg pointer-events-none"></div>
        
        <h1 className="pro-title relative">
          جواهر <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">المعرفة</span>
        </h1>
        <p className="pro-subtitle max-w-2xl mx-auto mb-12">
          المنصة الأولى لصناعة المسابقات التفاعلية والبث المباشر. ارفع مستوى التحدي مع ألعاب ثقافية احترافية.
        </p>
      </section>

      {/* Streamer Mode Card */}
      <div className="mb-16 animate-fade-up">
        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('streamer-setup'); }} className="block group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <div className="pro-card relative overflow-hidden hover:border-purple-500/50 transition duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-right flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-bold mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </span>
                  مخصص للبثوث المباشرة
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">مسابقة البث المباشر</h2>
                <p className="text-gray-400 text-lg mb-6">أنشئ غرفة تحكم متكاملة، أدر الفرق، واعرض الأسئلة بشاشة احترافية لجمهورك.</p>
                <button className="pro-button">
                  بدء الإعداد الآن
                </button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <span className="material-symbols-outlined text-9xl text-gray-700/50 group-hover:text-purple-500/80 transition duration-500 transform group-hover:scale-110 rotate-12">podcasts</span>
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Solo Games */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8 px-2">
          <span className="material-symbols-outlined text-3xl text-pink-500">sports_esports</span>
          <h3 className="text-2xl font-bold text-white">الألعاب الفردية</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: 'الأسئلة العامة', icon: 'quiz', color: 'from-purple-600 to-pink-600' },
            { name: 'الحقائق المدهشة', icon: 'science', color: 'from-blue-600 to-cyan-600' },
            { name: 'اللغز اليوم', icon: 'psychology', color: 'from-green-600 to-teal-600' },
            { name: 'الرياضيات', icon: 'calculate', color: 'from-yellow-600 to-orange-600' },
            { name: 'التاريخ', icon: 'history_edu', color: 'from-red-600 to-pink-600' },
            { name: 'الجغرافيا', icon: 'location_on', color: 'from-indigo-600 to-purple-600' },
            { name: 'الرياضة', icon: 'sports', color: 'from-emerald-600 to-green-600' },
            { name: 'الفنون', icon: 'palette', color: 'from-rose-600 to-pink-600' }
          ].map((game, index) => (
            <div key={index} className="pro-card rounded-2xl p-6 cursor-pointer group">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${game.color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:shadow-xl`}>
                  <span className="material-symbols-outlined">{game.icon}</span>
                </div>
                <h4 className="font-bold text-white text-lg mb-2">{game.name}</h4>
                <button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition text-sm font-medium">
                  البدء
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div>
        <div className="flex items-center gap-3 mb-8 px-2">
          <span className="material-symbols-outlined text-3xl text-blue-500">widgets</span>
          <h3 className="text-2xl font-bold text-white">أدوات إضافية</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'منشئ الأسئلة', icon: 'add_circle', color: 'from-cyan-600 to-blue-600' },
            { name: 'إدارة النقاط', icon: 'leaderboard', color: 'from-emerald-600 to-green-600' },
            { name: 'الإحصائيات', icon: 'analytics', color: 'from-violet-600 to-purple-600' },
            { name: 'الإعدادات', icon: 'settings', color: 'from-amber-600 to-orange-600' }
          ].map((tool, index) => (
            <div key={index} className="pro-card rounded-xl p-4 cursor-pointer group">
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${tool.color} flex items-center justify-center text-white text-xl shadow-md group-hover:shadow-lg`}>
                  <span className="material-symbols-outlined">{tool.icon}</span>
                </div>
                <p className="text-white text-sm font-medium">{tool.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Streamer Setup View Component
  const StreamerSetupView = () => (
    <div className="view" id="view-streamer-setup">
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="pro-card rounded-[40px] p-8 md:p-12 max-w-4xl w-full animate-fade-up border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"></div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800/80 mb-6 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <span className="material-symbols-outlined text-5xl text-purple-400">settings_input_antenna</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight">إعداد غرفة التحكم</h2>
          <p className="text-gray-400 mt-2">قم بتجهيز الفرق وقواعد اللعبة قبل الانطلاق</p>
        </div>
        
        <div className="grid md:grid-cols-12 gap-10">
          {/* Section 1: Teams Input */}
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-300 font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-400">groups</span>
                الفرق المتنافسة
              </label>
              <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-500">الحد الأدنى 1</span>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar p-1">
              {teams.map((team, index) => (
                <div key={index} className="relative group animate-pop">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined">badge</span>
                  <input
                    type="text"
                    placeholder={`اسم الفريق ${index + 1}`}
                    className="pro-input w-full py-4 pr-12 pl-4 rounded-xl text-white outline-none font-semibold placeholder-gray-600"
                    value={team}
                    onChange={(e) => updateTeam(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
            
            <button onClick={addTeam} className="w-full py-3 border-2 border-dashed border-gray-700 hover:border-purple-500/50 rounded-xl text-gray-400 hover:text-purple-300 font-bold transition flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add</span> إضافة فريق جديد
            </button>
          </div>

          {/* Section 2: Game Rules */}
          <div className="md:col-span-5 space-y-8 bg-gray-900/40 p-6 rounded-2xl border border-white/5">
            {/* Question Count */}
            <div>
              <div className="flex justify-between text-sm font-bold mb-4">
                <span className="text-gray-300 flex items-center gap-2"><span className="material-symbols-outlined text-blue-400 text-sm">grid_view</span> عدد الأسئلة</span>
                <span className="text-blue-400 bg-blue-400/10 px-2 rounded">{gameSettings.questionCount}</span>
              </div>
              <input
                type="range"
                min="4"
                max="50"
                value={gameSettings.questionCount}
                onChange={(e) => setGameSettings({...gameSettings, questionCount: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1"><span>4</span><span>50</span></div>
            </div>

            {/* Timer Default */}
            <div>
              <div className="flex justify-between text-sm font-bold mb-4">
                <span className="text-gray-300 flex items-center gap-2"><span className="material-symbols-outlined text-red-400 text-sm">timer</span> وقت الإجابة</span>
                <span className="text-red-400 bg-red-400/10 px-2 rounded">{gameSettings.timerDuration} ثانية</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={gameSettings.timerDuration}
                onChange={(e) => setGameSettings({...gameSettings, timerDuration: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-[10px] text-gray-600 mt-1"><span>5</span><span>60</span></div>
            </div>

            {/* Game Mode (Turn vs Fast) */}
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-3">نظام الأدوار</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="cursor-pointer relative">
                  <input
                    type="radio"
                    name="gameStyle"
                    value="fastest"
                    checked={gameSettings.gameStyle === 'fastest'}
                    onChange={() => setGameSettings({...gameSettings, gameStyle: 'fastest'})}
                    className="peer hidden"
                  />
                  <div className="py-3 px-2 rounded-xl border border-gray-600 text-center text-xs font-bold text-gray-400 peer-checked:bg-purple-600 peer-checked:text-white peer-checked:border-purple-500 transition hover:bg-gray-800">
                    الأسرع إجابة
                  </div>
                </label>
                <label className="cursor-pointer relative">
                  <input
                    type="radio"
                    name="gameStyle"
                    value="turn"
                    checked={gameSettings.gameStyle === 'turn'}
                    onChange={() => setGameSettings({...gameSettings, gameStyle: 'turn'})}
                    className="peer hidden"
                  />
                  <div className="py-3 px-2 rounded-xl border border-gray-600 text-center text-xs font-bold text-gray-400 peer-checked:bg-purple-600 peer-checked:text-white peer-checked:border-purple-500 transition hover:bg-gray-800">
                    نظام الأدوار
                  </div>
                </label>
              </div>
            </div>

            {/* Selection Mode (Manual vs Pre-made) */}
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-3">نظام اختيار الأسئلة</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="cursor-pointer relative">
                  <input
                    type="radio"
                    name="selectionMode"
                    value="manual"
                    checked={gameSettings.selectionMode === 'manual'}
                    onChange={() => setGameSettings({...gameSettings, selectionMode: 'manual'})}
                    className="peer hidden"
                  />
                  <div className="py-3 px-2 rounded-xl border border-gray-600 text-center text-xs font-bold text-gray-400 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-500 transition hover:bg-gray-800">
                    اختيار مباشر (يدوي)
                  </div>
                </label>
                <label className="cursor-pointer relative">
                  <input
                    type="radio"
                    name="selectionMode"
                    value="premade"
                    checked={gameSettings.selectionMode === 'premade'}
                    onChange={() => setGameSettings({...gameSettings, selectionMode: 'premade'})}
                    className="peer hidden"
                  />
                  <div className="py-3 px-2 rounded-xl border border-gray-600 text-center text-xs font-bold text-gray-400 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-500 transition hover:bg-gray-800">
                    تجهيز المجالات مسبقاً
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse md:flex-row gap-4 mt-12 pt-8 border-t border-gray-700/50">
          <button onClick={() => setCurrentView('dashboard')} className="md:w-1/3 py-4 rounded-xl text-gray-400 font-bold hover:text-white hover:bg-gray-800 transition">
            إلغاء والعودة
          </button>
          <button onClick={startGame} className="md:w-2/3 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-bold hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:scale-[1.02] transition transform flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">rocket_launch</span>
            إطلاق المسابقة
          </button>
        </div>
      </div>
    </div>
  );

  // Streamer Game View Component
  const StreamerGameView = () => (
    <div className="view" id="view-streamer-game">
      <div className="h-screen flex flex-col overflow-hidden bg-gray-100 text-gray-900 relative">
        {/* Privacy Curtain */}
        <div id="privacyCurtain" className="hidden fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white">
          <span className="material-symbols-outlined text-9xl text-gray-600 mb-6">visibility_off</span>
          <h1 className="text-5xl font-bold mb-4">البث محجوب مؤقتاً</h1>
          <p className="text-xl text-gray-400 mb-8">يتم عرض معلومات سرية (رابط المشاهدة)</p>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-12 rounded-full text-xl transition shadow-lg">استئناف البث</button>
        </div>

        {/* Header */}
        <header className="game-header p-2 flex justify-between items-center shadow-lg relative z-20 rounded-b-[20px] mx-2 mt-2">
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentView('dashboard')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1.5 px-4 rounded-full flex items-center gap-1 border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 transition text-sm">
              <span className="material-symbols-outlined text-sm">logout</span> <span className="hidden md:inline">الخروج</span>
            </button>
            <button className="bg-[#ef4444] hover:bg-red-600 text-white font-bold py-1.5 px-4 rounded-full flex items-center gap-1 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition text-sm">
              <span className="material-symbols-outlined text-sm">close</span> <span className="hidden md:inline">إنهاء</span>
            </button>
            <button className="bg-white hover:bg-gray-100 text-[#1e1b4b] font-bold py-1.5 px-4 rounded-full flex items-center gap-1 border-b-4 border-gray-300 active:border-b-0 active:translate-y-1 transition text-sm">
              <span className="material-symbols-outlined text-sm">grid_view</span> <span className="hidden md:inline">اللوحة</span>
            </button>
          </div>
          <div className="hidden md:block">
            <button className="bg-white/20 hover:bg-white/30 text-[#1e1b4b] font-bold py-2 px-6 rounded-full transition flex items-center gap-2 border border-[#1e1b4b]/20">
              <span className="material-symbols-outlined">category</span> <span>تغيير الفئة</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="md:hidden bg-white/20 p-2 rounded-full text-[#1e1b4b] hover:bg-white/40 transition border border-[#1e1b4b]/20">
              <span className="material-symbols-outlined">category</span>
            </button>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative p-4 gap-4">
          <main className="flex-1 flex flex-col relative h-full">
            <div id="gridContainer" className="absolute inset-0 z-10 flex flex-col overflow-y-auto custom-scrollbar bg-white rounded-3xl border-4 border-[#1e1b4b] p-6 shadow-xl">
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 pt-4">
                {[...Array(gameSettings.questionCount)].map((_, index) => (
                  <div key={index} className="glass-card aspect-square flex flex-col items-center justify-center cursor-pointer hover:transform hover:scale-105 transition-all duration-200">
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                      {Math.floor(Math.random() * 40) + 10}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">علوم</div>
                  </div>
                ))}
              </div>
            </div>
            <div id="gameMainView" className="hidden absolute inset-0 z-20 flex items-center justify-center p-2 lg:p-8">
              <div className="w-full max-w-2xl bg-white card-border rounded-[40px] relative flex flex-col min-h-[400px] lg:min-h-[500px]">
                <div className="absolute -top-6 left-0 right-0 flex justify-center items-center gap-4 px-8 z-30">
                  <div className="bg-[#ef4444] text-white rounded-2xl flex items-center h-12 px-2 border-[3px] border-[#1e1b4b] shadow-lg gap-2 min-w-[140px] justify-between transition-colors duration-300" id="timerBox">
                    <button className="p-1 hover:bg-white/20 rounded-full"><span className="material-symbols-outlined text-lg">refresh</span></button>
                    <span className="font-mono text-2xl font-bold">00:15</span>
                    <button className="p-1 hover:bg-white/20 rounded-full"><span className="material-symbols-outlined text-lg">pause</span></button>
                  </div>
                  <div className="flex-1"></div>
                  <div className="bg-[#1e1b4b] text-white rounded-2xl flex items-center justify-center h-12 px-6 border-[3px] border-[#1e1b4b] shadow-lg min-w-[120px]"><span className="font-bold text-xl">10 نقطة</span></div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center mt-6 mb-6">
                  <h2 className="text-3xl md:text-5xl font-black text-[#1e1b4b] leading-tight animate-pop">ما هو أعلى جبل في العالم؟</h2>
                  <div className="hidden mt-6 text-2xl md:text-4xl font-bold text-green-600 bg-green-50 px-6 py-3 rounded-xl border border-green-200">جبل ايفرست</div>
                </div>
                <div className="absolute -bottom-6 left-0 right-0 flex justify-between px-4 md:px-12 z-30 gap-4">
                  <div className="bg-[#1e1b4b] text-white text-lg font-bold py-3 px-6 rounded-2xl border-[3px] border-[#1e1b4b] shadow-lg flex-1 md:flex-none flex items-center justify-center gap-2"><span className="material-symbols-outlined text-yellow-400">info</span><span>العلوم</span></div>
                  <button className="bg-[#84cc16] text-white text-lg font-bold py-3 px-8 rounded-2xl border-[3px] border-[#1e1b4b] shadow-lg hover:translate-y-1 transition flex-1 md:flex-none">الإجابة</button>
                </div>
              </div>
            </div>
          </main>
          <aside className="h-48 lg:h-full w-full lg:w-80 flex flex-col gap-4 shrink-0">
            <div className="hidden lg:flex justify-end items-center gap-2"><span className="text-sm font-bold text-gray-500">الدور:</span><div className="bg-[#1e1b4b] text-white px-3 py-1 rounded text-xs font-mono">---</div></div>
            <div id="teamsContainer" className="flex-1 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto custom-scrollbar p-1">
              {teams.filter(team => team.trim() !== '').map((team, index) => (
                <div key={index} className="pro-card glass-panel flex-1 min-w-[120px]">
                  <div className="text-center">
                    <h4 className="font-bold text-white mb-2">{team}</h4>
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                      {Math.floor(Math.random() * 100)}
                    </div>
                    <div className="text-xs text-gray-400">نقطة</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-1 pb-1">
              <button className="w-full bg-[#1e1b4b] text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg border-t border-gray-700">
                <span className="material-symbols-outlined text-yellow-400">link</span> رابط المشاهدة
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-navy text-white relative">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 bg-grid-pattern pointer-events-none"></div>

      {/* Home Button */}
      <div id="nav-home-wrapper" className={currentView === 'dashboard' ? 'hidden' : ''}>
        <div className="nav-home-btn group">
          <span className="material-symbols-outlined text-[20px] group-hover:text-purple-400">home</span> الرئيسية
        </div>
      </div>

      {/* Render Current View */}
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'streamer-setup' && <StreamerSetupView />}
      {currentView === 'streamer-game' && <StreamerGameView />}
      
      {/* Shared Modals would go here */}
    </div>
  );
};

export default ProGamingPlatform;