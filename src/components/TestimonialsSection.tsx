import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20%" });

  const testimonials = [
    {
      name: "Sarah & Mike",
      event: "Wedding Reception",
      rating: 5,
      text: "Absolutely incredible! The music flow was perfect, reading the crowd like a mind reader. Our guests are still talking about the dance floor energy weeks later.",
      image: "https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc1NjQ4Nzc4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Marcus Chen",
      event: "Corporate Launch",
      rating: 5,
      text: "Professional, punctual, and perfectly attuned to our brand vibe. The seamless mix of ambient and energetic tracks created the exact atmosphere we wanted.",
      image: "https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTY1ODY4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Emma Rodriguez",
      event: "Birthday Celebration",
      rating: 5,
      text: "From the first beat to the last song, pure magic! The ability to blend different genres while keeping everyone dancing was simply phenomenal.",
      image: "https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFufGVufDF8fHx8MTc1NjQ4Nzc4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section 
      ref={ref}
      data-scroll-section
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-8"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            Client <span className="text-[#00FF85]">Love</span>
          </motion.h2>
          
          {/* Decorative Star Pattern */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center items-center space-x-2 mb-8"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: 0 }}
                animate={isInView ? { scale: 1, rotate: 360 } : { scale: 0, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                className="relative"
              >
                <Star className="w-8 h-8 text-[#00FF85] fill-current" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="absolute inset-0 w-8 h-8 bg-[#00FF85]/20 rounded-full blur-sm"
                />
              </motion.div>
            ))}
          </motion.div>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Don't just take my word for it — hear from the people who've experienced the energy firsthand.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-[#00FF85]/30 transition-all duration-500 group"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                className="absolute -top-4 -left-4 w-8 h-8 bg-[#00FF85] rounded-full flex items-center justify-center"
              >
                <Quote className="w-4 h-4 text-black" />
              </motion.div>

              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.4 + i * 0.1 }}
                  >
                    <Star className="w-4 h-4 text-[#00FF85] fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Testimonial Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                className="text-white/90 mb-6 leading-relaxed italic"
              >
                "{testimonial.text}"
              </motion.p>

              {/* Client Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00FF85]/30">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-[#00FF85] text-sm">{testimonial.event}</p>
                </div>
              </motion.div>

              {/* Hover effect */}
              <motion.div
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                className="absolute inset-0 bg-[#00FF85]/5 rounded-lg -z-10"
              />
            </motion.div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10"
        >
          {[
            { number: "150+", label: "Events Completed" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "5★", label: "Average Rating" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <h3 
                className="text-3xl sm:text-4xl font-black text-[#00FF85] mb-2"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
              >
                {stat.number}
              </h3>
              <p className="text-white/70 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}