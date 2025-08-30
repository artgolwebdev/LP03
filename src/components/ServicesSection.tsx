import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Music, Users, Mic, Headphones } from "lucide-react";

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20%" });

  const services = [
    {
      icon: Music,
      title: "Wedding Events",
      description: "Creating magical moments for your special day with curated playlists and seamless mixing.",
      image: "https://images.unsplash.com/photo-1714972383570-44ddc9738355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGFydHklMjBkYW5jaW5nfGVufDF8fHx8MTc1NjU4NjczMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: Users,
      title: "Corporate Functions",
      description: "Professional sound solutions for conferences, launches, and corporate celebrations.",
      image: "https://images.unsplash.com/photo-1671124894290-337fdc830f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMG11c2ljfGVufDF8fHx8MTc1NjU4NjczMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: Mic,
      title: "Festival & Concerts",
      description: "High-energy performances that electrify crowds and create unforgettable experiences.",
      image: "https://images.unsplash.com/photo-1610900538035-b04c4d957d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwc3RhZ2V8ZW58MXx8fHwxNzU2NTg2NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: Headphones,
      title: "Private Parties",
      description: "Intimate settings with personalized music curation tailored to your vibe and guest preferences.",
      image: "https://images.unsplash.com/photo-1640043975415-6afc7968d0f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMHR1cm50YWJsZXMlMjBjbG9zZXVwfGVufDF8fHx8MTc1NjU4NjcyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section 
      ref={ref}
      data-scroll-section
      className="min-h-screen bg-black py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-8"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            What I <span className="text-[#00FF85]">Bring</span>
          </motion.h2>
          
          {/* Decorative Background Image Strip */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative w-full max-w-4xl mx-auto h-24 mb-8 overflow-hidden rounded-lg"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1702308632277-ab0ccf044d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMGFic3RyYWN0JTIwbXVzaWN8ZW58MXx8fHwxNzU2NTg3MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Vinyl records abstract"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00FF85]/20 to-transparent" />
            
            {/* Animated overlay pattern */}
            <motion.div
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 opacity-30"
              style={{
                background: `
                  linear-gradient(45deg, transparent 30%, #00FF85 31%, #00FF85 33%, transparent 34%),
                  linear-gradient(-45deg, transparent 30%, #FFFFFF 31%, #FFFFFF 33%, transparent 34%)
                `,
                backgroundSize: "20px 20px"
              }}
            />
          </motion.div>

          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
            From intimate gatherings to massive festivals, I deliver exceptional music experiences 
            tailored to your vision and energy.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00FF85]/50 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-4 right-4 w-12 h-12 bg-[#00FF85]/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#00FF85]/30"
                >
                  <service.icon className="w-6 h-6 text-[#00FF85]" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 
                  className="text-xl sm:text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover effect line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-[#00FF85] mt-4 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 text-lg mb-6">
            Ready to elevate your event?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 text-[#00FF85] font-medium cursor-pointer"
          >
            <span>Let's discuss your vision</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}