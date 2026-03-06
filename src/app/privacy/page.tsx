import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Gadget Pick',
  description: 'Learn how The Gadget Pick collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p>
              The Gadget Pick ("we," "us," or "our") operates the thegadgetpick.com website (the "Site"). This Privacy Policy explains how we collect, use, disclose, and otherwise process personal information through the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p>We collect information in several ways:</p>
            <ul className="list-disc list-inside space-y-2 my-4">
              <li>Information you provide voluntarily (e.g., comments, contact forms)</li>
              <li>Information collected automatically through cookies and analytics (e.g., browsing behavior, IP address, device type)</li>
              <li>Information from third-party services like Supabase for comments functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p>We use collected information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 my-4">
              <li>To provide, maintain, and improve the Site and our services</li>
              <li>To display comments and user-generated content</li>
              <li>To understand how users interact with the Site</li>
              <li>To send administrative and marketing communications (with consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p>
              We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities and to remember your preferences. This helps us understand how you use the Site and to improve your experience. You can control cookie settings through your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
            <p>
              We use analytics services (such as Vercel Analytics) to understand Site usage patterns, track user behavior, and improve content. These services may collect and store data about your interactions with the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Comments and User Content</h2>
            <p>
              Comments submitted through the Site are stored using Supabase and are subject to this Privacy Policy and our Terms of Service. Please do not share personal or sensitive information in comments, as they may be visible to other users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Affiliate Links</h2>
            <p>
              The Site contains affiliate links to products on platforms like Amazon. When you click on these links and make a purchase, we may earn a commission. This does not affect your price and helps support our site. We disclose affiliate relationships transparently.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share information with:
            </p>
            <ul className="list-disc list-inside space-y-2 my-4">
              <li>Service providers who assist in operating the Site (e.g., analytics, hosting)</li>
              <li>Legal authorities when required by law</li>
              <li>In the event of business restructuring or acquisition (with notification)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet is completely secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data. To exercise these rights, please contact us using the information below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p>
              The Site is not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on the Site and updating the "Last Updated" date. Your continued use of the Site following such notification constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="mt-4">
              <strong>The Gadget Pick</strong><br />
              Email: privacy@thegadgetpick.com<br />
              Website: https://thegadgetpick.com
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8">
            Last Updated: March 2026
          </p>
        </div>
      </div>
    </div>
  );
}
