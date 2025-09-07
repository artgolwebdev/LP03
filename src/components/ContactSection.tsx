import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { FormSuccessAnimation } from "./FormSuccessAnimation";
import { toast } from "sonner";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20%" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    
    // Show success animation
    setIsSubmitting(false);
    setShowSuccessAnimation(true);
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleAnimationComplete = () => {
    setShowSuccessAnimation(false);
    
    // Show a toast notification after the animation
    toast.success("Message sent successfully! I'll get back to you soon.", {
      duration: 5000,
      style: {
        background: '#000',
        color: '#fff',
        border: '1px solid #00FF85',
      },
    });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'd like to discuss booking your DJ services for my event.");
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  return (
    <section 
      ref={ref}
      data-scroll-section
      className="relative min-h-screen flex items-center justify-center bg-black"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(0, 255, 133, 0.1) 0%, rgba(0, 0, 0, 1) 70%)`
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-20">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl sm:text-6xl lg:text-8xl font-black text-white mb-8 leading-tight"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            Let's Make It <span className="text-[#00FF85]">Happen.</span>
          </h2>
          
          {/* Decorative Image Below Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-[#00FF85]/40 backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1721623777765-1381ba32859c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwY29uY2VydCUyMHN0YWdlfGVufDF8fHx8MTc1NjU4NzMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Neon concert stage lights"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#00FF85]/30 to-black/50" />
            </div>
            
            {/* Pulsing ring effect */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-[#00FF85]/60"
            />
            
            {/* Rotating outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full border-2 border-transparent"
              style={{
                background: "conic-gradient(from 0deg, transparent, #00FF85, transparent, #00FF85, transparent)",
                borderRadius: "50%",
                backgroundClip: "padding-box"
              }}
            />
          </motion.div>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Ready to turn your event into an unforgettable experience? 
            Get in touch and let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-[#00FF85] h-12 transition-all duration-300 focus:shadow-[0_0_20px_rgba(0,255,133,0.3)]"
                    disabled={isSubmitting}
                    required
                  />
                </motion.div>
              </div>
              
              <div>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-[#00FF85] h-12 transition-all duration-300 focus:shadow-[0_0_20px_rgba(0,255,133,0.3)]"
                    disabled={isSubmitting}
                    required
                  />
                </motion.div>
              </div>
              
              <div>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Textarea
                    placeholder="Tell me about your event... What's your vision?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-[#00FF85] min-h-32 resize-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(0,255,133,0.3)]"
                    disabled={isSubmitting}
                    required
                  />
                </motion.div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-bold h-12 text-base disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,133,0.4)]"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 mr-2 border-2 border-black/30 border-t-black rounded-full"
                      />
                      <span>Sending...</span>
                      
                      {/* Sound wave animation while loading */}
                      <div className="absolute right-4 flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scaleY: [1, 2, 1],
                              opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                            className="w-1 h-3 bg-black/60 rounded-full"
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                  
                  {/* Loading bar animation */}
                  {isSubmitting && (
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent"
                    />
                  )}
                  
                  {/* Hover glow effect */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#00FF85]/20 via-[#00FF85]/10 to-[#00FF85]/20 rounded-md"
                  />
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center text-center lg:text-left"
          >
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Prefer to chat directly?
              </h3>
              <p className="text-white/70 mb-8">
                Hit me up on WhatsApp for instant communication. 
                I'm always ready to discuss your next big event.
              </p>
            </div>

            <Button
              onClick={handleWhatsApp}
              className="bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold px-8 py-6 text-lg rounded-full"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Talk on WhatsApp
            </Button>

            {/* Decorative elements */}
            <div className="mt-12 flex space-x-4 opacity-30">
              <div className="w-2 h-2 bg-[#00FF85] rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-[#00FF85] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </motion.div>
        </div>

        {/* Footer text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-white/50 text-sm">
            Professional DJ Services • Events • Parties • Corporate Functions
          </p>
        </motion.div>
      </div>

      {/* Success Animation Overlay */}
      <FormSuccessAnimation 
        isVisible={showSuccessAnimation}
        onComplete={handleAnimationComplete}
      />
    </section>
  );
}