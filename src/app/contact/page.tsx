import { Metadata } from "next";
import { Mail, MessageCircle, Code2 as Github, Send, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — PiEEG",
  description:
    "Get in touch with the PiEEG team. Technical support, partnership opportunities, careers, and general questions. Discord community with 2000+ members.",
};

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Discord Community",
    description: "Join 2000+ users for real-time help and discussions",
    action: "Join Discord",
    href: "https://discord.gg/neJ45FR6Sv",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: Github,
    title: "GitHub",
    description: "Report bugs, request features, or contribute code",
    action: "Browse Repositories",
    href: "https://github.com/pieeg-club",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "For technical support and general inquiries",
    action: "pieeg@pieeg.com",
    href: "mailto:pieeg@pieeg.com",
    gradient: "from-cyan-500 to-blue-600"
  }
];

export default function ContactPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/50 mb-6">
              <Send className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Get in Touch
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              We're here
              <br />
              <span className="bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 bg-clip-text text-transparent">
                to help
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400">
              Questions about hardware? Need technical support? Want to partner? Reach out and we'll get back to you quickly.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-20 sm:py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Choose Your Channel
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Multiple ways to reach us, depending on your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <a
                  key={idx}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${method.gradient} flex items-center justify-center text-white shadow-lg mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {method.title}
                  </h3>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    {method.description}
                  </p>
                  
                  <span className={`inline-block font-semibold bg-linear-to-r ${method.gradient} bg-clip-text text-transparent`}>
                    {method.action} →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 sm:py-24 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              For detailed inquiries, fill out the form below and we'll respond within 24 hours
            </p>
          </div>

          <form className="space-y-6 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                Subject *
              </label>
              <select
                id="subject"
                required
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
              >
                <option value="">Select a topic...</option>
                <option value="sales">Sales Inquiry</option>
                <option value="technical">Technical Support</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="press">Press / Media</option>
                <option value="research">Research Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="organization" className="block text-sm font-semibold mb-2">
                Organization (optional)
              </label>
              <input
                type="text"
                id="organization"
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                placeholder="University, Company, or Institution"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={8}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                placeholder="Please provide as much detail as possible..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold shadow-lg transition-all"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>

            <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
              We typically respond within 24 hours during business days
            </p>
          </form>
        </div>
      </section>

      {/* Email Addresses */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Email Us Directly
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Choose the right email for your inquiry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="mailto:pieeg@pieeg.com"
              className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg transition-all text-center"
            >
              <Mail className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mx-auto mb-3" />
              <h3 className="font-bold mb-2">General Support</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                Technical questions, troubleshooting, general inquiries
              </p>
              <span className="text-sm text-cyan-600 dark:text-cyan-400 font-mono">
                pieeg@pieeg.com
              </span>
            </a>

            <a
              href="mailto:pieeg@pieeg.com"
              className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg transition-all text-center"
            >
              <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Partnerships</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                Distribution, research collaborations, integrations
              </p>
              <span className="text-sm text-purple-600 dark:text-purple-400 font-mono">
                pieeg@pieeg.com
              </span>
            </a>

            <a
              href="mailto:pieeg@pieeg.com"
              className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-lg transition-all text-center"
            >
              <Mail className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Careers</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                Job opportunities, internships, volunteer positions
              </p>
              <span className="text-sm text-green-600 dark:text-green-400 font-mono">
                pieeg@pieeg.com
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Follow Us
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Stay updated with our latest news, tutorials, and community highlights
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.youtube.com/@pieeg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold transition-all"
            >
              <Video className="w-5 h-5" />
              YouTube
            </a>

            <a
              href="https://www.linkedin.com/company/pieeg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold transition-all"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/pieeg-club"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 font-semibold transition-all"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>

            <a
              href="https://twitter.com/pieeg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white font-semibold transition-all"
            >
              Twitter/X
            </a>

            <a
              href="https://www.instagram.com/pieeg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-semibold transition-all"
            >
              Instagram
            </a>

            <a
              href="https://www.facebook.com/pieeg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-semibold transition-all"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Snippet */}
      <section className="py-20 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Common Questions
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Quick answers before you reach out
            </p>
          </div>

          <div className="space-y-4">
            <details className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <summary className="font-semibold cursor-pointer">
                What's the typical delivery time for hardware?
              </summary>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                In-stock items ship within 1-2 business days. Custom configurations typically ship within 2-3 weeks. International shipping adds 5-14 days depending on location.
              </p>
            </details>

            <details className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <summary className="font-semibold cursor-pointer">
                Do you offer educational discounts?
              </summary>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                Yes! Universities and educational institutions qualify for 20-30% discounts on bulk orders. Contact us with your institution email for details.
              </p>
            </details>

            <details className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <summary className="font-semibold cursor-pointer">
                Can I get technical support for my PiEEG?
              </summary>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                Absolutely! Join our Discord for community support, or email us for dedicated technical assistance. All hardware purchases include 1 year of email support.
              </p>
            </details>

            <details className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <summary className="font-semibold cursor-pointer">
                Is PiEEG FDA/CE approved for medical use?
              </summary>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                PiEEG is designed for research and engineering purposes only. It is not a medical device and is not FDA/CE certified for clinical use. For compliance consulting, contact our partnership team.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
