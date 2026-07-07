function HeroSection() {
  return (
    <section className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center px-6">
      <h1 className="text-6xl font-bold text-center">
        HireIQ
      </h1>

      <h2 className="mt-6 text-4xl font-semibold text-center">
        AI Hiring Intelligence Platform
      </h2>

      <p className="mt-6 max-w-2xl text-center text-xl text-gray-300">
        Find your dream job or recruit top talent with AI-powered hiring.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 transition">
          Browse Jobs
        </button>

        <button className="rounded-lg border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black transition">
          Recruit Talent
        </button>
      </div>
    </section>
  );
}

export default HeroSection;