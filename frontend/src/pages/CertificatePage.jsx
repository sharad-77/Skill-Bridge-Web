import React from 'react';
import { AlertTriangle, Award, Clock, Plus, Search, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';

const CertificatePage = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500"></div>
        <div className="container mx-auto px-4 py-16 relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-shadow">Certification Tracker</h1>
          <p className="text-xl text-green-100 mb-8">Manage, showcase, and track all your professional certifications in one place. Never miss an expiration date again.</p>
          {/* Certification Tracker Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-50 bg-opacity-20">
                  <Award className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-sm text-green-100">Active Certifications</div>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-50 bg-opacity-20">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">1</div>
                  <div className="text-sm text-green-100">Expiring Soon</div>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-50 bg-opacity-20">
                  <Clock className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">1</div>
                  <div className="text-sm text-green-100">Expired</div>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 bg-opacity-20">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">15</div>
                  <div className="text-sm text-green-100">Total Skills</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave design */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#f9fafb" preserveAspectRatio="none" className="w-full h-[60px]">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>
      {/* Navigation Section */}
      <section className="py-6 bg-white sticky top-0 z-20 transition-all duration-300 ">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="flex flex-col w-full md:flex-row gap-4 items-center justify-between max-w-4xl">
            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
              <button className="px-4 py-2 rounded-full whitespace-nowrap transition-all text-gray-600 hover:bg-gray-100">All Certifications</button>
              <button className="px-4 py-2 rounded-full whitespace-nowrap transition-all bg-green-100 text-green-700 font-medium">Active</button>
              <button className="px-4 py-2 rounded-full whitespace-nowrap transition-all text-gray-600 hover:bg-gray-100">Expired</button>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10" placeholder="Search certifications" value="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='flex justify-center items-center'>
        <div className='py-20'>
          <p className='text-2xl text-white animate-pulse bg-green-600 p-2 rounded-lg'>Coming Soon.........</p>
        </div>
      </section>


    </div>
  );
};

export default CertificatePage;
