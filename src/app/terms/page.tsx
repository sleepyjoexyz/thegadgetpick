import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | The Gadget Pick',
  description: 'Review the terms and conditions for using The Gadget Pick website.',
};

export default function TermsOfService() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p>
              By accessing and using the thegadgetpick.com website ("Site"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) from the Site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 my-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the Site</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              <li>Attempt to gain unauthorized access to any portion of the Site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
            <p>
              The materials on the Site are provided on an "as is" basis. The Gadget Pick makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations</h2>
            <p>
              In no event shall The Gadget Pick or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Site, even if The Gadget Pick or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy of Materials</h2>
            <p>
              The materials appearing on the Site could include technical, typographical, or photographic errors. The Gadget Pick does not warrant that any of the materials on its Site are accurate, complete, or current. The Gadget Pick may make changes to the materials contained on the Site at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Links</h2>
            <p>
              The Gadget Pick has not reviewed all of the sites linked to its Site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by The Gadget Pick of the site. Use of any such linked website is at the user's own risk. This Site includes affiliate links to products on platforms like Amazon. We may earn a commission from purchases made through these links.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications</h2>
            <p>
              The Gadget Pick may revise these Terms of Service for the Site at any time without notice. By using the Site, you are agreeing to be bound by the then current version of these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p>
              The materials appearing on the Site are provided on an "as-is" basis. The Gadget Pick makes no representations or warranties of any kind, express or implied, as to the operation of the Site or the information, content, materials, or products included on the Site. You expressly agree that your use of the Site is at your sole risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Comments</h2>
            <p>
              In these Terms of Service, "User Content" shall mean any audio, video, text, images, or other material you choose to display on the Site. By displaying User Content, you grant The Gadget Pick a non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, and distribute it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 my-4">
              <li>Post any unlawful, threatening, abusive, defamatory, obscene, or offensive content</li>
              <li>Attempt to disrupt the normal operation of the Site</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site</li>
              <li>Collect or track personal information of others without consent</li>
              <li>Use the Site for commercial purposes without authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Affiliate Disclosure</h2>
            <p>
              This Site contains affiliate links to products on Amazon and other platforms. When you click on these links and make a purchase, we may earn a commission. This does not increase the cost to you and helps support our site. We only recommend products we believe provide value to our readers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-4">
              <strong>The Gadget Pick</strong><br />
              Email: support@thegadgetpick.com<br />
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
