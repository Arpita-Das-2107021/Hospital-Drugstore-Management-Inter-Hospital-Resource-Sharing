import { useState, createContext, useContext, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.inventory': 'Inventory',
    'nav.sharing': 'Resource Sharing',
    'nav.alerts': 'Alerts',
    'nav.messages': 'Messages',
    'nav.hospitals': 'Hospitals',
    'nav.admin': 'Administration',
    'nav.reports': 'Reports',
    'common.search': 'Search...',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'status.pending': 'Pending',
    'status.approved': 'Approved',
    'status.rejected': 'Rejected',
    'status.in_transit': 'In Transit',
    'status.delivered': 'Delivered',
    'urgency.routine': 'Routine',
    'urgency.urgent': 'Urgent',
    'urgency.critical': 'Critical',
    'resource.blood': 'Blood',
    'resource.drugs': 'Drugs',
    'resource.organs': 'Organs',
    'resource.equipment': 'Equipment',
  },
  bn: {
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.inventory': 'ইনভেন্টরি',
    'nav.sharing': 'রিসোর্স শেয়ারিং',
    'nav.alerts': 'সতর্কতা',
    'nav.messages': 'বার্তা',
    'nav.hospitals': 'হাসপাতাল',
    'nav.admin': 'প্রশাসন',
    'nav.reports': 'রিপোর্ট',
    'common.search': 'অনুসন্ধান...',
    'common.submit': 'জমা দিন',
    'common.cancel': 'বাতিল',
    'common.save': 'সংরক্ষণ',
    'common.loading': 'লোড হচ্ছে...',
    'common.error': 'ত্রুটি',
    'common.success': 'সফল',
    'status.pending': 'অপেক্ষমাণ',
    'status.approved': 'অনুমোদিত',
    'status.rejected': 'প্রত্যাখ্যাত',
    'status.in_transit': 'পরিবহনে',
    'status.delivered': 'বিতরণ করা হয়েছে',
    'urgency.routine': 'নিয়মিত',
    'urgency.urgent': 'জরুরি',
    'urgency.critical': 'সংকটজনক',
    'resource.blood': 'রক্ত',
    'resource.drugs': 'ওষুধ',
    'resource.organs': 'অঙ্গ',
    'resource.equipment': 'সরঞ্জাম',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('healthshare-language');
    return (saved as Language) || 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('healthshare-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'bg-accent' : ''}
        >
          <span className="mr-2">🇺🇸</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('bn')}
          className={language === 'bn' ? 'bg-accent' : ''}
        >
          <span className="mr-2">🇧🇩</span>
          বাংলা (Bengali)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
