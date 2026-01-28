import React, { useState } from 'react';
import { InstagramIcon, UserIcon, TicketIcon, LoaderIcon, UsersIcon, ShieldCheckIcon, ZapIcon } from './components/Icons';
import { redeemPromoCode } from './services/api';
import { PromoResponse, RequestStatus, Language } from './types';
import { ResultModal } from './components/ResultModal';
import { translations, apiMessages } from './translations';

const App: React.FC = () => {
  // Default language is Russian ('ru')
  const [lang, setLang] = useState<Language>('ru');
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.IDLE);
  const [result, setResult] = useState<PromoResponse | null>(null);

  // Shortcut for current translation
  const t = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !code) return;

    setStatus(RequestStatus.LOADING);
    
    try {
      // Pass the current language to the API
      const response = await redeemPromoCode(username, code, lang);
      setResult(response);
      setStatus(RequestStatus.SUCCESS);
    } catch (error) {
      setResult({
        success: false,
        message: apiMessages[lang].error
      });
      setStatus(RequestStatus.ERROR);
    }
  };

  const closeModal = () => {
    setStatus(RequestStatus.IDLE);
    setResult(null);
    if (result?.success) {
      setCode('');
    }
  };

  const LanguageSelector = () => (
    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg p-1 shadow-sm">
      {(['ru', 'en', 'tr'] as Language[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 text-xs font-bold rounded transition-colors uppercase ${
            lang === l 
              ? 'bg-slate-800 text-white' 
              : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-slate-800 flex flex-col relative overflow-hidden bg-slate-50 selection:bg-pink-200 selection:text-pink-900">
      
      {/* Background Ambience (Soft Blobs) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100 text-pink-600">
            <InstagramIcon className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 hidden sm:inline">
            DLuxe<span className="text-pink-600">Tools</span>
          </span>
        </div>
        
        <LanguageSelector />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 w-full max-w-6xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
          
          {/* Left Column: Marketing */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-5">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-semibold text-slate-600">
                {t.marketing_badge}
              </span>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
                {t.marketing_title_1} <br />
                <span className="soft-gradient-text">{t.marketing_title_2}</span>
              </h1>
              
              <p className="text-lg text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                {t.marketing_desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
              <div className="flex flex-col items-center lg:items-start p-5 rounded-2xl bg-white/60 border border-white shadow-sm backdrop-blur-sm">
                <ZapIcon className="w-6 h-6 text-amber-500 mb-3" />
                <h3 className="font-bold text-slate-800">{t.feat_fast_title}</h3>
                <p className="text-sm text-slate-500">{t.feat_fast_desc}</p>
              </div>
              <div className="flex flex-col items-center lg:items-start p-5 rounded-2xl bg-white/60 border border-white shadow-sm backdrop-blur-sm">
                <ShieldCheckIcon className="w-6 h-6 text-emerald-500 mb-3" />
                <h3 className="font-bold text-slate-800">{t.feat_secure_title}</h3>
                <p className="text-sm text-slate-500">{t.feat_secure_desc}</p>
              </div>
              <div className="flex flex-col items-center lg:items-start p-5 rounded-2xl bg-white/60 border border-white shadow-sm backdrop-blur-sm">
                <UsersIcon className="w-6 h-6 text-violet-500 mb-3" />
                <h3 className="font-bold text-slate-800">{t.feat_organic_title}</h3>
                <p className="text-sm text-slate-500">{t.feat_organic_desc}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="w-full max-w-md mx-auto order-1 lg:order-2">
            <div className="premium-glass rounded-[2rem] p-8 lg:p-10 relative">
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{t.form_title}</h2>
                <p className="text-sm text-slate-500">{t.form_subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                    {t.label_username}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      required
                      className="input-style block w-full pl-11 pr-4 py-4 rounded-xl text-slate-800 placeholder-slate-400 border border-transparent focus:border-pink-200 focus:outline-none"
                      placeholder="@username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="code" className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                    {t.label_code}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <TicketIcon className="h-5 w-5 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      id="code"
                      required
                      className="input-style block w-full pl-11 pr-4 py-4 rounded-xl text-slate-800 placeholder-slate-400 border border-transparent focus:border-pink-200 focus:outline-none uppercase tracking-widest font-mono font-medium"
                      placeholder="XXXX-XXXX"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === RequestStatus.LOADING || !username || !code}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-4 rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                >
                  {status === RequestStatus.LOADING ? (
                    <>
                      <LoaderIcon className="w-5 h-5 animate-spin text-slate-400" />
                      <span>{t.btn_processing}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.btn_submit}</span>
                      <ZapIcon className="w-4 h-4 text-yellow-400" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center relative z-10">
        <p className="text-slate-400 text-sm font-medium">
          &copy; {new Date().getFullYear()} {t.footer_text}
        </p>
      </footer>

      {/* Modals */}
      <ResultModal 
        isOpen={status === RequestStatus.SUCCESS || status === RequestStatus.ERROR} 
        onClose={closeModal}
        result={result}
        t={t}
      />
    </div>
  );
};

export default App;
