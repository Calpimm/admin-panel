import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeWindow = ({ examples }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(Object.keys(examples)[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(examples[selectedLanguage]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-between items-center bg-gray-700 text-white p-2">
        <div className="flex space-x-4">
          {Object.keys(examples).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded-md text-sm font-semibold ${
                selectedLanguage === lang ? 'bg-gray-900' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        <div className="relative">
          <button
            onClick={handleCopy}
            className="px-3 py-1 rounded-md text-sm font-semibold bg-gray-600 hover:bg-gray-500"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 top-0 mt-8 px-2 py-1 bg-green-500 text-white rounded-md"
              >
                Copied!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.pre
          key={selectedLanguage}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-900 text-white p-4 rounded-b-lg overflow-auto max-h-80 font-mono"
        >
          <code>{examples[selectedLanguage]}</code>
        </motion.pre>
      </AnimatePresence>
    </div>
  );
};

export default CodeWindow;
