import ContactForm, { ContactInfoCards } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/50 via-white to-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-12 max-w-2xl">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-700">
            Contact
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Let&apos;s talk
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Questions, tool suggestions, or partnership ideas — send a message and
            we&apos;ll get back to you.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <ContactInfoCards />
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
              <h2 className="text-lg font-bold text-slate-900">Send a message</h2>
              <p className="mt-1 text-sm text-slate-500">
                All fields marked * are required
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
