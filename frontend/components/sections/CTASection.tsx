export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Start Publishing?
        </h2>
        
        <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
          Join hundreds of publishers who are already using our platform to deliver amazing content experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
            Start Free Trial
          </button>
          <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
            Schedule a Demo
          </button>
        </div>
        
        <p className="text-primary-200 text-sm mt-8">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}
