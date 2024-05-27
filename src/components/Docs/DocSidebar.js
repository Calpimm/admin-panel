import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeIcon, KeyIcon, UserGroupIcon, MailIcon, BanIcon, ExclamationIcon, CodeIcon } from '@heroicons/react/outline';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/outline';

const icons = {
  Introduction: HomeIcon,
  Authentication: KeyIcon,
  'Admin Endpoints': UserGroupIcon,
  'Player Endpoints': UserGroupIcon,
  'Ban Management': BanIcon,
  'Email Management': MailIcon,
  'Error Handling': ExclamationIcon,
  'Usage Examples': CodeIcon
};

const subsections = {
  Introduction: [],
  Authentication: [],
  'Admin Endpoints': ['Register Admin', 'Admin Login', 'Generate API Key', 'Generate Moderator API Key', 'Get API Keys', 'Fetch Moderators'],
  'Player Endpoints': ['Register Player', 'Player Login', 'Verify Email', 'Update Score', 'Update Multiple Scores', 'Get Top Players', 'Fetch All Players', 'Delete Player'],
  'Ban Management': ['Ban User', 'Fetch Ban History'],
  'Email Management': ['Send Email to Various Groups', 'Send Email to Subscribers', 'Subscribe', 'Unsubscribe'],
  'Error Handling': [],
  'Usage Examples': ['cURL Example', 'Node.js Example'],
};

const DocSidebar = ({ sections, onSelectSection }) => {
  const [open, setOpen] = useState(null);

  const handleOpen = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <motion.aside 
      className="w-64 bg-gray-800 text-white h-screen fixed shadow-lg"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Sections</h2>
        <ul>
          {sections.map((section, index) => {
            const Icon = icons[section];
            return (
              <li key={index} className="mb-2">
                <button
                  className="flex items-center text-white hover:text-gray-300 w-full p-2"
                  onClick={() => {
                    handleOpen(index);
                    if (subsections[section].length === 0) {
                      onSelectSection(section);
                    }
                  }}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  <span>{section}</span>
                  {subsections[section].length > 0 && (
                    open === index ? <ChevronDownIcon className="ml-auto h-4 w-4" /> : <ChevronRightIcon className="ml-auto h-4 w-4" />
                  )}
                </button>
                <AnimatePresence>
                  {open === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="ml-6 mt-2 space-y-2">
                        {subsections[section].map((subsection, subIndex) => (
                          <li key={subIndex}>
                            <button
                              onClick={() => onSelectSection(`${section} - ${subsection}`)}
                              className="text-white hover:text-gray-300 w-full text-left"
                            >
                              {subsection}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.aside>
  );
};

export default DocSidebar;
