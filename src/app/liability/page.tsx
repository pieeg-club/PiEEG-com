import { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Liability & Safety Information — PiEEG",
  description:
    "Important safety information and liabilities. PiEEG devices are NOT medical devices and are NOT FDA/CE approved. Read before purchase or use.",
};

export default function LiabilityPage() {
  return (
    <main className="flex-1">
      {/* Warning Banner */}
      <section className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <ShieldAlert className="w-6 h-6" />
            <p className="font-bold text-center">
              PLEASE READ CAREFULLY BEFORE PURCHASING OR USING ANY PIEEG DEVICE
            </p>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50 mb-6">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                Important Safety Information
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Liabilities & Safety
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
            
            {/* NOT A MEDICAL DEVICE */}
            <div className="p-8 rounded-xl bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 mb-12">
              <h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4 flex items-center gap-3">
                <ShieldAlert className="w-6 h-6" />
                NOT A MEDICAL DEVICE
              </h2>
              <p className="text-red-800 dark:text-red-200 text-lg leading-relaxed">
                PiEEG devices (including PiEEG, PiEEG-16, IronBCI, IronBCI-32, MicroBCI, ardEEG, and JNEEG) are <strong>NOT medical devices</strong> and have <strong>NOT been certified or approved</strong> by any government regulatory agency (FDA, CE, or equivalent) for medical use or diagnosis.
              </p>
            </div>

            {/* Intended Use */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Intended Use</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                  <h3 className="font-bold text-green-900 dark:text-green-100 mb-3">✓ Intended For:</h3>
                  <ul className="space-y-2 text-green-800 dark:text-green-200">
                    <li>• Educational purposes</li>
                    <li>• Research applications</li>
                    <li>• Hobby and DIY projects</li>
                    <li>• Brain-computer interface development</li>
                    <li>• Learning neuroscience</li>
                    <li>• Prototyping and experimentation</li>
                  </ul>
                </div>
                
                <div className="p-6 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                  <h3 className="font-bold text-red-900 dark:text-red-100 mb-3">✗ NOT Intended For:</h3>
                  <ul className="space-y-2 text-red-800 dark:text-red-200">
                    <li>• Medical diagnosis</li>
                    <li>• Treatment of medical conditions</li>
                    <li>• Clinical applications</li>
                    <li>• Life-support systems</li>
                    <li>• Safety-critical applications</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Responsibility */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">User Responsibility</h2>
              <p className="mb-4">
                By purchasing and using any PiEEG device, you acknowledge and agree that:
              </p>
              <ul className="space-y-3">
                <li>• You are fully responsible for your decision to purchase and use this device</li>
                <li>• You are ultimately responsible for the safe use of this device</li>
                <li>• You understand the device is not approved for medical use</li>
                <li>• You will not use the device for medical diagnosis or treatment</li>
                <li>• You accept all risks associated with using the device</li>
              </ul>
            </div>

            {/* Safety Precautions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Safety Precautions</h2>
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-yellow-900 dark:text-yellow-100 mb-3">⚠️ Critical Safety Rules:</h3>
                <ul className="space-y-2 text-yellow-800 dark:text-yellow-200">
                  <li>• <strong>Never connect PiEEG devices to mains power while in use with human subjects</strong></li>
                  <li>• <strong>Always use battery power when measuring biosignals from humans</strong></li>
                  <li>• <strong>Do not use if you have a pacemaker or other implanted medical device</strong> (consult physician first)</li>
                </ul>
              </div>
              
              <p className="mb-4">Additional safety guidelines:</p>
              <ul className="space-y-2">
                <li>• Discontinue use if you experience any discomfort</li>
                <li>• Keep devices away from water and moisture</li>
                <li>• Do not modify electrical isolation circuitry</li>
                <li>• Follow proper electrode placement and skin preparation procedures</li>
                <li>• Inspect equipment before each use</li>
              </ul>
            </div>

            {/* Electrodes & Skin Contact */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Electrodes & Skin Contact</h2>
              <ul className="space-y-2">
                <li>• Use only recommended electrodes</li>
                <li>• Follow proper skin preparation guidelines</li>
                <li>• Discontinue use if skin irritation occurs</li>
                <li>• Clean and disinfect electrodes between users</li>
                <li>• Replace electrodes as recommended</li>
              </ul>
            </div>

            {/* Data Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Data Privacy</h2>
              <ul className="space-y-2">
                <li>• Users are responsible for protecting any collected data</li>
                <li>• Follow local regulations regarding biosignal data (GDPR, etc.)</li>
                <li>• Obtain informed consent when recording data from others</li>
                <li>• Implement appropriate data security measures</li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mb-12 p-8 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700">
              <h2 className="text-2xl font-bold mb-4">Disclaimer of Warranties</h2>
              <p className="text-sm leading-relaxed">
                PiEEG devices are provided "AS IS" without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12 p-8 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-sm leading-relaxed">
                In no event shall PiEEG, its developers, manufacturers, or distributors be liable for any damages (including direct, indirect, incidental, consequential, or punitive damages) arising from the use or inability to use PiEEG devices, even if advised of the possibility of such damages.
              </p>
            </div>

            {/* Regulatory Compliance */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Regulatory Compliance</h2>
              <p className="mb-4">
                Users are responsible for ensuring compliance with all applicable local regulations regarding:
              </p>
              <ul className="space-y-2">
                <li>• Electrical safety standards</li>
                <li>• Data protection laws (GDPR, CCPA, etc.)</li>
                <li>• Research ethics requirements</li>
                <li>• Human subjects research protocols</li>
                <li>• Biosignal recording regulations</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center p-8 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <h2 className="text-2xl font-bold mb-4">Questions or Concerns?</h2>
              <p className="mb-6">
                If you have questions about safe use of PiEEG devices, contact us at:
              </p>
              <a
                href="mailto:pieeg@pieeg.com"
                className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
              >
                pieeg@pieeg.com
              </a>
              <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
                <strong>Last Updated:</strong> January 2026
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            By continuing to use our website and products, you acknowledge that you have read and understood this liability statement.
          </p>
          <Link
            href="/hardware"
            className="inline-block px-8 py-4 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all"
          >
            I Understand — View Products
          </Link>
        </div>
      </section>
    </main>
  );
}
