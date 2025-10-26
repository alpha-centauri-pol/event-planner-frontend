"use client";

import React from 'react';
import Navbar from "@/app/components/Navbar";

interface PrivacyPolicyProps {
  appName?: string;
  contactEmail?: string;
  companyName?: string;
  contactAddress?: string;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyProps> = ({
  appName = "Syncule",
  contactEmail = "dscvitvellore@gmail.com",
  companyName = "DSCVIT",
  contactAddress = "Vellore, Tamil nadu 632014, India",
}) => {
  return (
    <div className="min-h-screen bg-[#000000] text-[#E0DFFF] font-sans">
      <Navbar /> 
      <div className="bg-[#1D1C2C] border-2 border-[#5D59AD] rounded-2xl p-8 max-w-3xl mx-auto my-8">
        <div className="flex justify-between items-center pb-4 mb-8 border-b border-[#312E72]">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Privacy Policy</h1>
        </div>
        
        <p className="mb-4 text-[#BBBBC0]"><strong>Last Updated:</strong> October 26, 2025</p>

        <p className="mb-4 text-[#BBBBC0]">Welcome to {appName} ("we," "us," or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3 border-b border-[#312E72] pb-2 text-white">1. Information We Collect</h2>
        <p className="mb-4 text-[#BBBBC0]">We may collect information about you in a variety of ways. The information we may collect includes:</p>
        <ul className="list-disc ml-6 mb-4 text-[#BBBBC0]">
            <li className="mb-2"><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and profile picture, that you voluntarily give to us when you register or interact with the service (e.g., through Google Authentication).</li>
            <li className="mb-2"><strong>Usage Data:</strong> Information automatically collected when you access the service, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the service.</li>
            <li className="mb-2"><strong>Data Processed by AI:</strong> Information you provide that is processed by our AI features, potentially including Google's Gemini models hosted on Google Cloud Platform (GCP). This may include text prompts, documents, emails, or other data you submit for analysis, event extraction, or generation. Google's own policies regarding data handling for their AI services also apply.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3 border-b border-[#312E72] pb-2 text-white">2. How We Use Your Information</h2>
        <p className="mb-4 text-[#BBBBC0]">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
        <ul className="list-disc ml-6 mb-4 text-[#BBBBC0]">
            <li className="mb-2">Create and manage your account.</li>
            <li className="mb-2">Provide, operate, and improve our AI-powered features (e.g., event extraction from emails).</li>
            <li className="mb-2">Monitor and analyze usage and trends to improve your experience with the service.</li>
            <li className="mb-2">Communicate with you, including responding to your comments and questions and providing customer service.</li>
            <li className="mb-2">Ensure the security and integrity of our services, hosted on Google Cloud Platform.</li>
            <li className="mb-2">Comply with legal obligations and enforce our terms.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3 border-b border-[#312E72] pb-2 text-white">3. Disclosure of Your Information</h2>
        <p className="mb-4 text-[#BBBBC0]">We do not share your personal information with third parties except as described in this Privacy Policy or with your consent. We may share information:</p>
        <ul className="list-disc ml-6 mb-4 text-[#BBBBC0]">
            <li className="mb-2"><strong>With Service Providers:</strong> We utilize Google Cloud Platform (GCP) to host our application and process data, including data processed by AI models like Gemini. Google acts as a data processor on our behalf, and their use of data is governed by their <a href="https://cloud.google.com/terms/data-processing-addendum" target="_blank" rel="noopener noreferrer" className="text-[#A6A2FF] hover:text-[#8a8ac7] underline">Data Processing Addendum</a> and privacy policies. We only share information necessary for them to perform their services.</li>
            <li className="mb-2"><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, investigate potential violations of our policies, or protect the rights, property, and safety of others, we may share your information as permitted or required by law.</li>
            <li className="mb-2"><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3 border-b border-[#312E72] pb-2 text-white">4. Data Security</h2>
        <p className="mb-4 text-[#BBBBC0]">We use administrative, technical, and physical security measures designed to protect your personal information. Our infrastructure is hosted on Google Cloud Platform, leveraging its security features. While we strive to use commercially acceptable means to protect your Personal Information, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3 border-b border-[#312E72] pb-2 text-white">5. Your Data Protection Rights</h2>
        <p className="mb-4 text-[#BBBBC0]">Depending on your location and applicable laws (such as GDPR or CCPA), you may have certain rights regarding your personal information:</p>
        <ul className="list-disc ml-6 mb-4 text-[#BBBBC0]">
            <li className="mb-2">The right to access – Request copies of your personal data.</li>
            <li className="mb-2">The right to rectification – Request correction of inaccurate or incomplete data.</li>
            <li className="mb-2">The right to erasure – Request deletion of your personal data, under certain conditions.</li>
            <li className="mb-2">The right to restrict processing – Request restriction of processing, under certain conditions.</li>
            <li className="mb-2">The right to object to processing – Object to processing based on legitimate interests, under certain conditions.</li>
            <li className="mb-2">The right to data portability – Request transfer of your data to another organization or directly to you, under certain conditions.</li>
        </ul>
        <p className="mb-4 text-[#BBBBC0]">To exercise these rights, please contact us using the contact information below.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3 border-b border-[#312E72] pb-2 text-white">6. Changes to This Privacy Policy</h2>
        <p className="mb-4 text-[#BBBBC0]">We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information.</p>

        <h2 className="text-xl font-semibold mt-6 mb-3 border-b border-[#312E72] pb-2 text-white">7. Contact Us</h2>
        <p className="mb-4 text-[#BBBBC0]">If you have questions or comments about this Privacy Policy, please contact us at:</p>
        <p className="mb-2 text-[#BBBBC0]">{contactEmail}</p>
        <p className="mb-2 text-[#BBBBC0]">{companyName}</p>
        <p className="mb-4 text-[#BBBBC0]">{contactAddress}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

